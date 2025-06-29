import { LoadingState, ErrorState } from "@/components/shared/states";
import { AgentsListHeader, AgentsView } from "@/components/agents";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/lib/auth";
import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/hooks/agents/params";
interface Props {
  searchParams: Promise<SearchParams>;
}
const AgentsPage = async ({ searchParams }: Props) => {
  const params = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await getHeaders(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...params,
    })
  );
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Agents"
              description="This may take a few seconds"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error Loading Agents"
                description="Something went wrong"
              />
            }
          >
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};
export default AgentsPage;
