import { motion } from "motion/react";
import { UserInfo } from "./components/user-info";
import { UserPermissions } from "./components/user-permissions";
import { useTenant } from "@/tenants/useTenant";

export function Account() {
  const { colors } = useTenant();
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-[18px] font-semibold" style={{ color: colors.text }}>Account</h1>
          <p className="text-[15px] mt-1" style={{ color: colors.subtext }}>
            View your profile details and update your password.
          </p>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid gap-6 lg:grid-cols-2 w-full">
          
          {/* LEFT: PROFILE */}
          <div className="w-full">
            <UserInfo />
          </div>

          {/* RIGHT: CHANGE PASSWORD */}
          {/* <div className="w-full">
            <ChangePassword />
          </div> */}

          {/* RIGHT: USER PERMISSIONS */}
          <div className="w-full">
            <UserPermissions />
          </div>

        </div>
      </motion.div>
    </div>
  );
}