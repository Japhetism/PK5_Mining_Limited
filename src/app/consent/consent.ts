import Cookies from "js-cookie";

export type Consent = {
  necessary: true;        // always true
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

const KEY = "site_consent_v1";
const MAX_AGE_DAYS = 180;

export const defaultConsent: Consent = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

export function readConsent(): Consent | null {
  const raw = Cookies.get(KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Consent;
    // basic safety defaults:
    return {
      necessary: true,
      preferences: !!parsed.preferences,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent) {
  Cookies.set(KEY, JSON.stringify(consent), {
    expires: MAX_AGE_DAYS,
    sameSite: "Lax",
    secure: window.location.protocol === "https:",
  });
}

export function clearConsent() {
  Cookies.remove(KEY);
}