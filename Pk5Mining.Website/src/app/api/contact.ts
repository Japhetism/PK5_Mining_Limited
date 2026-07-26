import { ApiResponse, InquiryFormDto } from "../interfaces";
import { http } from "./http";
import { getAxiosErrorMessage } from "../utils/axios-error";

export async function saveContactInquiry(body: InquiryFormDto) {
  try {
    const { data } = await http.post<ApiResponse<InquiryFormDto>>(
      `/contactUs/contact-us`,
      body,
      { requiresApiKey: true },
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
