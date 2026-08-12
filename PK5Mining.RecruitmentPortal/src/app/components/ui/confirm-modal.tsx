import { motion } from "motion/react";
import { Modal } from "./modal";
import { useTenant } from "@/tenants/useTenant";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  confirmBtnColor?: string;

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
  confirmBtnColor,
}: ConfirmModalProps) {
  const { colors } = useTenant();

  const horizontalBg = confirmBtnColor
    ? `bg-[${confirmBtnColor}]`
    : "bg-[#C89B3C]";

  const isRejected = !!confirmText?.toLowerCase()?.includes("reject");

  const iconBg = isRejected ? "bg-[#FEF2F2]" : "bg-[#FDF6E7]";
  const iconColor = isRejected ? "#EF4444" : "#C89B3C";

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      height="md"
      showCloseButton={false}
      panelClassName="h-auto"
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-[#1F2937]/40 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <div
          className="relative bg-white rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E5E7EB] p-[32px] max-w-[460px] w-full mx-[24px]"
          style={{ animation: "cdScaleIn 0.18s ease-out" }}
        >
          <div
            className={`absolute top-0 left-[32px] right-[32px] h-[3px] rounded-b-full ${horizontalBg}`}
          />
          <div
            className={`w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[16px] ${iconBg}`}
          >
            {isRejected ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke={iconColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke={iconColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <h2 className="font-bold text-[18px] text-[#1F2937] mb-[8px]">
            {title}
          </h2>
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-[20px]">
            {description}
          </p>
          <div className="flex space-between gap-3 mt-10">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full px-6 py-2 rounded-lg border border-gray-700 text-[16px] hover:bg-white/5 disabled:opacity-50"
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
              className="w-full px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-70"
              style={{
                color: colors.card,
                backgroundColor: confirmBtnColor || colors.accent,
              }}
            >
              {loading ? "Processing..." : confirmText}
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
