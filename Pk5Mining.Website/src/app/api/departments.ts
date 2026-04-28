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
    // if (useMock) {
    //   // Simulate mock response structure
    //   return {
    //     data: mock_departments,
    //     totalCount: mock_departments.length,
    //     totalPages: 1,
    //   };
    // }

    const { data } =
      await http.get<ApiResponse<DepartmentResponsePayload>>("/Department/all");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch departments",
        ),
      );
    }
    // console.log(data.responseData);
    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch departments"));
  }
}

export async function getDepartmentsForDropdown() {
  try {
    // if (useMock) {
    //   // Simulate mock response structure
    //   return {
    //     data: mock_departments,
    //   };
    // }

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
    console.log("Department/light-responses",data.responseData);

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch departments for dropdown"),
    );
  }
}

export async function getDepartmentById(id: string) {
  try {
    // if (useMock) {
    //   // Simulate mock response structure
    //   return {
    //     data: mock_departments[0],
    //   };
    // }

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

    console.log("Department by id details", data.responseData);

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch department details"),
    );
  }
}

export async function createDepartment(payload: CreateDepartmentPayload) {
  try {
    // if (useMock) {
    //   // Simulate mock response structure
    //   return {
    //     data: mock_departments[0],
    //   };
    // }

    const { data } = await http.post<ApiResponse<Department>>(
      "/Department",
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to add department"),
      );
    }

    console.log("Department created", data.responseData);
    
    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to add department"));
  }
}

export async function updateDepartment(id: number, payload: UpdateDepartmentPayload) {
  try {
    // if (useMock) {
    //   // Simulate mock response structure
    //   return {
    //     data: mock_departments[0],
    //   };
    // }

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
  status: "Active" | "Inactive",
) {
  try {
    const { data } = await http.put<ApiResponse<Department>>(
      `/Department/update-status/${id}`,
      { status },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          `Failed to update Department status to ${status}`,
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, `Failed to update Department status to ${status}`),
    );
  }
}

export async function deleteDepartment(id: number) {
  try {
    const { data } = await http.delete<ApiResponse<Department>>(
      `/Department`,  { params: { id },}
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
