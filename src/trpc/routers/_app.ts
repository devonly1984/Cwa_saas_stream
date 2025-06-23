
import {  createTRPCRouter } from '../init';
import { agentsRouter } from '../agents/server/procedures';
import { meetingsRouter } from '../meetings/server/procedures';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;