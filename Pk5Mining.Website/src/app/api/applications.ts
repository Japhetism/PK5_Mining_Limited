import { IJobApplication } from "../interfaces";
import { http } from "./http";

export type ApplyPayload = {
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  resumeUrl?: string;
  coverLetter?: string;
};

export async function applyToJob(payload: ApplyPayload) {
  const { data } = await http.post<IJobApplication>("/applications", payload);
  return data;
}

// client: my applications
export async function getMyApplications() {
  const { data } = await http.get<IJobApplication[]>("/applications/mine");
  return data;
}

// admin: all applications
export async function getAllApplications() {
  const { data } = await http.get<IJobApplication[]>("/applications");
  return data;
}