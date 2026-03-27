import {
  ContactQuery,
  ApiResponse,
  ContactResponsePayload,
  InquiryFormDto,
  UpdateContactPayload,
} from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";

export async function getContactMessages(params: ContactQuery) {
  try {
    const { data } = await http.get<ApiResponse<ContactResponsePayload>>(
      "contactUs/filter",
      { params },
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

export async function updateContactStatus(payload: UpdateContactPayload) {
  const { id, status } = payload;

  try {
    const { data } = await http.put<ApiResponse<void>>(
      `/ContactUs/${id}`,
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

    return data.responseData;
  } catch (err) {
    throw new Error(
      getAxiosErrorMessage(err, "Failed to update contact status"),
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