import React, { useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;

  title?: string;
  subtitle?: string;

  children: React.ReactNode;

  /** Right-side header actions (e.g. Download button) */
  headerActions?: React.ReactNode;

  /** Width presets aligned with your admin design */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Height preset */
  height?: "md" | "lg" | "xl";

  /** Click outside to close */
  closeOnOverlayClick?: boolean;

  /** Show X button */
  showCloseButton?: boolean;

  /** Extra classes */
  panelClassName?: string;
};

const widthMap: Record<NonNullable<ModalProps["maxWidth"]>, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
};

const heightMap: Record<NonNullable<ModalProps["height"]>, string> = {
  md: "h-[60vh]",
  lg: "h-[75vh]",
  xl: "h-[85vh]",
};

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  headerActions,
  maxWidth = "xl",
  height = "xl",
  closeOnOverlayClick = true,
  showCloseButton = true,
  panelClassName = "",
}: ModalProps) {
  // ESC closes
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 sm:p-6"
      onMouseDown={() => {
        if (closeOnOverlayClick) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className={`relative w-full ${widthMap[maxWidth]} ${heightMap[height]} bg-[#0f0f0f] rounded-xl border border-gray-800 shadow-xl overflow-hidden ${panelClassName}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {(title || subtitle || headerActions || showCloseButton) && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="min-w-0">
              {title && (
                <p className="text-sm font-semibold text-gray-200 truncate">
                  {title}
                </p>
              )}
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-2">
              {headerActions}

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-white/10 text-gray-300"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="h-[calc(100%-56px)]">{children}</div>
      </motion.div>
    </div>
  );
}
