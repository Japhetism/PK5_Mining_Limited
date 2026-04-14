import { ApiResponse } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import { mock_departments } from "../fixtures/department.fixture";
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
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_departments,
        totalCount: mock_departments.length,
        totalPages: 1,
      };
    }

    const { data } =
      await http.get<ApiResponse<DepartmentResponsePayload>>("/Department");

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
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_departments,
      };
    }

    const { data } =
      await http.get<ApiResponse<Department[]>>("/Department/light");

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
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_departments[0],
      };
    }

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
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_departments[0],
      };
    }

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
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_departments[0],
      };
    }

    const { data } = await http.put<ApiResponse<Department>>(
      `/Department/${id}`,
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

export async function deleteDepartment(id: number) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_departments[0],
      };
    }

    const { data } = await http.delete<ApiResponse<Department>>(
      `/Department/${id}`,
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
