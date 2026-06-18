import { useEffect } from "react"; 
import { motion } from "framer-motion";
import { ShieldAlert, LogOut, Mail, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";

export function Unauthorized() {
  const { colors } = useTenant();
  const { isLoading, isUnauthorized, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isUnauthorized) {
        history.back()
    }
  }, [isUnauthorized, isLoading, navigate]);
  
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
        {/* Top Header Status */}
        <div className="flex items-center gap-4 border-b border-gray-800 pb-6 mb-6">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
              Auth Status: 401 Profile Missing
            </span>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: colors.text }}>
              Unprovisioned Account
            </h1>
          </div>
        </div>

        {/* The Exact Flow Explained to the User */}
        <div className="space-y-4 text-sm text-gray-400 leading-relaxed mb-8">
          <p>
            Your Microsoft SSO authentication was successful, but your corporate account hasn't been granted access to this portal's database yet.
          </p>
          <p>
            This internal admin portal operates on a **strict pre-registration policy**. An administrator must manually register your email address in the system before you can log in.
          </p>
        </div>

        {/* Clear Action Steps Box */}
        <div className="bg-black/20 border border-gray-800 rounded-xl p-5 mb-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Required Actions
          </h3>

          {/* Step 1 */}
          <div className="flex gap-3 items-start">
            <UserPlus className="w-4 h-4 text-[#c89b3c] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-200" style={{ color: colors.text }}>
                Request Portal Provisioning
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Ask your manager or department head to submit an access request to add your corporate email to the portal whitelist.
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-gray-800 w-full" />

          {/* Step 2 */}
          <div className="flex gap-3 items-start">
            <Mail className="w-4 h-4 text-[#c89b3c] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-200" style={{ color: colors.text }}>
                Contact App Administration
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                If an administrator has already added you, the change might need a moment to propagate. For urgent issues, contact App Admin: 
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <motion.button
            type="button"
            whileHover={!isLoading ? { scale: 1.01 } : undefined}
            whileTap={!isLoading ? { scale: 0.99 } : undefined}
            className="w-full px-6 py-3 bg-[#c89b3c] text-black font-bold rounded-lg hover:bg-[#d4a84a] transition-colors flex items-center justify-center gap-2"
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