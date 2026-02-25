import { mockDashboardResponse } from "../fixtures";
import { ApiResponse, DashboardStatistics } from "../interfaces";
import { getAxiosErrorMessage } from "../utils/axios-error";
import { http } from "./http";

const useMock = import.meta.env.VITE_USE_MOCK_CONTACT_MESSAGES === "true";

export async function getDashboardStat() {
  try {
    if (useMock) {
      return mockDashboardResponse; // return the raw data only
    }

    const { data } = await http.get<ApiResponse<DashboardStatistics>>("/api/dashboard-statistics");

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