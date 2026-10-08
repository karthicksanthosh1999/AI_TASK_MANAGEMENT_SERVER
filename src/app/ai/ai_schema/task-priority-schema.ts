import { z } from "zod";

export const TaskPrioritySchema = z.object({
    recommendations: z.array(
        z.object({
            taskId: z.string(),
            rank: z.number(),
            score: z.number().min(0).max(100),
            urgency: z.enum([ "LOW", "HIGH", "CRITICAL"]),
            reason: z.string(),
        })
    ),
    summary: z.string()
});

export type TaskPriorityResult = z.infer<typeof TaskPrioritySchema>