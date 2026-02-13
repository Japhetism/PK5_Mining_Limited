import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BarChart3, Briefcase, FileText, LogOut, Shield } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { getGreeting } from "../utils/helper";

const nav = [
  { to: "/admin", label: "Dashboard", icon: BarChart3, end: true },
  { to: "/admin/jobs", label: "Job Openings", icon: Briefcase },
  { to: "/admin/applications", label: "Applications", icon: FileText },
];

export function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="border-b border-gray-800 bg-[#0f0f0f]/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#c89b3c]" />
            <span className="font-bold">PK5 Admin</span>
          </Link>
          <div className="flex items-center justify-between gap-2">
            <motion.p
              className="text-sm text-white-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                <span>{getGreeting()},&nbsp;</span>
                <span className="font-bold">{user?.firstName} {user?.lastName}</span>
              </p>
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-200"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 h-fit">
          <nav className="space-y-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={(item as any).end}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-[#c89b3c]/10 text-[#c89b3c] border border-[#c89b3c]/30"
                      : "text-gray-300 hover:bg-white/5",
                  ].join(" ")
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

