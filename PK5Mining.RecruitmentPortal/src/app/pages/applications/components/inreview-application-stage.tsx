import { useState } from "react";
import { motion } from "motion/react";
import { DatePicker } from "@/app/components/ui/date-picker";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";
import { formatDateTime } from "@/app/utils/helper";
import { ApplicationStageButton } from "@/app/interfaces";

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
      "This will shortlist the candidate and record the scheduled activity in the timeline.",
    btnBgColor: "",
  },
} as const;

interface InreviewApplicationStageProps {
  loading: boolean;
  handleInReviewApplicationStage: (payload: any) => void;
}

export function InreviewApplicationStage({
  loading,
  handleInReviewApplicationStage,
}: InreviewApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const [acknowledged, setAcknowledged] = useState(false);
  const [action, setAction] = useState<ApplicationStageButton | string>("");

  const [nextProcess, setNextProcess] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [assessmentType, setAssessmentType] = useState("");

  const [onlineAssessmentLink, setOnlineAssessmentLink] = useState("");

  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  const [venueAddress, setVenueAddress] = useState("Corporate Office Address");

  const [rejectionReason, setRejectionReason] = useState("");

  const [panelists, setPanelists] = useState<string[]>([]);

  const addPanelist = () => {
    setPanelists((prev) => [...prev, input]);
    setInput("");
  };

  const removePanelist = (index: number) => {
    setPanelists((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePanelist = (index: number, value: string) => {
    setPanelists((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const showScheduledSection =
    nextProcess === "Interview" || assessmentType === "In-person";

  const showVenue =
    interviewType === "Onsite" || assessmentType === "In-person";

  const showDeadlineSection = assessmentType === "Online";

  const onSubmit = () => {
    const rejectPayload = {
      currentStatus: "In Review",
      rejectionReason: rejectionReason.trim(),
      employeeId: user?.id ?? "",
    };

    const basePayload = {
      currentStatus: "In Review",
      employeeId: user?.id ?? "",
      nextProcess,
    };

    let payload = {};

    if (nextProcess === "Assessment") {
      payload = {
        ...basePayload,
        assessmentType,

        ...(assessmentType === "Online" && {
          onlineAssessmentLink,
          deadlineDate,
          deadlineTime,
        }),

        ...(assessmentType === "In-person" && {
          scheduledDate,
          scheduledTime,
          venueAddress,
        }),
      };
    }

    if (nextProcess === "Interview") {
      payload = {
        ...basePayload,
        interviewType,
        panelists: panelists.filter((p) => p.trim()),

        scheduledDate,
        scheduledTime,

        ...(interviewType === "Onsite" && {
          venueAddress,
        }),
      };
    }

    handleInReviewApplicationStage(payload);
  };

  const handleCancel = () => {
    setRejectionReason("");
    setAction("");
    setAcknowledged(false);
  };

  const isAssessmentValid =
    nextProcess === "Assessment" &&
    ((assessmentType === "Online" &&
      onlineAssessmentLink.trim() &&
      deadlineDate &&
      deadlineTime) ||
      (assessmentType === "In-person" &&
        scheduledDate &&
        scheduledTime &&
        venueAddress.trim()));

  const isInterviewValid =
    nextProcess === "Interview" &&
    interviewType &&
    scheduledDate &&
    scheduledTime &&
    panelists.some((p) => p.trim()) &&
    (interviewType === "Virtual" ||
      (interviewType === "Onsite" && venueAddress.trim()));

  const isProceedValid = nextProcess && (isAssessmentValid || isInterviewValid);

  const isSubmitDisabled =
    !acknowledged ||
    !action ||
    (action === "Reject" && !rejectionReason.trim()) ||
    (action === "Proceed" && !isProceedValid);

  const content =
    action in confirmModalContent
      ? confirmModalContent[action as keyof typeof confirmModalContent]
      : undefined;

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
            <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
              Action
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              value={action}
              disabled={!acknowledged}
              onChange={(e) => {
                setAction(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-800 disabled:opacity-50"
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

          {/* Proceed Flow */}
          {action === "Proceed" && (
            <>
              {/* Next Process */}
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Next Process
                </label>

                <select
                  value={nextProcess}
                  onChange={(e) => setNextProcess(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800"
                  style={{
                    backgroundColor: colors.textInputBgColor,
                    color: colors.text,
                  }}
                >
                  <option value="">Select Process</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Interview">Interview</option>
                </select>
              </div>

              {/* Interview */}
              {nextProcess === "Interview" && (
                <>
                  <div>
                    <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                      Interview Type
                    </label>

                    <select
                      value={interviewType}
                      onChange={(e) => setInterviewType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-800"
                      style={{
                        backgroundColor: colors.textInputBgColor,
                        color: colors.text,
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                  </div>

                  {/* Interviewers */}
                  <div>
                    <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                      Interviewers / Panelists
                    </label>

                    <div className="flex gap-[8px] mb-[8px]">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addPanelist();
                          }
                        }}
                        placeholder="Type name and press Enter or Add"
                        className="w-full px-4 py-3 rounded-lg border border-gray-800"
                        style={{
                          backgroundColor: colors.textInputBgColor,
                          color: colors.text,
                        }}
                      />
                      <button
                        type="button"
                        onClick={addPanelist}
                        className="px-[14px] py-[10px] rounded-[10px] bg-[#C89B3C] text-white font-['Inter',sans-serif] font-semibold text-[13px] hover:bg-[#D8AC47] transition-colors cursor-pointer shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                    {panelists.length > 0 ? (
                      <div className="flex flex-wrap gap-[8px] mt-[6px]">
                        {panelists.map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-[6px] bg-[#FDF6E7] border border-[#E8D4A0] rounded-full px-[12px] py-[5px]"
                          >
                            <span className="font-['Inter',sans-serif] text-[13px] text-[#92650A] font-medium">
                              {p}
                            </span>
                            <button
                              type="button"
                              onClick={() => removePanelist(i)}
                              className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors cursor-pointer ml-[2px]"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M2 2l8 8M10 2l-8 8"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#9CA3AF] mt-[4px]">
                        No panelists added yet.
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Assessment */}
              {nextProcess === "Assessment" && (
                <>
                  <div>
                    <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                      Assessment Type
                    </label>

                    <select
                      value={assessmentType}
                      onChange={(e) => setAssessmentType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-800"
                      style={{
                        backgroundColor: colors.textInputBgColor,
                        color: colors.text,
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Online">Online</option>
                      <option value="In-person">In-person</option>
                    </select>
                  </div>

                  {assessmentType === "Online" && (
                    <>
                      <div>
                        <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                          Online Assessment Link
                        </label>

                        <input
                          value={onlineAssessmentLink}
                          onChange={(e) =>
                            setOnlineAssessmentLink(e.target.value)
                          }
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
                            Deadline Date
                          </label>
                          <DatePicker
                            name="deadlineDate"
                            value={
                              deadlineDate
                                ? formatDateTime(deadlineDate, false)
                                : ""
                            }
                            onChange={(value) => setDeadlineDate(value)}
                            minDate={new Date()}
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                            Deadline Time
                          </label>
                          <input
                            type="time"
                            value={deadlineTime}
                            onChange={(e) => setDeadlineTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-800"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Scheduled Date/Time */}
              {showScheduledSection && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                      Scheduled Date
                    </label>

                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                      Scheduled Time
                    </label>

                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-800"
                    />
                  </div>
                </div>
              )}

              {/* Venue */}
              {showVenue && (
                <div>
                  <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                    Venue Address
                  </label>

                  <input
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-800"
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                </div>
              )}
            </>
          )}

          {/* Reject */}
          {action === "Reject" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Reason for Rejection
              </label>

              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_REJECTION_REASON)
                    setRejectionReason(e.target.value);
                }}
                placeholder="Enter reason for rejection..."
                className="w-full px-4 py-3 rounded-lg border border-gray-800 resize-none"
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
          onClick={() => setConfirmOpen(true)}
          className="w-full px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor:
              action === "Reject" ? content?.btnBgColor : colors.accent,
          }}
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
          confirmText="Yes, Shortlist"
          cancelText="Cancel"
          confirmBtnColor={content.btnBgColor}
          loading={loading}
        />
      )}
    </>
  );
}
