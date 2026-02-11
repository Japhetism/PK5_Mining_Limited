import { ApiResponse, IJob, JobDto } from "../interfaces";
import { http } from "./http";

export type CreateJobPayload = Omit<IJob, "id" | "createdAt" | "updatedAt">;
export type UpdateJobPayload = Partial<CreateJobPayload>;

export async function getJobs() {
  const { data } = await http.get<ApiResponse<JobDto[]>>("/Job");

  if (data.responseStatus !== "SUCCESS") {
    throw new Error(data.responseMessage || "Failed to fetch jobs");
  }

  return data.responseData;
}

export async function getJobById(id: string) {
  const { data } = await http.get<ApiResponse<JobDto>>(`/Job/${id}`);

  if (data.responseStatus !== "SUCCESS") {
    throw new Error(data.responseMessage || "Failed to fetch job");
  }

  return data.responseData;
}

export async function createJob(payload: CreateJobPayload) {
  const { data } = await http.post<ApiResponse<JobDto>>("/Job", payload);
  
  if (data.responseStatus !== "SUCCESS") {
    throw new Error(data.responseMessage || "Failed to add job");
  }

  return data.responseData;
}

export async function updateJob(id: string, payload: UpdateJobPayload) {
  const { data } = await http.patch<ApiResponse<JobDto>>(`/Job/${id}`, payload);
  
  if (data.responseStatus !== "SUCCESS") {
    throw new Error(data.responseMessage || "Failed to update job");
  }

  return data.responseData;
}
