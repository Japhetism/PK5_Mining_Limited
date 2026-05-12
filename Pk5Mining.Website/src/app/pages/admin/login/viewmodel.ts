import { useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { authService } from "@/app/services/sso/authService";
import { ApiError } from "@/app/interfaces";
import { isEmailAuthorized, shouldChangePassword } from "@/app/utils/helper";
import { tokenStore } from "@/app/auth/token";

function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin, user: authUser, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState<"emailForm" | "passwordForm">(
    "emailForm",
  );

  useEffect(() => {
    if (isLoading) {
      navigate("/admin/sso", { replace: true });
    }
  }, [isLoading]);

  useEffect(() => {
    const hasMsalParams =
      window.location.search.includes("state=") ||
      window.location.hash.includes("state=") ||
      window.location.hash.includes("#");

    if (hasMsalParams) {
      tokenStore.clear();
      navigate("/admin/login", { replace: true });
    }
  }, [location, navigate]);

  // Redirect automatically when authUser changes
  useEffect(() => {
    if (!authUser) return;

    // const changePassword = authUser.hasChangedPassword && !(authUser.email && shouldChangePassword(authUser.email, window.location.hostname));

    // if (!changePassword) {
    //   navigate("/admin/dashboard", { replace: true });
    // } else {
    //   navigate("/admin/change/password", { replace: true });
    // }
    navigate("/admin/dashboard", { replace: true });
  }, [authUser, navigate]);

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      authLogin(payload.email, payload.password),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while logging in. Please try again.");
      setError(message);
    },
    onSettled: () => setLoading(false),
  });

  const onSubmit = () => {
    if (!isEmailAuthorized(email, window.location.hostname)) {
      return setError(
        "Access Denied: Please sign in with an authorized organizational account.",
      );
    }

    setError(null);

    mutation.mutate({ email, password });
  };

  const handleSSOSignin = async () => {
    await authService.login();
  };

  const handleSSOSigninByEmail = async () => {
    if (!isEmailAuthorized(email, window.location.hostname)) {
      return setError(
        "Access Denied: Please sign in with an authorized organizational account.",
      );
    }

    if (email.trim()) {
      await authService.login(email);
    }
  };

  const handleContinue = () => {
    const domain = email.split("@")[1];

    if (domain !== "pk5miningltd.com") {
      setFormType("passwordForm");
    } else {
      handleSSOSigninByEmail();
    }
  };

  const isEmailStep = formType === "emailForm";

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    isEmailStep ? handleContinue() : onSubmit();
  };

  return {
    email,
    password,
    error,
    loading,
    formType,
    showPassword,
    isEmailStep,
    setFormType,
    setEmail,
    setPassword,
    onSubmit,
    handleSSOSignin,
    handleContinue,
    handleFormSubmit,
    setShowPassword,
  };
}

export default useLoginViewModel;
export type LoginViewModel = ReturnType<typeof useLoginViewModel>;
