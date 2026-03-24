import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { formatDateTime } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";
import { ContactReplyModal } from "@/app/components/ui/contact-reply-modal";
import { ContactDetailsSkeleton } from "@/app/components/ui/contact-details-skeleton";
import useContactDetailsViewModel from "./viewmodel";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";

export function ContactMessageDetails() {
  const {
    id,
    thread,
    contact,
    isLoading,
    isError,
    isReplyOpen,
    replyMutation,
    statusMutation,
    markReadMutation,
    confirmOpen,
    updating,
    setConfirmOpen,
    setIsReplyOpen,
    handleUpdateStatus,
  } = useContactDetailsViewModel();

  // If it's new, mark read once we have it
  

  if (!id) return null;

  if (isLoading) return <ContactDetailsSkeleton />;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => history.back()}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to contact messages
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReplyOpen(true)}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-800 bg-[#0f0f0f] hover:bg-[#151515]"
          >
            <Mail size={16} />
            Reply
          </button>

          <button
            onClick={() => setConfirmOpen(true)}
            disabled={updating}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-800 bg-[#c89b3c]/10 hover:bg-[#c89b3c]/20 disabled:opacity-50"
          >
            <CheckCircle2 size={16} />
            Mark resolved
          </button>
        </div>
      </div>
    </div>
  );
}
