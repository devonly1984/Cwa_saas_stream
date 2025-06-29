"use client";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash,  } from "lucide-react";
interface Props {
    onEdit:()=>void;
    onRemove:()=>void;
}
const MeetingIdDropdown = ({ onEdit, onRemove }: Props) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="size-4 text-black" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemove}>
          <Trash className="size-4 text-black" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default MeetingIdDropdown