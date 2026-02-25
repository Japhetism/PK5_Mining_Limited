import { ApiResponse, ILoginPayload, IUser } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";

export async function login(payload: ILoginPayload) {
  try {
    const { data } = await http.post<ApiResponse<IUser>>("/Admin/login", payload);

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to authenticate user")
    );
  }
}