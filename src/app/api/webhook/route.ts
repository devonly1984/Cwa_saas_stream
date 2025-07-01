import {and,eq,not} from 'drizzle-orm'
import { NextRequest, NextResponse } from "next/server";
import {
  CallEndedEvent,
  //MessageNewEvent,
  CallTranscriptionReadyEvent,
  CallSessionParticipantLeftEvent,  
  CallSessionStartedEvent,
  CallRecordingReadyEvent,
} from "@stream-io/node-sdk";

import { db } from '@/drizzle';
import {agents,meetings} from '@/drizzle/schema';

import { streamVideo } from "@/lib/stream-video";
import { inngest } from '@/inngest/client';

const verifySignatureWithSDK = (
  body: string,
  signature: string
): boolean => {
  return streamVideo.verifyWebhook(body, signature);
};
const POST = async(req:NextRequest) =>{
    const signature = req.headers.get('x-signature');
    const apiKey = req.headers.get("x-api-key");
    if (!signature || !apiKey) {
        return NextResponse.json({
            error: "Missing signature or API KEY"
        },{status:400})
    }
    const body = await req.text();
    if (!verifySignatureWithSDK(body,signature)) {
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
    }
    let payload:unknown;
    try {
        payload = JSON.parse(body) as Record<string,unknown>;

    } catch  {
        return NextResponse.json(
          { error: "Invalid JSON" },
          { status: 400 }
        );
        
    }
    const eventType  = (payload as Record<string,unknown>)?.type;

    switch (eventType) {
      case "call.session_started": {
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId;
        if (!meetingId) {
          return NextResponse.json(
            { error: "Meeting meeting Id" },
            { status: 400 }
          );
        }
        const [existingMeeting] = await db
          .select()
          .from(meetings)
          .where(
            and(
              eq(meetings.id, meetingId),
              not(eq(meetings.status, "completed")),
              not(eq(meetings.status, "active")),
              not(eq(meetings.status, "cancelled")),
              not(eq(meetings.status, "processing"))
            )
          );
        if (!existingMeeting) {
          return NextResponse.json(
            { error: "Meeting not found" },
            { status: 404 }
          );
        }
        await db
          .update(meetings)
          .set({
            status: "active",
            startedAt: new Date(),
          })
          .where(eq(meetings.id, existingMeeting.id));
        const [existingAgent] = await db
          .select()
          .from(agents)
          .where(eq(agents.id, existingMeeting.agentId));
        if (!existingAgent) {
          return NextResponse.json(
            { error: "Agent not found" },
            { status: 404 }
          );
        }
        const call = streamVideo.video.call("default", meetingId);
        const realtimeClient = await streamVideo.video.connectOpenAi({
          call,
          openAiApiKey: process.env.OPEN_AI_KEY!,
          agentUserId: existingAgent.id,
        });
        realtimeClient.updateSession({
          instructions: existingAgent.instructions,
        });
    }
        break;
      case "call.session_participant_left":  {
        const event = payload as CallSessionParticipantLeftEvent;
        const meetingId = event.call_cid.split(":")[1];
        if (!meetingId) {
          return NextResponse.json(
            { error: "Missing meetingId" },
            { status: 400 }
          );
        }
        const call = streamVideo.video.call("default", meetingId);
        await call.end();
      }
        break;
      case 'call.session.ended': {
        const event = payload as CallEndedEvent;
        const meetingId = event.call.custom?.meetingId;
          if (!meetingId) {
            return NextResponse.json(
              { error: "Missing meetingId" },
              { status: 400 }
            );
          }
         await db
           .update(meetings)
           .set({
             status: "processing",
             endedAt: new Date(),
           })
           .where(
             and(
               eq(meetings.id, meetingId),
               eq(meetingId.status, "active")
             )
           );

      }
      break;
      case 'call.transcription_ready': {
        const event = payload as CallTranscriptionReadyEvent;
        const meetingId = event.call_cid.split(':')[1];
        const [updatedMeeting] = await db
          .update(meetings)
          .set({
            transcriptUrl: event.call_transcription.url,
          })
          .where(eq(meetings.id, meetingId))
          .returning();
          if (!updatedMeeting) {
            return NextResponse.json(
              { error: "Meeting not found" },
              { status: 404 }
            );
          }
          await inngest.send({
            name: "meetings/processing",
            data: {
              meetingId: updatedMeeting.id,
              transcriptUrl: updatedMeeting.transcriptUrl,
            },
          });

      }
      break;
       case 'call.recording_ready': {
        const event = payload as CallRecordingReadyEvent;
        const meetingId = event.call_cid.split(':')[1];
        await db
          .update(meetings)
          .set({
            recordingUrl: event.call_recording.url,
          })
          .where(eq(meetings.id, meetingId));

       }
       break;
      default:
        break;
    }
return NextResponse.json({ status: "ok" });
}
export default POST;