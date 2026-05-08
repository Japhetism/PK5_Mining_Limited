import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { login as loginApi, microsoftLogin } from "../api/auth";
import { IUser } from "../interfaces";
import { AUTH_KEY } from "../constants";
import { setAuthToken } from "../api/http";
import { isJwtExpired } from "../utils/jwt";
import { tokenStore } from "../auth/token";
import { authService } from "../services/sso/authService";
import { USERROLES } from "../constants/role";

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

const DEFAULT_INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 Minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const logoutRef = useRef<() => void>(() => {});

  const INACTIVITY_TIMEOUT_MS =
    Number(import.meta.env.VITE_INACTIVITY_TIMEOUT_MS) || DEFAULT_INACTIVITY_TIMEOUT_MS;

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    tokenStore.clear();
    setAuthToken(undefined);

    const ssoAccount = authService.getAccount();
    if (ssoAccount) {
      authService.logout();
    }

    setUser(null);
    window.location.href = `${window.location.origin}/admin/login`;
  }

  logoutRef.current = logout;

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = tokenStore.get();
        const rawUser = sessionStorage.getItem(AUTH_KEY);

        // Standard Session Restore
        if (token && rawUser && !isJwtExpired(token)) {
          setAuthToken(token);
          setUser(JSON.parse(rawUser) as IUser);
          setIsLoading(false);
          return;
        }

        // Microsoft SSO Handshake
        await authService.initialize();
        const ssoAccount = authService.getAccount();

        if (ssoAccount) {
          const msToken = await authService.getToken();
          if (msToken) {
            setAuthToken(msToken);
            tokenStore.set(msToken);

            const backendUser = await microsoftLogin();
            if (backendUser) {
              const finalToken = backendUser.jwtToken || msToken;
              const authenticatedUser = { ...backendUser, jwtToken: finalToken };
              
              setUser(authenticatedUser);
              sessionStorage.setItem(AUTH_KEY, JSON.stringify(authenticatedUser));
              tokenStore.set(finalToken);
              setAuthToken(finalToken);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Auth Initialization Failed:", error);
        logoutRef.current();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    let timer: number | undefined;

    const clearTimer = () => {
      if (timer) window.clearTimeout(timer);
      timer = undefined;
    };

    const resetTimer = () => {
      if (!user) {
        clearTimer();
        return;
      }
      clearTimer();
      timer = window.setTimeout(() => {
        console.warn("Session timed out due to inactivity.");
        logoutRef.current();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Stop timer when user leaves the tab
        clearTimer();
      } else {
        // User is back: verify session still exists in storage (cross-tab sync)
        const sessionActive = !!sessionStorage.getItem(AUTH_KEY);
        if (!sessionActive && user) {
          logoutRef.current();
        } else {
          resetTimer();
        }
      }
    };

    const activityEvents: (keyof WindowEventMap)[] = [
      "mousemove", "mousedown", "keydown", "touchstart", "scroll"
    ];

    // Initialize
    resetTimer();

    // Listeners
    activityEvents.forEach(event => 
      window.addEventListener(event, resetTimer, { passive: true })
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimer();
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user, INACTIVITY_TIMEOUT_MS]);

  useEffect(() => {
    const handler = () => logoutRef.current();
    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  async function login(email: string, password: string) {
    const nextUser = await loginApi({ email, password });
    if (!nextUser?.jwtToken) throw new Error("Authentication failed: No token");

    setUser(nextUser as IUser);
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    tokenStore.set(nextUser.jwtToken);
    setAuthToken(nextUser.jwtToken);
  }

  const contextValue = useMemo(() => ({
    user,
    isLoading,
    isAdmin: user?.role === USERROLES.superAdmin,
    isAuthenticated: !!user,
    login,
    logout,
    setUser,
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};