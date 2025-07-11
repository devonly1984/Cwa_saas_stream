"use client"
import { useState } from "react"
import {format} from 'date-fns';
import { Search } from "lucide-react";
import Highlighter from 'react-highlight-words'
import {useQuery} from '@tanstack/react-query'
import { useTRPC } from "@/trpc/client";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar,AvatarImage } from "../ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";
interface Props {
    meetingId:string;
}
const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId })
  );
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = (data ?? []).filter((item) =>
    item.text.toString().toLowerCase().includes(searchQuery.trim())
  );
  return (
    <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
      <p className="text-sm font-medium">Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-7 h-9 w-[240px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-y-4">
            {filteredData.map(item=>{
                return (
                  <div
                    className="flex flex-col hover:bg-muted p-4 gap-y-2 rounded-md border"
                    key={item.start_ts}
                  >
                    <div className="flex gap-x-2 items-center">
                      <Avatar className="size-6">
                        <AvatarImage
                          alt="User Avatar"
                          src={
                            item.user.image ??
                            generateAvatarUri({
                              seed: item.user.name,
                              variant: "initials",
                            })
                          }
                        />
                      </Avatar>
                      <p className="text-sm font-medium">
                        {item.user.name}
                      </p>
                      <p className="text-sm text-blue-500 font-medium">
                        {format(
                          new Date(0, 0, 0, 0, 0, 0, item.start_ts),
                          "mm:ss"
                        )}
                      </p>
                    </div>
                    <Highlighter
                      className="text-sm text-neutral-700"
                      highlightClassName="bg-yellow-200"
                      searchWords={[searchQuery]}
                      autoEscape={true}
                      textToHighlight={item.text}
                    />
                  </div>
                );
            })}
        </div>
      </ScrollArea>
    </div>
  );
};
export default Transcript