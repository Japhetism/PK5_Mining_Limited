import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { login as loginApi } from "../api/auth";
import { IUser } from "../interfaces";
import { AUTH_KEY } from "../constants";
import { setAuthToken } from "../api/http";
import { isJwtExpired } from "../utils/jwt";
import { tokenStore } from "../auth/token";

type AuthState = {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

const DEFAULT_INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Keep logout stable for event listeners/timers
  const logoutRef = useRef<() => void>(() => {});

  const INACTIVITY_TIMEOUT_MS = import.meta.env.VITE_INACTIVITY_TIMEOUT_MS ?? DEFAULT_INACTIVITY_TIMEOUT_MS;

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    tokenStore.clear();
    setUser(null);
    setAuthToken(undefined);
  }

  logoutRef.current = logout;

  // Restore persisted auth on app start
  useEffect(() => {
    try {
      const token = tokenStore.get();
      const rawUser = sessionStorage.getItem(AUTH_KEY);

      if (!rawUser || !token || isJwtExpired(token)) {
        logoutRef.current();
        return;
      }

      setAuthToken(token);

      if (rawUser) {
        const parsedUser = JSON.parse(rawUser) as IUser;
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch {
      logoutRef.current();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Listen for 401 unauthorized emitted by axios interceptor
  useEffect(() => {
    const handler = () => logoutRef.current();
    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  // ✅ Inactivity logout (2 mins)
  useEffect(() => {
    let timer: number | undefined;

    const clear = () => {
      if (timer) window.clearTimeout(timer);
      timer = undefined;
    };

    const reset = () => {
      // only track inactivity when authenticated
      const token = tokenStore.get();
      if (!token || isJwtExpired(token)) {
        clear();
        return;
      }

      clear();
      timer = window.setTimeout(() => {
        // re-check before logging out
        const t = tokenStore.get();
        if (t && !isJwtExpired(t)) logoutRef.current();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const onActivity = () => reset();

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    // start once
    reset();

    events.forEach((e) =>
      window.addEventListener(e, onActivity, { passive: true })
    );

    // optional: pause when tab is hidden, resume when visible
    const onVisibility = () => {
      if (document.hidden) clear();
      else reset();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clear();
      events.forEach((e) => window.removeEventListener(e, onActivity));
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  async function login(email: string, password: string) {
    const nextUser = await loginApi({ email, password });

    if (!nextUser?.jwtToken) {
      throw new Error("Login succeeded but no JWT token was returned.");
    }

    if (isJwtExpired(nextUser.jwtToken)) {
      throw new Error("Session token is expired. Please login again.");
    }

    setUser(nextUser as IUser);

    sessionStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    tokenStore.set(nextUser.jwtToken);

    setAuthToken(nextUser.jwtToken);

    // 🔥 reset inactivity timer immediately after login
    window.dispatchEvent(new Event("mousemove"));

  }

  const value = useMemo<AuthState>(() => {
    const token = tokenStore.get();
    const isAuthenticated = !!token && !isJwtExpired(token);

    return {
      user,
      isLoading,
      login,
      logout,
      isAdmin: true,
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