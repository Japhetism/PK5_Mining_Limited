import {
  ApiResponse,
  ApplicationResponsePayload,
  ApplicationsByJobIdQuery,
  ApplicationsQuery,
  InReviewApplicationStagePayload,
  InterviewCompletedApplicationStagePayload,
  JobApplicationDto,
  // RejectApplicationPayload,
  NewApplicationStagePayload,
  OfferSentApplicationStagePayload,
  ScheduledApplicationStagePayload,
  ShortlistedApplicationStagePayload,
} from "../interfaces";
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

export async function getApplications(params: ApplicationsQuery) {
  try {
    const { data } = await http.get<ApiResponse<ApplicationResponsePayload>>(
      "/JobApplication/filter",
      { params },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch job applications",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch job applications"),
    );
  }
}

export async function getApplicationById(id: string) {
  try {
    const { data } = await http.get<ApiResponse<JobApplicationDto>>(
      `/JobApplication/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch job application details",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch job application details"),
    );
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
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update job application status",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to update job application status"),
    );
  }
}

export async function getJobApplicationsByJobId(
  jobId: string,
  params: ApplicationsByJobIdQuery,
) {
  try {
    const { data } = await http.get<ApiResponse<ApplicationResponsePayload>>(
      `/JobApplication/ByJobId/${jobId}`,
      { params },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to get job applications by job id",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to get job applications by job id"),
    );
  }
}

// export async function rejectApplication(payload: RejectApplicationPayload) {
//   try {
//     const { id } = payload;
//     const { data } = await http.put<ApiResponse<JobApplicationDto>>(
//       `/JobApplication/${id}/reject`,
//       payload,
//     );

//     if (data.responseStatus !== "SUCCESS") {
//       throw new Error(
//         getAxiosErrorMessage(
//           data.responseMessage,
//           "Failed to reject job application",
//         ),
//       );
//     }

//     return data.responseData;
//   } catch (err) {
//     throw new Error(
//       getAxiosErrorMessage(err, "Failed to reject job application"),
//     );
//   }
// }

export async function processNewApplication(payload: NewApplicationStagePayload) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      `/JobApplicationStatus/applications/process-new`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to proceed job application",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to proceed New job application"),
    );
  }
}

export async function processInReviewApplication(payload: InReviewApplicationStagePayload) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      `/JobApplicationStatus/process-in-review`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to proceed job application",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to proceed in review job application"),
    );
  }
}

export async function processShortlistedApplication(payload: ShortlistedApplicationStagePayload) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      `/JobApplicationStatus/process-shortlisted`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to proceed job application",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to proceed shortlisted job application"),
    );
  }
}

export async function processScheduledApplication(payload: ScheduledApplicationStagePayload) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      `/JobApplicationStatus/process-scheduled`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to proceed job application",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to proceed scheduled job application"),
    );
  }
}

export async function processInterviewCompletedApplication(payload: InterviewCompletedApplicationStagePayload) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      `/JobApplicationStatus/process-interview-completed`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to proceed job application",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to proceed interview completed job application"),
    );
  }
}

export async function processOfferSentApplication(payload: OfferSentApplicationStagePayload) {
  try {
    const { data } = await http.post<ApiResponse<JobApplicationDto>>(
      `/JobApplicationStatus/process-offersent`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to proceed job application",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to proceed offer sent job application"),
    );
  }
}

