import { useRoutes, Navigate } from "react-router-dom";
import { appRoutes } from "./app-routes";
import { useTenant } from "@/tenants/useTenant";

export function AppRoutes() {
  const { isAgro } = useTenant();

  const routes = [
    ...(!isAgro ? appRoutes : []),

    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];

  return useRoutes(routes);
}
