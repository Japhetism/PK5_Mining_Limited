import { useState } from "react";
import { motion } from "motion/react";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import { DatePicker } from "@/app/components/ui/date-picker";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { ApplicationStageButton } from "@/app/interfaces";
import { formatDateTime } from "@/app/utils/helper";

const MAX_REJECTION_REASON = 500;

const confirmModalContent = {
  Reject: {
    title: "Reject Application?",
    description:
      "This action will reject the candidate's application and log the reason to the timeline.",
    btnBgColor: "#EF4444",
  },
  Schedule: {
    title: "Schedule Candidate?",
    description: "Are you sure you want to schedule this candidate?",
    btnBgColor: "",
  },
  Reschedule: {
    title: "Reschedule Candidate?",
    description: "Are you sure you want to reschedule this candidate?",
    btnBgColor: "",
  },
} as const;

interface ShortlistedApplicationStageProps {
  loading: boolean;
  handleShortlistedApplicationStage: (payload: any) => void;
}

export function ShortlistedApplicationStage({
  loading,
  handleShortlistedApplicationStage,
}: ShortlistedApplicationStageProps) {
  const { colors } = useTenant();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [action, setAction] = useState<ApplicationStageButton | string>("");
  const [rescheduledDate, setRescheduledDate] = useState("");
  const [rescheduledTime, setRescheduledTime] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const isSubmitDisabled =
    !acknowledged ||
    !action ||
    (action === "Reschedule" &&
      (!rescheduledDate || !rescheduledTime || !rescheduleReason.trim())) ||
    (action === "Reject" && !rejectionReason.trim());

  const onSubmit = () => {};

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
                const value = e.target.value;

                setAction(value);
                setRescheduledDate("");
                setRescheduledTime("");
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Rescheduled Date
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <DatePicker
                  name="rescheduleDate"
                  value={
                    rescheduledDate
                      ? formatDateTime(rescheduledDate, false)
                      : ""
                  }
                  onChange={(value) => setRescheduledDate(value)}
                  minDate={new Date()}
                />
              </div>

              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Rescheduled Time
                </label>
                <input
                  type="time"
                  value={rescheduledTime}
                  onChange={(e) => setRescheduledTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800"
                />
              </div>
            </div>
          )}

          {/* Reason for Reschedule */}
          {action === "Reschedule" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
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
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Reason for Rejection
                <span className="ml-1 text-red-500">*</span>
              </label>

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
