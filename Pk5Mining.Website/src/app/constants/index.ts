export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export const AUTH_KEY = "auth_state";

export const countries = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "South Africa",
  "Tanzania",
  "Ghana",
  "Kenya",
  "United Arab Emirates",
  "Other",
] as const;

export const defaultFormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phone: "",
  linkedinUrl: "",
} as const;

export const miningSubjects = [
  { label: "General Inquiry", value: "general inquiry" },
  { label: "Partnership Opportunity", value: "partnership opportunity" },
  { label: "Investor Relations", value: "investor relations" },
  { label: "Career Opportunities", value: "career opportunnities" },
  { label: "Media Inquiry", value: "media inquiry" },
];
