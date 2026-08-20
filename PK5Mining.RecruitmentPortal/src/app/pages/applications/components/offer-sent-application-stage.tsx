import { useState } from "react";
import { motion } from "motion/react";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { useTenant } from "@/tenants/useTenant";
import { StatusConfirmation } from "./status-confirmation";
import { useAuth } from "@/app/context/AuthContext";
import { DatePicker } from "@/app/components/ui/date-picker";
import { formatDateTime, parseDecisionDateTime } from "@/app/utils/helper";
import { OfferSentApplicationStagePayload } from "@/app/interfaces";

const confirmModalContent = {
  Reject: {
    "Declined Offer": {
      title: "Decline Offer?",
      description: "This will record the offer as declined by the candidate.",
    },
    "Withdrawn Offer": {
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
  handleOfferSentApplicationStage: (
    payload: Omit<OfferSentApplicationStagePayload, "applicationId">,
  ) => void;
}

export function OfferSentApplicationStage({
  loading,
  handleOfferSentApplicationStage,
}: OfferSentApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [acknowledged, setAcknowledged] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [action, setAction] = useState<"" | "Proceed" | "Reject">("");

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [managerName, setManagerName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");

  const [rejectionDecision, setRejectionDecision] = useState<
    "" | "Declined Offer" | "Withdrawn Offer"
  >("");

  const [rejectionReason, setRejectionReason] = useState("");

  const isSubmitDisabled =
    !acknowledged ||
    !action ||
    (action === "Proceed" &&
      (!startDate ||
        !startTime ||
        !managerName.trim() ||
        !contactPerson.trim())) ||
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

  const formatApiTime = (value?: string) => {
    if (!value) return value;

    const [hours, minutes] = value.split(":");
    if (!hours || !minutes) return value;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  const onSubmit = () => {
    if (action) {
      const payload: Omit<OfferSentApplicationStagePayload, "applicationId"> = {
        action: action,
        ...(managerName != null && managerName !== "" && { managerName }),
        ...(contactPerson != null && contactPerson !== "" && { contactPerson }),
        ...(startDate && {
          startDate: parseDecisionDateTime(startDate),
        }),
        ...(startTime != null && startTime !== "" && {
          startTime: formatApiTime(startTime),
        }),
        ...(rejectionReason != null &&
          rejectionReason !== "" && {
            rejectionReason: rejectionReason.trim(),
          }),
        ...(rejectionDecision != null &&
          rejectionDecision !== "" && {
            rejectionDecision,
          }),
      };

      handleOfferSentApplicationStage(payload);
    }
  };

  const handleCancel = () => {
    setRejectionReason("");
    setRejectionDecision("");
    setAction("");
    setAcknowledged(false);
    setManagerName("");
    setContactPerson("");
    setStartDate("");
    setStartTime("");
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

          {action === "Proceed" && (
            <>
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Manager's Name
                </label>

                <input
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800"
                  style={{
                    backgroundColor: colors.textInputBgColor,
                    color: colors.text,
                  }}
                />
              </div>

              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Contact Person
                </label>

                <input
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800"
                  style={{
                    backgroundColor: colors.textInputBgColor,
                    color: colors.text,
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                    Start Date
                  </label>

                  <DatePicker
                    name="startDate"
                    value={startDate ? formatDateTime(startDate, false) : ""}
                    onChange={(value) => setStartDate(value)}
                    minDate={new Date()}
                  />
                </div>

                <div>
                  <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                    Start Time
                  </label>

                  <input
                    name="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-800"
                  />
                </div>
              </div>
            </>
          )}

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
