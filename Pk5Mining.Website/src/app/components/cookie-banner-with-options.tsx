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

  // 1. Initial Check for first-time visitors
  useEffect(() => {
    if (isAdminRoute) return;

    const savedConsent = localStorage.getItem(STORAGE_KEY);
    if (!savedConsent) {
      const timer = setTimeout(() => setHasConsented(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAdminRoute]);

  const isVisible = (!hasConsented && !isAdminRoute) || isCookiesModalOpen;

  // 2. NEW: Sync state with localStorage when the banner/modal opens
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-6 right-6 w-full max-w-[400px] z-[100] overflow-hidden rounded-xl shadow-2xl border border-gray-200"
        >
          <div className="bg-white text-black font-sans">
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center relative">
              <span className="font-bold text-lg tracking-tight">
                PK5 Mining
              </span>
              <button
                onClick={() => {
                  setHasConsented(true);
                  closeModal("cookies");
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-md font-bold text-black mb-2">
                Cookie settings
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
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

              <div className="grid grid-cols-1 gap-2 mb-6">
                {(
                  Object.keys(preferences) as Array<keyof CookiePreferences>
                ).map((key) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-3 border border-gray-100 rounded-lg"
                  >
                    <span className="text-xs font-semibold capitalize text-gray-700">
                      {key}
                    </span>
                    <button
                      onClick={() => togglePreference(key)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ${
                        preferences[key] ? "bg-black" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ${
                          preferences[key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mb-3">
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleSave("rejected_all", {
                        functionality: false,
                        experience: false,
                        measurement: false,
                        marketing: false,
                      })
                    }
                    className="flex-1 py-2.5 bg-white border border-black text-black text-xs font-bold rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Reject all
                  </button>
                  <button
                    onClick={() => handleSave("custom_preferences")}
                    className="flex-1 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors"
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
                  className="w-full py-2 mt-3 bg-gray-100 text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors"
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
