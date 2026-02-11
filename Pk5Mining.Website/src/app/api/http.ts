import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// token is set by AuthContext at runtime
export function setAuthToken(token?: string) {
  if (token) http.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete http.defaults.headers.common.Authorization;
}

// normalize errors (optional)
export function getErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    const msg =
      (err.response?.data as any)?.message ||
      (err.response?.data as any)?.error ||
      err.message;
    return typeof msg === "string" ? msg : "Something went wrong";
  }
  return "Something went wrong";
}