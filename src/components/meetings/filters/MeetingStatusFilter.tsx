"use client;"
import {
  CircleX,
  CircleCheck,
  ClockArrowUp,
  Video,
  Loader,
} from "lucide-react";
import CommandSelect from "@/components/shared/CommandSelect";
import { MeetingStatus } from "@/constants";
import useMeetingsFilters from "@/hooks/meetings/useMeetingsFilters";
const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        {MeetingStatus.Upcoming}
        <ClockArrowUp />
      </div>
    ),
  },
     {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        {MeetingStatus.Completed}
        <CircleCheck />
      </div>
    ),
  },
    {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        {MeetingStatus.Active}
        <Video />
      </div>
    ),
  },
 
    {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        {MeetingStatus.Processing}
        <Loader />
      </div>
    ),
  },
    {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        {MeetingStatus.Cancelled}
        <CircleX />
      </div>
    ),
  },
];
const MeetingStatusFilter = () => {
const [filters,setFilters] = useMeetingsFilters();
  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}

    />
  );
};
export default MeetingStatusFilter;
