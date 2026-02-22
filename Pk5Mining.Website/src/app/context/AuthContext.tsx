import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login as loginApi } from "../api/auth";
import { IUser } from "../interfaces";
import { AUTH_KEY } from "../constants";
import { setAuthToken } from "../api/http";
import { tokenStore } from "../auth/token";

type AuthState = {
  user: IUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore persisted auth on app start (sessionStorage)
  useEffect(() => {
    try {
      const rawUser = sessionStorage.getItem(AUTH_KEY);
      const token = tokenStore.get(); // tokenStore should also use sessionStorage now

      if (!rawUser || !token) {
        // Incomplete auth state -> clear both
        sessionStorage.removeItem(AUTH_KEY);
        tokenStore.clear();
        setUser(null);
        setAuthToken(undefined);
        return;
      }

      const parsedUser = JSON.parse(rawUser) as IUser;

      // Minimal validation
      if (!parsedUser?.id || !parsedUser?.username) {
        sessionStorage.removeItem(AUTH_KEY);
        tokenStore.clear();
        setUser(null);
        setAuthToken(undefined);
        return;
      }

      setUser(parsedUser);
      setAuthToken(token);
    } catch {
      sessionStorage.removeItem(AUTH_KEY);
      tokenStore.clear();
      setUser(null);
      setAuthToken(undefined);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function login(username: string, password: string) {
    // backend returns IUser directly (includes jwtToken)
    const nextUser = await loginApi({ username, password });

    if (!nextUser?.jwtToken) {
      throw new Error("Login succeeded but no JWT token was returned.");
    }

    setUser(nextUser);

    // Persist BOTH user + token in sessionStorage
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    tokenStore.set(nextUser.jwtToken);

    // Set axios header immediately
    setAuthToken(nextUser.jwtToken);
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    tokenStore.clear();
    setUser(null);
    setAuthToken(undefined);
  }

  const value = useMemo<AuthState>(() => {
    return {
      user,
      isLoading,
      login,
      logout,
      isAdmin: true,
      isAuthenticated: !!user && !!tokenStore.get(),
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}