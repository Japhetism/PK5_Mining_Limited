import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login as loginApi, loginMock } from "../api/auth";
import { IUser } from "../interfaces";
import { AUTH_KEY } from "../constants";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

type AuthState = {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 On mount: restore persisted auth only
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(AUTH_KEY);
      if (!raw) {
        // No persisted auth → just logout state
        setUser(null);
        return;
      }

      const parsed = JSON.parse(raw) as {
        user: IUser;
        accessToken: string;
      };

      if (!parsed?.accessToken || !parsed?.user) {
        // Corrupt storage → logout
        sessionStorage.removeItem(AUTH_KEY);
        setUser(null);
        return;
      }

      // Restore state
      setUser(parsed.user);
    } catch {
      sessionStorage.removeItem(AUTH_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function login(username: string, password: string) {

    if (useMock) {
      const user = await loginMock({ username, password });
      setUser(user);
      return;
    }

    const user = await loginApi({ username, password }); 
    
    setUser(user);
    
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ user }));
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    setUser(null);
  }

  const value = useMemo<AuthState>(() => {
    return {
      user,
      isLoading,
      login,
      logout,
      isAdmin: (user?.role ?? "").toLowerCase().includes("admin"),
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
