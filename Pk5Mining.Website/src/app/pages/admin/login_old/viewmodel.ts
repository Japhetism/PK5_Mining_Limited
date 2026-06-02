import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { authService } from "@/app/services/sso/authService";
import { ApiError } from "@/app/interfaces";
import { isEmailAuthorized } from "@/app/utils/helper";
import { useTenant } from "@/tenants/useTenant";

function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { emailDomain } = useTenant();
  const { login: authLogin, user: authUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasMsalParams = 
      window.location.search.includes("state=") || 
      window.location.hash.includes("state=") ||
      window.location.hash.includes("#");

    if (hasMsalParams) {
      navigate("/admin/login", { replace: true });
    }
  }, [location, navigate]);

  // Redirect automatically when authUser changes
  useEffect(() => {
    if (!authUser) return;

    // if (authUser.hasChangedPassword) {
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    onSubmit,
    handleSSOSignin,
  };
}

export default useLoginViewModel;
export type LoginViewModel = ReturnType<typeof useLoginViewModel>;
