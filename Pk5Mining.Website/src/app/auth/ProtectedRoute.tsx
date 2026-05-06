import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const location = useLocation();
  const { user, isAdmin, isLoading } = useAuth();

  console.log("user from protected route ", user)

  // const isReturningFromAuth =
  //   window.location.hash.includes("code=") ||
  //   window.location.hash.includes("id_token=");

  // // While we are loading OR if we see a login token, do NOT redirect to login.
  // if (isLoading || isReturningFromAuth) {
  //   return <div className="loading-spinner">Verifying...</div>;
  // }

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
