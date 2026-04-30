import { z } from "zod";

const baseDepartmentSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Department name is required" })
    .max(255, { message: "Department name must not exceed 255 characters" }),
  description: z
    .string()
    .max(1000, { message: "Description must not exceed 1000 characters" })
    .optional(),
  subsidiaryId: z
    .number({ message: "Subsidiary is required" }),
  isActive: z
    .boolean()
    .default(true)
    .optional(),
});

export const createDepartmentSchema = baseDepartmentSchema;

export const updateDepartmentSchema = baseDepartmentSchema.partial().extend({
  id: z.number(),
});