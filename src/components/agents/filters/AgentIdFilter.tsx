"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import CommandSelect from '@/components/shared/CommandSelect'
import GeneratedAvatar from "@/components/shared/GeneratedAvatar";
import useMeetingsFilters from "@/hooks/meetings/useMeetingsFilters";
const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();
    const [agentSearch, setAgentSearch] = useState("")
    const { data } = useQuery(
      trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search: agentSearch,
      })
    );



  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={(data?.items ?? []).map((option) => ({
        id: option.id,
        value: option.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={option.name}
              className="size-4"
              variant="botttsNeutral"
            />
            {option.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  );
}
export default AgentIdFilter