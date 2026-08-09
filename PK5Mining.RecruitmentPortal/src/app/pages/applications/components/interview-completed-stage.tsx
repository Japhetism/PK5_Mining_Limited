import { useState } from "react";
import { motion } from "motion/react";
import { Upload } from "lucide-react";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";

interface SendOfferPayload {
  assessmentResult: File;
  offerMethod: "Upload" | "Link";
  offerLetterFile?: File | null;
  offerLetterLink?: string;
}

interface InterviewCompletedApplicationStageProps {
  handleSendOffer: (payload: SendOfferPayload) => void;
}

export function InterviewCompletedApplicationStage({
  handleSendOffer,
}: InterviewCompletedApplicationStageProps) {
  const { colors } = useTenant();

  const [acknowledged, setAcknowledged] = useState(false);

  const [assessmentResult, setAssessmentResult] = useState<File | null>(null);

  const [offerMethod, setOfferMethod] = useState<"" | "Upload" | "Link">("");

  const [offerLetterFile, setOfferLetterFile] = useState<File | null>(null);

  const [offerLetterLink, setOfferLetterLink] = useState("");

  const hasOfferLetter =
    (offerMethod === "Upload" && offerLetterFile) ||
    (offerMethod === "Link" && offerLetterLink.trim());

  const isSubmitDisabled =
    !acknowledged || !assessmentResult || !hasOfferLetter;

  const handleProceed = () => {
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
          {/* Acknowledgement */}
          <StatusConfirmation
            isConfirmed={acknowledged}
            setIsConfirmed={setAcknowledged}
          />

          {/* Assessment Result Upload */}
          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
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
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
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
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{
                  color: colors.text,
                }}
              >
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
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{
                  color: colors.text,
                }}
              >
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
          onClick={handleProceed}
          className="px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor: colors.accent,
          }}
        >
          Send Offer
        </motion.button>
      </div>
    </>
  );
}
