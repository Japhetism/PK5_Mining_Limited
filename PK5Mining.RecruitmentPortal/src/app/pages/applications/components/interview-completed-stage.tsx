import { useState } from "react";
import { motion } from "motion/react";
import { Upload } from "lucide-react";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { SummaryCard } from "./summary-card";

interface SendOfferPayload {
  assessmentResult: File;
  offerMethod: "Upload" | "Link";
  offerLetterFile?: File | null;
  offerLetterLink?: string;
}

interface InterviewCompletedApplicationStageProps {
  loading: boolean;
  handleSendOffer: (payload: SendOfferPayload) => void;
}

export function InterviewCompletedApplicationStage({
  loading,
  handleSendOffer,
}: InterviewCompletedApplicationStageProps) {
  const { colors } = useTenant();

  const [acknowledged, setAcknowledged] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [assessmentResult, setAssessmentResult] = useState<File | null>(null);

  const [offerMethod, setOfferMethod] = useState<"" | "Upload" | "Link">("");

  const [offerLetterFile, setOfferLetterFile] = useState<File | null>(null);

  const [offerLetterLink, setOfferLetterLink] = useState("");

  const hasOfferLetter =
    (offerMethod === "Upload" && offerLetterFile) ||
    (offerMethod === "Link" && offerLetterLink.trim());

  const isSubmitDisabled =
    !acknowledged || !assessmentResult || !hasOfferLetter;

  const onSubmit = () => {
    if (!assessmentResult) return;

    handleSendOffer({
      assessmentResult,
      offerMethod: offerMethod as "Upload" | "Link",
      offerLetterFile,
      offerLetterLink:
        offerMethod === "Link" ? offerLetterLink.trim() : undefined,
    });
  };

  return (
    <>
      <div>
        <form className="py-6 space-y-6">
          {/* Summary */}
          <SummaryCard
            title="Interview Details"
            rows={[
              { label: "Interview Date", value: "22 Apr 2026" },
              { label: "Interview Time", value: "10:00 AM" },
              { label: "Interview Type", value: "Virtual" },
              {
                label: "Interviewers / Panelists",
                value: "Sarah M., James K.",
              },
              {
                label: "Venue / Meeting Link",
                value: "https://meet.pk5.io/room-a",
              },
              {
                label: "Reviews",
                value: "Strong Hire — Excellent performance across all rounds.",
              },
            ]}
          />
          {/* Acknowledgement */}
          <StatusConfirmation
            isConfirmed={acknowledged}
            setIsConfirmed={setAcknowledged}
            title="I confirm that all interview stages are complete and this candidate is approved for an offer."
          />

          {/* Assessment Result Upload */}
          <div>
            <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
              Assessment Result
              <span className="ml-1 text-red-500">*</span>
            </label>

            <label
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-700 ${
                acknowledged
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
              style={{
                backgroundColor: colors.textInputBgColor,
              }}
            >
              <Upload size={18} />

              <span
                className="text-sm"
                style={{
                  color: colors.text,
                }}
              >
                {assessmentResult
                  ? assessmentResult.name
                  : "Upload Assessment Result"}
              </span>

              <input
                type="file"
                disabled={!acknowledged}
                className="hidden"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.csv"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;

                  setAssessmentResult(file);
                }}
              />
            </label>
          </div>

          {/* Offer Letter Method */}
          <div>
            <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
              Offer Letter Method
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              value={offerMethod}
              disabled={!acknowledged}
              onChange={(e) => {
                const value = e.target.value as "" | "Upload" | "Link";

                setOfferMethod(value);
                setOfferLetterFile(null);
                setOfferLetterLink("");
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">Select Method</option>
              <option value="Upload">Upload Offer Letter</option>
              <option value="Link">Offer Letter Link</option>
            </select>
          </div>

          {/* Offer Letter Upload */}
          {offerMethod === "Upload" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Offer Letter
                <span className="ml-1 text-red-500">*</span>
              </label>

              <label
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-700 cursor-pointer"
                style={{
                  backgroundColor: colors.textInputBgColor,
                }}
              >
                <Upload size={18} />

                <span
                  className="text-sm"
                  style={{
                    color: colors.text,
                  }}
                >
                  {offerLetterFile
                    ? offerLetterFile.name
                    : "Upload Offer Letter"}
                </span>

                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;

                    setOfferLetterFile(file);
                  }}
                />
              </label>
            </div>
          )}

          {/* Offer Letter Link */}
          {offerMethod === "Link" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Offer Letter Link
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                type="url"
                value={offerLetterLink}
                onChange={(e) => setOfferLetterLink(e.target.value)}
                placeholder="https://example.com/offer-letter"
                className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c]"
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
          whileHover={
            !isSubmitDisabled
              ? {
                  scale: 1.02,
                }
              : undefined
          }
          whileTap={
            !isSubmitDisabled
              ? {
                  scale: 0.98,
                }
              : undefined
          }
          onClick={() => setConfirmOpen(true)}
          className="px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor: colors.accent,
          }}
        >
          Send Offer
        </motion.button>
      </div>

      {/* Confirmation Modal */}
      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={onSubmit}
          title="Send Offer?"
          description="Are you sure you want to send this offer to the candidate? This will update the candidate status to Offer Sent."
          confirmText="Yes, Send Offer"
          cancelText="Cancel"
          loading={loading}
        />
      )}
    </>
  );
}
