import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, KeyRound, LogOut, Settings, User } from "lucide-react";

type UserMenuProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
  greeting: string;
  onLogout: () => void;
  className?: string;
  mobile?: boolean;
};

export function UserMenu({
  firstName,
  lastName,
  email,
  greeting,
  onLogout,
  className = "",
  mobile = false,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      label: "Profile",
      icon: User,
      to: "/admin/profile",
    },
    {
      label: "Change Password",
      icon: KeyRound,
      to: "/admin/change-password",
    },
    {
      label: "Settings",
      icon: Settings,
      to: "/admin/settings",
    },
  ];

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "flex items-center text-gray-300 transition-colors",
          mobile
            ? "w-full justify-between px-3 py-2 text-xs"
            : "gap-2 px-3 py-2 text-xs sm:text-sm",
        ].join(" ")}
      >
        <div className="min-w-0 text-left">
          <span>{greeting}, </span>
          <span className="font-bold truncate">
            {firstName} {lastName}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={[
              "absolute mt-2 rounded-xl border border-gray-800 bg-[#1a1a1a] shadow-xl overflow-hidden z-50",
              mobile ? "left-0 right-0 top-full" : "right-0 top-full w-56",
            ].join(" ")}
          >
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="text-sm font-semibold text-white truncate">
                {firstName} {lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{email}</p>
            </div>

            <div className="p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
