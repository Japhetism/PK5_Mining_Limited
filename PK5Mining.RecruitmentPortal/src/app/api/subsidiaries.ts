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

export async function getSubsidiaries(params: SubsidiariesQuery) {
  try {
    const { data } = await http.get<ApiResponse<SubsidiaryResponsePayload>>(
      "/Subsidiary/all",
      { params },
    );

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

export async function getLightSubsidiaries() {
  try {
    const { data } = await http.get<ApiResponse<Subsidiary[]>>(
      "/Subsidiary/light-responses",
    );

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

export async function createSubsidiary(payload: CreateSubsidiaryPayload) {
  try {
    const { data } = await http.post<ApiResponse<Subsidiary>>(
      "/Subsidiary/create",
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
    const { data } = await http.put<ApiResponse<Subsidiary>>(
      `/Subsidiary/Update`,
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

export async function updateSubsidiaryStatus(
  id: number,
  status: "Active" | "Inactive",
) {
  try {
    const { data } = await http.put<ApiResponse<Subsidiary>>(
      `/Subsidiary/update-status/${id}`,
      { status },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          `Failed to update subsidiary status to ${status}`,
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(
        err,
        `Failed to update subsidiary status to ${status}`,
      ),
    );
  }
}

export async function deleteSubsidiary(id: number) {
  try {
    const { data } = await http.delete<ApiResponse<Subsidiary>>("/Subsidiary", {
      params: { id },
    });

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          `Failed to delete subsidiary`,
        ),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, `Failed to delete subsidiary`));
  }
}
