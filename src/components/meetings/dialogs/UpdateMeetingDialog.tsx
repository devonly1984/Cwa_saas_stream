import ResponsiveDialog from "@/components/shared/dialogs/ResponsiveDialog"
import {MeetingForm} from "@/components/meetings";
import { MeetingGetOne } from "@/constants";
interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}
const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit Meeting Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
export default UpdateMeetingDialog