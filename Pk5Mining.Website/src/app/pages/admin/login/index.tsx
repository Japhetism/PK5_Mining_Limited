import { motion } from "motion/react";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useLoginViewModel from "./viewmodel";
import { useTenant } from "@/tenants/useTenant";

export function Login() {
  const { colors } = useTenant();
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    onSubmit,
  } = useLoginViewModel();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen text-white flex items-center justify-center px-6" style={{ backgroundColor: colors.bg  }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-gray-800 rounded-xl p-8"
        style={{ backgroundColor: colors.card }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-[#c89b3c]" />
          <h1 className="text-2xl font-bold" style={{ color: colors.text}}>Admin Login</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text}}>Email Address</label>
            <div className="flex items-center gap-2 border border-gray-800 rounded-lg px-3" style={{ backgroundColor: colors.bg }}>
              <User className="w-4 h-4 text-gray-400" />
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent py-3 outline-none"
                autoComplete="off"
                style={{ color: colors.text}}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text}}>Password</label>
            <div className="flex items-center border border-gray-800 rounded-lg px-3" style={{ backgroundColor: colors.bg }}>
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent py-3 outline-none"
                autoComplete="current-password"
                style={{ color: colors.text}}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="w-full px-6 py-3 bg-[#c89b3c] text-black font-bold rounded-lg hover:bg-[#d4a84a] transition-colors disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}