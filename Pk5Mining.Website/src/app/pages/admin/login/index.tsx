import { motion } from "motion/react";
import { Lock, User } from "lucide-react";
import useLoginViewModel from "./viewmodel";

export function Login() {
  const {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    onSubmit,
  } = useLoginViewModel();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-[#c89b3c]" />
          <h1 className="text-2xl font-bold">Admin Login</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="flex items-center gap-2 bg-[#0f0f0f] border border-gray-800 rounded-lg px-3">
              <User className="w-4 h-4 text-gray-400" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-transparent py-3 outline-none"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center gap-2 bg-[#0f0f0f] border border-gray-800 rounded-lg px-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                className="w-full bg-transparent py-3 outline-none"
                autoComplete="current-password"
              />
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
