import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";

export function SSO() {
  const { user, isLoading } = useAuth();
  const { colors: { bg }, logo, name } = useTenant();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const targetPath = user ? "/admin/dashboard" : "/admin/login";
      navigate(targetPath, { replace: true });
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: bg }}>
      <div className="flex flex-col items-center animate-pulse">
        <div className="mb-8">
          <img
            src={logo}
            alt={name}
            className="w-32 h-auto object-contain brightness-0 invert-[.5]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <p className="text-[#c89b3c] text-sm font-semibold tracking-[0.2em] uppercase">
            Completing Secure Connection
          </p>

          <span className="text-gray-500 text-xs font-medium">
            Finalizing account synchronization...
          </span>
        </div>
      </div>
    </div>
  );
}
