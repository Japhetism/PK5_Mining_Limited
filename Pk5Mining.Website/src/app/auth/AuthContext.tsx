import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as loginApi, me as meApi } from "../api/auth";
import { setAuthToken } from "../api/http";
import { IUser } from "../interfaces";

type AuthState = {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

const TOKEN_KEY = "access_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setAuthToken(token ?? undefined);
  }, [token]);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setIsLoading(true);
      try {
        if (!token) {
          if (!cancelled) setUser(null);
          return;
        }
        const u = await meApi();
        if (!cancelled) setUser(u);
      } catch {
        // token invalid
        localStorage.removeItem(TOKEN_KEY);
        if (!cancelled) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function login(email: string, password: string) {
    const { accessToken } = await loginApi({ email, password });
    localStorage.setItem(TOKEN_KEY, accessToken);
    setToken(accessToken);
    // user will be fetched by boot effect, but we can fetch immediately:
    const u = await meApi();
    setUser(u);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setAuthToken(undefined);
  }

  const value = useMemo<AuthState>(() => {
    return {
      user,
      token,
      isLoading,
      login,
      logout,
      isAdmin: user?.role === "admin",
    };
  }, [user, token, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
