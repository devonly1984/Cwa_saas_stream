"use client"
import { Loader } from "lucide-react"
import { authClient } from "@/lib/authClient"
import { generateAvatarUri } from "@/lib/avatar"
import CallConnect from "./CallConnect";

interface Props {
    meetingId:string;
    meetingName:string;
}
const CallProvider = ({ meetingId, meetingName }: Props) => {
    const { data, isPending } = authClient.useSession();
    if (!data || isPending) {
        return (
          <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent">
            <Loader  className="size-6 animate-spin text-white"/>
          </div>
        );
    }
  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data?.user?.name, variant: "initials" })
      }
    />
  );
};
export default CallProvider