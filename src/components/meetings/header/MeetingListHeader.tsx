"use client";
import { Button } from "@/components/ui/button";

import { PlusIcon, XCircle } from "lucide-react";

import { useState } from "react";
import {
  NewMeetingDialog,
  MeetingFilters,
  MeetingStatusFilter,
} from "@/components/meetings";
import {AgentIdFilter} from "@/components/agents";
import useMeetingsFilters from "@/hooks/meetings/useMeetingsFilters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();
  const isAnyFilterModified =
    !!filters.status || !!filters.search || !!filters.agentId;
  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewMeetingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className="" />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingFilters />
            <MeetingStatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant={"outline"} onClick={onClearFilters}>
                <XCircle className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
export default MeetingsListHeader;
