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
            <ShieldAlert className="w-6 h-6" style={{ color: colors.accent }} />
          </div>
          <div>
            <span className="text-[16px] font-mono tracking-widest uppercase font-bold" style={{ color: colors.accent }}>
              Auth Status: 401 Profile Missing
            </span>
            <h1 className="text-[18px] font-bold tracking-tight" style={{ color: colors.text }}>
              Unprovisioned Account
            </h1>
          </div>
        </div>

        <div className="space-y-4 text-[16px] leading-relaxed mb-8" style={{ color: colors.text }}>
          <p>
            Your Microsoft SSO authentication was successful, but your corporate account hasn't been granted access to this portal's database yet.
          </p>
          <p>
            This internal admin portal operates on a **strict pre-registration policy**. An administrator must manually register your email address in the system before you can log in.
          </p>
        </div>

        <div className="rounded-xl p-5 mb-8 space-y-4" style={{ backgroundColor: colors.innerCard }}>
          <h3 className="text-[16px] font-bold uppercase tracking-wider" style={{ color: colors.text }}>
            Required Actions
          </h3>

          <div className="flex gap-3 items-start">
            <UserPlus className="w-4 h-4 mt-0.5 shrink-0" style={{ color: colors.accent }} />
            <div>
              <p className="text-[15px] font-semibold" style={{ color: colors.text }}>
                Request Portal Provisioning
              </p>
              <p className="text-[14px] mt-0.5" style={{ color: colors.text }}>
                Ask your manager or department head to submit an access request to add your corporate email to the portal whitelist.
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-black/5 w-full" />

          <div className="flex gap-3 items-start">
            <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: colors.accent }} />
            <div>
              <p className="text-[15px] font-semibold" style={{ color: colors.text }}>
                Contact App Administration
              </p>
              <p className="text-[14px] mt-0.5" style={{ color: colors.text }}>
                If an administrator has already added you, the change might need a moment to propagate. For urgent issues, contact App Admin: 
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <motion.button
            type="button"
            whileHover={!isLoading ? { scale: 1.01 } : undefined}
            whileTap={!isLoading ? { scale: 0.99 } : undefined}
            className="w-full px-6 py-3 font-bold rounded-lg text-[16px] transition-colors flex items-center justify-center gap-2"
            style={{ backgroundColor: colors.accent, color: colors.card }}
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