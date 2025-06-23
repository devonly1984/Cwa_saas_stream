import {z} from 'zod';

export const AgentInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instructions: z
    .string()
    .min(1, { message: "Instructions are required" }),
});



export type agentsInsertSchema = z.infer<typeof AgentInsertSchema>;
export const AgentUpdateSchema = AgentInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});

export type agentsUpdateSchema = z.infer<typeof AgentUpdateSchema>;