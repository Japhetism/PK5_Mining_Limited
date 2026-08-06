import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useTenant } from "@/tenants/useTenant";

type ResumeViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  resume: string;
  firstName: string;
  lastName: string;
};

export function ResumeViewerModal({
  isOpen,
  onClose,
  resume,
  firstName,
  lastName,
}: ResumeViewerModalProps) {
  const { colors } = useTenant();
  const [resumeLoading, setResumeLoading] = useState(true);

  const resumeUrl = useMemo(() => {
    const url = resume?.trim();
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  }, [resume]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 sm:p-6"
          onMouseDown={() => onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-5xl h-[85vh] rounded-xl border border-gray-800 shadow-xl overflow-hidden"
            style={{ background: colors.card }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <div className="min-w-0">
                <p className="text-[18px] font-semibold truncate" style={{ color: colors.text }}>
                  {firstName} {lastName} — Resume
                </p>
                <p className="text-[15px]" style={{ color: colors.text }}>
                  Press ESC to close
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="p-2 rounded-md text-[15px]"
                  style={{ color: colors.text }}
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div className="relative w-full h-[calc(85vh-56px)]">
              {/* Loader overlay */}
              {resumeLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: colors.bg }}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-9 w-9 rounded-full border-2 border-gray-500 border-t-transparent animate-spin" />
                    <p className="text-xs text-gray-300">Loading resume...</p>
                  </div>
                </div>
              )}

              <iframe
                src={resumeUrl}
                title="Resume Viewer"
                className="w-full h-full"
                style={{ background: colors.bg }}
                onLoad={() => setResumeLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
