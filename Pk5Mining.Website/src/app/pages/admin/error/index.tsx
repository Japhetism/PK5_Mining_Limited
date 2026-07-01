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
      style={{ backgroundColor: colors.bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl border border-gray-800 rounded-xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
        style={{ backgroundColor: colors.card }}
      >
        <div className="flex items-center gap-4 border-b border-gray-800 pb-6 mb-6">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border bg-red-500/10 border-red-500/30">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-red-400">
              System Status: 500 Error
            </span>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: colors.text }}>
              Internal Server Error
            </h1>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-400 leading-relaxed mb-8">
          <p>
            Something went wrong on our end while processing your authorization. The corporate database is currently unreachable or experiencing an unexpected outage.
          </p>
          <p>
            This issue is typically temporary. You can safely drop your current active session and try logging back into the portal securely.
          </p>
        </div>

        <div className="bg-black/20 border border-gray-800 rounded-xl p-5 mb-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Recommended Steps
          </h3>

          <div className="flex gap-3 items-start">
            <RefreshCw className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-200" style={{ color: colors.text }}>
                Attempt Session Recovery
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Click "Retry Login" below to see if connection handshakes can be safely re-established with your organization's backend profile.
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-gray-800 w-full" />

          <div className="flex gap-3 items-start">
            <Mail className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-200" style={{ color: colors.text }}>
                Report Infrastructure Downtime
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
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
            className="w-full sm:w-1/2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
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
            className="w-full sm:w-1/2 px-6 py-3 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={logout}
            disabled={isLoading}
          >
            <LogOut className="w-4 h-4" />
            {isLoading ? "Clearing Session..." : "Log Out"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}