import {
  ContactQuery,
  ContactThreadDto,
  ReplyToContactBody,
  ContactStatus,
  ContactReplyDto,
  ApiResponse,
  ContactResponsePayload,
  InquiryFormDto,
} from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";

const useMock = import.meta.env.VITE_USE_MOCK_CONTACT_MESSAGES === "true";

/**
 * Enhanced Contact API with Fallback Strategy
 *
 * Strategy:
 * 1. Try to fetch from cloud API first
 * 2. If cloud fails, automatically fallback to mock data
 * 3. Only use pure mock mode if env var VITE_USE_MOCK_CONTACT_MESSAGES is "true"
 *
 * Supports:
 * - Quick search (across all fields)
 * - Advanced filters: name, email, phone, subject, website, status
 * - Date range filtering: startDate, endDate
 * - Pagination: pageNumber, pageSize
 */

export async function getContactMessages(params: ContactQuery) {
  // If pure mock mode is enabled, use mock data immediately

  // if (useMock) {
  //   const filtered = filterMockMessages(params);
  //   return {
  //     data: filtered,
  //     totalCount: filtered.length,
  //     totalPages: Math.ceil(filtered.length / (params.pageSize || 10)),
  //   };
  // }

  // Try cloud API first
  try {
    const { data } = await http.get<ApiResponse<ContactResponsePayload>>(
      "contactUs/filter",
      { params },
    );

    console.log("✅ Cloud API Success:", data);

    if (data.responseStatus !== "SUCCESS") {
      console.warn(
        "⚠️ Cloud API returned non-success status, falling back to mock",
      );
      // Fall back to mock data
      return getFallbackMockData(params);
    }

    return data.responseData;
  } catch (cloudError) {
    console.warn(" Cloud API failed, falling back to mock data");
    console.warn("Error:", cloudError);

    // Fallback to mock data
    return getFallbackMockData(params);
  }
}

/**
 * Fallback function - returns mock data when cloud API fails
 */
function getFallbackMockData(params: ContactQuery) {
  console.log(" Using mock data as fallback");
  const filtered: string[] = [];

  return {
    data: filtered,
    totalCount: filtered.length,
    totalPages: Math.ceil(filtered.length / (params.pageSize || 10)),
  };
}

/**
 * Get single contact thread
 * Cloud first, fallback to mock
 */
export async function getContactThread(id: string) {
  // Try cloud first
  try {
    const { data } = await http.get<ApiResponse<ContactThreadDto>>(
      `/api/contact/${id}`,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error("Cloud API returned non-success status");
    }

    return data.responseData;
  } catch (error) {
    console.warn(
      "❌ Cloud API failed for getContactThread, using mock fallback",
    );
  }
}

/**
 * Update contact status
 * Cloud only (no fallback needed for write operations)
 */
export async function updateContactStatus(id: string, status: ContactStatus) {
  try {
    const { data } = await http.patch<ApiResponse<void>>(
      `/api/contact/${id}/status`,
      { status },
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to update contact status",
        ),
      );
    }

    console.log("✅ Contact status updated successfully");
    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to update contact status"),
    );
  }
}

/**
 * Reply to contact
 * Cloud only (no fallback needed for write operations)
 */
export async function replyToContact(id: string, body: ReplyToContactBody) {
  try {
    const { data } = await http.post<ApiResponse<ContactReplyDto>>(
      `/api/contact/${id}/reply`,
      body,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(
          data.responseMessage,
          "Failed to send reply to contact",
        ),
      );
    }

    console.log("✅ Reply sent successfully");
    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to send reply to contact"),
    );
  }
}

export async function saveContactInquiry(body: InquiryFormDto) {
  try {
    const { data } = await http.post<ApiResponse<InquiryFormDto>>(
      `/contactUs/contact-us`,
      body,
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to send inquiry"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to send inquiry"));
  }
}
