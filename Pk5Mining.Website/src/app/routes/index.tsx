import { useRoutes, Navigate } from "react-router-dom";
import { clientRoutes } from "./client-routes";
import { adminRoutes } from "./admin-routes";

const allowAdminFeatures = import.meta.env.VITE_ALLOW_ADMIN_FEATURES === "true";

export function AppRoutes() {
  const routes = [
    ...clientRoutes,
    ...(allowAdminFeatures ? adminRoutes : []),
    
    { path: "*", element: <Navigate to="/" replace /> } 
  ];

  return useRoutes(routes);
}