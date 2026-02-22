import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { ApiError } from "@/app/interfaces";

function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { login: authLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = useMemo(() => {
    const from = location?.state?.from?.pathname as string | undefined;
    return from && from.startsWith("/admin") ? from : "/admin";
  }, [location?.state?.from?.pathname]);

  const mutation = useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      authLogin(payload.username, payload.password),
    onSuccess: () => {
      setLoading(false);
      navigate(redirectTo, { replace: true });
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

    mutation.mutate({ username, password });
  };

  return {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    onSubmit,
  }
}

export default useLoginViewModel;

export type LoginViewModel = ReturnType<typeof useLoginViewModel>;
