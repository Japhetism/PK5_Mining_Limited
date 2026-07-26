import { ApiResponse } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import {
  CreateRolePayload,
  Role,
  RoleResponsePayload,
  RolesQuery,
  UpdateRolePayload,
} from "../interfaces/role";

export async function getRoles(params: RolesQuery) {
  try {
    const { data } = await http.get<ApiResponse<RoleResponsePayload>>(
      "/Role/all",
      { params },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to fetch roles"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch roles"));
  }
}

export async function getLightRoles() {
  try {
    const { data } = await http.get<ApiResponse<Role[]>>(
      "/Role/light-responses",
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch roles for dropdown",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch roles for dropdown"),
    );
  }
}

export async function createRole(payload: CreateRolePayload) {
  try {
    const { data } = await http.post<ApiResponse<Role>>(
      "/Role/create",
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to create role"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to create role"));
  }
}

export async function updateRole(id: number, payload: UpdateRolePayload) {
  try {
    const { data } = await http.put<ApiResponse<Role>>(`/Role/Update`, payload);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to update role"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update role"));
  }
}

export async function updateRoleStatus(
  id: number,
  status: "Active" | "Inactive",
) {
  try {
    const { data } = await http.put<ApiResponse<Role>>(
      `/Role/update-status/${id}`,
      { status },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          `Failed to update role status to ${status}`,
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, `Failed to update role status to ${status}`),
    );
  }
}

export async function deleteRole(id: number) {
  try {
    const { data } = await http.delete<ApiResponse<Role>>("/Role", {
      params: { id },
    });

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          `Failed to delete role`,
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, `Failed to delete role`));
  }
}
