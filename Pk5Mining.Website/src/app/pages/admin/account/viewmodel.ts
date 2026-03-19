import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/app/api/auth";
import { useAuth } from "@/app/context/AuthContext";
import { ApiError } from "@/app/interfaces";
import { IChangePasswordPayload } from "@/app/interfaces/user";
import { toastUtil } from "@/app/utils/toast";

function useAccountViewModel() {
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: IChangePasswordPayload) => changePassword(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setNewPassword("");
      setConfirmNewPassword("");
      toastUtil.success("Password changed successfully.");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred. Please try again.");

      toastUtil.error(message);
    },
    onSettled: () => setLoading(false),
  });

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!newPassword.trim()) {
      nextErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      nextErrors.newPassword = "New password must be at least 8 characters";
    }

    if (!confirmNewPassword.trim()) {
      nextErrors.confirmNewPassword = "Please confirm your new password";
    } else if (newPassword !== confirmNewPassword) {
      nextErrors.confirmNewPassword =
        "Confirm password and new password does not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    if (newPassword !== confirmNewPassword) {
      toastUtil.error("Password and confirm password do not match");
      return;
    }

    if (!user?.id) {
      toastUtil.error("Invalid user. Please login again.");
      return;
    }

    mutation.mutate({ userId: user.id, newPassword });
  };

  return {
    user,
    errors,
    newPassword,
    confirmNewPassword,
    showNewPassword,
    showConfirmNewPassword,
    loading,
    onSubmit,
    setNewPassword,
    setShowNewPassword,
    setShowConfirmNewPassword,
    setConfirmNewPassword,
    setErrors,
  };
}

export default useAccountViewModel;

export type AccountViewModel = ReturnType<typeof useAccountViewModel>;
