import ResponsiveDialog from "@/components/shared/dialogs/ResponsiveDialog"
import AgentForm from "../forms/AgentForm";
import { AgentGetOne } from "@/index";
interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}
const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit Agent Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
export default UpdateAgentDialog