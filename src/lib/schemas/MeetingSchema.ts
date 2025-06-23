import {z} from 'zod';

export const MeetingInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "An Agent is required " }),
});



export type meetingInsertSchema = z.infer<typeof MeetingInsertSchema>;
export const MeetingUpdateSchema = MeetingInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});

export type meetingUpdateSchmea = z.infer<typeof MeetingUpdateSchema>;