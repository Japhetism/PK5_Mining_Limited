import { ApiResponse, IJobApplication, JobApplicationDto } from "../interfaces";
import { http } from "./http";

export async function applyToJob(payload: IJobApplication) {
  const { data } = await http.post<ApiResponse<JobApplicationDto>>("/JobApplication", payload);
  
  if (data.responseStatus !== "SUCCESS") {
    throw new Error(data.responseMessage || "Failed to create job application");
  }

  return data.responseData;
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