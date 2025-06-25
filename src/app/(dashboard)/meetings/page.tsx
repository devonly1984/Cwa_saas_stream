
import {MeetingsView,MeetingsListHeader} from "@/components/meetings";
import ErrorState from "@/components/shared/states/ErrorState";
import LoadingState from "@/components/shared/states/LoadingState";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {headers as getHeaders} from 'next/headers'
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { loadMeetingParams } from "@/hooks/meetings/meetingParams";
import type { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}
const MeetingPage = async ({ searchParams }: Props) => {
  const filters = await loadMeetingParams(searchParams);
  const session = await auth.api.getSession({
    headers: await getHeaders(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Meetings"
              description="This may take a few seconds"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error Loading Meetings"
                description="Meetings failed to load"
              />
            }
          >
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};
export default MeetingPage;
