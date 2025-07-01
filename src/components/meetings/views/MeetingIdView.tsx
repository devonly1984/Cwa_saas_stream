"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import MeetingIdViewHeader from "../header/MeetingIdViewHeader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/useConfirm";
import { useState } from "react";
import UpdateMeetingDialog from "../dialogs/UpdateMeetingDialog";
import {
  CancelledState,
  ProcessingState,
  ActiveState,
  UpcomingState,
} from "@/components/shared/states";
import CompletedState from "@/components/meetings/states/CompletedState";
interface Props {
    meetingId: string;
}
const MeetingIdView = ({meetingId}:Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
    const queryClient = useQueryClient();
    const { data } = useSuspenseQuery(
      trpc.meetings.getOne.queryOptions({ id: meetingId })
    );
    const removeMeeting = useMutation(
      trpc.meetings.remove.mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries(
            trpc.meetings.getMany.queryOptions({})

          );
          router.push("/meetings");
        },
        onError: (error) => {
          toast.error(`Someting went wrong ${error.message}`);
        },
      })
    );
    const [RemoveConfirmation, confirmRemove] = useConfirm(
      "Are you sure?",
      "The following action will remove this meeting."
    );
    const handleRemoveMeeting = async () => {
      const ok = await confirmRemove();
      if (!ok) return;
      await removeMeeting.mutate({ id: meetingId });
    };
    const isActive = data.status ==='active';
    const isUpcoming = data.status ==='upcoming';
    const isCancelled = data.status ==='cancelled';
    const isCompleted = data.status ==='completed';
    const isProcessing = data.status === "processing";
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={isCancelled}
          />
        )}
        {isCompleted && <CompletedState data={data}/>}
      </div>
    </>
  );
}
export default MeetingIdView