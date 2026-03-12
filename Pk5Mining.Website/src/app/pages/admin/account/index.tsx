import { motion } from "motion/react";
import { ChangePassword } from "./components/change-password";
import { UserInfo } from "./components/user-info";

export function Account() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Account</h1>
          <p className="text-sm text-gray-400 mt-1">
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
          <div className="w-full">
            <ChangePassword />
          </div>

        </div>
      </motion.div>
    </div>
  );
}