import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { ApiError } from "@/app/interfaces";

function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { login: authLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      authLogin(payload.email, payload.password),
    onSuccess: () => {
      setLoading(false);
      navigate("/admin/dashboard", { replace: true });
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

    mutation.mutate({ email, password });
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    onSubmit,
  }
}

export default useLoginViewModel;

export type LoginViewModel = ReturnType<typeof useLoginViewModel>;
