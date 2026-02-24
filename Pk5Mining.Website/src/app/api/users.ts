import {
  ApiResponse,
  ResetPasswordResponse,
  UpdateUserBody,
  UpdateUserStatusBody,
  UserDto,
  UsersQuery,
  UsersResponsePayload,
} from "@/app/interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { mockUsers } from "../fixtures";

const useMock = import.meta.env.VITE_USE_MOCK_CONTACT_MESSAGES === "true";

export async function getUsers(params: UsersQuery) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mockUsers,
        totalCount: mockUsers.length,
        totalPages: 1,
      };
    }

    const { data } = await http.get<ApiResponse<UsersResponsePayload>>(
      "/api/users",
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

export async function getUserById(id: string) {
  try {
    const { data } = await http.get<ApiResponse<UserDto>>(`/api/users/${id}`);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch user details",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch users"));
  }
}

export async function updateUser(id: string, body: UpdateUserBody) {
  try {
    const { data } = await http.put<ApiResponse<UserDto>>(
      `/api/users/${id}`,
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

export async function deleteUser(id: string) {
  try {
    const { data } = await http.delete<ApiResponse<UserDto>>(
      `/api/users/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to delete user"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to delete user"));
  }
}

export async function updateUserStatus(id: string, body: UpdateUserStatusBody) {
  try {
    const { data } = await http.patch<ApiResponse<UserDto>>(
      `/api/users/${id}/status`,
      body,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update user status",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update user status"));
  }
}

export async function resetUserPassword(id: string) {
  try {
    const { data } = await http.post<ApiResponse<ResetPasswordResponse>>(
      `/api/users/${id}/reset-password`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to reset user password",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to reset user password"));
  }
}
