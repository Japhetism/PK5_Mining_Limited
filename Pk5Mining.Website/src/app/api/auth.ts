import { IUser } from "../interfaces";
import { http } from "./http";

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { accessToken: string };

export async function login(payload: LoginPayload) {
  const { data } = await http.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function me() {
  const { data } = await http.get<IUser>("/auth/me");
  return data;
}