import { z } from "zod";

const nameRegex = /^[a-zA-Z][a-zA-Z0-9-]*$/;
const nameMessage =
  "Names must start with a letter and can only contain letters, numbers, and hyphens";

const baseUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  firstName: z
    .string()
    .min(2, { message: "First name is required" })
    .regex(nameRegex, { message: nameMessage }),
  lastName: z
    .string()
    .min(2, { message: "Last name is required" })
    .regex(nameRegex, { message: nameMessage }),
  username: z
    .string()
    .min(2, { message: "Username is required" })
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9@_-]*$/, {
      message:
        "Username must start with a letter or number and can only contain @, -, and _",
    }),
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
