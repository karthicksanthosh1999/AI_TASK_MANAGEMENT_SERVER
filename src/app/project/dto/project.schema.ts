import { z } from "zod";
import { ProjectStatus } from "../../../generated/prisma/client";

// CREATE
export const createProjectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must not exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required"),
  projectStatus: z.enum(ProjectStatus),
  startDate: z.coerce.date({
    message: "Invalid start date",
  }),
  endDate: z.coerce.date({
    message: "Invalid end date",
  }),
});

// UPDATE
export const updateProjectSchema = createProjectSchema
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

export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;