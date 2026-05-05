import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLegalModalState } from "../hooks/useLegalModalState";

interface CookiePreferences {
  functionality: boolean;
  experience: boolean;
  measurement: boolean;
  marketing: boolean;
}

interface CookieConsentPayload {
  status: "accepted_all" | "rejected_all" | "custom_preferences";
  preferences: CookiePreferences;
  timestamp: string;
  deviceId: string;
}

const STORAGE_KEY = "pk5_cookie_consent_preferences";
const DEVICE_ID_KEY = "pk5_device_id";

export function CookieBannerWithOptions() {
  const { isCookiesModalOpen, openModal, closeModal } = useLegalModalState();
  const location = useLocation();

  const [hasConsented, setHasConsented] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    functionality: false,
    experience: false,
    measurement: false,
    marketing: false,
  });

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;
    const savedConsent = localStorage.getItem(STORAGE_KEY);
    if (!savedConsent) {
      const timer = setTimeout(() => setHasConsented(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAdminRoute]);

  const isVisible = (!hasConsented && !isAdminRoute) || isCookiesModalOpen;

  useEffect(() => {
    if (isVisible) {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData) as CookieConsentPayload;
          if (parsed.preferences) {
            setPreferences(parsed.preferences);
          }
        } catch (error) {
          console.error("Error parsing saved cookie preferences:", error);
        }
      }
    }
  }, [isVisible]);

  const handleSave = (
    actionType: CookieConsentPayload["status"],
    overrides?: Partial<CookiePreferences>,
  ) => {
    const finalPreferences = overrides
      ? { ...preferences, ...overrides }
      : preferences;

    const consentData: CookieConsentPayload = {
      status: actionType,
      preferences: finalPreferences,
      timestamp: new Date().toISOString(),
      deviceId: localStorage.getItem(DEVICE_ID_KEY) || crypto.randomUUID(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    setHasConsented(true);
    closeModal("cookies");
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (isAdminRoute) return null;

  // Responsive Variants: Slide from bottom on mobile (y), from right on desktop (x)
  const variants = {
    initial: { y: 100, x: 0, opacity: 0, scale: 0.95 },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 200 },
    },
    exit: { y: 100, opacity: 0, scale: 0.95 },
    // Override for desktop
    desktop: {
      initial: { x: 400, y: 0, opacity: 0 },
      animate: { x: 0, y: 0, opacity: 1 },
      exit: { x: 400, opacity: 0 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          /* 
             Responsiveness strategy:
             - Mobile: fixed bottom-0 left-0 (full width) with some padding
             - Desktop (sm:): bottom-6 right-6 max-w-[400px]
          */
          className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto w-full sm:max-w-[400px] z-[100] overflow-hidden sm:rounded-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] sm:shadow-2xl border-t sm:border border-gray-200"
        >
          <div className="bg-white text-black font-sans pb-safe sm:pb-0">
            <div className="bg-black text-white px-5 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative">
              <span className="font-bold text-base sm:text-lg tracking-tight">
                PK5 Mining
              </span>
              <button
                onClick={() => {
                  setHasConsented(true);
                  closeModal("cookies");
                }}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="text-sm sm:text-md font-bold text-black mb-2">
                Cookie settings
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed mb-5 sm:mb-6">
                PK5 Mining uses cookies to enhance your experience and analyze
                site traffic. By clicking "Accept", you agree to our use of
                cookies as described in our{" "}
                <span
                  className="text-black font-bold underline cursor-pointer"
                  onClick={() => openModal("privacy")}
                >
                  Privacy Policy
                </span>
                .
              </p>

              {/* Grid: 2 columns on slightly larger mobile screens, 1 column on small */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 gap-2 mb-6">
                {(
                  Object.keys(preferences) as Array<keyof CookiePreferences>
                ).map((key) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-2.5 sm:p-3 border border-gray-100 rounded-lg bg-gray-50/50"
                  >
                    <span className="text-[10px] sm:text-xs font-semibold capitalize text-gray-700">
                      {key}
                    </span>
                    <button
                      onClick={() => togglePreference(key)}
                      className={`relative inline-flex h-4 w-8 sm:h-5 sm:w-10 items-center rounded-full transition-colors duration-200 ${
                        preferences[key] ? "bg-black" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 transform rounded-full bg-white transition duration-200 ${
                          preferences[key]
                            ? "translate-x-4 sm:translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() =>
                      handleSave("rejected_all", {
                        functionality: false,
                        experience: false,
                        measurement: false,
                        marketing: false,
                      })
                    }
                    className="flex-1 py-2 sm:py-2.5 bg-white border border-black text-[10px] sm:text-xs font-bold rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Reject all
                  </button>
                  <button
                    onClick={() => handleSave("custom_preferences")}
                    className="flex-1 py-2 sm:py-2.5 bg-black text-white text-[10px] sm:text-xs font-bold rounded-full hover:bg-gray-800 active:scale-95 transition-all"
                  >
                    Accept Selection
                  </button>
                </div>

                <button
                  onClick={() =>
                    handleSave("accepted_all", {
                      functionality: true,
                      experience: true,
                      measurement: true,
                      marketing: true,
                    })
                  }
                  className="w-full py-2.5 sm:py-2 mt-1 bg-gray-100 text-black text-[10px] sm:text-xs font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                  Accept all cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
