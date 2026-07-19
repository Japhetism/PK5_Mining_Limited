import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { adminRouteItems } from "../routes/route-config";
import { getVisibleNav } from "../utils/helper";

export const useAdminNav = () => {
  const { user } = useAuth();

  return useMemo(() => {
    return getVisibleNav(
      adminRouteItems, 
      user?.userPermissions, 
    );
  }, [user]);
};