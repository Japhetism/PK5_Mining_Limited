import { useState } from "react";
import { motion } from "motion/react";
import { useTenant } from "@/tenants/useTenant";
import { StatusConfirmation } from "./status-confirmation";
import { useAuth } from "@/app/context/AuthContext";
import { RejectApplicationPayload } from "@/app/interfaces";

interface OfferStagePayload {
  action: "Proceed" | "Reject";
  rejectionDecision?: "Declined Offer" | "Withdrawn Offer";
  rejectionReason?: string;
}

interface OfferSentApplicationStageProps {
  handleProceedWithApplication: () => void;
  handleRejectApplication: (
    payload: Omit<RejectApplicationPayload, "id">,
  ) => void;
}

export function OfferSentApplicationStage({
  handleProceedWithApplication,
  handleRejectApplication,
}: OfferSentApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [acknowledged, setAcknowledged] = useState(false);

  const [action, setAction] = useState<"" | "Proceed" | "Reject">("");

  const [rejectionDecision, setRejectionDecision] = useState<
    "" | "Declined Offer" | "Withdrawn Offer"
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

    if (action === "Reject" && rejectionDecision === "Declined Offer") {
      return "Decline Offer";
    }

    if (action === "Reject" && rejectionDecision === "Withdrawn Offer") {
      return "Withdraw Offer";
    }

    return "Proceed";
  };

  const handleSubmit = () => {
    if (action === "Proceed") {
      handleProceedWithApplication();
      return;
    }

    handleRejectApplication({
      currentStatus: "Offer Sent",
      rejectionReason: rejectionReason.trim(),
      employeeId: user?.id ?? "",
    });
  };

  return (
    <>
      <div>
        <form className="py-6 space-y-6">
          {/* Acknowledgement */}
          <StatusConfirmation
            isConfirmed={acknowledged}
            setIsConfirmed={setAcknowledged}
          />

          {/* Action */}
          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{
                color: colors.text,
              }}
            >
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
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{
                  color: colors.text,
                }}
              >
                Rejection Decision
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                value={rejectionDecision}
                onChange={(e) =>
                  setRejectionDecision(
                    e.target.value as "" | "Declined Offer" | "Withdrawn Offer",
                  )
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c]"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              >
                <option value="">Select Decision</option>
                <option value="Declined Offer">Declined Offer</option>
                <option value="Withdrawn Offer">Withdrawn Offer</option>
              </select>
            </div>
          )}

          {/* Reason For Rejection */}
          {action === "Reject" && (
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{
                  color: colors.text,
                }}
              >
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
          className="px-6 py-2 rounded-lg border border-gray-700 text-[16px]"
          style={{
            color: colors.text,
          }}
        >
          Cancel
        </button>

        <motion.button
          type="button"
          disabled={isSubmitDisabled}
          whileHover={!isSubmitDisabled ? { scale: 1.02 } : undefined}
          whileTap={!isSubmitDisabled ? { scale: 0.98 } : undefined}
          onClick={handleSubmit}
          className="px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor: colors.accent,
          }}
        >
          {getButtonLabel()}
        </motion.button>
      </div>
    </>
  );
}
