import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { authService } from "@/app/services/sso/authService";
import { ApiError } from "@/app/interfaces";
import { isEmailAuthorized } from "@/app/utils/helper";

function useLoginViewModel() {
  const navigate = useNavigate();
  const { login: authLogin, user: authUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect automatically when authUser changes
  // useEffect(() => {
  //   if (!authUser) return;

  //   if (authUser.hasChangedPassword) {
  //     navigate("/admin/dashboard", { replace: true });
  //   } else {
  //     navigate("/admin/change/password", { replace: true });
  //   }
  // }, [authUser, navigate]);

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

    if (!isEmailAuthorized(email, window.location.hostname)) {
      return setError(
        "Access Denied: Please sign in with an authorized organizational account.",
      );
    }

    setError(null);

    mutation.mutate({ email, password });
  };

  // const handleSSOSignin = async () => {
  //   await authService.initialize();
  //   const result = await authService.login();
  //   if (result) {
  //     console.log("Welcome,", result.account.name);
  //   }
  // };

  const handleSSOSignin = async () => {
    // No need to initialize here; the app-level useEffect handles it
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
