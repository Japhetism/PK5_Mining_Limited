import { useRoutes, Navigate } from "react-router-dom";
import { clientRoutes } from "./client-routes";
import { adminRoutes } from "./admin-routes";

export function AppRoutes() {
  const hostname = window.location.hostname;
  const isAgroPortal = hostname.includes("pk5agroallied");
  
  const allowAdminFeatures = import.meta.env.VITE_ALLOW_ADMIN_FEATURES === "true";

  const routes = [
    ...(!isAgroPortal ? clientRoutes : []),

    ...(allowAdminFeatures ? adminRoutes : []),

    { 
      path: "*", 
      element: <Navigate to={isAgroPortal ? "/admin" : "/"} replace /> 
    }
  ];

  return useRoutes(routes);
}