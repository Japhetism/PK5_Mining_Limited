import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Modal } from "../ui/modal";

type Props = {
  open: boolean;
  onClose: () => void;

  toEmail: string;
  defaultSubject: string;

  loading?: boolean;
  onSend: (payload: { subject: string; message: string }) => void;
};

export function ContactReplyModal({
  open,
  onClose,
  toEmail,
  defaultSubject,
  loading = false,
  onSend,
}: Props) {
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    setSubject(defaultSubject);
    setMessage("");
  }, [open, defaultSubject]);

  const canSend = useMemo(() => {
    return subject.trim().length > 0 && message.trim().length > 0 && !loading;
  }, [subject, message, loading]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="xl"
      height="md"
      showCloseButton={false}
      panelClassName="h-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-gray-200">Reply</h2>
            <p className="text-xs text-gray-400">To: {toEmail}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-3 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-gray-800 bg-black/30 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c] disabled:opacity-60"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={7}
              disabled={loading}
              className="w-full rounded-lg border border-gray-800 bg-black/30 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c] disabled:opacity-60"
              placeholder="Write your reply..."
            />
          </div>
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
            onClick={() =>
              onSend({ subject: subject.trim(), message: message.trim() })
            }
            disabled={!canSend}
            whileHover={!loading && canSend ? { scale: 1.02 } : undefined}
            whileTap={!loading && canSend ? { scale: 0.98 } : undefined}
            className="px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send reply"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}