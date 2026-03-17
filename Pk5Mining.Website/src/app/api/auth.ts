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
  try {
    const { data } = await http.post<ApiResponse<IUser>>("/Admin/login", payload);

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

export async function changePassword(payload: IChangePasswordPayload) {
  try {
    const { data } = await http.post<ApiResponse<IUser>>("/Admin/Change-Password", payload);

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