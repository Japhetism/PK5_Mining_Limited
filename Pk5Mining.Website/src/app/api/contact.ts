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
 * Enhanced Contact API with Advanced Filtering Support
 * 
 * Supports:
 * - Quick search (across all fields)
 * - Advanced filters: name, email, phone, subject, website, status
 * - Date range filtering: startDate, endDate
 * - Pagination: pageNumber, pageSize
 */

export async function getContactMessages(params: ContactQuery) {
  try {
    if (useMock) {
      // Simulate mock response structure with filtering
      const filtered = filterMockMessages(params);
      
      return {
        data: filtered,
        totalCount: filtered.length,
        totalPages: Math.ceil(filtered.length / (params.pageSize || 10)),
      };
    }

    const { data } = await http.get<ApiResponse<ContactResponsePayload>>(
      "/api/contactUs",
      { params }
    );

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to fetch contact messages"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch contact messages"));
  }
}

/**
 * Mock data filtering logic
 * Replicate this logic in your backend for real implementation
 */
function filterMockMessages(params: ContactQuery): any[] {
  let filtered = [...mockContactMessages];

  // Quick search across all fields
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (msg) =>
        msg.name?.toLowerCase().includes(searchLower) ||
        msg.email?.toLowerCase().includes(searchLower) ||
        msg.subject?.toLowerCase().includes(searchLower) ||
        msg.message?.toLowerCase().includes(searchLower) ||
        // msg.phoneNumber?.toLowerCase().includes(searchLower) ||
        msg.website?.toLowerCase().includes(searchLower)
    );
  }

  // Advanced filters
  if (params.name) {
    const nameLower = params.name.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.name?.toLowerCase().includes(nameLower)
    );
  }

  if (params.email) {
    const emailLower = params.email.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.email?.toLowerCase().includes(emailLower)
    );
  }

  if (params.phoneNumber) {
    const phoneLower = params.phoneNumber.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.phoneNumber?.toLowerCase().includes(phoneLower)
    );
  }

  if (params.subject) {
    const subjectLower = params.subject.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.subject?.toLowerCase().includes(subjectLower)
    );
  }

  if (params.website) {
    const websiteLower = params.website.toLowerCase();
    filtered = filtered.filter((msg) =>
      msg.website?.toLowerCase().includes(websiteLower)
    );
  }

  if (params.status && params.status !== "all") {
    filtered = filtered.filter((msg) =>
      msg.status?.toLowerCase() === params.status?.toLowerCase()
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
      const msgDate = new Date(msg.dT_Created);
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

export async function getContactThread(id: string) {
  try {
    const { data } = await http.get<ApiResponse<ContactThreadDto>>(`/api/contact/${id}`);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to fetch contact messages"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to fetch contact thread"));
  }
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  try {
    const { data } = await http.patch<ApiResponse<void>>(`/api/contact/${id}/status`, { status });

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to update contact status"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to update contact status"));
  }
}

export async function replyToContact(id: string, body: ReplyToContactBody) {
  try {
    const { data } = await http.post<ApiResponse<ContactReplyDto>>(`/api/contact/${id}/reply`, body);

    if (data.responseStatus !== "SUCCESS") {
      throw new Error(
        getAxiosErrorMessage(data.responseMessage, "Failed to send reply to contact"),
      );
    }

    return data.responseData;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, "Failed to send reply to contact"));
  }
}

export async function saveContactInquiry(body: InquiryFormDto) {
  try {
    const { data } = await http.post<ApiResponse<InquiryFormDto>>(`/contactUs/contact-us`, body);

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