import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../../assets/images/logo.png";

export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
