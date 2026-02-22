import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAdmin() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

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
