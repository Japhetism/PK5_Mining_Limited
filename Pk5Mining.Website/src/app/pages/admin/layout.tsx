import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { getGreeting } from "@/app/utils/helper";
import { UserMenu } from "@/app/components/ui/userMenu";
import { useTenant } from "@/tenants/useTenant";
import { useAdminNav } from "@/app/hooks/useAdminNav";

export function AdminLayout() {
  const { colors, logo } = useTenant();
  const { logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = useAdminNav();

  const onLogout = () => logout();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="h-screen w-full flex bg-white text-black overflow-hidden">
      {/* DESKTOP SIDEBAR - Full Height */}
      <aside
        className="hidden lg:flex w-[260px] h-full border-r p-4 flex-col shrink-0"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center justify-center mb-4 p-5">
            <img src={logo} alt="Logo" className="w-36 h-auto object-contain" />
          </div>
          <nav className="space-y-5">
            {nav.map((item) => {
              if (!item.show) return null;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-[16px] transition-colors ",
                      isActive
                        ? "text-[#c89b3c] border border-[#c89b3c]/30"
                        : "text-gray-300 hover:bg-white/5",
                    ].join(" ")
                  }
                  style={({ isActive }) =>
                    isActive ? { backgroundColor: colors.sidemenuActiveBgColor } : {}
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" style={{ color: colors.sidemenuTextColor }} />
                  <span className="truncate" style={{ color: colors.sidemenuTextColor }}>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[16px] text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </aside>

      {/* RIGHT SIDE WRAPPER - Header + Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header
          className="border-b backdrop-blur shrink-0 bg-white h-20 flex items-center"
          style={{ borderColor: colors.headerBorderColor }}
        >
          <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg border text-gray-300"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/admin" className="flex items-center gap-2">
                <span className="font-bold text-[20px]">PK5 Admin Portal</span>
              </Link>
            </div>
            <div className="hidden sm:block">
              <UserMenu firstName={user?.firstName} lastName={user?.lastName} email={user?.email} greeting={getGreeting()} onLogout={onLogout} />
            </div>
          </div>
        </header>

        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6"
          style={{ backgroundColor: colors.outletBgColor }}
        >
          <Outlet />
        </main>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={closeMobileMenu} />
            <motion.aside
              className="absolute left-0 top-0 h-full w-[85%] max-w-[300px] p-4 flex flex-col"
              style={{ backgroundColor: colors.bg }}
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            >
              <div className="flex justify-between mb-4 pb-4 border-b">
                <span className="font-bold">Menu</span>
                <button onClick={closeMobileMenu}><X className="w-5 h-5" /></button>
              </div>
              {/* Add navigation links here similar to desktop */}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}