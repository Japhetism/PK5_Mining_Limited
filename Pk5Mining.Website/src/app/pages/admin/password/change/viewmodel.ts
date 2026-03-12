import { useState } from "react";

function useChangePasswordViewModel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!currentPassword.trim()) {
      nextErrors.currentPassword = "Current password is required";
    }

    if (!newPassword.trim()) {
      nextErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      nextErrors.newPassword = "New password must be at least 8 characters";
    }

    if (!confirmNewPassword.trim()) {
      nextErrors.confirmNewPassword = "Please confirm your new password";
    } else if (newPassword !== confirmNewPassword) {
      nextErrors.confirmNewPassword = "Passwords do not match";
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      nextErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // Replace with your API call
      // await changePassword({
      //   currentPassword,
      //   newPassword,
      //   confirmNewPassword,
      // });

      console.log("Submitting change password payload", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      // Example success handling
      // toastUtil.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setErrors({});
    } catch (error) {
      console.error(error);
      // toastUtil.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return {
    errors,
    currentPassword,
    newPassword,
    confirmNewPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmNewPassword,
    loading,
    onSubmit,
    setCurrentPassword,
    setShowCurrentPassword,
    setNewPassword,
    setShowNewPassword,
    setShowConfirmNewPassword,
    setConfirmNewPassword,
    setErrors,
  };
}

export default useChangePasswordViewModel;

export type ChangePasswordViewModel = ReturnType<
  typeof useChangePasswordViewModel
>;
