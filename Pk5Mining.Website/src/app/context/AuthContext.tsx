import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { login as loginApi, microsoftLogin } from "../api/auth"; // Added microsoftLogin
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
        // 1. Check for existing local session (Standard JWT)
        const token = tokenStore.get();
        const rawUser = sessionStorage.getItem(AUTH_KEY);

        if (token && rawUser && !isJwtExpired(token)) {
          setAuthToken(token);
          setUser(JSON.parse(rawUser) as IUser);
          setIsLoading(false);
          return;
        }

        // 2. Handle Microsoft SSO Redirect & Handshake
        // initialize() catches the redirect and sets the active account in MSAL
        await authService.initialize();
        const ssoAccount = authService.getAccount();

        if (ssoAccount) {
          // Get the fresh Microsoft Access Token
          const msToken = await authService.getToken();

          console.log("MS token is ", msToken);

          if (msToken) {
            // CRITICAL: Set the token in your http utility so the handshake
            // call to your backend includes it in the header.
            console.log("ms token ", msToken)
            setAuthToken(msToken);
            tokenStore.set(msToken);

            // 3. Trigger the Backend Handshake
            // This sends the MS token to your /SingleSignOn/microsoft/login
            const backendUser = await microsoftLogin();

            if (backendUser) {
              // If backend returns its own JWT, overwrite the MS token
              const finalToken = backendUser.jwtToken || msToken;

              const authenticatedUser: IUser = {
                ...backendUser,
                jwtToken: finalToken,
              };

              setUser(authenticatedUser);
              sessionStorage.setItem(
                AUTH_KEY,
                JSON.stringify(authenticatedUser),
              );
              tokenStore.set(finalToken);
              setAuthToken(finalToken);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth restore/handshake failed:", error);
        // If handshake fails, clear everything to avoid stale states
        sessionStorage.removeItem(AUTH_KEY);
        tokenStore.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Unauthorized Listener (401 global handler)
  useEffect(() => {
    const handler = () => logoutRef.current();
    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  // Inactivity Timeout Logic
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

  // Standard Manual Login
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
      isAdmin: user?.role === USERROLES.superAdmin, // Derived from user role
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
