"use client"
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import useMeetingsFilters from "@/hooks/meetings/useMeetingsFilters";
const MeetingFilters = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 pl-7 w-[200px] bg-white"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};
export default MeetingFilters;
