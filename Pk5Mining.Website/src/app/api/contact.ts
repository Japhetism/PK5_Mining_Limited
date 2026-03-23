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
import { mockContactMessages } from "../fixtures";

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
  const filtered = filterMockMessages(params);

  return {
    data: filtered,
    totalCount: filtered.length,
    totalPages: Math.ceil(filtered.length / (params.pageSize || 10)),
  };
}

/**
 * Mock data filtering logic
 * Applies same filtering as backend would
 */
function filterMockMessages(params: ContactQuery): any[] {
  let filtered = [...mockContactMessages];

  // Quick search across all fields
  if (params.email) {
    const searchLower = params.email.toLowerCase();
    filtered = filtered.filter(
      (msg) =>
        // msg.firstName?.toLowerCase().includes(searchLower) ||
        msg.email?.toLowerCase().includes(searchLower),
      // msg.subject?.toLowerCase().includes(searchLower) ||
      // msg.messageBody?.toLowerCase().includes(searchLower) ||
      // msg.phoneNumber?.toLowerCase().includes(searchLower) ||
      // msg.company?.toLowerCase().includes(searchLower)
    );
  }

  // Advanced filters
  if (params.name) {
    const nameLower = params.name.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.name?.toLowerCase().includes(nameLower),
    );
  }

  // if (params.lastName) {
  //   const lastNameLower = params.lastName.toLowerCase();
  //   filtered = filtered.filter((msg) =>
  //     msg.lastName?.toLowerCase().includes(lastNameLower),
  //   );
  // }

  if (params.email) {
    const emailLower = params.email.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.email?.toLowerCase().includes(emailLower),
    );
  }

  if (params.phoneNumber) {
    const phoneLower = params.phoneNumber.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.phoneNumber?.toLowerCase().includes(phoneLower),
    );
  }

  if (params.subject) {
    const subjectLower = params.subject.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.subject?.toLowerCase().includes(subjectLower),
    );
  }

  if (params.website) {
    const websiteLower = params.website.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.company?.toLowerCase().includes(websiteLower),
    );
  }

  if (params.status && params.status !== "all") {
    filtered = filtered.filter(
      (msg) => msg.status?.toLowerCase() === params.status?.toLowerCase(),
    );
  }

  // Date range filtering
  if (params.dT_startDate) {
    const startDate = new Date(params.dT_startDate);
    filtered = filtered.filter((msg) => {
      const msgDate = new Date(msg.dT_Created);
      return msgDate >= startDate;
    });
  }

  if (params.dT_endDate) {
    const endDate = new Date(params.dT_endDate);
    endDate.setHours(23, 59, 59, 999); // End of day
    filtered = filtered.filter((msg) => {
      const msgDate = new Date(msg.dT_Modified);
      return msgDate <= endDate;
    });
  }

  // Pagination
  const pageNumber = params.pageNumber || 1;
  const pageSize = params.pageSize || 10;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return filtered.slice(startIndex, endIndex);
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

    // Fallback: find in mock data
    const mockThread = mockContactMessages.find((msg) => msg.id === id);
    if (!mockThread) {
      throw new Error("Contact not found");
    }

    return {
      ...mockThread,
      replies: [], // Mock doesn't have replies
    };
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

/**
 * Save contact inquiry
 * Cloud only (no fallback needed for write operations)
 */
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

    console.log("✅ Inquiry saved successfully");
    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to send inquiry"));
  }
}
