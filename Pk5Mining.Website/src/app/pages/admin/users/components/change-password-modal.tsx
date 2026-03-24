import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { generatePassword } from "@/app/utils/helper";
import { User } from "@/app/interfaces/user";
import { PasswordInput } from "@/app/components/ui/password-input";

type ChangePasswordModalProps = {
  user: User | null;
  open: boolean;
  isUpdating?: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
};

export function ChangePasswordModal({
  user,
  open,
  isUpdating = false,
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
      setConfirmPassword("");
      setErrorMsg("");
    }
  }, [open]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setErrorMsg("");
    if (newPassword != confirmPassword) {
      setErrorMsg("Oops! The passwords don’t match. Please try again.");
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
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <PasswordInput
                  label="Temporary Password"
                  value={newPassword}
                  disabled
                  infoText="Copy and share this temporary password with the user"
                  canCopy={true}
                />

                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  infoText="Type the password exactly as displayed to confirm"
                  error={errorMsg}
                  blockPaste={true}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            Close
          </button>

          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={!isUpdating ? { scale: 1.02 } : undefined}
            whileTap={!isUpdating ? { scale: 0.98 } : undefined}
            className="px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
          >
            {isUpdating ? "Updating..." : "Change Password"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
