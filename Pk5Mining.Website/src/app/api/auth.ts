import { ApiResponse, ILoginPayload, IUser } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import { IChangePasswordPayload } from "../interfaces/user";
import { mockAuthenticationResonsePayload } from "../fixtures/user.fixture";

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTHENTICATION === "true";

export async function login(payload: ILoginPayload) {
  if (useMockAuth) {
    return mockAuthenticationResonsePayload.responseData;
  }

  const maxAttempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const { data } = await http.post<ApiResponse<IUser>>(
        "/Authentication/login",
        payload
      );

      if (data.responseStatus !== "SUCCESS") {
        throw new Error(
          getAxiosErrorMessage(
            data.responseMessage,
            "Failed to authenticate user"
          )
        );
      }

      return data.responseData;
    } catch (err: unknown) {
      lastError = err;

      const axiosErr = err as any;

      const isTimeout =
        axiosErr?.code === "ECONNABORTED";

      const isCancelled =
        axiosErr?.code === "ERR_CANCELED" ||
        axiosErr?.name === "CanceledError";

      const shouldRetry = isTimeout || isCancelled;

      // If not retryable OR last attempt → throw
      if (!shouldRetry || attempt === maxAttempts) {
        throw new Error(
          getAxiosErrorMessage(err, "Failed to authenticate user")
        );
      }
    }
  }

  throw lastError;
}

export async function changePassword(payload: IChangePasswordPayload) {
  try {
    const changePasswordPayload = {
      newPassword: payload.newPassword
    }

    const { data } = await http.put<ApiResponse<IUser>>(`User/update-password/${payload.userId}`, changePasswordPayload);

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
      getAxiosErrorMessage(err, "Failed to authenticate user")
    );
  }
}