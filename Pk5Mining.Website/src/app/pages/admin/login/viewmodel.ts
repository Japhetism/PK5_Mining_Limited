import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { ApiError } from "@/app/interfaces";

function useLoginViewModel() {
  const navigate = useNavigate();
  const { login: authLogin, user: authUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect automatically when authUser changes
  useEffect(() => {
    if (!authUser) return;

    if (authUser.hasChangedPassword) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/admin/change/password", { replace: true });
    }
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
  };
}

export default useLoginViewModel;
export type LoginViewModel = ReturnType<typeof useLoginViewModel>;
