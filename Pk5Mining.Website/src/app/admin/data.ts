import { jobs as publicJobs } from "../fixtures";
import type { IJob, JobType, WorkArrangement } from "../interfaces";

const JOBS_KEY = "pk5_admin_jobs_v1";
const APPS_KEY = "pk5_admin_applications_v1";

export type ApplicationStatus =
  | "new"
  | "in_review"
  | "shortlisted"
  | "rejected"
  | "hired";

export interface AdminJob extends IJob {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  linkedinUrl: string;
  resumeDataUrl: string;
  createdAt: string;
  status: ApplicationStatus;
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function seedJobsFromFixtures(): AdminJob[] {
  const now = new Date().toISOString();
  return publicJobs.map((job) => ({
    ...job,
    isActive: job.isActive ?? true,
    createdAt: job.postedAt ?? now,
    updatedAt: now,
  }));
}

export function getAdminJobs(): AdminJob[] {
  const stored = readJson<AdminJob[]>(JOBS_KEY);
  if (stored && stored.length) {
    return stored;
  }
  const seeded = seedJobsFromFixtures();
  writeJson(JOBS_KEY, seeded);
  return seeded;
}

export function saveAdminJobs(jobs: AdminJob[]) {
  writeJson(JOBS_KEY, jobs);
}

export function upsertAdminJob(job: Partial<AdminJob> & { id?: string }): AdminJob {
  const all = getAdminJobs();
  const now = new Date().toISOString();

  if (job.id) {
    const idx = all.findIndex((j) => j.id === job.id);
    if (idx !== -1) {
      const updated: AdminJob = {
        ...all[idx],
        ...job,
        updatedAt: now,
      } as AdminJob;
      all[idx] = updated;
      saveAdminJobs(all);
      return updated;
    }
  }

  const id = job.id ?? crypto.randomUUID();
  const created: AdminJob = {
    id,
    title: job.title ?? "Untitled role",
    jobRole: job.jobRole,
    department: job.department,
    location: job.location,
    experience: job.experience,
    jobType: (job.jobType ?? "full-time") as JobType,
    workArrangement: (job.workArrangement ?? "onsite") as WorkArrangement,
    briefDescription: job.briefDescription ?? "",
    descriptionHtml: job.descriptionHtml ?? "<p>Role description coming soon.</p>",
    role: job.role,
    requirements: job.requirements,
    techStack: job.techStack,
    salaryRange: job.salaryRange,
    postedAt: now,
    isActive: job.isActive ?? true,
    createdAt: now,
    updatedAt: now,
  };

  all.unshift(created);
  saveAdminJobs(all);
  return created;
}

export function setJobActive(id: string, active: boolean) {
  const all = getAdminJobs();
  const idx = all.findIndex((j) => j.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], isActive: active, updatedAt: new Date().toISOString() };
  saveAdminJobs(all);
}

export function getAdminJobById(id: string): AdminJob | undefined {
  return getAdminJobs().find((j) => j.id === id);
}

export function getApplications(): JobApplication[] {
  return readJson<JobApplication[]>(APPS_KEY) ?? [];
}

export function saveApplications(list: JobApplication[]) {
  writeJson(APPS_KEY, list);
}

export function addApplication(
  input: Omit<JobApplication, "id" | "createdAt" | "status">,
): JobApplication {
  const list = getApplications();
  const created: JobApplication = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  list.unshift(created);
  saveApplications(list);
  return created;
}

export function getApplicationById(id: string): JobApplication | undefined {
  return getApplications().find((a) => a.id === id);
}

export function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const list = getApplications();
  const idx = list.findIndex((a) => a.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], status };
  saveApplications(list);
}

