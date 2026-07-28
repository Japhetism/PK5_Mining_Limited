import axios from "axios";
import { ApiResponse, ILoginPayload, ISSOAUTH, IUser } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import { IChangePasswordPayload } from "../interfaces/user";

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTHENTICATION === "true";

export async function login(payload: ILoginPayload) {
  try {
    const { data } = await http.post<ApiResponse<IUser>>(
      "/Authentication/login",
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to authenticate user",
        ),
      );
    }

    return data.responseData;
  } catch (err: unknown) {
    throw new Error(getAxiosErrorMessage(err, "Failed to authenticate user"));
  }
}

export async function changePassword(payload: IChangePasswordPayload) {
  try {
    const changePasswordPayload = {
      newPassword: payload.newPassword,
    };

    const { data } = await http.put<ApiResponse<IUser>>(
      `User/update-password/${payload.userId}`,
      changePasswordPayload,
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
    throw new Error(getAxiosErrorMessage(err, "Failed to authenticate user"));
  }
}

export async function microsoftLogin() {
  try {
    const { data } = await http.post<ApiResponse<ISSOAUTH>>(
      "/SingleSignOn/microsoft/login",
      {},
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to authenticate user",
        ),
      );
    }

    return data.responseData;
  } catch (err: any) {
    throw err;
  }
}

export async function microsoftGraph(accessToken: string): Promise<any> {
  try {
    const { data } = await axios.get(
      "https://graph.microsoft.com/v1.0/me?$select=displayName,mail,department,employeeId,alias",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log("from microsoft graph ", data);

    return data;
  } catch (err: any) {
    throw new Error(
      getAxiosErrorMessage(
        err.response?.data?.error?.message || err.message,
        "Failed to fetch user profile from Microsoft Graph",
      ),
    );
  }
}
