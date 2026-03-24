import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email" }).optional(),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  username: z.string().min(1, "Username is required").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});