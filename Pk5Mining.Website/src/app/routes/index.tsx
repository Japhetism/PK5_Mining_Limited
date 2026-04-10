import { useRoutes, Navigate } from "react-router-dom";
import { clientRoutes } from "./client-routes";
import { adminRoutes } from "./admin-routes";
import { useTenant } from "@/tenants/useTenant";

 const allowAdminFeatures = import.meta.env.VITE_ALLOW_ADMIN_FEATURES === "true";
 
 export function AppRoutes() {
  const { isAgro } = useTenant();

  const routes = [
    ...(!isAgro ? clientRoutes : []),

    ...(allowAdminFeatures ? adminRoutes : []),

    { 
      path: "*", 
      element: <Navigate to={isAgro ? "/admin" : "/"} replace /> 
    }
  ];

  return useRoutes(routes);
}