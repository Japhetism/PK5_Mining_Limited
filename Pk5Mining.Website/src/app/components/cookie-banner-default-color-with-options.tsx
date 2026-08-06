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

const STORAGE_KEY = "pk5_cookie_consent_preferences";

export function CookieBannerDefaultColorWithOptions() {
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

  const handleAction = (status: "accepted" | "declined" | "custom") => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      status,
      preferences,
      timestamp: new Date().toISOString()
    }));
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
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 w-[calc(100%-3rem)] max-w-[380px] z-[100] overflow-hidden rounded-xl shadow-2xl border border-gray-800"
        >
          <div className="bg-[#0f0f0f] text-gray-200 font-sans">
            {/* Header with your Brand Gold accent bar */}
            <div className="bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center relative">
              <span className="font-bold text-lg tracking-tight text-[#c89b3c]">PK5 Mining</span>
              <button 
                onClick={() => setIsVisible(false)} 
                className="text-gray-500 hover:text-[#c89b3c] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-md font-bold text-white mb-2">Cookie settings</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                We use cookies to enhance your experience. Review and manage your preferences below.
              </p>

              {/* Preferences Grid */}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {(Object.keys(preferences) as Array<keyof CookiePreferences>).map((key) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-xs font-semibold capitalize text-gray-300">{key}</span>
                    <button
                      onClick={() => togglePreference(key)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ${
                        preferences[key] ? "bg-[#c89b3c]" : "bg-gray-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-black transition duration-200 ${
                          preferences[key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Buttons using your Default Gold */}
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => handleAction("declined")}
                  className="flex-1 py-2.5 bg-transparent border border-gray-700 text-gray-300 text-xs font-bold rounded-full hover:bg-white/5 transition-colors"
                >
                  Reject all
                </button>
                <button
                  onClick={() => handleAction("accepted")}
                  className="flex-1 py-2.5 bg-[#c89b3c] text-black text-xs font-bold rounded-full hover:bg-[#d4a84a] transition-colors"
                >
                  Accept all
                </button>
              </div>
              
              <button
                onClick={() => openModal("privacy")}
                className="w-full py-2 bg-transparent text-[#c89b3c] text-xs font-bold rounded-full hover:underline transition-colors"
              >
                Privacy Policy & Learn more
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}