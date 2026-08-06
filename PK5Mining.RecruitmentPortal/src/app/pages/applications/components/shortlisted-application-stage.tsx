import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";
import { RejectApplicationPayload } from "@/app/interfaces";

interface ShortlistedApplicationStageProps {
  onClose: () => void;
  handleSchedule: () => void;
  handleReschedule: (payload: {
    currentStatus: string,
    rescheduledDateTime: string;
    reason: string;
  }) => void;
  handleRejectApplication: (
    payload: Omit<RejectApplicationPayload, "id">,
  ) => void;
}

export function ShortlistedApplicationStage({
  onClose,
  handleSchedule,
  handleReschedule,
  handleRejectApplication,
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
        handleRejectApplication({
          currentStatus: "Shortlisted",
          rejectionReason: rejectionReason.trim(),
          employeeId: user?.id ?? "",
        });
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
      <div
        className="max-h-[60vh] overflow-y-auto scrollbar-black pr-2"
        style={
          {
            "--scrollbar-track": colors.bg,
          } as React.CSSProperties
        }
      >
        <form className="p-6 space-y-6">
          {/* Acknowledgment */}
          <div className="space-y-2">
            <label
              className="block text-[16px] font-semibold"
              style={{ color: colors.text }}
            >
              Acknowledgment
              <span className="ml-1 text-red-500">*</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="sr-only"
                checked={acknowledged}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setAcknowledged(checked);

                  if (!checked) {
                    setAction("");
                    setRescheduledDateTime("");
                    setRescheduleReason("");
                    setRejectionReason("");
                  }
                }}
              />

              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  acknowledged
                    ? "bg-[#c89b3c] border-[#c89b3c]"
                    : "border-gray-700 group-hover:border-gray-500"
                }`}
              >
                {acknowledged && (
                  <Check className="w-3 h-3 text-black stroke-[4px]" />
                )}
              </div>

              <span className="text-[14px]" style={{ color: colors.text }}>
                I confirm that the candidate's submission has been reviewed.
              </span>
            </label>
          </div>

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
          onClick={onClose}
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
