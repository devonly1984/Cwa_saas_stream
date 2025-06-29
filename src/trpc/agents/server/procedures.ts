import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { db } from "@/drizzle";
import { agents } from "@/drizzle/schema";
import { AgentInsertSchema, AgentUpdateSchema,  } from "@/lib/schemas/AgentSchema";
import {  createTRPCRouter, protecedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";

export const agentsRouter = createTRPCRouter({
  getOne: protecedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [existingAgent] = await db
        .select({
          meetingCount: sql<number>`5`,
          ...getTableColumns(agents),
          
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        );
      if (!existingAgent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found",
        });
      }
      return existingAgent;
    }),
  getMany: protecedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      const data = await db
        .select({
          meetingCount: sql<number>`5`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.session.userId),
            search ? ilike(agents.name, `%${search.trim()}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.session.userId),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        );
      const totalPages = Math.ceil(total.count / pageSize);
      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
  create: protecedProcedure
    .input(AgentInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdAgent;
    }),
  remove: protecedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [removedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning();
        if (!removedAgent) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Agent not found",
          });
        }
        return removedAgent
    }),
    update: protecedProcedure.input(AgentUpdateSchema).mutation(async({ctx,input})=>{
      const [updatedAgent] = await db
        .update(agents)
        .set(input)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        ).returning()
        
        if (!updatedAgent) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: "Agent Not found"
          })

        }
        return updatedAgent;
    })
});
