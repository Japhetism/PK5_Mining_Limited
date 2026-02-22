import {
  ApiResponse,
  CreateJobPayload,
  JobDto,
  JobResponsePayload,
  JobsQuery,
  UpdateJobPayload,
} from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";

export async function getActiveJobs() {
  try {
    const { data } = await http.get<ApiResponse<JobDto[]>>("/Job");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to fetch jobs"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch jobs"));
  }
}

export async function getJobs(params: JobsQuery) {
  try {
    const { data } = await http.get<ApiResponse<JobResponsePayload>>(
      "/Job/filter",
      { params },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to fetch jobs"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch jobs"));
  }
}

export async function getJobsForDropdown() {
  try {
    const { data } = await http.get<ApiResponse<JobDto[]>>("/Job/light");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch jobs for dropdown",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch jobs for dropdown"),
    );
  }
}

export async function getJobById(id: string) {
  try {
    const { data } = await http.get<ApiResponse<JobDto>>(`/Job/${id}`);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch job details",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch job details"));
  }
}

export async function createJob(payload: CreateJobPayload) {
  try {
    const { data } = await http.post<ApiResponse<JobDto>>("/Job", payload);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to add job"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to add job"));
  }
}

export async function updateJob(id: number, payload: UpdateJobPayload) {
  try {
    const { data } = await http.put<ApiResponse<JobDto>>(`/Job/${id}`, payload);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to update job"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update job"));
  }
}
