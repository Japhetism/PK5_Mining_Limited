import axios from "axios";
import { ApiResponse } from "../interfaces";

export function getAxiosErrorMessage(
  err: unknown,
  fallback = "Something went wrong",
): string {
  if (!axios.isAxiosError(err)) return fallback;

  if (err.response) {
    const backendMsg = (err.response.data as ApiResponse<unknown> | undefined)
      ?.responseMessage;

    return backendMsg || `Request failed (${err.response.status})`;
  }

  if (err.request) {
    if (err.code === "ECONNABORTED") return "Request timed out. Try again.";
    return "Unable to reach the server. Check your internet connection.";
  }

  return err.message || fallback;
}
