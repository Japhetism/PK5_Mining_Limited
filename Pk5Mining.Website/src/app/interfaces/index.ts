import type { LucideIcon } from "lucide-react";
import { statuses } from "../constants";
import { Permission } from "../constants/permissions";
import { UserRole } from "../constants/role";

export type JobType = "full-time" | "part-time" | "contract" | "freelance";

export type WorkArrangement = "onsite" | "hybrid" | "remote";

export type ApiError = { message?: string };

export interface IMineral {
  name: string;
  image: string;
  use: string;
  purity: string;
}

export interface ITimelineEvent {
  year: string;
  event: string;
  description: string;
}

export interface ILeader {
  name: string;
  role: string;
  experience: string;
  image?: string;
}

export interface IBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface IRevenueData {
  year: string;
  revenue: number;
}

export interface IProductionData {
  mineral: string;
  volume: number;
}

export interface IReport {
  title: string;
  type: string;
  size: string;
  date: string;
  doc?: string;
}

export interface IHighlight {
  icon: LucideIcon;
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface IFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface IESGMetric {
  icon: LucideIcon;
  label: string;
  value: number;
}

export interface IInitiative {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ILocation {
  displayAddress: string;
  actualAddress: string;
  type?: string;
}

export interface ISocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface ISlideShowContent {
  title: string;
  subTitle: string;
  description: string;
}

export interface IJob {
  id: string;
  title: string;
  jobRole?: string;
  department?: string;
  location?: string;
  experience?: string;
  jobType: JobType | undefined;
  workArrangement: WorkArrangement | undefined;
  briefDescription: string;
  description: string;
  role?: string[];
  requirements?: string[];
  techStack?: string[];
  salaryRange?: string;
  postedAt?: string;
  isActive?: boolean;
}

export type IPaginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type Role = "super admin" | "admin";

export type JobApplicationStatus =
  | "submitted"
  | "reviewing"
  | "rejected"
  | "accepted";

export interface IJobApplication {
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  resume: string;
  status?: string;
  linkedIn?: string;
}

export type ApiResponse<T> = {
  responseMessage: string;
  responseData?: T;
  data?: T;
  responseStatus: "SUCCESS" | "FAILED" | string;
};

export type JobDto = {
  id?: number;
  title: string;
  description: string;
  department: string;
  location: string;
  isActive: boolean;
  experience?: string;
  jobType?: JobType;
  workArrangement?: WorkArrangement;
  briefDescription: string | null;
  dT_Created: string;
  dT_Modified: string;
  applicationsCount: number;
  dT_Expiry?: string;
};

export interface JobApplicationDto {
  id: number;
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  resume: string;
  status: string;
  linkedIn: string;
  dT_Created: string;
  dT_Modified: string;
  job: JobDto | null;
}

export interface IApplicantBioData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  linkedinUrl?: string;
}

export type ApplicationErrors = Partial<
  Record<keyof IApplicantBioData, string>
> & {
  resume?: string;
};

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  jwtToken: string;
  role?: UserRole;
  permissions?: Permission[];
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export type CreateJobPayload = Omit<
  IJob,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "department"
  | "location"
  | "experience"
  | "jobType"
  | "workArrangement"
  | "briefDescription"
> & {
  department: string;
  location: string;
  experience: string;
  jobType: JobType | undefined;
  workArrangement: WorkArrangement | undefined;
  briefDescription: string;
  dT_Expiry?: string;
  dT_Modified?: string;
};
export type UpdateJobPayload = Partial<CreateJobPayload>;

export type JobErrors = {
  [K in keyof CreateJobPayload]?: string;
};

export type PaginationInfo = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type JobResponsePayload = {
  data: JobDto[];
} & PaginationInfo;

export type JobsQuery = {
  pageNumber: number;
  pageSize: number;
  department?: string;
  location?: string;
  isActive?: boolean | string;
  jobType?: string;
};

export type ApplicationsByJobIdQuery = {
  pageNumber: number;
  pageSize: number;
}

export type ApplicationsQuery = {
  pageNumber: number;
  pageSize: number;
  email?: string;
}

export type ApplicationResponsePayload = {
  data: JobApplicationDto[];
} & PaginationInfo;

export type StatusFilter = "all" | "open" | "closed";

export type ApplicationStatusFilter =
  | "all"
  | "new"
  | "in_review"
  | "shortlisted"
  | "rejected"
  | "hired";

export type ContactStatus = "new" | "in review" |"replied" | "resolved" | "closed";

export type ContactMessageDto = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  subject: string;
  message: string;
  status: ContactStatus;
  dT_Created: string; // keep naming consistent with your backend style
  dT_Updated?: string | null;
};

export type ContactReplyDto = {
  id: string;
  contactId: string;
  subject: string;
  message: string;
  sentByAdminName?: string | null;
  dT_Created: string;
};

export type ContactThreadDto = {
  contact: ContactMessageDto;
  replies: ContactReplyDto[];
};

export type ContactQuery = {
  pageNumber?: number;
  pageSize?: number;
  status?: ContactStatus | "all";
  search?: string; // search by name/email/subject
};

export type ReplyToContactBody = {
  subject: string;
  message: string;
};

export type ContactResponsePayload = {
  data: ContactMessageDto[];
} & PaginationInfo;

export type InquiryFormDto = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  company?: string;
  subject: string;
  messageBody: string;
}

export type InquiryForm = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface DashboardStatistics {
  applicationStats: {
    total: number;
    byStage: {
      New: number;
      InReview: number;
      Shortlisted: number;
      Rejected: number;
      hired: number;
    };
  };

  jobStats: {
    total: number;
    byStatus: {
      Open: number;
      Close: number;
    }
  };

  recentJobs: Array<{
    jobId: string;
    title: string;
    status: "Open" | "Close";
    createdAt: string;
    applicationCount: number;
  }>;
}

export type StageValue = (typeof statuses)[number]["value"];
export type BackendStageKey = (typeof statuses)[number]["backendKey"];

export type RawByStage = Partial<Record<BackendStageKey, number>>;
export type ByStage = Record<StageValue, number>;

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  show: boolean;
  end?: boolean;
};