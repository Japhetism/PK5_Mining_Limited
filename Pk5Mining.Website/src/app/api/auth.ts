import axios from "axios";
import { ApiResponse, ILoginPayload, IUser } from "../interfaces";
import { http } from "./http";

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