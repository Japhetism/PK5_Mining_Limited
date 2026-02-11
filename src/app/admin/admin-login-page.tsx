import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, User } from "lucide-react";
import { adminLogin } from "./auth";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;

  const redirectTo = useMemo(() => {
    const from = location?.state?.from?.pathname as string | undefined;
    return from && from.startsWith("/admin") ? from : "/admin";
  }, [location?.state?.from?.pathname]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const ok = adminLogin({ username, password });
      if (!ok) {
        setError("Invalid username or password.");
        return;
      }
      navigate(redirectTo, { replace: true });
    } finally {
      setLoading(false);
    }
  };

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

          <p className="text-xs text-gray-500">
            Tip: set <code>VITE_ADMIN_USERNAME</code> and{" "}
            <code>VITE_ADMIN_PASSWORD</code> for production.
          </p>
        </form>
      </motion.div>
    </div>
  );
}

