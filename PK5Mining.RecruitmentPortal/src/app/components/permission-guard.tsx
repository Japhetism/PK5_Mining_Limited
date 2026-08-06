import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

type PermissionGuardProps = {
  permission: string | string[];
  children: ReactNode;
};

const enforcePermission = import.meta.env.VITE_ENFORCE_PERMISSION === "true";

export function PermissionGuard({
  permission,
  children,
}: PermissionGuardProps) {
  const { user } = useAuth();

    if (!enforcePermission) {
      return <>{children}</>;
    }

  const userPermissions = user?.userPermissions ?? [];
  const requiredPermissions = Array.isArray(permission)
    ? permission
    : [permission];

  const hasPermission = requiredPermissions.some((p) =>
    userPermissions.includes(p as any),
  );

  return hasPermission ? <>{children}</> : null;
}
