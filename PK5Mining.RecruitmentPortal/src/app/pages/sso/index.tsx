import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";
import { getBestAdminRoute } from "@/app/utils/helper";

export function SSO() {
  const { user, isLoading, isUnauthorized, isServerError } = useAuth();
  const {
    colors,
    logo,
    name,
  } = useTenant();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isServerError) {
      navigate("/admin/error", { replace: true });
      return;
    }

    if (isUnauthorized) {
      navigate("/admin/unauthorized", { replace: true });
      return;
    }

    if (user) {
      const redirectTo = getBestAdminRoute(user.userPermissions ?? []);
      navigate(`/admin/${redirectTo}`, { replace: true });
      return;
    }

    navigate("/login", { replace: true });
  }, [user, isLoading, isUnauthorized, isServerError, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: colors.outletBgColor }}
    >
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
          <p className="text-[16px] font-semibold tracking-[0.2em] uppercase" style={{ color: colors.text }}>
            Completing Secure Connection
          </p>

          <span className="text-[14px] font-medium" style={{ color: colors.text }}>
            Finalizing account synchronization...
          </span>
        </div>
      </div>
    </div>
  );
}
