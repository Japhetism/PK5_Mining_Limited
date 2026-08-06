import { useEffect } from "react"; 
import { motion } from "framer-motion";
import { AlertTriangle, LogOut, Mail, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";

export function Error() {
  const { colors } = useTenant();
  const { isLoading, isServerError, retryLogin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isServerError) {
      history.back();
    }
  }, [isServerError, isLoading, navigate]);

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center px-6"
      style={{ backgroundColor: colors.outletBgColor }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl rounded-xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
        style={{ backgroundColor: colors.card }}
      >
        <div className="flex items-center gap-4 border-b border-black/5 pb-6 mb-6">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <span className="text-[16px] font-mono tracking-widest uppercase font-bold text-red-400">
              System Status: 500 Error
            </span>
            <h1 className="text-[18px] font-bold tracking-tight" style={{ color: colors.text }}>
              Internal Server Error
            </h1>
          </div>
        </div>

        <div className="space-y-4 text-[16px] leading-relaxed mb-8" style={{ color: colors.text }}>
          <p>
            Something went wrong on our end while processing your authorization. The corporate database is currently unreachable or experiencing an unexpected outage.
          </p>
          <p>
            This issue is typically temporary. You can safely drop your current active session and try logging back into the portal securely.
          </p>
        </div>

        <div className="rounded-xl p-5 mb-8 space-y-4" style={{ backgroundColor: colors.innerCard }}>
          <h3 className="text-[16px] font-bold uppercase tracking-wider" style={{ color: colors.text }}>
            Recommended Steps
          </h3>

          <div className="flex gap-3 items-start">
            <RefreshCw className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[15px] font-semibold text-gray-200" style={{ color: colors.text }}>
                Attempt Session Recovery
              </p>
              <p className="text-[14px] mt-0.5" style={{ color: colors.text }}>
                Click "Retry Login" below to see if connection handshakes can be safely re-established with your organization's backend profile.
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-black/5 w-full" />

          <div className="flex gap-3 items-start">
            <Mail className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[15px] font-semibold text-gray-200" style={{ color: colors.text }}>
                Report Infrastructure Downtime
              </p>
              <p className="text-[14px] mt-0.5" style={{ color: colors.text }}>
                If this error persists across multiple login attempts, please alert the IT Infrastructure team regarding localized service drops.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <motion.button
            type="button"
            whileHover={!isLoading ? { scale: 1.01 } : undefined}
            whileTap={!isLoading ? { scale: 0.99 } : undefined}
            className="w-full sm:w-1/2 px-6 py-3 bg-red-600 text-[16px] text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            onClick={retryLogin}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4" />
            Retry Login
          </motion.button>

          <motion.button
            type="button"
            whileHover={!isLoading ? { scale: 1.01 } : undefined}
            whileTap={!isLoading ? { scale: 0.99 } : undefined}
            className="w-full sm:w-1/2 px-6 py-3 bg-transparent text-[16px] font-bold rounded-lg border transition-colors flex items-center justify-center gap-2"
            style={{ borderColor: colors.accent, color: colors.text }}
            onClick={logout}
            disabled={isLoading}
          >
            <LogOut className="w-4 h-4" style={{ color: colors.text }} />
            {isLoading ? "Clearing Session..." : "Log Out"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}