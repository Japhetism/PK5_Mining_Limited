import { http } from "./http";
import { ApiResponse, JobDto } from "../interfaces";
import { getAxiosErrorMessage } from "../utils/axios-error";

const displayJobs = import.meta.env.VITE_DISPLAY_JOBS_PRODUCTION === "true";
const code = import.meta.env.VITE_APP_ID ?? "";

export async function getActiveJobs() {
  try {
    if (!displayJobs) {
      return [];
    }
    const { data } = await http.get<ApiResponse<JobDto[]>>("/Job", {
      requiresApiKey: true,
      params: {
        code,
      },
    });

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

export async function getJobById(id: string) {
  try {
    const { data } = await http.get<ApiResponse<JobDto>>(`/Job/${id}`, {
      requiresApiKey: true,
      params: {
        code: code,
      },
    });

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
