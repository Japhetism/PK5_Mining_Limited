import { motion } from "motion/react";
import { Modal } from "@/app/components/ui/modal";
import { X, Mail, CheckCircle2, Calendar, User } from "lucide-react";
import { formatDateTime } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";
import { ContactReplyModal } from "@/app/components/ui/contact-reply-modal";
import { ContactDetailsSkeleton } from "@/app/components/ui/contact-details-skeleton";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import useContactDetailsViewModel from "../details/viewmodel";
import { ContactMessageDto } from "@/app/interfaces";

type ContactViewModalProps = {
  open: boolean;
  onClose: () => void;
  contact:ContactMessageDto | null ;
};

export function ContactViewModal({ open, onClose, contact }: ContactViewModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="2xl"
      height="h-auto"
      showCloseButton={false}
      panelClassName="bg-[#0a0a0a] border border-gray-800"
    >
      <div className="flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          
            <>
              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-gray-800">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Sender</p>
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <User size={14} className="text-[#c89b3c]" />
                    <span>{contact?.firstName}</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-5">{contact?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Details</p>
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <Calendar size={14} className="text-[#c89b3c]" />
                    <span>{formatDateTime(contact?.dT_Created)}</span>
                  </div>
                  <div className="mt-1 ml-5">
                    <ContactStatusPill status={contact?.status ?? "new"} />
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">Message</p>
                <div className="rounded-lg border border-gray-800 bg-black/40 p-4 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {contact?.messageBody}
                </div>
              </div>
            </>
          </div>

        {/* Action Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-800 bg-black/20">
          <button
            // onClick={() => setIsReplyOpen(true)}
            // disabled={isLoading || !contact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <Mail size={14} />
            Reply
          </button>

          <button
            // onClick={() => setConfirmOpen(true)}
            // disabled={isLoading || updating || contact?.status === 'resolved' || !contact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] transition-transform active:scale-95 disabled:opacity-50"
          >
            <CheckCircle2 size={14} />
            Mark Resolved
          </button>
        </div>
      </div>

      {/* <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleUpdateStatus}
        title="Resolve Message"
        description="Are you sure you want to mark this message as resolved? This action will notify the team."
        confirmText="Confirm"
        loading={updating}
      /> */}
    </Modal>
  );
}