import { ContactStatus } from "@/app/interfaces";

export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

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
  { label: "Open", value: "open", label2: "Active" },
  { label: "Closed", value: "closed", label2: "Inactive" },
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
  { value: "in_review", label: "In review", backendKey: "In_Review" },
  { value: "shortlisted", label: "Shortlisted", backendKey: "Shortlisted" },
  {
    value: "interview_scheduled",
    label: "Interview Scheduled",
    backendKey: "Interview_Scheduled",
  },
  { value: "offer_sent", label: "Offer Sent", backendKey: "Offer_Sent" },
  { value: "rejected", label: "Rejected", backendKey: "Rejected" },
  { value: "hired", label: "Hired", backendKey: "Hired" },
] as const;

export const contactMsgStatusOptions: {
  label: string;
  value: ContactStatus | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Replied", value: "replied" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
];

export const websites = [
  { label: "PK5 Mining", value: "com.pk5.mining" },
  { label: "PK5 Agro", value: "com.pk5.agro" },
];

export const agroSubjects = [
  { label: "Partnership", value: "partnership" },
  { label: "Bulk Purchase", value: "bulk purchase" },
  { label: "Export Inquiry", value: "export inquiry" },
  { label: "General Inquiry", value: "general inquiry" },
];

export const miningSubjects = [
  { label: "General Inquiry", value: "general inquiry" },
  { label: "Partnership Opportunity", value: "partnership opportunity" },
  { label: "Investor Relations", value: "investor relations" },
  { label: "Career Opportunities", value: "career opportunnities" },
  { label: "Media Inquiry", value: "media inquiry" },
];

export const statusStyles: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  new: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  "in review": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  shortlisted: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  "interview scheduled": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  "offer sent": {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    dot: "bg-indigo-400",
  },
  hired: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    dot: "bg-purple-400",
  },
  rejected: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    dot: "bg-red-400",
  },
};

export const workflowStages = [
  { id: "new", label: "New" },
  { id: "in_review", label: "In Review" },
  { id: "shortlisted", label: "Shortlisted" },
  {
    id: "interview",
    label: "Interview Scheduled",
  },
  { id: "offer", label: "Offer Sent" },
  { id: "rejected", label: "Rejected" },
  { id: "hired", label: "Hired" },
];
