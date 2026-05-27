import { z } from "zod";

const baseDepartmentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(255, { message: "Department name must not exceed 255 characters" })
    .regex(/^[a-zA-Z0-9_ -]+$/, { 
      message:
        "Name can only contain letters, numbers, underscores, hyphens, and spaces",
    }),
  description: z
    .string()
    .max(1000)
    .trim()
    .refine(
      (val) => {
        if (!val) return true;
        return /[a-zA-Z0-9]/.test(val);
      },
      {
        message: "Description must contain actual text, not just symbols",
      },
    )
    .optional(),
  isActive: z.boolean().default(true).optional(),
});

export const createDepartmentSchema = baseDepartmentSchema;

export const updateDepartmentSchema = baseDepartmentSchema.partial().extend({
  id: z.number(),
});
