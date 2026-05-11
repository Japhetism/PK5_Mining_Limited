import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/images/logo.png";

export function SSO() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const targetPath = user ? "/admin/dashboard" : "/admin/login";
      navigate(targetPath, { replace: true });
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] p-6">
      <div className="flex flex-col items-center animate-pulse">
        <div className="mb-8">
          <img
            src={Logo}
            alt="PK5 Mining Logo"
            className="w-32 h-auto object-contain"
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
