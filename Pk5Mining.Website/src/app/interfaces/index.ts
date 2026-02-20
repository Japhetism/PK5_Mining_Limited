import type { LucideIcon } from "lucide-react";

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
  id: number;
  title: string;
  description: string;
  department: string;
  location: string;
  isActive: boolean;
  experience?: string;
  jobType: JobType | null;
  workArrangement: WorkArrangement | null;
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
