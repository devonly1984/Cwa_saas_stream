import CallView from "@/components/calls/views/CallView";
import { ErrorState, LoadingState } from "@/components/shared/states";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import {headers as getHeaders} from 'next/headers'
import { redirect } from "next/navigation";
import { Suspense } from "react";
interface Props {
    params: Promise<{meetingId:string}>;
}
const CallPage = async({params}:Props) => {
    const session = await auth.api.getSession({
        headers: await getHeaders()
    })
    if (!session) {
        redirect("/sign-in");
    }
    const { meetingId } = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="" description="" />}>
        <ErrorBoundary fallback={<ErrorState title="" description="" />}>
          <CallView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default CallPage;
