import { ApiResponse, DashboardStatistics } from "../interfaces";
import { getAxiosErrorMessage } from "../utils/axios-error";
import { http } from "./http";

export async function getDashboardStat() {
  try {
    const { data } = await http.get<ApiResponse<DashboardStatistics>>("/Dashboard/dashboard");

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to fetch dashboard statistics"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch dashboard statistics"));
  }
}