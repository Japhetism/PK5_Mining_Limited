import axios from "axios";
import { ApiResponse, ILoginPayload, IUser } from "../interfaces";
import { http } from "./http";
import { authUser } from "../fixtures";

const username = import.meta.env.VITE_ADMIN_USERNAME;
const password = import.meta.env.VITE_ADMIN_PASSWORD;

export async function login(payload: ILoginPayload) {
  try {
    const { data } = await http.post<ApiResponse<IUser>>("/Admin/login", payload);

    return data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg =
        (err.response?.data as ApiResponse<unknown> | undefined)?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to authenticate user");
    }

    throw err;
  }
}

export async function loginMock(payload: ILoginPayload) {
  try {
    
    if (payload.username === username && payload.password === password) {
      const data: ApiResponse<IUser> = {
        responseStatus: "SUCCESS",
        responseMessage: "Login successful",
        responseData: {
          ...authUser
        },
      };

      return data.responseData;
    } else {
      throw new Error("Invalid username or password");
    }

  } catch (err) {
    if (axios.isAxiosError(err)) {
      const backendMsg =
        (err.response?.data as ApiResponse<unknown> | undefined)?.responseMessage;

      throw new Error(backendMsg || err.message || "Failed to authenticate user");
    }

    throw err;
  }
}