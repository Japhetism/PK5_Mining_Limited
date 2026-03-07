import { ApiResponse } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import {
  CreateSubsidiaryPayload,
  Subsidiary,
  SubsidiaryResponsePayload,
  UpdateSubsidiaryPayload,
} from "../interfaces/subsidiary";
import { mock_subsidiaries } from "../fixtures/subsidiary.fixture";
import { mock_roles } from "../fixtures/role.fixture";
import { CreateRolePayload, Permission, Role, RoleResponsePayload, UpdateRolePayload } from "../interfaces/role";

const useMock = import.meta.env.VITE_USE_MOCK_DATA === "true";

export async function getRoles() {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles,
        totalCount: mock_roles.length,
        totalPages: 1,
      };
    }

    const { data } =
      await http.get<ApiResponse<RoleResponsePayload>>("/Role");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch roles",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch roles"));
  }
}

export async function getRolesForDropdown() {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles,
      };
    }

    const { data } =
      await http.get<ApiResponse<Role[]>>("/Role/light");

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

export async function getRoleById(id: string) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles[0],
      };
    }

    const { data } = await http.get<ApiResponse<Role>>(
      `/Role/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch role details",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch role details"),
    );
  }
}

export async function createRole(payload: CreateRolePayload) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles[0],
      };
    }

    const { data } = await http.post<ApiResponse<Subsidiary>>(
      "/Role",
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to add role"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to add role"));
  }
}

export async function updateRole(
  id: number,
  payload: UpdateRolePayload,
) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles[0],
      };
    }

    const { data } = await http.put<ApiResponse<Role>>(
      `/Role/${id}`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update role",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update role"));
  }
}

export async function deleteRole(id: number) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles[0],
      };
    }

    const { data } = await http.delete<ApiResponse<Role>>(
      `/Role/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to delete role",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to delete role"));
  }
}

export async function updateRolePermissions(roleId: number, permissions: Array<string>) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles[0],
      };
    }

    const { data } = await http.delete<ApiResponse<Role>>(
      `/Role/${roleId}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update role permissions",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update role permissions"));
  }
}

export async function getPermissions() {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_roles[0],
      };
    }

    const { data } = await http.delete<ApiResponse<Permission[]>>(
      `/Role/Permissions`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update role permissions",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update role permissions"));
  }
}