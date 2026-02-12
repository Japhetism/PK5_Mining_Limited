import { ApiResponse, IJobApplication, JobApplicationDto } from "../interfaces";
import { http } from "./http";

export async function applyToJob(payload: IJobApplication) {
  const { data } = await http.post<ApiResponse<JobApplicationDto>>("/JobApplication", payload);
  
  if (data.responseStatus !== "SUCCESS") {
    throw new Error(data.responseMessage || "Failed to create job application");
  }

  return data.responseData;
}

export async function getApplications() {
  const { data } = await http.get<ApiResponse<JobApplicationDto[]>>("/JobApplication");
  
  if (data.responseStatus !== "SUCCESS") {
    throw new Error(data.responseMessage || "Failed to fetch job application");
  }

  return data.responseData;
}