import { useState } from "react";
import { motion } from "motion/react";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { useTenant } from "@/tenants/useTenant";
import { StatusConfirmation } from "./status-confirmation";
import { useAuth } from "@/app/context/AuthContext";

const confirmModalContent = {
  Reject: {
    Declined: {
      title: "Decline Offer?",
      description: "This will record the offer as declined by the candidate.",
    },
    Withdrawn: {
      title: "Withdraw Offer?",
      description: "This will record the offer as withdrawn by the company",
    },
    btnBgColor: "#EF4444",
  },
  Proceed: {
    title: "Mark as Hired?",
    description:
      "Are you sure you want to mark this candidate as hired? This will initiate the preboarding process.",
    btnBgColor: "",
  },
} as const;

interface OfferStagePayload {
  action: "Proceed" | "Reject";
  rejectionDecision?: "Declined" | "Withdrawn";
  rejectionReason?: string;
}

interface OfferSentApplicationStageProps {
  loading: boolean;
  handleProceedWithApplication: () => void;
}

export function OfferSentApplicationStage({
  loading,
  handleProceedWithApplication,
}: OfferSentApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [acknowledged, setAcknowledged] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [action, setAction] = useState<"" | "Proceed" | "Reject">("");

  const [rejectionDecision, setRejectionDecision] = useState<
    "" | "Declined" | "Withdrawn"
  >("");

  const [rejectionReason, setRejectionReason] = useState("");

  const isSubmitDisabled =
    !acknowledged ||
    !action ||
    (action === "Reject" && (!rejectionDecision || !rejectionReason.trim()));

  const getButtonLabel = () => {
    if (action === "Proceed") {
      return "Hired";
    }

    if (action === "Reject" && rejectionDecision === "Declined") {
      return "Decline Offer";
    }

    if (action === "Reject" && rejectionDecision === "Withdrawn") {
      return "Withdraw Offer";
    }

    return "Proceed";
  };

  const onSubmit = () => {
    if (action === "Proceed") {
      handleProceedWithApplication();
      return;
    }
  };

  const handleCancel = () => {
    setRejectionReason("");
    setRejectionDecision("");
    setAction("");
    setAcknowledged(false);
  };

  const content =
    action === "Proceed"
      ? confirmModalContent.Proceed
      : action === "Reject" && rejectionDecision
        ? {
            ...confirmModalContent.Reject[rejectionDecision],
            btnBgColor: confirmModalContent.Reject.btnBgColor,
          }
        : undefined;

  return (
    <>
      <div>
        <form className="py-6 space-y-6">
          {/* Acknowledgement */}
          <StatusConfirmation
            title="I confirm that I have reviewed the offer outcome and all relevant documentation."
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
                const value = e.target.value as "" | "Proceed" | "Reject";

                setAction(value);

                setRejectionDecision("");
                setRejectionReason("");
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">Select Action</option>
              <option value="Proceed">Proceed</option>
              <option value="Reject">Reject</option>
            </select>
          </div>

          {/* Rejection Decision */}
          {action === "Reject" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Rejection Decision
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                value={rejectionDecision}
                onChange={(e) =>
                  setRejectionDecision(
                    e.target.value as "" | "Declined" | "Withdrawn",
                  )
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c]"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              >
                <option value="">Select Decision</option>
                <option value="Declined">Declined Offer</option>
                <option value="Withdrawn">Withdrawn Offer</option>
              </select>
            </div>
          )}

          {/* Reason For Rejection */}
          {action === "Reject" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Reason for Rejection
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] resize-none"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              />
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3">
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
