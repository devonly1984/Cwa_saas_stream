"use client"
import EmptyState from "../../shared/states/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Video, Ban } from "lucide-react";
interface Props {
    meetingId:string;
    onCancelMeeting: ()=>void;
    isCancelling:boolean
}
const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not Started Yet"
        description="Meeting has yet to start"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
        <Button
          variant={"secondary"}
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <Ban />
          Cancel Meeting
        </Button>
        <Button
          disabled={isCancelling}
          asChild
          className="w-full lg:w-auto"
        >
          <Link href={`/call/${meetingId}`}>
            <Video />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default UpcomingState