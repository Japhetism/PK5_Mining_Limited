import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiError, IChangePasswordPayload, } from "@/app/interfaces";
import { changePassword } from "@/app/api/auth";

function useChangePasswordViewModel() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: IChangePasswordPayload) => changePassword(payload),
    onSuccess: () => {
      setLoading(false);
      setSuccessMsg("Password change successfully, login to continue");
    },
    onError: (err) => {
      setLoading(false);

      const message =
        (err as ApiError)?.message ??
        (err instanceof Error ? err.message : undefined) ??
        "An error occurred while logging in. Please try again.";

      setError(message);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      userId: 1,
      username: "",
      oldPassword: currentPassword,
      newPassword: newPassword,
    }

    mutation.mutate(payload);
  };

  return {
    currentPassword,
    confirmPassword,
    newPassword,
    showConfirm,
    showCurrent,
    showNew,
    error,
    loading,
    onSubmit,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    setShowConfirm,
    setShowCurrent,
    setShowNew,
  }
}

export default useChangePasswordViewModel;

export type ChangePasswordViewModel = ReturnType<typeof useChangePasswordViewModel>;
