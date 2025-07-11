"use client"
import {ChevronsUpDown} from 'lucide-react'
import { ReactNode,useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import {CommandEmpty,CommandInput,CommandItem,CommandList}from '@/components/ui/command'
import  CommandResponsiveDialog  from "@/components/shared/dialogs/CommandResponsiveDialog";
interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value:string;
  placeholder?:string;
  isSearchable?:boolean;
  className?:string;
}
const CommandSelect = ({
  options,
  onSearch,
  onSelect,
  value,
  placeholder = "Select an option",
  isSearchable,
  className,
}: Props) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find(
      (option) => option.value === value
    );
    const handleOpenChange = (open: boolean) => {
      onSearch?.("");
      setOpen(open);
    };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant={"outline"}
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div className="">{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDown />
      </Button>
      <CommandResponsiveDialog
        open={open}
        onOpenChange={handleOpenChange}
        shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
export default CommandSelect