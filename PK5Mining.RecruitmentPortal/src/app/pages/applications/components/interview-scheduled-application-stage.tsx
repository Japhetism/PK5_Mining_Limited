import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Trash2 } from "lucide-react";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import { RejectApplicationPayload } from "@/app/interfaces";
import { useAuth } from "@/app/context/AuthContext";

interface InterviewScheduledApplicationStageProps {
  isAssessmentSchedule?: boolean;
  corporateOfficeAddress?: string;
  handleProceedWithApplication: (payload: any) => void;
}

export function InterviewScheduledApplicationStage({
  isAssessmentSchedule = false,
  corporateOfficeAddress = "Corporate Office Address",
  handleProceedWithApplication,
}: InterviewScheduledApplicationStageProps) {
  const { colors } = useTenant();
  const { user } = useAuth();

  const [acknowledged, setAcknowledged] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState("");
  const [reviews, setReviews] = useState("");
  const [action, setAction] = useState("");

  const [nextProcess, setNextProcess] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [assessmentType, setAssessmentType] = useState("");

  const [onlineAssessmentLink, setOnlineAssessmentLink] = useState("");

  const [venueAddress, setVenueAddress] = useState(corporateOfficeAddress);

  const [rejectionReason, setRejectionReason] = useState("");

  const [panelists, setPanelists] = useState<string[]>([]);
  const [panelistName, setPanelistName] = useState("");

  const addPanelist = () => {
    if (!panelistName.trim()) return;

    setPanelists((prev) => [...prev, panelistName.trim()]);
    setPanelistName("");
  };

  const removePanelist = (index: number) => {
    setPanelists((prev) => prev.filter((_, i) => i !== index));
  };

  const requiresVenue =
    (nextProcess === "Assessment" && assessmentType === "In-person") ||
    (nextProcess === "Interview" && interviewType === "Onsite");

  const isSubmitDisabled =
    !acknowledged ||
    !reviews.trim() ||
    !action ||
    (action === "Proceed" && !nextProcess) ||
    (nextProcess === "Assessment" && !assessmentType) ||
    (assessmentType === "Online" && !onlineAssessmentLink.trim()) ||
    (requiresVenue && !venueAddress.trim()) ||
    (nextProcess === "Interview" && !interviewType) ||
    (interviewType === "Onsite" && panelists.length === 0) ||
    (action === "Reject" && !rejectionReason.trim());

  const onSubmit = () => {
    if (action === "Reject") {
      return;
    }

    handleProceedWithApplication({
      assessmentResult,
      reviews,
      action,
      nextProcess,
      interviewType,
      assessmentType,
      onlineAssessmentLink,
      venueAddress,
      panelists,
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

          {/* Assessment Result */}
          {isAssessmentSchedule && (
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Assessment Result
              </label>

              <input
                type="text"
                value={assessmentResult}
                onChange={(e) => setAssessmentResult(e.target.value)}
                placeholder="Enter candidate score"
                className="w-full px-4 py-3 rounded-lg border border-gray-800"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              />
            </div>
          )}

          {/* Reviews */}
          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Reviews
              <span className="ml-1 text-red-500">*</span>
            </label>

            <textarea
              rows={4}
              value={reviews}
              disabled={!acknowledged}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="Enter reviews from reviewers / panelists"
              className="w-full px-4 py-3 rounded-lg border border-gray-800 resize-none disabled:opacity-50"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
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
              onChange={(e) => setAction(e.target.value)}
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

          {/* Next Process */}
          {action === "Proceed" && (
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Next Process
                <span className="ml-1 text-red-500">*</span>
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
                <option value="">Select Next Process</option>
                <option value="Assessment">Assessment</option>
                <option value="Interview">Interview</option>
                <option value="Interview Completed">Interview Completed</option>
              </select>
            </div>
          )}

          {/* Assessment Type */}
          {nextProcess === "Assessment" && (
            <div>
              <label
                className="block mb-2 text-[16px] font-semibold"
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
                <option value="">Select Assessment Type</option>
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </select>
            </div>
          )}

          {/* Online Assessment Link */}
          {assessmentType === "Online" && (
            <div>
              <label
                className="block mb-2 text-[16px] font-semibold"
                style={{ color: colors.text }}
              >
                Online Assessment Link
              </label>

              <input
                type="text"
                value={onlineAssessmentLink}
                onChange={(e) => setOnlineAssessmentLink(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-800"
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              />
            </div>
          )}

          {/* Interview Type */}
          {nextProcess === "Interview" && (
            <div>
              <label
                className="block mb-2 text-[16px] font-semibold"
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
                <option value="">Select Interview Type</option>
                <option value="Virtual">Virtual</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>
          )}

          {/* Panelists */}
          {interviewType === "Onsite" && (
            <div>
              <label
                className="block mb-2 text-[16px] font-semibold"
                style={{ color: colors.text }}
              >
                Interviewers List
              </label>

              <div className="flex gap-2 mb-3">
                <input
                  value={panelistName}
                  onChange={(e) => setPanelistName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-800"
                  style={{
                    backgroundColor: colors.textInputBgColor,
                    color: colors.text,
                  }}
                />

                <button
                  type="button"
                  onClick={addPanelist}
                  className="px-4 rounded-lg"
                >
                  <Plus size={18} />
                </button>
              </div>

              {panelists.map((panelist, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2 p-2 border rounded-lg"
                >
                  <span>{panelist}</span>

                  <button type="button" onClick={() => removePanelist(index)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Venue Address */}
          {requiresVenue && (
            <div>
              <label
                className="block mb-2 text-[16px] font-semibold"
                style={{ color: colors.text }}
              >
                Venue Address
              </label>

              <input
                type="text"
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

          {/* Rejection Reason */}
          {action === "Reject" && (
            <div>
              <label
                className="block mb-2 text-[16px] font-semibold"
                style={{ color: colors.text }}
              >
                Reason for Rejection
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
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

      {/* Footer */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
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
          onClick={onSubmit}
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
