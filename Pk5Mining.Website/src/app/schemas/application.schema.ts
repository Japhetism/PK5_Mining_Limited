import { z } from "zod";

// A clean regex for checking names (alphabets only, minimum 2 characters)
const NAME_REGEX = /^[a-zA-Z]{2,}$/;

// A clean regex for checking a standard LinkedIn profile URL
const LINKEDIN_REGEX = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i;

export const applicationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .regex(
      NAME_REGEX,
      "First name must be at least 2 letters and contain only alphabets.",
    ),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .regex(
      NAME_REGEX,
      "Last name must be at least 2 letters and contain only alphabets.",
    ),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."), // Built-in native Zod email check

  country: z.string().trim().min(1, "Please select a country."),

  phone: z.string().trim().min(1, "Phone number is required."),

  linkedinUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    // Only applies regex if a value is actually typed out
    .refine((val) => !val || LINKEDIN_REGEX.test(val), {
      message: "Please provide a valid LinkedIn profile URL (linkedin.com).",
    }),

  resumeFile: z
    .instanceof(File, { message: "Please upload your resume." })
    .nullable()
    .refine((file) => file !== null, "Please upload your resume.")
    .refine(
      (file) => file === null || file.type === "application/pdf",
      "Resume must be a PDF file.",
    ),

  hasAgreedToTerms: z
    .boolean()
    .refine((val) => val === true, { message: "true" }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
