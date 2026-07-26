import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type ApiError = { message?: string };

export interface IMineral {
  index: ReactNode;
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
  jobType?: string;
  workArrangement?: string;
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
  jobType?: string;
  workArrangement?: string;
  briefDescription: string | null;
  dT_Created: string;
  dT_Modified: string;
  applicationsCount: number;
  dT_Expiry?: string;
};

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
  agreedToTerms?: boolean;
};

export type PaginationInfo = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type JobResponsePayload = {
  data: JobDto[];
} & PaginationInfo;

export type InquiryForm = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
};

export type LegalContent = {
  subtitle: string;
  text: string;
  points?: Array<string>;
};
