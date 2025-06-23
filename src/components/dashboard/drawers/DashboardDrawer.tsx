import GeneratedAvatar from "@/components/shared/GeneratedAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AuthClientType } from "@/index";
import { ChevronDown, CreditCard } from "lucide-react";
interface DashboardDrawerProps {
    data:AuthClientType;
    onLogout:()=>void;
}
const DashboardDrawer = ({ data, onLogout }: DashboardDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm w-full truncate">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDown className="size-4 shrink-4" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{data.user.name}</DrawerTitle>
          <DrawerDescription>{data.user.email}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="outline" onClick={() => {}}>
            <CreditCard className="size-4 text-black" />
            Biling
          </Button>
          <Button variant="outline" onClick={onLogout}>
            <CreditCard className="size-4 text-black" />
            Logout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default DashboardDrawer