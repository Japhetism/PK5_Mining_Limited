import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { formatDateTime } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";
import { ContactReplyModal } from "@/app/components/ui/contact-reply-modal";
import { ContactDetailsSkeleton } from "@/app/components/ui/contact-details-skeleton";
import useContactDetailsViewModel from "./viewmodel";

export function ContactMessageDetails() {
  const {
    id,
    thread,
    contact,
    defaultReplySubject,
    isLoading,
    isError,
    isReplyOpen,
    replyMutation,
    statusMutation,
    markReadMutation,
    setIsReplyOpen,
  } = useContactDetailsViewModel();

  // If it's new, mark read once we have it
  if (contact?.status === "new" && !markReadMutation.isPending) {
    // fire and forget
    markReadMutation.mutate();
  }

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
            onClick={() => statusMutation.mutate("resolved")}
            disabled={statusMutation.isPending}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-800 bg-[#c89b3c]/10 hover:bg-[#c89b3c]/20 disabled:opacity-50"
          >
            <CheckCircle2 size={16} />
            Mark resolved
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h1 className="text-base font-semibold">{contact.subject}</h1>
            <p className="text-xs text-gray-400">
              From <span className="text-gray-200">{contact.name}</span> •{" "}
              <a className="underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              {contact.company ? ` • ${contact.company}` : ""}
            </p>
          </div>

          <div className="text-xs text-gray-400 gap-2 flex flex-col">
            <div>Created: {formatDateTime(contact.dT_Created)}</div>
            <div>
              Status: <ContactStatusPill status={contact.status} />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-black/20 p-3 text-sm text-gray-100 whitespace-pre-wrap">
          {contact.message}
        </div>
      </div>

      <div className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-4 sm:p-5">
        <h2 className="text-sm font-semibold">Replies</h2>
        <div className="mt-3 space-y-3">
          {thread?.replies?.length ? (
            thread.replies.map((r) => (
              <div
                key={r.id}
                className="rounded-lg border border-gray-800 bg-black/20 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-300">{r.subject}</div>
                  <div className="text-xs text-gray-500">
                    {formatDateTime(r.dT_Created)}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-100 whitespace-pre-wrap">
                  {r.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-400">No replies yet.</div>
          )}
        </div>
      </div>

      <ContactReplyModal
        open={isReplyOpen}
        onClose={() => setIsReplyOpen(false)}
        toEmail={contact.email}
        defaultSubject={defaultReplySubject}
        loading={replyMutation.isPending}
        onSend={(payload) => replyMutation.mutate(payload)}
      />
    </div>
  );
}
