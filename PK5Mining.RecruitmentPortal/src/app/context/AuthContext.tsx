import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { login as loginApi, microsoftLogin, microsoftGraph } from "../api/auth";
import { IUser } from "../interfaces";
import { AUTH_KEY } from "../constants";
import { setAuthToken } from "../api/http";
import { isJwtExpired } from "../utils/jwt";
import { tokenStore } from "../auth/token";
import { authService } from "../services/sso/authService";
import { USERROLES } from "../constants/role";
import { isEmailAuthorized } from "../utils/helper";
import { useTenant } from "@/tenants/useTenant";
import { RolePermission } from "../interfaces/role";
import axios from "axios";

type AuthState = {
  user: IUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isUnauthorized: boolean;
  isServerError: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  retryLogin: () => Promise<void>;
  setUser: (user: IUser | null) => void;
};

const AuthContext = createContext<AuthState | null>(null);

const DEFAULT_INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { emailDomain } = useTenant();
  const [user, setUser] = useState<IUser | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const logoutRef = useRef<() => void>(() => {});

  const INACTIVITY_TIMEOUT_MS =
    Number(import.meta.env.VITE_INACTIVITY_TIMEOUT_MS) ||
    DEFAULT_INACTIVITY_TIMEOUT_MS;

  async function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    const ssoAccount = authService.getAccount();

    if (ssoAccount) {
      try {
        await authService.logout();
      } catch (error) {
        console.error("SSO Logout failed, falling back to manual redirect", error);
        window.location.href = `${window.location.origin}/admin/login`;
      } finally {
        tokenStore.clear();
        setAuthToken(undefined);
        setUser(null);
        setIsUnauthorized(false);
        setIsServerError(false);
      }
    } else {
      tokenStore.clear();
      setAuthToken(undefined);
      setUser(null);
      window.location.href = `${window.location.origin}/admin/login`;
    }
  }

  logoutRef.current = logout;

  const checkSsoHandshake = async () => {
    setIsLoading(true);
    setIsServerError(false);
    setIsUnauthorized(false);

    try {
      const token = tokenStore.get();
      const rawUser = sessionStorage.getItem(AUTH_KEY);

      if (token && rawUser && !isJwtExpired(token)) {
        setAuthToken(token);
        setUser(JSON.parse(rawUser) as IUser);
        return;
      }

      await authService.initialize();
      const ssoAccount = authService.getAccount();

      if (ssoAccount) {
        if (!isEmailAuthorized(ssoAccount.username, emailDomain)) {
          await authService.logout();
          return;
        }
        const msToken = await authService.getToken();
        if (msToken) {
          setAuthToken(msToken);
          tokenStore.set(msToken);
          const backendResponseData = await microsoftLogin();
          console.log("Backend response data:", backendResponseData);
          if (backendResponseData) {
            const finalToken = backendResponseData.token || msToken;
            const permissionNames = backendResponseData.user.role?.permissions?.map(
              (permission) => permission.name,
            );
            const authenticatedUser = {
              ...backendResponseData.user,
              jwtToken: finalToken,
              userPermissions: permissionNames as RolePermission[],
            };

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
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setIsUnauthorized(true);
        } else {
          setIsServerError(true);
        }

        if (!error.response && error.request) {
          setIsServerError(true);
        }
      } else {
        setIsServerError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSsoHandshake();
  }, [emailDomain]);

  const retryLogin = async () => {
    await checkSsoHandshake();
  };

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
        clearTimer();
      } else {
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

    resetTimer();

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true }),
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimer();
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer),
      );
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

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAdmin: user?.role?.name === USERROLES.superAdmin,
      isAuthenticated: !!user,
      isUnauthorized,
      isServerError,
      login,
      logout,
      retryLogin,
      setUser,
    }),
    [user, isLoading, isUnauthorized, isServerError],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};