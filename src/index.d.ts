import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "./trpc/routers/_app";

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

export type AgentGetOne =
  inferRouterOutputs<AppRouter>["agents"]["getOne"];

  export type MeetingGetOne = inferRouterOutputs<AppRouter>['meetings']['getOne']