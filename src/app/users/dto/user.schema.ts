import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters").optional(),

  email: z.string().email("Invalid email").optional(),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters")
    .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;