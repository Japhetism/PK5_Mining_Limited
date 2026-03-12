import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../../assets/images/logo.png";

export function RequireAdmin() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading)
    return (
      <div>
        <img
          src={Logo}
          alt="PK5 Mining Logo"
          loading="lazy"
          className="w-30 h-auto object-contain"
        />
      </div>
    );

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
