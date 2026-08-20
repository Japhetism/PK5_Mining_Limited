import { act, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Upload } from "lucide-react";
import { StatusConfirmation } from "./status-confirmation";
import { useTenant } from "@/tenants/useTenant";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { SummaryCard } from "./summary-card";
import { InterviewCompletedApplicationStagePayload } from "@/app/interfaces";

interface SendOfferPayload {
  assessmentResult: File;
  offerMethod: "Upload" | "Link";
  offerLetterFile?: File | null;
  offerLetterLink?: string;
}

interface InterviewCompletedApplicationStageProps {
  loading: boolean;
  jobDepartment?: string;
  jobLocation?: string;
  employmentType?: string;
  handleSendOffer: (payload: Omit<InterviewCompletedApplicationStagePayload, "applicationId">) => void;
}

export function InterviewCompletedApplicationStage({
  loading,
  jobDepartment = "",
  jobLocation = "",
  employmentType = "",
  handleSendOffer,
}: InterviewCompletedApplicationStageProps) {
  const { colors } = useTenant();

  const [acknowledged, setAcknowledged] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [assessmentResult, setAssessmentResult] = useState<File | null>(null);

  const [offerMethod, setOfferMethod] = useState<"" | "Upload" | "Link">("");

  const [offerLetterFile, setOfferLetterFile] = useState<File | null>(null);

  const [offerLetterLink, setOfferLetterLink] = useState("");
  const [action, setAction] = useState<"Proceed" | "Reject" | "">("");

  const [departmentName, setDepartmentName] = useState(jobDepartment);
  const [startDate, setStartDate] = useState("");
  const [employmentTypeValue, setEmploymentTypeValue] = useState(employmentType);
  const [salary, setSalary] = useState<number | "">("");
  const [jobLocationValue, setJobLocationValue] = useState(jobLocation);
  const [acceptanceDeadline, setAcceptanceDeadline] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    setDepartmentName(jobDepartment ?? "");
    setEmploymentTypeValue(employmentType ?? "");
    setJobLocationValue(jobLocation ?? "");
  }, [jobDepartment, employmentType, jobLocation]);

  // Inline field errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasOfferLetter =
    (offerMethod === "Upload" && offerLetterFile) ||
    (offerMethod === "Link" && offerLetterLink.trim());

  // Field validation helpers
  const validateField = (name: string, value: any) => {
    let message = "";

    switch (name) {
      case "departmentName":
        if (!String(value || "").trim()) message = "Department name is required";
        break;
      case "startDate":
        if (!value) message = "Start date is required";
        break;
      case "employmentType":
        if (!value) message = "Employment type is required";
        break;
      case "salary":
        if (value === "" || value === null || value === undefined) message = "Salary is required";
        else if (Number(value) <= 0 || Number.isNaN(Number(value))) message = "Enter a valid salary";
        break;
      case "jobLocation":
        if (!String(value || "").trim()) message = "Job location is required";
        break;
      case "acceptanceDeadline":
        if (!value) message = "Acceptance deadline is required";
        break;
      case "rejectionReason":
        if (!String(value || "").trim()) message = "Rejection reason is required";
        break;
      case "acknowledged":
        if (!value) message = "You must confirm before proceeding";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));

    return message === "";
  };

  const validateAll = () => {
    const toValidate: Array<[string, any]> = [];

    if (action === "Proceed") {
      toValidate.push(["startDate", startDate]);
      toValidate.push(["salary", salary]);
      toValidate.push(["acceptanceDeadline", acceptanceDeadline]);
      toValidate.push(["acknowledged", acknowledged]);
    } else if (action === "Reject") {
      toValidate.push(["rejectionReason", rejectionReason]);
      toValidate.push(["acknowledged", acknowledged]);
    } else {
      toValidate.push(["acknowledged", acknowledged]);
    }

    const results = toValidate.map(([name, val]) => validateField(name, val));
    return results.every((r) => r === true);
  };

  // Validation rules for fields - used for disabling submit
  const isSubmitDisabled = (() => {
    if (action === "Proceed") {
      return (
        !acknowledged ||
        !startDate ||
        salary === "" ||
        salary === null ||
        salary === undefined ||
        !acceptanceDeadline
      );
    }

    if (action === "Reject") {
      return !acknowledged || !rejectionReason.trim();
    }

    // If no action selected, disable submit
    return !acknowledged || action === "";
  })();

  const onSubmit = () => {
    // run a last validation pass
    const ok = validateAll();
    if (!ok) {
      // prevent confirm and show inline errors
      setConfirmOpen(false);
      return;
    }

    if (!action) return;

    if (action === "Proceed") {
      const payload: Omit<InterviewCompletedApplicationStagePayload, "applicationId"> = {
        action: "Proceed",
        departmentName: departmentName.trim(),
        startDate,
        employmentType: employmentTypeValue,
        salary: typeof salary === "number" ? salary : Number(salary),
        jobLocation: jobLocationValue.trim(),
        acceptanceDeadline,
        // include offerLetterLink if provided
        offerLetterLink: offerMethod === "Link" && offerLetterLink.trim() ? offerLetterLink.trim() : undefined,
      };

      handleSendOffer(payload);
    }

    if (action === "Reject") {
      const payload: Omit<InterviewCompletedApplicationStagePayload, "applicationId"> = {
        action: "Reject",
        rejectionReason: rejectionReason.trim(),
      };

      handleSendOffer(payload);
    }
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
                const val = e.target.value as "Proceed" | "Reject" | "";
                setAction(val);
                // clear previous errors when switching action
                setErrors({});
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">Select Action</option>
              <option value="Proceed">Proceed (Send Offer)</option>
              <option value="Reject">Reject</option>
            </select>
          </div>

          {/* Offer fields (required when Proceed) */}
          {action === "Proceed" && (
            <>
              {/*
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Department Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={departmentName}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 bg-gray-100 cursor-not-allowed"
                  style={{ color: colors.text }}
                />
                {errors.departmentName && (
                  <p className="text-red-500 text-sm mt-1">{errors.departmentName}</p>
                )}
              </div>
              */}

              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Start Date
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setErrors((p) => ({ ...p, startDate: "" }));
                  }}
                  onBlur={() => validateField("startDate", startDate)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800"
                  style={{ backgroundColor: colors.textInputBgColor, color: colors.text }}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                )}
              </div>

              {/*
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Employment Type
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={employmentTypeValue}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 bg-gray-100 cursor-not-allowed"
                  style={{ color: colors.text }}
                />
                {errors.employmentType && (
                  <p className="text-red-500 text-sm mt-1">{errors.employmentType}</p>
                )}
              </div>
              */}

              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Salary
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="number"
                  value={salary as any}
                  onChange={(e) => {
                    setSalary(e.target.value === "" ? "" : Number(e.target.value));
                    setErrors((p) => ({ ...p, salary: "" }));
                  }}
                  onBlur={() => validateField("salary", salary)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800"
                  style={{ backgroundColor: colors.textInputBgColor, color: colors.text }}
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                )}
              </div>

              {/*
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Job Location
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={jobLocationValue}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 bg-gray-100 cursor-not-allowed"
                  style={{ color: colors.text }}
                />
                {errors.jobLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobLocation}</p>
                )}
              </div>
              */}

              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Acceptance Deadline
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="date"
                  value={acceptanceDeadline}
                  onChange={(e) => {
                    setAcceptanceDeadline(e.target.value);
                    setErrors((p) => ({ ...p, acceptanceDeadline: "" }));
                  }}
                  onBlur={() => validateField("acceptanceDeadline", acceptanceDeadline)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800"
                  style={{ backgroundColor: colors.textInputBgColor, color: colors.text }}
                />
                {errors.acceptanceDeadline && (
                  <p className="text-red-500 text-sm mt-1">{errors.acceptanceDeadline}</p>
                )}
              </div>

              {/* Keep optional offer file/link fields */}
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Offer Letter Method (optional)
                </label>

                <select
                  value={offerMethod}
                  onChange={(e) => {
                    const value = e.target.value as "" | "Upload" | "Link";
                    setOfferMethod(value);
                    setOfferLetterFile(null);
                    setOfferLetterLink("");
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#c89b3c]"
                  style={{ backgroundColor: colors.textInputBgColor, color: colors.text }}
                >
                  <option value="">No offer letter</option>
                  <option value="Upload">Upload Offer Letter</option>
                  <option value="Link">Offer Letter Link</option>
                </select>
              </div>

              {offerMethod === "Upload" && (
                <div>
                  <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                    Offer Letter
                  </label>

                  <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-700 cursor-pointer" style={{ backgroundColor: colors.textInputBgColor }}>
                    <Upload size={18} />
                    <span className="text-sm" style={{ color: colors.text }}>{offerLetterFile ? offerLetterFile.name : "Upload Offer Letter"}</span>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setOfferLetterFile(e.target.files?.[0] ?? null)} />
                  </label>
                </div>
              )}

              {offerMethod === "Link" && (
                <div>
                  <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">Offer Letter Link</label>
                  <input type="url" value={offerLetterLink} onChange={(e) => setOfferLetterLink(e.target.value)} placeholder="https://example.com/offer-letter" className="w-full px-4 py-3 rounded-lg border border-gray-800" style={{ backgroundColor: colors.textInputBgColor, color: colors.text }} />
                </div>
              )}
            </>
          )}

          {/* Rejection Reason (when Reject) */}
          {action === "Reject" && (
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">Reason for Rejection <span className="ml-1 text-red-500">*</span></label>
              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  setErrors((p) => ({ ...p, rejectionReason: "" }));
                }}
                onBlur={() => validateField("rejectionReason", rejectionReason)}
                placeholder="Enter reason for rejection..."
                className="w-full px-4 py-3 rounded-lg border border-gray-800 resize-none"
                style={{ backgroundColor: colors.textInputBgColor, color: colors.text }}
              />
              {errors.rejectionReason && (
                <p className="text-red-500 text-sm mt-1">{errors.rejectionReason}</p>
              )}
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
          {action === "Reject" ? "Reject" : action === "Proceed" ? "Proceed" : "Send Offer"}
        </motion.button>
      </div>

      {/* Confirmation Modal */}
      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={onSubmit}
          title={action === "Reject" ? "Reject Candidate?" : "Send Offer?"}
          description={
            action === "Reject"
              ? "Are you sure you want to reject this candidate? This will update the candidate status to InterviewRejected."
              : "Are you sure you want to send this offer to the candidate? This will update the candidate status to Offer Sent."
          }
          confirmText={action === "Reject" ? "Yes, Reject" : "Yes, Send Offer"}
          cancelText="Cancel"
          loading={loading}
        />
      )}
    </>
  );
}
