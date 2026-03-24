import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email" }),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(2, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});