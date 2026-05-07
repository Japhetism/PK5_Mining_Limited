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
import { authService } from "../services/sso/authService";
import { USERROLES } from "../constants/role";
import { jwt } from "zod";

type AuthState = {
  user: IUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: IUser | null) => void;
};

const AuthContext = createContext<AuthState | null>(null);

const DEFAULT_INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logoutRef = useRef<() => void>(() => {});

  const INACTIVITY_TIMEOUT_MS =
    import.meta.env.VITE_INACTIVITY_TIMEOUT_MS ?? DEFAULT_INACTIVITY_TIMEOUT_MS;

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    tokenStore.clear();
    setAuthToken(undefined);

    const ssoAccount = authService.getAccount();
    if (ssoAccount) {
      authService.logout();
    }

    setUser(null);

    const cleanLoginUrl = `${window.location.origin}/admin/login`;
    window.location.href = cleanLoginUrl;
  }

  logoutRef.current = logout;

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = tokenStore.get();
        const rawUser = sessionStorage.getItem(AUTH_KEY);

        if (token && rawUser && !isJwtExpired(token)) {
          setAuthToken(token);
          setUser(JSON.parse(rawUser) as IUser);
          return;
        }

        const ssoAccount = authService.getAccount();
        if (ssoAccount) {
          const nameArray = ssoAccount.name ? ssoAccount.name.split(" ") : null;
          const mappedUser: IUser = {
            id: ssoAccount.localAccountId,
            username: ssoAccount.username,
            firstName: nameArray?.[0] || "",
            lastName: nameArray?.[1] || "",
            email: ssoAccount.username,
            role: USERROLES.superAdmin,
            jwtToken: ssoAccount.idToken || "",
            hasChangedPassword: true,
          };
          setUser(mappedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth restore failed:", error);
        logoutRef.current();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    const handler = () => logoutRef.current();
    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  useEffect(() => {
    let timer: number | undefined;

    const clear = () => {
      if (timer) window.clearTimeout(timer);
      timer = undefined;
    };

    const reset = () => {
      if (!user) {
        clear();
        return;
      }

      clear();
      timer = window.setTimeout(() => {
        logoutRef.current();
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

    reset();

    events.forEach((e) =>
      window.addEventListener(e, onActivity, { passive: true }),
    );

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
  }, [user, INACTIVITY_TIMEOUT_MS]);

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

    window.dispatchEvent(new Event("mousemove"));
  }

  const value = useMemo<AuthState>(() => {
    return {
      user,
      isLoading,
      isAdmin: true,
      isAuthenticated: !!user,
      login,
      logout,
      setUser,
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}