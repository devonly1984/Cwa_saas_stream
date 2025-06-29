"use client"

import GeneratedAvatar from "@/components/shared/GeneratedAvatar";
import { Badge } from "@/components/ui/badge";
import { AgentGetMany } from "@/constants"
import { ColumnDef } from "@tanstack/react-table"
import { CornerDownRight, VideoIcon } from "lucide-react";



export const agentColumns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-6"
          />
          <span className="font-semibold capitalize">
            {row.original.name}
          </span>
        </div>

        <div className="flex items-center gap-x-1.5">
          <CornerDownRight className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate capitalize max-w-[200px]">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />
        {row.original.meetingCount || 0}{" "}
        {row.original.meetingCount === 1 ? "Meeting" : "Meetings"}
      </Badge>
    ),
  },
];