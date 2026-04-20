import { z } from "zod";

const baseRoleSchema = z.object({
  subsidiaryId: z.number({ message: "Subsidiary is required" }),
  name: z.string().min(2, { message: "Name is required" }),
  permissionIds: z.array(z.number()).min(1, { message: "At least one permission is required" }),
});

export const createRoleSchema = baseRoleSchema;
export const updateRoleSchema = baseRoleSchema.partial().extend({
  id: z.number(),
});
