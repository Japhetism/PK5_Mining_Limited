import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { generatePassword } from "@/app/utils/helper";
import { User } from "@/app/interfaces/user";

type ChangePasswordModalProps = {
  user: User | null,
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
};

export function ChangePasswordModal({
  user,
  open,
  loading = false,
  onClose,
  onConfirm,
}: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (open) {
      const generatedPassword = generatePassword();
      setNewPassword(generatedPassword);
    }
  }, [open]);

  const handleSubmit = (e: any) => {
    if (newPassword != confirmPassword) {
      setErrorMsg("New password and confirm password does not match");
      return;
    }

    onConfirm(newPassword);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      height="md"
      showCloseButton={false}
      panelClassName="h-auto"
    >
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-200 truncate">
                Change Password for {user?.firstName} {user?.lastName}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onClose()}
                className="p-2 rounded-md hover:bg-white/10 text-gray-300"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-full">
            <form
              // onSubmit={onSubmit}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="newPassword"
                    value={newPassword}
                    disabled
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors border-gray-800 focus:border-[#c89b3c]`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Confirm Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="lastName"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors border-gray-800 focus:border-[#c89b3c]`}
                  />
                  <span className="text-[10px] text-gray-500">
                    Type Password as seen in the password field
                  </span>
                  {errorMsg && (
                    <p className="text-xs text-red-500 mt-1">{errorMsg}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            Close
          </button>

          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
          >
            {loading ? "Updating..." : "Change Password"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
