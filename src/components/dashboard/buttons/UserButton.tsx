"use client"

import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardDrawer from "../drawers/DashboardDrawer";
import DashboardDropdown from "../dropdown/DashboardDropdown";
const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();
  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };
  if (isPending || !data) {
    return null;
  }
  return isMobile ? (
    <DashboardDrawer onLogout={onLogout} data={data} />
  ) : (
    <DashboardDropdown onLogout={onLogout} data={data} />
  );
}
export default DashboardUserButton