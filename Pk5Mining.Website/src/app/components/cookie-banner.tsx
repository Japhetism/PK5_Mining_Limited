import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLegalModalState } from "../hooks/useLegalModalState";

interface CookieConsent {
  status: "accepted" | "declined";
  timestamp: string;
  deviceId: string;
}

const STORAGE_KEY = "pk5_cookie_consent";
const DEVICE_ID_KEY = "pk5_device_id";

export function CookieBanner() {
  const { openModal } = useLegalModalState();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setIsVisible(false);
      return;
    }

    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, [isAdminRoute]);

  const getOrCreateDeviceId = (): string => {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  };

  const handleConsent = (status: "accepted" | "declined"): void => {
    const consentData: CookieConsent = {
      status,
      timestamp: new Date().toISOString(),
      deviceId: getOrCreateDeviceId(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    setIsVisible(false);
  };

  if (isAdminRoute) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:max-w-md z-[100]"
        >
          <div className="bg-[#0f0f0f] border border-gray-800 p-6 rounded-xl shadow-2xl shadow-black/50">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#c89b3c]/10 rounded-lg">
                <Cookie className="w-5 h-5 text-[#c89b3c]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-200">
                  Cookie Preference
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  PK5 Mining uses cookies to enhance your experience and analyze
                  site traffic. By clicking "Accept", you agree to our use of
                  cookies as described in our
                  <span
                    className="text-[#c89b3c] cursor-pointer hover:underline ml-1"
                    onClick={() => openModal("privacy")}
                  >
                    Privacy Policy
                  </span>
                  .
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleConsent("accepted")}
                    className="flex-1 py-2 bg-[#c89b3c] text-black text-xs font-bold rounded-md hover:bg-[#d4a84a] transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => handleConsent("declined")}
                    className="flex-1 py-2 bg-transparent border border-gray-700 text-gray-300 text-xs font-bold rounded-md hover:bg-white/5 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
