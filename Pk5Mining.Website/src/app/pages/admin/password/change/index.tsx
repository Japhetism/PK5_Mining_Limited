import { motion } from "motion/react";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import useChangePasswordViewModel from "./viewmodel";

export function ChangePassword() {
  const {
    errors,
    newPassword,
    confirmNewPassword,
    showNewPassword,
    showConfirmNewPassword,
    loading,
    onSubmit,
    setNewPassword,
    setShowNewPassword,
    setShowConfirmNewPassword,
    setConfirmNewPassword,
    setErrors,
  } = useChangePasswordViewModel();

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Change Password</h1>
          <p className="mt-1 text-sm text-gray-400">
            Update your password to keep your account secure.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#1a1a1a] p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c89b3c]/10 border border-[#c89b3c]/20">
              <KeyRound className="h-5 w-5 text-[#c89b3c]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Password Details
              </h2>
              <p className="text-sm text-gray-400">
                Choose a strong password you have not used before.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                New Password
              </label>
              <div
                className={`flex items-center rounded-xl border bg-[#0f0f0f] px-3 ${
                  errors.newPassword ? "border-red-500" : "border-gray-800"
                }`}
              >
                <Lock className="h-4 w-4 shrink-0 text-gray-500" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm New Password
              </label>
              <div
                className={`flex items-center rounded-xl border bg-[#0f0f0f] px-3 ${
                  errors.confirmNewPassword
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
              >
                <Lock className="h-4 w-4 shrink-0 text-gray-500" />
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-4">
              <p className="text-sm font-medium text-white mb-2">
                Password requirements
              </p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• At least 8 characters</li>
                <li>• Must be different from your current password</li>
                <li>• Use a combination of letters, numbers, and symbols</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-[#c89b3c] px-5 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 transition"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setNewPassword("");
                  setConfirmNewPassword("");
                  setErrors({});
                }}
                className="inline-flex items-center justify-center rounded-xl border border-gray-800 bg-transparent px-5 py-3 text-sm font-medium text-gray-300 hover:bg-white/5 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}