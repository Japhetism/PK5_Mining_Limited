import { ApiResponse } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import {
  PermissionResponsePayload,
} from "../interfaces/permission";

export async function getPermissions() {
  try {
    const { data } =
      await http.get<ApiResponse<PermissionResponsePayload>>("/Permission");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch permissions",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch permissions"));
  }
}