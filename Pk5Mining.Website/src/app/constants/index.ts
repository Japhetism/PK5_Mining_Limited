export const AUTH_KEY = "auth_state";

export const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
] as const;

export const workArrangements = [
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
] as const;

export const statusOptions = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
] as const;

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

export const statuses = [
  { value: "new", label: "New", backendKey: "New" },
  { value: "in_review", label: "In review", backendKey: "InReview" },
  { value: "shortlisted", label: "Shortlisted", backendKey: "Shortlisted" },
  { value: "interview_scheduled", label: "Interview Scheduled", backendKey: "InterviewScheduled" },
  { value: "offer_sent", label: "Offer Sent", backendKey: "OfferSent" },
  { value: "rejected", label: "Rejected", backendKey: "Rejected" },
  { value: "hired", label: "Hired", backendKey: "Hired" },
] as const;