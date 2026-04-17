import { z } from "zod";

const baseSubsidiarySchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  name: z.string().min(2, { message: "Name is required" }),
  code: z.string().min(2, { message: "Code is required" }),
  address: z.string().min(2, { message: "Address is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

export const createSubsidiarySchema = baseSubsidiarySchema;
export const updateSubsidiarySchema = baseSubsidiarySchema.partial().extend({
  id: z.number(),
});
