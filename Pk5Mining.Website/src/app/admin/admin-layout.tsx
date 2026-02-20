import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BarChart3, Briefcase, FileText, LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { getGreeting } from "../utils/helper";
import Logo from "../../assets/images/logo.png";

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
    <div className="h-screen bg-[#0f0f0f] text-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="border-b border-gray-800 bg-[#0f0f0f]/95 backdrop-blur shrink-0">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <img
              src={Logo}
              alt="PK5 Mining Logo"
              className="w-20 h-auto object-contain"
            />
            <span className="font-bold">Admin Portal</span>
          </Link>

          <motion.p
            className="text-sm text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>{getGreeting()}, </span>
            <span className="font-bold">
              {user?.firstName} {user?.lastName}
            </span>
          </motion.p>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full h-full">
          <div className="h-full grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 overflow-hidden">
            {/* SIDEBAR (scrollable) */}
            <aside className="h-full bg-[#1a1a1a] border-r border-gray-800 p-4 flex flex-col overflow-hidden">
              {/* NAV scrolls when it grows */}
              <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
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

              {/* LOGOUT pinned at bottom */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            </aside>

            {/* MAIN CONTENT (only this scrolls) */}
            <main className="min-w-0 h-full overflow-y-auto px-6 py-6 ">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}