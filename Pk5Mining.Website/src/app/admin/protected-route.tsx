import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminAuthed } from "./auth";

export function AdminProtectedRoute() {
  const location = useLocation();

  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

