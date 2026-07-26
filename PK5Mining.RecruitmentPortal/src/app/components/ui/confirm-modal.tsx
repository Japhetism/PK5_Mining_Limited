import { motion } from "motion/react";
import { Modal } from "./modal";
import { useTenant } from "@/tenants/useTenant";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm action",
  description,
  confirmText = "Yes",
  cancelText = "No",
  loading = false,
}: ConfirmModalProps) {
  const { colors } = useTenant();
  
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
          <h2 className="text-[18px] font-semibold" style={{ color: colors.text }}>
            {title}
          </h2>
          {description && (
            <p className="text-[16px] mt-5" style={{ color: colors.text }}>
              {description}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-10">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 rounded-lg border border-gray-700 text-[16px] hover:bg-white/5 disabled:opacity-50"
            style={{ color: colors.text }}
          >
            {cancelText}
          </button>

          <motion.button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-70"
            style={{ color: colors.card, backgroundColor: colors.accent,  }}
          >
            {loading ? "Processing..." : confirmText}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
