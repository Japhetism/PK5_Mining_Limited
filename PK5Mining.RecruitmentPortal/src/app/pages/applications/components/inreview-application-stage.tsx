import { useState } from "react";
import { motion } from "motion/react";
import { Check, Plus, Trash2 } from "lucide-react";
import { useTenant } from "@/tenants/useTenant";
import { useAuth } from "@/app/context/AuthContext";
import { RejectApplicationPayload } from "@/app/interfaces";
import { DatePicker } from "@/app/components/ui/date-picker";
import { formatDateTime } from "@/app/utils/helper";

interface InreviewApplicationStageProps {
  onClose: () => void;
  handleProceedWithApplication: (payload: any) => void;
  handleRejectApplication: (
    payload: Omit<RejectApplicationPayload, "id">,
  ) => void;
}

export function InreviewApplicationStage({
  onClose,
  handleProceedWithApplication,
  handleRejectApplication,
}: InreviewApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [acknowledged, setAcknowledged] = useState(false);
  const [action, setAction] = useState("");

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

  const [panelists, setPanelists] = useState<string[]>([""]);

  const addPanelist = () => {
    setPanelists((prev) => [...prev, ""]);
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

  const handleReject = () => {
    const payload = {
      currentStatus: "In Review",
      rejectionReason: rejectionReason.trim(),
      employeeId: user?.id ?? "",
    };

    console.log("Rejecting application with payload:", payload);
    handleRejectApplication(payload);
  };

  const handleProceed = () => {
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

    console.log("Proceed Payload:", payload);
    handleProceedWithApplication(payload);
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
          {/* Acknowledgement */}
          <div className="space-y-2">
            <label
              className="block text-[16px] font-semibold"
              style={{ color: colors.text }}
            >
              Acknowledgement
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
                    setNextProcess("");
                    setInterviewType("");
                    setAssessmentType("");
                    setRejectionReason("");
                  }
                }}
              />

              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  acknowledged
                    ? "bg-[#c89b3c] border-[#c89b3c]"
                    : "border-gray-700"
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
                <label
                  className="block text-[16px] font-semibold mb-2"
                  style={{ color: colors.text }}
                >
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
                    <label
                      className="block text-[16px] font-semibold mb-2"
                      style={{ color: colors.text }}
                    >
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
                    <div className="flex justify-between items-center mb-3">
                      <label
                        className="text-[16px] font-semibold"
                        style={{ color: colors.text }}
                      >
                        Interviewers List
                      </label>

                      <button
                        type="button"
                        onClick={addPanelist}
                        className="flex items-center gap-2 text-[#c89b3c]"
                      >
                        <Plus size={16} />
                        Add Panelist
                      </button>
                    </div>

                    <div className="space-y-3">
                      {panelists.map((panelist, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            value={panelist}
                            onChange={(e) =>
                              updatePanelist(index, e.target.value)
                            }
                            placeholder="Enter interviewer"
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-800"
                            style={{
                              backgroundColor: colors.textInputBgColor,
                              color: colors.text,
                            }}
                          />

                          {panelists.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePanelist(index)}
                            >
                              <Trash2 size={18} className="text-red-500" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Assessment */}
              {nextProcess === "Assessment" && (
                <>
                  <div>
                    <label
                      className="block text-[16px] font-semibold mb-2"
                      style={{ color: colors.text }}
                    >
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
                        <label
                          className="block text-[16px] font-semibold mb-2"
                          style={{ color: colors.text }}
                        >
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
                          <label
                            className="mb-2 block"
                            style={{ color: colors.text }}
                          >
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
                          <label
                            className="mb-2 block"
                            style={{ color: colors.text }}
                          >
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
                    <label
                      className="block mb-2"
                      style={{ color: colors.text }}
                    >
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
                    <label
                      className="block mb-2"
                      style={{ color: colors.text }}
                    >
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
                  <label
                    className="block text-[16px] font-semibold mb-2"
                    style={{ color: colors.text }}
                  >
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
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Reason for Rejection
              </label>

              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full px-4 py-3 rounded-lg border border-gray-800 resize-none"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              />
            </div>
          )}
        </form>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg border border-gray-700"
          style={{ color: colors.text }}
        >
          Cancel
        </button>

        <motion.button
          type="button"
          disabled={isSubmitDisabled}
          whileHover={!isSubmitDisabled ? { scale: 1.02 } : undefined}
          whileTap={!isSubmitDisabled ? { scale: 0.98 } : undefined}
          onClick={action === "Reject" ? handleReject : handleProceed}
          className="px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor: colors.accent,
          }}
        >
          {action === "Reject" ? "Reject" : "Proceed"}
        </motion.button>
      </div>
    </>
  );
}
