import { ApiResponse, JobApplicationDto } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";

export async function applyToJob(payload: FormData) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      "/JobApplication",
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
        requiresApiKey: true,
      },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to create job application",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to create job application"),
    );
  }
}
