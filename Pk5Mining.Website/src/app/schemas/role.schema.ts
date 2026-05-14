import { z } from "zod";

const baseRoleSchema = z.object({
  subsidiaryId: z.number({ message: "Subsidiary is required" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, {
      message:
        "Name must start with a letter and can only contain letters, numbers, underscores, or hyphens",
    }),
  permissionIds: z
    .array(z.number())
    .min(1, { message: "At least one permission is required" }),
});

export const createRoleSchema = baseRoleSchema;
export const updateRoleSchema = baseRoleSchema.partial().extend({
  id: z.number(),
});
