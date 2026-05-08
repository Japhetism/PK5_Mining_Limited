import axios, { AxiosRequestConfig } from "axios";
import { getAxiosErrorMessage } from "../utils/axios-error";
import { tokenStore } from "../auth/token";

const baseURL = "/api";
const HEADER_NAME = import.meta.env.VITE_API_KEY_NAME;
const API_VALUE = import.meta.env.VITE_API_KEY_VALUE;

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresApiKey?: boolean;
    retryCount?: number;
    maxRetries?: number;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export function setAuthToken(token?: string) {
  if (token) http.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete http.defaults.headers.common.Authorization;
}

const bootToken = tokenStore.get();
if (bootToken) setAuthToken(bootToken);

http.interceptors.request.use((config) => {
  const token = tokenStore.get();

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  } else if (config.headers) {
    delete (config.headers as any).Authorization;
  }

  if (config.requiresApiKey && HEADER_NAME) {
    config.headers[HEADER_NAME] = API_VALUE;
  }

  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;

    if (!config) return Promise.reject(err);

    config.retryCount = config.retryCount ?? 0;
    const maxRetries = config.maxRetries ?? 3;

    const isTimeout = err.code === "ECONNABORTED";
    const isNetworkError =
      err.code === "ERR_NETWORK" ||
      err.message === "Network Error" ||
      err.code === "ECONNRESET";

    const isRequestCancel =
      axios.isCancel(err) ||
      err.code === "ERR_CANCELED" ||
      err.name === "CanceledError";

    const shouldRetry =
      (isTimeout || isNetworkError || isRequestCancel) &&
      config.retryCount < maxRetries;

    if (shouldRetry) {
      config.retryCount += 1;

      const delay = config.retryCount * 1000;
      console.warn(
        `[API Retry] ${config.url} | Attempt ${config.retryCount} of ${maxRetries}. Waiting ${delay}ms...`,
      );

      await sleep(delay);

      return http(config);
    }

    // if (axios.isAxiosError(err)) {
    //   if (err.response?.status === 401) {
    //     tokenStore.clear();
    //     setAuthToken(undefined);
    //   }
    // }

    return Promise.reject(err);
  },
);

export function getErrorMessage(err: unknown) {
  return getAxiosErrorMessage(err, "Something went wrong");
}
