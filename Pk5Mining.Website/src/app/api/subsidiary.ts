import { ApiResponse } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";
import {
  CreateSubsidiaryPayload,
  SubsidiariesQuery,
  Subsidiary,
  SubsidiaryResponsePayload,
  UpdateSubsidiaryPayload,
} from "../interfaces/subsidiary";
import { mock_subsidiaries } from "../fixtures/subsidiary.fixture";

const useMock = import.meta.env.VITE_USE_MOCK_DATA === "true";

export async function getSubsidiaries(queryParams: SubsidiariesQuery) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_subsidiaries,
        totalCount: mock_subsidiaries.length,
        totalPages: 1,
      };
    }

    const { data } =
      await http.get<ApiResponse<SubsidiaryResponsePayload>>("/Subsidairy");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch subsidiaries",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch subsidiaries"));
  }
}

export async function getSubsidiariesForDropdown() {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_subsidiaries,
      };
    }

    const { data } =
      await http.get<ApiResponse<Subsidiary[]>>("/Subsidiary/light");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch subsidiaries for dropdown",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch subsidiaries for dropdown"),
    );
  }
}

export async function getSubsidiaryById(id: string) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_subsidiaries[0],
      };
    }

    const { data } = await http.get<ApiResponse<Subsidiary>>(
      `/Subsidiaries/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to fetch subsidiary details",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to fetch subsidiary details"),
    );
  }
}

export async function createSubsidiary(payload: CreateSubsidiaryPayload) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_subsidiaries[0],
      };
    }

    const { data } = await http.post<ApiResponse<Subsidiary>>(
      "/Subsidiaries",
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to add subsidiary"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to add subsidiary"));
  }
}

export async function updateSubsidiary(
  id: number,
  payload: UpdateSubsidiaryPayload,
) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_subsidiaries[0],
      };
    }

    const { data } = await http.put<ApiResponse<Subsidiary>>(
      `/Subsidiaries/${id}`,
      payload,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update subsidiary",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update subsidiary"));
  }
}

export async function deleteSubsidiary(id: number) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mock_subsidiaries[0],
      };
    }

    const { data } = await http.delete<ApiResponse<Subsidiary>>(
      `/Subsidiaries/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to delete subsidiary",
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to delete subsidiary"));
  }
}
