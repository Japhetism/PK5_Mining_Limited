import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SSO() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  console.log("user is from SSO ", user);

  useEffect(() => {
    // Only act once the AuthProvider has finished checking all storage (JWT and SSO)
    if (!isLoading) {
      if (user) {
        console.log("✅ AuthHandler: Identity confirmed, moving to dashboard");
        navigate("/admin/dashboard", { replace: true });
      } else {
        console.log("❌ AuthHandler: No identity found, redirecting to login");
        navigate("/admin/login", { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-gray-400 animate-pulse">
          Verifying PK5 Mining Credentials...
        </p>
      </div>
    </div>
  );
}
