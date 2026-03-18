import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { getGreeting, getVisibleNav } from "@/app/utils/helper";
import Logo from "../../../assets/images/logo.png";
import { UserMenu } from "@/app/components/ui/userMenu";

export function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const nav = getVisibleNav(user?.permissions ?? []);

  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="border-b border-gray-800 bg-[#0f0f0f]/95 backdrop-blur shrink-0">
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a] p-2 text-gray-300 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/admin" className="flex items-center gap-2 min-w-0">
              <img
                src={Logo}
                alt="PK5 Mining Logo"
                loading="lazy"
                className="w-14 sm:w-20 h-auto object-contain shrink-0"
              />
              <span className="font-bold text-sm sm:text-base truncate">
                Admin Portal
              </span>
            </Link>
          </div>

          <motion.div
            className="hidden sm:block shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <UserMenu
              firstName={user?.firstName}
              lastName={user?.lastName}
              email={user?.email}
              greeting={getGreeting()}
              onLogout={onLogout}
            />
          </motion.div>
        </div>

        <div className="sm:hidden px-4 pb-3">
          <UserMenu
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
            greeting={getGreeting()}
            onLogout={onLogout}
            mobile
          />
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full h-full">
          <div className="h-full grid grid-cols-1 lg:grid-cols-[260px_1fr] overflow-hidden">
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:flex h-full bg-[#1a1a1a] border-r border-gray-800 p-4 flex-col overflow-hidden">
              <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
                {nav.map((item) => {
                  if (!item.show) return null;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-[#c89b3c]/10 text-[#c89b3c] border border-[#c89b3c]/30"
                            : "text-gray-300 hover:bg-white/5",
                        ].join(" ")
                      }
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            </aside>

            {/* MOBILE SIDEBAR */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <>
                  <motion.div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeMobileMenu}
                  />

                  <motion.aside
                    className="lg:hidden fixed left-0 top-0 z-50 h-full w-[85%] max-w-[300px] bg-[#1a1a1a] border-r border-gray-800 p-4 flex flex-col overflow-hidden"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 min-w-0"
                        onClick={closeMobileMenu}
                      >
                        <img
                          src={Logo}
                          alt="PK5 Mining Logo"
                          loading="lazy"
                          className="w-14 h-auto object-contain shrink-0"
                        />
                        <span className="font-bold text-sm truncate">
                          Admin Portal
                        </span>
                      </Link>

                      <button
                        type="button"
                        onClick={closeMobileMenu}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-800 bg-[#0f0f0f] p-2 text-gray-300 hover:bg-white/5 transition-colors"
                        aria-label="Close menu"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
                      {nav.map((item) => {
                        if (!item.show) return null;

                        return (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                              [
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                                isActive
                                  ? "bg-[#c89b3c]/10 text-[#c89b3c] border border-[#c89b3c]/30"
                                  : "text-gray-300 hover:bg-white/5",
                              ].join(" ")
                            }
                          >
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </NavLink>
                        );
                      })}
                    </nav>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {/* MAIN CONTENT */}
            <main className="min-w-0 h-full overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
