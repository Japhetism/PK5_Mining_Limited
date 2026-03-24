import { z } from "zod";

const baseUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  username: z.string().min(2, { message: "Username is required" }),
});

export const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const updateUserSchema = baseUserSchema.partial().extend({
  id: z.number(),
});
