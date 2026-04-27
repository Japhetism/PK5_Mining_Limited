import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { useLegalModalState } from "../hooks/useLegalModalState";

export function CookieBanner() {
  const { openModal } = useLegalModalState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("pk5_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("pk5_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("pk5_cookie_consent", "declined");
    setIsVisible(false);
  };

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
                  <span className="text-[#c89b3c] cursor-pointer hover:underline ml-1 cursor-pointer" onClick={() => openModal("privacy")}>
                    Privacy Policy
                  </span>
                  .
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={acceptCookies}
                    className="flex-1 py-2 bg-[#c89b3c] text-black text-xs font-bold rounded-md hover:bg-[#d4a84a] transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={declineCookies}
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
