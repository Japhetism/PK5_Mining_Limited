import type { LucideIcon } from "lucide-react";

export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance";

export type WorkArrangement =
  | "onsite"
  | "hybrid"
  | "remote";

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
  jobType: JobType;
  workArrangement: WorkArrangement;
  briefDescription: string;
  descriptionHtml: string;
  role?: string[];
  requirements?: string[];
  techStack?: string[];
  salaryRange?: string;
  postedAt?: string;
  isActive?: boolean;
}
