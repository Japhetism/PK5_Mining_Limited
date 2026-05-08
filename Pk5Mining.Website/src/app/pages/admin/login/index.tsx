import { motion, AnimatePresence } from "framer-motion"; // Note: motion/react is standard, but check your import source
import { Lock, User, Eye, EyeOff, ChevronLeft } from "lucide-react";
import useLoginViewModel from "./viewmodel";
import { useTenant } from "@/tenants/useTenant";

const FormField = ({
  label,
  icon: Icon,
  children,
  colors,
}: {
  label: string;
  icon: any;
  children: React.ReactNode;
  colors: any;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium" style={{ color: colors.text }}>
      {label}
    </label>
    <div
      className="flex items-center gap-2 border border-gray-800 rounded-lg px-3 focus-within:border-gray-500 transition-colors"
      style={{ backgroundColor: colors.bg }}
    >
      <Icon className="w-4 h-4 text-gray-400 shrink-0" />
      {children}
    </div>
  </div>
);

export function Login() {
  const { colors } = useTenant();
  const {
    email,
    password,
    error,
    loading,
    showPassword,
    isEmailStep,
    setFormType,
    setEmail,
    setPassword,
    handleSSOSignin,
    handleFormSubmit,
    setShowPassword,
  } = useLoginViewModel();

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center px-6"
      style={{ backgroundColor: colors.bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-gray-800 rounded-xl p-8 shadow-xl"
        style={{ backgroundColor: colors.card }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-6 h-6 text-[#c89b3c]" />
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            Admin Login
          </h1>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {isEmailStep ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <FormField label="Email Address" icon={User} colors={colors}>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent py-3 outline-none"
                    autoComplete="email"
                    style={{ color: colors.text }}
                  />
                </FormField>
              </motion.div>
            ) : (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <FormField label="Password" icon={Lock} colors={colors}>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent py-3 outline-none"
                    autoComplete="current-password"
                    style={{ color: colors.text }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </FormField>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-4 pt-2">
            <motion.button
              type="submit"
              whileHover={!loading ? { scale: 1.01 } : undefined}
              whileTap={!loading ? { scale: 0.99 } : undefined}
              className="w-full px-6 py-3 bg-[#c89b3c] text-black font-bold rounded-lg hover:bg-[#d4a84a] transition-colors disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Signing in..." : isEmailStep ? "Continue" : "Sign In"}
            </motion.button>

            {isEmailStep ? (
              <>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="flex-shrink mx-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
                    OR
                  </span>
                  <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <motion.button
                  type="button"
                  whileHover={!loading ? { scale: 1.01 } : undefined}
                  whileTap={!loading ? { scale: 0.99 } : undefined}
                  className="w-full px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70"
                  disabled={loading}
                  onClick={handleSSOSignin}
                >
                  Sign in with SSO
                </motion.button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setFormType("emailForm")}
                className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Email
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
