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
  const { openModal } = useLegalModalState();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const location = useLocation();

  const [preferences, setPreferences] = useState<CookiePreferences>({
    functionality: true,
    experience: false,
    measurement: false,
    marketing: false,
  });

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setIsVisible(false);
      return;
    }
    const savedConsent = localStorage.getItem(STORAGE_KEY);
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAdminRoute]);

  const saveConsent = (actionType: CookieConsentPayload["status"], finalPreferences: CookiePreferences) => {
    const consentData: CookieConsentPayload = {
      status: actionType,
      preferences: finalPreferences,
      timestamp: new Date().toISOString(),
      deviceId: localStorage.getItem(DEVICE_ID_KEY) || crypto.randomUUID(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    setIsVisible(false);
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
          /* Anchored to Bottom Right: fixed bottom-6 right-6 */
          className="fixed bottom-6 right-6 w-full max-w-[400px] z-[100] overflow-hidden rounded-xl shadow-2xl border border-gray-200"
        >
          <div className="bg-white text-black font-sans">
            {/* Dark Header */}
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center relative">
              <span className="font-bold text-lg tracking-tight">PK5 Mining</span>
              <button 
                onClick={() => setIsVisible(false)} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-md font-bold text-black mb-2">Cookie settings</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                We use cookies to enhance your experience. Review and manage your preferences below.
              </p>

              {/* Preferences Grid - Adjusted for smaller width */}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {(Object.keys(preferences) as Array<keyof CookiePreferences>).map((key) => (
                  <div key={key} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                    <span className="text-xs font-semibold capitalize text-gray-700">{key}</span>
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

              {/* Buttons */}
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => saveConsent("rejected_all", { functionality: false, experience: false, measurement: false, marketing: false })}
                  className="flex-1 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors"
                >
                  Reject all
                </button>
                <button
                  onClick={() => saveConsent("accepted_all", { functionality: true, experience: true, measurement: true, marketing: true })}
                  className="flex-1 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors"
                >
                  Accept all
                </button>
              </div>
              
              <button
                onClick={() => openModal("privacy")}
                className="w-full py-2 bg-white border border-black text-black text-xs font-bold rounded-full hover:bg-gray-50 transition-colors"
              >
                Learn more
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}