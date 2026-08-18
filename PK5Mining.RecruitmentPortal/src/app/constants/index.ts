import { ContactStatus } from "@/app/interfaces";

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
  { value: "in_review", label: "In Review", backendKey: "In_Review" },
  { value: "inreview", label: "In Review", backendKey: "In_Review" },
  { value: "shortlisted", label: "Shortlisted", backendKey: "Shortlisted" },
  {
    value: "interviewshortlisted",
    label: "Interview Shortlisted",
    backendKey: "InterviewShortlisted",
  },
  {
    value: "interviewscheduled",
    label: "Interview Scheduled",
    backendKey: "InterviewScheduled",
  },
  {
    value: "interviewcompleted",
    label: "Interview Completed",
    backendKey: "InterviewCompleted",
  },
  {
    value: "interview_completed",
    label: "Interview Completed",
    backendKey: "InterviewCompleted",
  },
  {
    value: "interview_scheduled",
    label: "Interview Scheduled",
    backendKey: "Interview_Scheduled",
  },
  { value: "offersent", label: "Offer Sent", backendKey: "OfferSent" },
  { value: "rejected", label: "Rejected", backendKey: "Rejected" },
  { value: "newrejected", label: "Rejected (New)", backendKey: "NewRejected" },
  {
    value: "interviewrejected",
    label: "Rejected (Interview)",
    backendKey: "InterviewRejected",
  },
  {
    value: "inreviewrejected",
    label: "Rejected (In Review)",
    backendKey: "InreviewRejected",
  },
  {
    value: "shortlistrejected",
    label: "Rejected (Shortlisted)",
    backendKey: "ShortlistRejected",
  },

  {
    value: "scheduledrejected",
    label: "Rejected (Interview)",
    backendKey: "ScheduledRejected",
  },
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
    bg: "bg-[#DBEAFE]",
    text: "text-[#1E3A8A]",
    dot: "bg-[#2563EB]",
  },

  inreview: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#92400E]",
    dot: "bg-[#D97706]",
  },

  shortlisted: {
    bg: "bg-[#F3E8FF]",
    text: "text-[#6B21A8]",
    dot: "bg-[#9333EA]",
  },

  interviewshortlisted: {
    bg: "bg-[#F3E8FF]",
    text: "text-[#6B21A8]",
    dot: "bg-[#9333EA]",
  },

  interviewscheduled: {
    bg: "bg-[#CFFAFE]",
    text: "text-[#155E75]",
    dot: "bg-[#0891B2]",
  },

  interviewcompleted: {
    bg: "bg-[#ECFCCB]",
    text: "text-[#4D7C0F]",
    dot: "bg-[#84CC16]",
  },

  offersent: {
    bg: "bg-[#E0E7FF]",
    text: "text-[#3730A3]",
    dot: "bg-[#4F46E5]",
  },

  hired: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#166534]",
    dot: "bg-[#16A34A]",
  },

  rejected: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    dot: "bg-[#DC2626]",
  },

  newrejected: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    dot: "bg-[#DC2626]",
  },

  interviewrejected: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    dot: "bg-[#DC2626]",
  },

  inreviewrejected: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    dot: "bg-[#DC2626]",
  },

  shortlistrejected: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    dot: "bg-[#DC2626]",
  },

  scheduledrejected: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    dot: "bg-[#DC2626]",
  },
};

export const workflowStages = [
  { id: "new", label: "New" },
  { id: "in_review", label: "In Review" },
  { id: "shortlisted", label: "Shortlisted" },
  { id: "interviewshortlisted", label: "Shortlisted" },
  { id: "interviewscheduled", label: "Interview Scheduled" },
  {
    id: "interview",
    label: "Interview Scheduled",
  },
  {
    id: "interviewcompleted",
    label: "Interview Completed",
  },
  { id: "offer", label: "Offer Sent" },
  { id: "rejected", label: "Rejected" },
  { id: "newrejected", label: "Rejected (New)" },
  { id: "hired", label: "Hired" },
];
