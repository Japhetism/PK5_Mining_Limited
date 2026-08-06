import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { authService } from "@/app/services/sso/authService";
import { ApiError } from "@/app/interfaces";
import { getBestAdminRoute, isEmailAuthorized } from "@/app/utils/helper";
import { tokenStore } from "@/app/auth/token";
import { useTenant } from "@/tenants/useTenant";
import { isValidEmail } from "@/app/utils/validator";

function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { emailDomain } = useTenant();
  const {
    login: authLogin,
    user: authUser,
    isLoading,
    isServerError,
    isUnauthorized,
  } = useAuth();

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
      navigate("/sso", { replace: true });
      return;
    }

    if (isServerError) {
      navigate("/error", { replace: true });
      return;
    }

    if (isUnauthorized) {
      navigate("/unauthorized", { replace: true });
      return;
    }
  }, [isLoading, isServerError, isUnauthorized, navigate]);

  useEffect(() => {
    const hasMsalParams =
      window.location.search.includes("state=") ||
      window.location.hash.includes("state=") ||
      window.location.hash.includes("#");

    if (hasMsalParams) {
      tokenStore.clear();
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  // Redirect automatically when authUser changes
  useEffect(() => {
    if (!authUser) return;

    const redirectTo = getBestAdminRoute(authUser.userPermissions ?? []);
    navigate(`/admin/${redirectTo}`, { replace: true });
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
    if (!isEmailAuthorized(email, emailDomain)) {
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
    setError(null);

    const sanitizedEmail = email.trim();

    if (!sanitizedEmail) return setError("Error: Please enter email address.");

    if (!isValidEmail(sanitizedEmail))
      return setError("Error: Please enter a valid email address.");

    if (!isEmailAuthorized(sanitizedEmail, emailDomain)) {
      return setError(
        "Access Denied: Please sign in with an authorized organizational account.",
      );
    }

    await authService.login(sanitizedEmail);
  };

  const isEmailStep = formType === "emailForm";

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
    handleSSOSigninByEmail,
    setShowPassword,
  };
}

export default useLoginViewModel;
export type LoginViewModel = ReturnType<typeof useLoginViewModel>;
