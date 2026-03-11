import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { ChangePassword } from "../pages/admin/password/change";
import { adminRouteItems, type AdminRouteItem } from "./admin-config";
import { hasPermissions } from "../utils/helper";
import { Permission } from "../constants/permissions";
import { useAuth } from "../context/AuthContext";

const Login = lazy(() =>
  import("@/app/pages/admin/login").then((m) => ({ default: m.Login })),
);

const ProtectedRoute = lazy(() =>
  import("@/app/auth/ProtectedRoute").then((m) => ({
    default: m.ProtectedRoute,
  })),
);

const AdminLayout = lazy(() =>
  import("@/app/pages/admin/layout").then((m) => ({ default: m.AdminLayout })),
);

function AdminAccessGuard({
  canAccess,
  permissions = [],
  requireAllPermissions = false,
  children,
}: {
  canAccess: boolean;
  permissions?: Permission[];
  requireAllPermissions?: boolean;
  children: React.ReactNode;
}) {

  const { user } = useAuth();

  const isAllowed =
    canAccess &&
    hasPermissions(
      user?.permissions ?? [],
      permissions,
      requireAllPermissions,
    );

  if (!isAllowed) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

function mapAdminRoutes(items: AdminRouteItem[]): RouteObject[] {
  return items.map((item) => {
    const Element = item.element;

    return {
      path: item.path,
      element: (
        <AdminAccessGuard
          canAccess={item.canAccess}
          permissions={item.permissions}
          requireAllPermissions={item.requireAllPermissions}
        >
          <Element />
        </AdminAccessGuard>
      ),
      children: item.children ? mapAdminRoutes(item.children) : undefined,
    };
  });
}

export const adminRoutes: RouteObject[] = [
  { path: "/admin/login", element: <Login /> },
  { path: "/admin/password/change", element: <ChangePassword /> },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          ...mapAdminRoutes(adminRouteItems),
        ],
      },
    ],
  },
];
