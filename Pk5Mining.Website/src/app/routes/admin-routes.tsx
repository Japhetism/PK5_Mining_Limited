import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { adminRouteItems, type AdminRouteItem } from "./admin-config";
import { hasPermissions, hasRole } from "../utils/helper";
import { Permission } from "../constants/permissions";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../constants/role";

const Login = lazy(() =>
  import("@/app/pages/admin/login").then((m) => ({ default: m.Login }))
);

const ChangePassword = lazy(() =>
  import("@/app/pages/admin/password/change").then((m) => ({ default: m.ChangePassword }))
);

const ProtectedRoute = lazy(() =>
  import("@/app/auth/ProtectedRoute").then((m) => ({
    default: m.ProtectedRoute,
  }))
);

const AdminLayout = lazy(() =>
  import("@/app/pages/admin/layout").then((m) => ({ default: m.AdminLayout }))
);

function AdminAccessGuard({
  canAccess,
  roles,
  permissions = [],
  requireAllPermissions = false,
  children,
}: {
  canAccess: boolean;
  roles?: UserRole[];
  permissions?: Permission[];
  requireAllPermissions?: boolean;
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const isAllowed =
    canAccess &&
    hasRole(user?.role, roles) &&
    hasPermissions(
      user?.permissions ?? [],
      permissions,
      requireAllPermissions
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
          roles={item.roles}
          permissions={item.permissions}
          requireAllPermissions={item.requireAllPermissions}
        >
          <Element />
        </AdminAccessGuard>
      ),
    };
  });
}

export const adminRoutes: RouteObject[] = [
  { path: "/admin/login", element: <Login /> },
  { path: "/admin/change/password", element: <ChangePassword /> },
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