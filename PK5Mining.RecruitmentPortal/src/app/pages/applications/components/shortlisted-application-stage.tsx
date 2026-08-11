import { useState } from "react";
import { motion } from "motion/react";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";

interface ShortlistedApplicationStageProps {
  handleSchedule: () => void;
  handleReschedule: (payload: {
    currentStatus: string;
    rescheduledDateTime: string;
    reason: string;
  }) => void;
}

export function ShortlistedApplicationStage({
  handleSchedule,
  handleReschedule,
}: ShortlistedApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [acknowledged, setAcknowledged] = useState(false);
  const [action, setAction] = useState("");
  const [rescheduledDateTime, setRescheduledDateTime] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const isSubmitDisabled =
    !acknowledged ||
    !action ||
    (action === "Reschedule" &&
      (!rescheduledDateTime || !rescheduleReason.trim())) ||
    (action === "Reject" && !rejectionReason.trim());

  const handleProceed = () => {
    switch (action) {
      case "Schedule":
        handleSchedule();
        break;

      case "Reschedule":
        handleReschedule({
          currentStatus: "Shortlisted",
          rescheduledDateTime,
          reason: rescheduleReason.trim(),
        });
        break;

      case "Reject":
        
        break;

      default:
        break;
    }
  };

  const getButtonLabel = () => {
    switch (action) {
      case "Schedule":
        return "Schedule";
      case "Reschedule":
        return "Reschedule";
      case "Reject":
        return "Reject";
      default:
        return "Proceed";
    }
  };

  return (
    <>
      <div>
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
                const value = e.target.value;

                setAction(value);
                setRescheduledDateTime("");
                setRescheduleReason("");
                setRejectionReason("");
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">Select Action</option>
              <option value="Schedule">Schedule</option>
              <option value="Reschedule">Reschedule</option>
              <option value="Reject">Reject</option>
            </select>
          </div>

          {/* Rescheduled Date & Time */}
          {action === "Reschedule" && (
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Rescheduled Date & Time
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                type="datetime-local"
                value={rescheduledDateTime}
                onChange={(e) => setRescheduledDateTime(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c]"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              />
            </div>
          )}

          {/* Reason for Reschedule */}
          {action === "Reschedule" && (
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Reason for Reschedule
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                rows={4}
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                placeholder="Enter reason for rescheduling..."
                className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] resize-none"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              />
            </div>
          )}

          {/* Reason for Rejection */}
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
          onClick={handleProceed}
        >
          {getButtonLabel()}
        </motion.button>
      </div>
    </>
  );
}
