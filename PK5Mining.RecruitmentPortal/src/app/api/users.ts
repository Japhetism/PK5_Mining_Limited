import { ApiResponse } from "@/app/interfaces";
import {
  CreateUserPayload,
  UpdateUserPayload,
  User,
  UsersQuery,
  UsersResponsePayload,
} from "../interfaces/user";
import { http } from "./http";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";

export async function getUsers(params: UsersQuery) {
  try {
    const { data } = await http.get<ApiResponse<UsersResponsePayload>>(
      "/User/filter",
      { params },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to fetch users"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch users"));
  }
}

export async function updateUser(body: UpdateUserPayload) {
  try {
    const { data } = await http.put<ApiResponse<User>>(
      "/User/update-user",
      body,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update user details",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update user details"));
  }
}

export async function createUser(user: CreateUserPayload) {
  try {
    const { data } = await http.post<ApiResponse<UsersResponsePayload>>(
      "/User/create",
      user,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to create user"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to create user"));
  }
}
