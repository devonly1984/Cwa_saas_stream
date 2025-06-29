import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

export const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];
export const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE=10;
export const MAX_PAGE_SIZE=100;
export const MIN_PAGE_SIZE = 1;

import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";

export type AuthClientType = {
  user: {
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
  };

  session: {
    createdAt: Date;
    expiresAt: Date;
    id: string;
    ipAddress?: string | null | undefined;
    token: string;
    updatedAt: Date;
    userAgent?: string |null|undefined;
    userId: string;
  };
};
//Agent
export type AgentGetOne =
  inferRouterOutputs<AppRouter>["agents"]["getOne"];
export type AgentGetMany = inferRouterOutputs<AppRouter>['agents']['getMany']['items']


//Meeting
  export type MeetingGetOne = inferRouterOutputs<AppRouter>['meetings']['getOne']
  export type MeetingGetMany =
    inferRouterOutputs<AppRouter>["meetings"]["getMany"]['items'];

  export enum MeetingStatus {
      Upcoming = "upcoming",
      Active = "active",
      Completed = "completed",
      Processing = "processing",
      Cancelled = "cancelled",
    }
  export type StreamTranscriptItem = {
    speaker_id: string;
    type: string;
    text: string;
    start_ts: number;
    stop_ts: number;
  };