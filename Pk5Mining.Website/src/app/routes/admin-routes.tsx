import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { adminRouteItems, type AdminRouteItem } from "./route-config";
import { hasPermissions, hasRole } from "../utils/helper";
import { Permission } from "../interfaces/permission";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../constants/role";
import { RolePermission } from "../interfaces/role";

const Login = lazy(() =>
  import("@/app/pages/login").then((m) => ({ default: m.Login }))
);

const ProtectedRoute = lazy(() =>
  import("@/app/auth/ProtectedRoute").then((m) => ({
    default: m.ProtectedRoute,
  }))
);

const AdminLayout = lazy(() =>
  import("@/app/pages/layout").then((m) => ({ default: m.AdminLayout }))
);

const SSO = lazy(() =>
  import("@/app/pages/sso").then((m) => ({ default: m.SSO })),
);

const Unauthorized = lazy(() =>
  import("@/app/pages/unauthorized").then((m) => ({ default: m.Unauthorized })),
);

const Error = lazy(() =>
  import("@/app/pages/error").then((m) => ({ default: m.Error })),
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
  permissions?: RolePermission[];
  requireAllPermissions?: boolean;
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const isAllowed =
    canAccess &&
    hasPermissions(
      user?.userPermissions ?? [],
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
  { path: "/", element: <Login /> },
  {
    path: "/unauthorized",
    element: <Unauthorized />
  },
  {
    path: "/error",
    element: <Error />
  },
  { 
    path: "/sso", 
    element: <SSO /> 
  },
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