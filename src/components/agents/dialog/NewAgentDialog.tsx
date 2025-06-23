import ResponsiveDialog from "@/components/shared/dialogs/ResponsiveDialog"
import AgentForm from "../forms/AgentForm";
interface NewAgentDialogProps {
    open:boolean;
    onOpenChange:(open:boolean)=>void;
}
const NewAgentDialog = ({open,onOpenChange}:NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create new Agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
export default NewAgentDialog