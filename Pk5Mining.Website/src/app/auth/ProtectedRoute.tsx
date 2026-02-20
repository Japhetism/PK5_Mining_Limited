import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const location = useLocation();
  const { user, isAdmin, isLoading } = useAuth();

  if (!isLoading && (!user || !isAdmin)) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!isLoading && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}