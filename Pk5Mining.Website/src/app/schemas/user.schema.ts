import { z } from "zod";

const baseUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  username: z.string().min(2, { message: "Username is required" }),
  roleId: z.coerce
    .number({ message: "Role is required" })
    .positive("Role is required"),  
  subsidiaryId: z.coerce
    .number({ message: "Subsidiary is required" })
    .positive("Subsidiary is required"),
  departmentId: z.coerce
    .number({ message: "Department is required" })
    .positive("Department is required"),
});

export const createUserSchema = baseUserSchema;

export const updateUserSchema = baseUserSchema.partial().extend({
  id: z.number(),
});
