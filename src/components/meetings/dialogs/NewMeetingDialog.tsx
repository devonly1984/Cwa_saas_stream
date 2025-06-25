"use client";
import ResponsiveDialog from "@/components/shared/dialogs/ResponsiveDialog";
import { MeetingForm } from "@/components/meetings";
import { useRouter } from "next/navigation";
interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const NewMeetingDialog = ({
  open,
  onOpenChange,
}: NewMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create new Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
export default NewMeetingDialog;
