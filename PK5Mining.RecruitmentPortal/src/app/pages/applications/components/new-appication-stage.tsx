import { useState } from "react";
import { motion } from "motion/react";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";
import { RejectApplicationPayload } from "@/app/interfaces";

interface NewApplicationStageProps {
  handleUpdateStatus: () => void;
  handleRejectApplication: (
    payload: Omit<RejectApplicationPayload, "id">
  ) => void;
}

export function NewApplicationStage({
  handleUpdateStatus,
  handleRejectApplication,
}: NewApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [acknowledged, setAcknowledged] = useState(false);
  const [action, setAction] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const isSubmitDisabled =
    !acknowledged ||
    !action ||
    (action === "Reject" && !rejectionReason.trim());

  const handleProceed = () => {
    handleUpdateStatus();
  };

  const handleReject = () => {
    const payload = {
      currentStatus: "new",
      rejectionReason: rejectionReason.trim(),
      employeeId: user?.id ?? "",
    };

    console.log("Rejecting application with payload:", payload);
    handleRejectApplication(payload);
  };

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
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Action
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              value={action}
              disabled={!acknowledged}
              onChange={(e) => {
                setAction(e.target.value);

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
              <option value="">Select Action</option>
              <option value="Proceed">Proceed</option>
              <option value="Reject">Reject</option>
            </select>
          </div>

          {/* Reason For Rejection */}
          {action === "Reject" && (
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Reason for Rejection
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
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
          style={{ color: colors.text }}
        >
          Cancel
        </button>

        <motion.button
          type="button"
          disabled={isSubmitDisabled}
          whileHover={!isSubmitDisabled ? { scale: 1.02 } : undefined}
          whileTap={!isSubmitDisabled ? { scale: 0.98 } : undefined}
          className="px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor: colors.accent,
          }}
          onClick={action === "Reject" ? handleReject : handleProceed}
        >
          {action === "Reject" ? "Reject" : "Proceed"}
        </motion.button>
      </div>
    </>
  );
}
