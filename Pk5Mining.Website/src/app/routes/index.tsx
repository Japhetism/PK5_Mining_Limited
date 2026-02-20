import { useRoutes } from "react-router-dom";
import { clientRoutes } from "./client-routes";
import { adminRoutes } from "./admin-routes";

export function AppRoutes() {
  return useRoutes([...clientRoutes, ...adminRoutes]);
}