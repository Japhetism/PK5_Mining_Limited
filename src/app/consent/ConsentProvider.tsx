import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Consent, defaultConsent, readConsent, writeConsent } from "./consent";

type ConsentContextValue = {
  consent: Consent | null; // null means "not chosen yet"
  setConsent: (c: Consent) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openManager: () => void;
  closeManager: () => void;
  isManagerOpen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsentState(stored); // null if not found
  }, []);

  const setConsent = (c: Consent) => {
    setConsentState(c);
    writeConsent(c);
  };

  const acceptAll = () =>
    setConsent({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });

  const rejectAll = () =>
    setConsent({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });

  const openManager = () => setIsManagerOpen(true);
  const closeManager = () => setIsManagerOpen(false);

  const value = useMemo(
    () => ({ consent, setConsent, acceptAll, rejectAll, openManager, closeManager, isManagerOpen }),
    [consent, isManagerOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}