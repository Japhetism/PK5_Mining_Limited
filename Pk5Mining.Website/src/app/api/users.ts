import {
  ApiResponse,
} from "@/app/interfaces";
import { CreateUserPayload, ResetPasswordResponse, UpdateUserPayload, User, UsersQuery, UsersResponsePayload } from "../interfaces/user";
import { http } from "./http";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { mockUsers } from "../fixtures/user.fixture";

const useMock = import.meta.env.VITE_USE_MOCK_DATA === "true";

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

export async function getUserById(id: string) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mockUsers[0],
      };
    }

    const { data } = await http.get<ApiResponse<User>>(`/User/${id}`);

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

export async function deleteUser(id: string) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mockUsers,
      };
    }

    const { data } = await http.delete<ApiResponse<User>>(
      `/User/${id}`,
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

export async function updateUserStatus(id: string, body: UpdateUserPayload) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mockUsers,
      };
    }
    
    const { data } = await http.patch<ApiResponse<User>>(
      `/User/${id}/status`,
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
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mockUsers,
      };
    }

    const { data } = await http.post<ApiResponse<ResetPasswordResponse>>(
      `/Users/${id}/reset-password`,
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

export async function createUser(user: CreateUserPayload) {
  try {
    // if (useMock) {
    //   // Simulate mock response structure
    //   return {
    //     data: mockUsers,
    //     totalCount: mockUsers.length,
    //     totalPages: 1,
    //   };
    // }

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