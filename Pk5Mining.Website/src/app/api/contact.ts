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

export async function getContactMessages(params: ContactQuery) {
  try {
    if (useMock) {
      // Simulate mock response structure
      return {
        data: mockContactMessages,
        totalCount: mockContactMessages.length,
        totalPages: 1,
      };
    }

    const { data } = await http.get<ApiResponse<ContactResponsePayload>>(
      "/api/contact",
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