import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import {headers as getHeaders} from 'next/headers'
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protecedProcedure = baseProcedure.use( async ({ctx,next}) =>{
  const session = await auth.api.getSession({
    headers: await getHeaders(),
  });
  if (!session) {
    throw new TRPCError({code: "UNAUTHORIZED",message: "Unauthenticated"})
  }
  return next({ ctx: { ...ctx, auth: session } });
})