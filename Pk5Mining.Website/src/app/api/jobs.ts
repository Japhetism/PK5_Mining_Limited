import axios from "axios";
import { ApiResponse, CreateJobPayload, JobDto, JobResponsePayload, JobsQuery, UpdateJobPayload } from "../interfaces";
import { http } from "./http";

export async function getJobs(params: JobsQuery) {
  try {
    const { data } = await http.get<ApiResponse<JobResponsePayload>>("/Job/filter", { params });

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(data.responseMessage || "Failed to fetch jobs");
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

export async function getJobById(id: string) {
  try {
    const { data } = await http.get<ApiResponse<JobDto>>(`/Job/${id}`);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(data.responseMessage || "Failed to fetch job details");
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg =
        (err.response?.data as ApiResponse<unknown> | undefined)?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to fetch job details");
    }

    throw err;
  }
}

export async function createJob(payload: CreateJobPayload) {
  try {
    const { data } = await http.post<ApiResponse<JobDto>>("/Job", payload);
  
    if (data.responseStatus !== "SUCCESS") {
      throw new Error(data.responseMessage || "Failed to add job");
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg =
        (err.response?.data as ApiResponse<unknown> | undefined)?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to add job");
    }

    throw err;
  }
}

export async function updateJob(id: number, payload: UpdateJobPayload) {
  try {
    const { data } = await http.put<ApiResponse<JobDto>>(`/Job/${id}`, payload);
  
    if (data.responseStatus !== "SUCCESS") {
      throw new Error(data.responseMessage || "Failed to update job");
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg =
        (err.response?.data as ApiResponse<unknown> | undefined)?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to update job");
    }

    throw err;
  }
}
