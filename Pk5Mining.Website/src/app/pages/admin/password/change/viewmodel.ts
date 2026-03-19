import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { changePassword } from "@/app/api/auth";
import { ApiError } from "@/app/interfaces";
import { IChangePasswordPayload } from "@/app/interfaces/user";

function useResetPasswordViewModel() {
  const navigate = useNavigate();
  const { user: authUser, setUser: setAuthUser } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect based on user state
  useEffect(() => {
    if (!authUser) {
      navigate("/admin/login");
      return;
    }
    if (authUser.hasChangedPassword) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [authUser, navigate]);

  const mutation = useMutation({
    mutationFn: (payload: IChangePasswordPayload) => changePassword(payload),
    onMutate: () => {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
    },
    onSuccess: () => {
      setSuccessMsg("Password changed successfully. Login to continue.");
      setAuthUser({ ...authUser!, hasChangedPassword: true });
      navigate("/admin/dashboard", { replace: true });
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error ? err.message : "An error occurred. Please try again.");
      setError(message);
    },
    onSettled: () => setLoading(false),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }

    if (!authUser?.id) {
      setError("Invalid user. Please login again.");
      return;
    }

    mutation.mutate({ userId: authUser.id, newPassword });
  };

  return {
    newPassword,
    confirmPassword,
    showNew,
    showConfirm,
    error,
    successMsg,
    loading,
    setNewPassword,
    setConfirmPassword,
    setShowNew,
    setShowConfirm,
    onSubmit,
  };
}

export default useResetPasswordViewModel;
export type ResetPasswordViewModel = ReturnType<typeof useResetPasswordViewModel>;