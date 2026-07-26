import { z } from "zod";

export const baseJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .regex(/^[a-zA-Z0-9 -]+$/, "Title can only contain letters, numbers, spaces, and hyphens."),
  department: z.string().trim().min(1, "Department is required."),  
  location: z
    .string()
    .trim()
    .min(1, "Location is required.")
    .regex(
      /^[a-zA-Z0-9 \-_@$#.,()]+$/, 
      "Location can only contain letters, numbers, spaces, hyphens, underscores, @, $, #, commas, periods, and parentheses."
    ),
  experience: z
    .string()
    .trim()
    .min(1, "Experience is required.")
    .regex(
      /^[a-zA-Z0-9 +]+$/, 
      "Experience can only contain letters, numbers, and spaces."
    ),
  jobType: z.string().min(1, "Job type is required."),
  workArrangement: z.string().min(1, "Work arrangement is required."),
  briefDescription: z.string().trim().min(1, "Brief description is required."),
  description: z.string().trim().min(1, "Description is required."),
});

export const createJobSchema = baseJobSchema;

export const updateJobSchema = baseJobSchema.partial().extend({
  id: z.number(),
});
