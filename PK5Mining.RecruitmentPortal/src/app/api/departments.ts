import { ApiResponse } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import {
  CreateDepartmentPayload,
  Department,
  DepartmentResponsePayload,
  DepartmentsQuery,
  UpdateDepartmentPayload,
} from "../interfaces/department";

const useMock = import.meta.env.VITE_USE_MOCK_DATA === "true";

export async function getDepartments(queryParams: DepartmentsQuery) {
  try {
    const { data } =
      await http.get<ApiResponse<DepartmentResponsePayload>>(
        "/Department/all", 
        { params: queryParams },
      );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch departments",
        ),
      );
    }
    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch departments"));
  }
}

export async function getDepartmentsForDropdown() {
  try {
    const { data } =
      await http.get<ApiResponse<Department[]>>("/Department/light-responses");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch departments for dropdown",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch departments for dropdown"),
    );
  }
}

export async function getDepartmentById(id: string) {
  try {
    const { data } = await http.get<ApiResponse<Department>>(
      `/Department/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch department details",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch department details"),
    );
  }
}

export async function createDepartment(payload: CreateDepartmentPayload) {
  try {
    const { data } = await http.post<ApiResponse<Department>>(
      "/Department",
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to add department"),
      );
    }
    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to add department"));
  }
}

export async function updateDepartment(id: number, payload: UpdateDepartmentPayload) {
  try {
    const { data } = await http.put<ApiResponse<Department>>(
      `/Department/update`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update department",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update department"));
  }
}

export async function updateDepartmentStatus(
  id: number,
  isActive: boolean,
) {
  try {
    const { data } = await http.put<ApiResponse<Department>>(
      `/Department/update-status/${id}?isActive=${isActive}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          `Failed to update Department status to ${isActive}`,
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, `Failed to update Department status to ${isActive}`),
    );
  }
}

export async function deleteDepartment(id: number) {
  try {
    const { data } = await http.delete<ApiResponse<Department>>(
      `/Department`, { params: { id }, }
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to delete department",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to delete department"));
  }
}
