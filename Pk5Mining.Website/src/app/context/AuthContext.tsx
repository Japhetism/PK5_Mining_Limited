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
import { isJwtExpired } from "../utils/jwt"; // uses jwt-decode
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
      const token = tokenStore.get();
      const rawUser = sessionStorage.getItem(AUTH_KEY);

      // If token missing OR expired -> clear auth
      if (!token || isJwtExpired(token)) {
        tokenStore.clear();
        sessionStorage.removeItem(AUTH_KEY);
        setUser(null);
        setAuthToken(undefined);
        return;
      }

      // Token is valid -> set auth header
      setAuthToken(token);

      // Restore user if available (optional but useful for UI)
      if (rawUser) {
        const parsedUser = JSON.parse(rawUser) as IUser;
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch {
      tokenStore.clear();
      sessionStorage.removeItem(AUTH_KEY);
      setUser(null);
      setAuthToken(undefined);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function login(username: string, password: string) {
    const nextUser = await loginApi({ username, password }); // returns IUser with jwtToken

    if (!nextUser?.jwtToken) {
      throw new Error("Login succeeded but no JWT token was returned.");
    }

    // If backend ever returns an already-expired token, handle it safely
    if (isJwtExpired(nextUser.jwtToken)) {
      throw new Error("Session token is expired. Please login again.");
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
    const token = tokenStore.get();
    const isAuthenticated = !!token && !isJwtExpired(token);

    return {
      user,
      isLoading,
      login,
      logout,
      isAdmin: true, // replace with role-based check when available
      isAuthenticated,
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}