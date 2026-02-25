import { saveContactInquiry } from "@/app/api/contact";
import { InquiryForm, InquiryFormDto } from "@/app/interfaces";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const defaultFormData = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
}

function useContactViewModel() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InquiryForm>(defaultFormData);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: (payload: InquiryFormDto) => saveContactInquiry(payload),
    onSuccess: (data) => {
      setLoading(false);
      setSubmitted(true);
      setFormData(defaultFormData);
      // toastUtil.success("Inquiry submitted successfully");
    },
    onError: (err: unknown) => {
      setLoading(false);
      setSubmitted(false);
      const message = getAxiosErrorMessage(
        err,
        "An error occurred while submitting your inquiry. Please try again.",
      );

      // toastUtil.error(message);
      setErrorMsg(message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    setSubmitted(false);

    const nameArr = formData.name.split(" ");
    const firstName = nameArr[0] ?? "";
    const lastName = nameArr[1] ?? "";
    const messageBody = formData.message;

    const { name, message, ...rest } = formData;

    const payload = {
      ...rest,
      firstName,
      lastName,
      messageBody, 
    }
    
    createMutation.mutate(payload);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    formData,
    submitted,
    loading,
    focusedField,
    errorMsg,
    setFocusedField,
    setFormData,
    handleChange,
    handleSubmit,
  }
}

export default useContactViewModel;

export type ContactViewModel = ReturnType<typeof useContactViewModel>;