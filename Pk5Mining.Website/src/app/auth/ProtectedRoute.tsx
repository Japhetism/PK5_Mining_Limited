import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const location = useLocation();
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (!user.hasChangedPassword) {
    return <Navigate to="/admin/change/password" replace />;
  }

  return <Outlet />;
}