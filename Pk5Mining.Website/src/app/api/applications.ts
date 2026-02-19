import axios from "axios";
import {
  ApiResponse,
  ApplicationResponsePayload,
  ApplicationsQuery,
  IJobApplication,
  JobApplicationDto,
  JobDto,
} from "../interfaces";
import { http } from "./http";

export async function applyToJob(payload: FormData) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      "/JobApplication",
      payload,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        data.responseMessage || "Failed to create job application",
      );
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg = (
        err.response?.data as ApiResponse<unknown> | undefined
      )?.responseMessage;

      throw new Error(
        backendMsg || err.message || "Failed to create job application",
      );
    }

    throw err;
  }
}

export async function getApplications(params: ApplicationsQuery) {
  try {
    const { data } = await http.get<ApiResponse<ApplicationResponsePayload>>(
      "/JobApplication/filter",
      { params },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        data.responseMessage || "Failed to fetch job application",
      );
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg = (
        err.response?.data as ApiResponse<unknown> | undefined
      )?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to fetch jobs");
    }

    throw err;
  }
}

export async function getApplicationById(id: string) {
  try {
    const { data } = await http.get<ApiResponse<JobApplicationDto>>(
      `/JobApplication/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        data.responseMessage || "Failed to fetch job application details",
      );
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg = (
        err.response?.data as ApiResponse<unknown> | undefined
      )?.responseMessage;

      throw new Error(
        backendMsg || err.message || "Failed to fetch job application details",
      );
    }

    throw err;
  }
}

export async function updateJobApplicationStatus(payload: {
  id: number;
  status: string;
}) {
  try {
    const { id } = payload;
    const { data } = await http.put<ApiResponse<JobApplicationDto>>(
      `/JobApplication/${id}`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        data.responseMessage || "Failed to update job application status",
      );
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg = (
        err.response?.data as ApiResponse<unknown> | undefined
      )?.responseMessage;

      throw new Error(
        backendMsg || err.message || "Failed to update job application status",
      );
    }

    throw err;
  }
}

export async function getJobApplicationsByJobId(jobId: string) {
  try {
    const { data } = await http.get<ApiResponse<JobDto[]>>(
      `/JobApplication/ByJobId/${jobId}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        data.responseMessage || "Failed to get job applications by job id",
      );
    }

    return data.responseData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg = (
        err.response?.data as ApiResponse<unknown> | undefined
      )?.responseMessage;

      throw new Error(
        backendMsg || err.message || "Failed to get job applications by job id",
      );
    }

    throw err;
  }
}
