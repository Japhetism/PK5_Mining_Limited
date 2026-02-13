import axios from "axios";
import { ApiResponse, IJobApplication, JobApplicationDto } from "../interfaces";
import { http } from "./http";

export async function applyToJob(payload: IJobApplication) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>("/JobApplication", payload);
  
    if (data.responseStatus !== "SUCCESS") {
      throw new Error(data.responseMessage || "Failed to create job application");
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg =
        (err.response?.data as ApiResponse<unknown> | undefined)?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to create job application");
    }

    throw err;
  }
}

export async function getApplications() {
  try {
    const { data } = await http.get<ApiResponse<JobApplicationDto[]>>("/JobApplication");
  
    if (data.responseStatus !== "SUCCESS") {
      throw new Error(data.responseMessage || "Failed to fetch job application");
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg =
        (err.response?.data as ApiResponse<unknown> | undefined)?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to fetch jobs");
    }

    throw err;
  }
}