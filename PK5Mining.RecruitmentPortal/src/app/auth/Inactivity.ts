import { tokenStore } from "./token";
import { setAuthToken } from "../api/http"; // <- adjust path to where your setAuthToken lives

type Options = {
  timeoutMs?: number; // default 2 mins
  events?: (keyof WindowEventMap)[];
  onlyWhenAuthenticated?: boolean; // default true
};

let timer: number | undefined;

function clearTimer() {
  if (timer) window.clearTimeout(timer);
  timer = undefined;
}

function doLogout() {
  tokenStore.clear();
  setAuthToken(undefined);

  // Let your app (AuthContext) handle logout + navigation
  window.dispatchEvent(new Event("unauthorized"));

  // Optional fallback redirect (keep or remove)
  // window.location.href = "/login";
}

export function startInactivityLogout(opts: Options = {}) {
  const {
    timeoutMs = 2 * 60 * 1000, // 2 mins
    events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"],
    onlyWhenAuthenticated = true,
  } = opts;

  const reset = () => {
    if (onlyWhenAuthenticated && !tokenStore.get()) return;

    clearTimer();
    timer = window.setTimeout(() => {
      // double-check token still exists before logging out
      if (!onlyWhenAuthenticated || tokenStore.get()) doLogout();
    }, timeoutMs);
  };

  const onActivity = () => reset();

  // Start immediately
  reset();

  // Listen for activity
  events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

  // Also pause timer when tab is hidden (optional but nice)
  const onVisibility = () => {
    if (document.hidden) clearTimer();
    else reset();
  };
  document.addEventListener("visibilitychange", onVisibility);

  // Return cleanup
  return () => {
    clearTimer();
    events.forEach((e) => window.removeEventListener(e, onActivity));
    document.removeEventListener("visibilitychange", onVisibility);
  };
}