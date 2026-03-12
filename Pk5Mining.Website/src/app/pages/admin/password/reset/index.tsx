import { motion } from "motion/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import useResetPasswordViewModel from "./viewmodel";

export function ChangePassword() {
  const {
    currentPassword,
    confirmPassword,
    newPassword,
    showCurrent,
    showConfirm,
    showNew,
    error,
    loading,
    onSubmit,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    setShowConfirm,
    setShowCurrent,
    setShowNew,
  } = useResetPasswordViewModel();

  const inputStyle =
    "flex items-center bg-[#0f0f0f] border border-gray-800 rounded-lg px-3";

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-[#c89b3c]" />
          <h1 className="text-2xl font-bold">Change Password</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>

            <div className={inputStyle}>
              <Lock className="w-4 h-4 text-gray-400 mr-2" />

              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                type={showCurrent ? "text" : "password"}
                className="w-full bg-transparent py-3 outline-none"
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="text-gray-400 hover:text-white"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <div className={inputStyle}>
              <Lock className="w-4 h-4 text-gray-400 mr-2" />

              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type={showNew ? "text" : "password"}
                className="w-full bg-transparent py-3 outline-none"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="text-gray-400 hover:text-white"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <div className={inputStyle}>
              <Lock className="w-4 h-4 text-gray-400 mr-2" />

              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type={showConfirm ? "text" : "password"}
                className="w-full bg-transparent py-3 outline-none"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="text-gray-400 hover:text-white"
              >
                {showConfirm ? (
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
            {loading ? "Updating..." : "Update Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}