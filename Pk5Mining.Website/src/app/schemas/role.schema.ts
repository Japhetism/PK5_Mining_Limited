import { z } from "zod";

const baseRoleSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .trim()
    .regex(/^[a-zA-Z][a-zA-Z0-9_-\s]*$/, {
      message:
        "Name must start with a letter and can only contain letters, numbers, underscores, hyphens, or spaces",
    }),
  permissionIds: z
    .array(z.number())
    .min(1, { message: "At least one permission is required" }),
});

export const createRoleSchema = baseRoleSchema;
export const updateRoleSchema = baseRoleSchema.partial().extend({
  id: z.number(),
});
