import { useState } from "react";
import { motion } from "motion/react";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import {
  ApplicationStageButton,
  InReviewApplicationStagePayload,
} from "@/app/interfaces";

const MAX_REJECTION_REASON = 500;

const confirmModalContent = {
  Reject: {
    title: "Reject Application?",
    description:
      "This action will reject the candidate's application and log the reason to the timeline.",
    btnBgColor: "#EF4444",
  },
  Proceed: {
    title: "Shortlist Candidate?",
    description:
      "This will shortlist the candidate.",
    btnBgColor: "",
  },
} as const;

interface InreviewApplicationStageProps {
  loading: boolean;
  handleInReviewApplicationStage: (
    payload: Omit<InReviewApplicationStagePayload, "applicationId">,
  ) => void;
}

export function InreviewApplicationStage({
  loading,
  handleInReviewApplicationStage,
}: InreviewApplicationStageProps) {
  const { colors } = useTenant();

  const [acknowledged, setAcknowledged] = useState(false);
  const [action, setAction] = useState<ApplicationStageButton | string>("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const isSubmitDisabled =
    !acknowledged ||
    !action ||
    (action === "Reject" && !rejectionReason.trim());

  const onSubmit = () => {
    if (action) {
      const payload: Omit<InReviewApplicationStagePayload, "applicationId"> = {
        rejectionReason: rejectionReason.trim(),
        action: action as ApplicationStageButton,
      };

      handleInReviewApplicationStage(payload);
    }
  };

  const handleCancel = () => {
    setRejectionReason("");
    setAction("");
    setAcknowledged(false);
  };

  const content =
    action in confirmModalContent
      ? confirmModalContent[action as keyof typeof confirmModalContent]
      : undefined;

  return (
    <>
      <div>
        {/* Body */}
        <form className="py-6 space-y-6">
          {/* Acknowledgment */}
          <StatusConfirmation
            isConfirmed={acknowledged}
            setIsConfirmed={setAcknowledged}
          />

          {/* Action */}
          <div>
            <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
              Action
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              value={action}
              disabled={!acknowledged}
              onChange={(e) => {
                setAction(e.target.value as ApplicationStageButton);

                if (e.target.value !== "Reject") {
                  setRejectionReason("");
                }
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">Select an action...</option>
              <option value="Proceed">Proceed to Shortlisted</option>
              <option value="Reject">Reject Application</option>
            </select>
          </div>

          {/* Reason For Rejection */}
          {action === "Reject" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Reason for Rejection
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div>
                <textarea
                  rows={4}
                  value={rejectionReason}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_REJECTION_REASON)
                      setRejectionReason(e.target.value);
                  }}
                  placeholder="Please provide the reason for rejecting this candidate..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] resize-none"
                  style={{
                    backgroundColor: colors.textInputBgColor,
                    color: colors.text,
                  }}
                />
                <div className="flex justify-between mt-[5px]">
                  <span
                    className={`text-[12px] tabular-nums ml-auto ${rejectionReason.length > MAX_REJECTION_REASON * 0.9 ? "text-[#EF4444]" : "text-[#9CA3AF]"}`}
                  >
                    {rejectionReason.length}/{MAX_REJECTION_REASON}
                  </span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="flex space-between gap-3">
        <button
          type="button"
          className="w-full px-6 py-2 rounded-lg border border-gray-700 text-[16px]"
          style={{ color: colors.text }}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <motion.button
          type="button"
          disabled={isSubmitDisabled}
          whileHover={!isSubmitDisabled ? { scale: 1.02 } : undefined}
          whileTap={!isSubmitDisabled ? { scale: 0.98 } : undefined}
          className="w-full px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor:
              action === "Reject" ? content?.btnBgColor : colors.accent,
          }}
          onClick={() => setConfirmOpen(true)}
        >
          {action || "Proceed"}
        </motion.button>
      </div>

      {/* Confirmation Modal */}
      {content && (
        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={onSubmit}
          title={content.title}
          description={content.description}
          confirmText={`Yes, ${action}`}
          cancelText="Cancel"
          confirmBtnColor={content.btnBgColor}
          loading={loading}
        />
      )}
    </>
  );
}
