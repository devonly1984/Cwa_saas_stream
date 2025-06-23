"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({})); 
    //DATA TABLE
    console.log(data);
  return <div className="overflow-x-scroll"></div>
}
export default MeetingsView