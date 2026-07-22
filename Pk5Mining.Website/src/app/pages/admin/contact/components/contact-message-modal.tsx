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
import { useTenant } from "@/tenants/useTenant";
import { PermissionGuard } from "@/app/components/permission-guard";
import { PERMISSIONS } from "@/app/constants/permissions";

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
  const { colors } = useTenant();
  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="lg"
      height="h-auto"
      showCloseButton={false}
      panelClassName="bg-[#0a0a0a] border border-gray-800"
    >
      <div className="flex flex-col max-h-[90vh] overflow-y-auto" style={{ color: colors.text }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <h2 className="text-[18px] font-semibold capitalize">
              {contact?.subject}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 transition-colors"
            style={{ color: colors.text }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sender Info & Metadata */}
        <div
          className="p-4 sm:p-5 space-y-4"
          style={{ background: colors.outletBgColor }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Left side metadata */}
            <div className="flex flex-col gap-2 text-[16px]" style={{ color: colors.text }}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="capitalize">
                  {contact?.firstName} {contact?.lastName}
                </span>
              </div>
              {contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </div>
              )}
              {contact?.company && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="capitalize">{contact.company}</span>
                </div>
              )}
              {contact?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phoneNumber}</span>
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
            <div className="text-[16px] flex items-start capitalize" style={{ color: colors.text }}>
              <span className="mr-2">Status:</span>{" "}
              <ContactStatusPill status={contact?.status ?? "new"} />
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div className="overflow-auto mt-5">
          <div className="rounded-lg p-4 text-[16px] whitespace-pre-wrap break-words shadow-sm" style={{ background: colors.outletBgColor, color: colors.text }}>
            {contact?.messageBody}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-800" style={{ background: colors.card }}>
          <button
            onClick={onClose}
            disabled={loading || !contact}
            className="inline-flex border items-center gap-2 px-6 py-2 rounded-lg text-[16px] transition-colors disabled:opacity-50"
            style={{ background: colors.card, color: colors.text, borderColor: colors.border }}
          >
            Close
          </button>

          {contact?.status?.toLowerCase() !== "resolved" && (
            <PermissionGuard permission={PERMISSIONS.contactMessageUpdate}>
              <button
                onClick={() => onUpdateStatus("resolved")}
                disabled={loading || !contact}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-[16px] font-semibold transition-transform active:scale-95 disabled:opacity-50"
                style={{ background: colors.accent, color: colors.card }}
              >
                {!loading && <CheckCircle2 size={14} />}
                {loading ? "Processing..." : "Mark as Resolved"}
              </button>
            </PermissionGuard>
          )}
        </div>
      </div>
    </Modal>
  );
}
