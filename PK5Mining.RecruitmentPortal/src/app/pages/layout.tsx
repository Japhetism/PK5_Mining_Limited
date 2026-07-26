import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";
import { getGreeting } from "@/app/utils/helper";
import { UserMenu } from "@/app/components/ui/userMenu";
import { useTenant } from "@/tenants/useTenant";
import { useAdminNav } from "@/app/hooks/useAdminNav";

export function AdminLayout() {
  const { colors, logo, name } = useTenant();
  const { logout, user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const nav = useAdminNav();

  const onLogout = () => logout();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="h-screen w-full flex bg-white text-black overflow-hidden">
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex h-full border-r flex-col shrink-0 transition-all duration-300 ease-in-out ${
          collapsed ? "w-[80px]" : "w-[260px]"
        }`}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        {/* Logo + Toggle */}
        <div
          className="p-4 mb-10"
          style={{ borderColor: colors.border }}
        >
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed && (
              <img src={logo} alt="Logo" className="w-36 h-auto object-contain" loading="lazy" />
            )}

            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {collapsed ? (
                <PanelLeftOpen
                  className="w-5 h-5"
                  style={{ color: colors.sidemenuTextColor }}
                />
              ) : (
                <PanelLeftClose
                  className="w-5 h-5"
                  style={{ color: colors.sidemenuTextColor }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-3">
            {nav.map((item) => {
              if (!item.show) return null;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    [
                      "flex items-center rounded-lg px-3 py-3 transition-all duration-200",
                      collapsed ? "justify-center" : "gap-3",
                      isActive
                        ? "border border-[#c89b3c]/30"
                        : "hover:bg-white/5",
                    ].join(" ")
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          backgroundColor: colors.sidemenuActiveBgColor,
                        }
                      : {}
                  }
                >
                  <item.icon
                    className="w-5 h-5 shrink-0"
                    style={{
                      color: colors.sidemenuTextColor,
                    }}
                  />

                  {!collapsed && (
                    <span
                      className="truncate text-[16px]"
                      style={{
                        color: colors.sidemenuTextColor,
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div
          className="p-4 border-t"
          style={{ borderColor: colors.border }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            title={collapsed ? "Logout" : undefined}
            className={`w-full flex items-center px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />

            {!collapsed && <span>Logout</span>}
          </motion.button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header
          className="border-b backdrop-blur shrink-0 bg-white h-20 flex items-center"
          style={{
            borderColor: colors.headerBorderColor,
          }}
        >
          <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg border"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link to="/admin" className="flex items-center gap-2">
                <span className="font-bold text-[20px]">
                  {name}{" "}Admin Portal
                </span>
              </Link>
            </div>

            <div className="hidden sm:block">
              <UserMenu
                firstName={user?.firstName}
                lastName={user?.lastName}
                email={user?.email}
                greeting={getGreeting()}
                onLogout={onLogout}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6"
          style={{
            backgroundColor: colors.outletBgColor,
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeMobileMenu}
            />

            <motion.aside
              className="absolute left-0 top-0 h-full w-[85%] max-w-[300px] p-4 flex flex-col"
              style={{
                backgroundColor: colors.bg,
              }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="flex items-center justify-between mb-4 pb-4 border-b"
                style={{
                  borderColor: colors.border,
                }}
              >
                <span className="font-bold">Menu</span>

                <button onClick={closeMobileMenu}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-3">
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
                          "flex items-center gap-3 px-3 py-3 rounded-lg",
                          isActive
                            ? "border border-[#c89b3c]/30"
                            : "hover:bg-white/5",
                        ].join(" ")
                      }
                      style={({ isActive }) =>
                        isActive
                          ? {
                              backgroundColor:
                                colors.sidemenuActiveBgColor,
                            }
                          : {}
                      }
                    >
                      <item.icon
                        className="w-5 h-5"
                        style={{
                          color: colors.sidemenuTextColor,
                        }}
                      />

                      <span
                        style={{
                          color: colors.sidemenuTextColor,
                        }}
                      >
                        {item.label}
                      </span>
                    </NavLink>
                  );
                })}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}