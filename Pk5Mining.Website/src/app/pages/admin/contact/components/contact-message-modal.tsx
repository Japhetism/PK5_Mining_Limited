import {
  X,
  Mail,
  Calendar,
  User,
  Phone,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { formatDateTime } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";
import { ContactMessageDto, ContactStatus } from "@/app/interfaces";

type ContactViewModalProps = {
  open: boolean;
  contact: ContactMessageDto | null;
  loading: boolean;
  onUpdateStatus: (status: ContactStatus) => void;
  onClose: () => void;
};

export function ContactViewModal({
  open,
  contact,
  loading,
  onUpdateStatus,
  onClose,
}: ContactViewModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="lg"
      height="h-auto"
      showCloseButton={false}
      panelClassName="bg-[#0a0a0a] border border-gray-800"
    >
      <div className="flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold">{contact?.subject}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sender Info & Metadata */}
        <div className="bg-[#0f0f0f] p-4 sm:p-5 space-y-4 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Left side metadata */}
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>
                  {contact?.firstName} {contact?.lastName}
                </span>
              </div>
              {contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="underline text-gray-200"
                  >
                    {contact.email}
                  </a>
                </div>
              )}
              {contact?.company && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{contact.company}</span>
                </div>
              )}
              {contact?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phoneNumber}</span>
                </div>
              )}
              {contact?.appId && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{contact.appId}</span>
                </div>
              )}
              {contact?.dT_Created && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateTime(contact.dT_Created)}</span>
                </div>
              )}
            </div>

            {/* Right side status */}
            <div className="text-sm flex items-start">
              Status: <ContactStatusPill status={contact?.status ?? "new"} />
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-auto">
          <div className="rounded-lg border border-gray-800 bg-black/20 p-4 text-sm text-gray-100 whitespace-pre-wrap break-words shadow-sm">
            {contact?.messageBody}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-800 bg-black/20">
          <button
            onClick={onClose}
            disabled={loading || !contact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Close
          </button>

          <button
            onClick={() => onUpdateStatus("resolved")}
            disabled={loading || !contact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] transition-transform active:scale-95 disabled:opacity-50"
          >
            {!loading && <CheckCircle2 size={14} />}
            {loading ? "Processing..." : "Mark as Resolved"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
