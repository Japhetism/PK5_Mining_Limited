import axios from "axios";
import { getAxiosErrorMessage } from "../utils/axios-error";
import { tokenStore } from "../auth/token";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// token is set by AuthContext at runtime (still supported)
export function setAuthToken(token?: string) {
  if (token) http.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete http.defaults.headers.common.Authorization;
}

// On app boot, set header if token exists (covers refresh)
const bootToken = tokenStore.get();
if (bootToken) setAuthToken(bootToken);

// Always attach latest token to every request
http.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  } else if (config.headers) {
    delete (config.headers as any).Authorization;
  }
  return config;
});

// Optional: auto-clear token on unauthorized
http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      tokenStore.clear();
      setAuthToken(undefined);
    }
    return Promise.reject(err);
  }
);

// normalize errors (export if you still use it in UI)
export function getErrorMessage(err: unknown) {
  return getAxiosErrorMessage(err, "Something went wrong");
}