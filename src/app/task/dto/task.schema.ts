import { z } from "zod";
import {
  TaskStatus,
  TaskPriority,
} from "../../../generated/prisma/client";

export const createTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must not exceed 100 characters"),

    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .nullable()
      .optional(),

    status: z.enum(TaskStatus),

    priority: z.enum(TaskPriority),

    startDate: z.coerce.date({
      message: "Invalid start date",
    }),

    endDate: z.coerce.date({
      message: "Invalid end date",
    }),

    projectId: z
      .string()
      .uuid("Invalid project ID"),

    userId: z
      .string()
      .uuid("Invalid user ID"),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be greater than or equal to start date",
    path: ["endDate"],
  });

export const updateTaskSchema = createTaskSchema
  .omit({
    projectId: true,
    userId: true,
  })
  .partial()
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }

      return true;
    },
    {
      message: "End date must be greater than or equal to start date",
      path: ["endDate"],
    }
  );

export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;