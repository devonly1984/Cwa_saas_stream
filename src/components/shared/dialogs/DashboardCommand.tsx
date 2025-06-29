import {
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

import { Dispatch, SetStateAction } from "react";
import CommandResponsiveDialog from "./CommandResponsiveDialog";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog
      shouldFilter
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
export default DashboardCommand;
