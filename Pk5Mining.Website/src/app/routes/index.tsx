import { useRoutes, Navigate } from "react-router-dom";
import { clientRoutes } from "./client-routes";
import { adminRoutes } from "./admin-routes";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "../context/AuthContext";

const allowAdminFeatures = import.meta.env.VITE_ALLOW_ADMIN_FEATURES === "true";

export function AppRoutes() {
  const { isAgro } = useTenant();
  const { user:authUser } = useAuth();

  const path = authUser || isAgro ? "/admin" : "/"

  const routes = [
    ...(!isAgro ? clientRoutes : []),

    ...(allowAdminFeatures ? adminRoutes : []),

    {
      path: "*",
      element: <Navigate to={path} replace />,
    },
  ];

  return useRoutes(routes);
}
