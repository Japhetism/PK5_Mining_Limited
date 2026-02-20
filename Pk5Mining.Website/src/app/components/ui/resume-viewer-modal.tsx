import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type ResumeViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  resume: string;
  firstName?: string;
  lastName?: string;
  maxWidth?: string; // e.g. "max-w-5xl"
  heightClass?: string; // e.g. "h-[85vh]"
};

export function ResumeViewerModal({
  isOpen,
  onClose,
  title,
  subtitle,
  resume,
  firstName,
  lastName,
  maxWidth = "max-w-3xl",
  heightClass = "h-auto",
}: ResumeViewerModalProps) {
  const [resumeLoading, setResumeLoading] = useState(true);

  const resumeUrl = useMemo(() => {
    const url = resume?.trim();
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  }, [resume]);

  const resumeFileName = useMemo(() => {
    const first = firstName ?? "candidate";
    const last = lastName ?? "resume";
    return `${first}-${last}-resume.pdf`;
  }, [firstName, lastName]);

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
            className="relative w-full max-w-5xl h-[85vh] bg-[#0f0f0f] rounded-xl border border-gray-800 shadow-xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-200 truncate">
                  {firstName} {lastName} — Resume
                </p>
                <p className="text-xs text-gray-500">Press ESC to close</p>
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

            {/* Viewer */}
            <div className="relative w-full h-[calc(85vh-56px)]">
              {/* Loader overlay */}
              {resumeLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-9 w-9 rounded-full border-2 border-gray-500 border-t-transparent animate-spin" />
                    <p className="text-xs text-gray-300">Loading resume...</p>
                  </div>
                </div>
              )}

              <iframe
                src={resumeUrl}
                title="Resume Viewer"
                className="w-full h-full bg-black"
                onLoad={() => setResumeLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
