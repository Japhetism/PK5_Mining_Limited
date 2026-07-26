import { useMemo } from "react";
import { motion } from "motion/react";
import { Modal } from "../ui/modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  userEmail?: string;
};

export function ResetPasswordModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  userEmail,
}: Props) {
  const title = useMemo(() => {
    if (!userEmail) return "Reset password";
    return `Reset password for ${userEmail}`;
  }, [userEmail]);

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
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-200">{title}</h2>
          <p className="text-xs text-gray-400">
            This will generate a password reset action (or temporary password)
            for the user.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>

          <motion.button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
          >
            {loading ? "Processing..." : "Reset password"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}