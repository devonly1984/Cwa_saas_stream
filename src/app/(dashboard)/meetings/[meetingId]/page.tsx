import MeetingIdView from "@/components/meetings/views/MeetingIdView";
import { LoadingState, ErrorState } from "@/components/shared/states";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {headers as getHeaders} from 'next/headers'
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface Props {
    params: Promise<{meetingId:string}>
}
const SingleMeetingPage = async({params}:Props) => {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await getHeaders(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  //TODO: Prefetch meetings.getTranscript

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Meeting"
            description="this may take a few moments"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error Loading Meeting"
              description="Failed to load meeting"
            />
          }
        >
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default SingleMeetingPage;
