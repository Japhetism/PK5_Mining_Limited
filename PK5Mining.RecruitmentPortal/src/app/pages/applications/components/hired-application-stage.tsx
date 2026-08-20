import { useState } from "react";
import { motion } from "motion/react";
import { useTenant } from "@/tenants/useTenant";
import { EmployeeOnboardingDetailsPayload } from "@/app/interfaces";
import { formatDateTime, parseDecisionDateTime } from "@/app/utils/helper";
import { DatePicker } from "@/app/components/ui/date-picker";

interface HiredFormPayload {
  fullLegalName: string;
  preferredName: string;
  homeAddress: string;
  phoneNumber: string;
  emailAddress: string;
  dateOfBirth: string;
  emergencyContactName: string;
  relationship: string;
  emergencyContactPhoneNumber: string;
  governmentIdType: string;
  governmentIdNumber: string;
  governmentIdExpiryDate: string;
  governmentIdDocument: string;
}

interface HiredApplicationStageProps {
  loading: boolean;
  startDate?: string;
  handleOnboardingApplicationStage: (
    payload: Omit<EmployeeOnboardingDetailsPayload, "applicationId">,
  ) => void;
}

export function HiredApplicationStage({
  loading,
  startDate = "2026-03-01", // fallback if not supplied via props
  handleOnboardingApplicationStage,
}: HiredApplicationStageProps) {
  const { colors } = useTenant();

  const [formData, setFormData] = useState<HiredFormPayload>({
    fullLegalName: "",
    preferredName: "",
    homeAddress: "",
    phoneNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    emergencyContactName: "",
    relationship: "",
    emergencyContactPhoneNumber: "",
    governmentIdType: "",
    governmentIdNumber: "",
    governmentIdExpiryDate: "",
    governmentIdDocument: "",
  });

  const updateField = (field: keyof HiredFormPayload, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isSubmitDisabled =
    loading ||
    !formData.fullLegalName.trim() ||
    !formData.preferredName.trim() ||
    !formData.phoneNumber.trim() ||
    !formData.emailAddress.trim();

  const submitForm = () => {
    const formattedPayload: Omit<
      EmployeeOnboardingDetailsPayload,
      "applicationId"
    > = {
      personalInfo: {
        fullLegalName: formData.fullLegalName,
        preferredName: formData.preferredName,
        homeAddress: formData.homeAddress,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        dateOfBirth: parseDecisionDateTime(formData.dateOfBirth),
      },
      emergencyContactInfo: {
        fullName: formData.emergencyContactName,
        relationship: formData.relationship,
        phoneNumber: formData.emergencyContactPhoneNumber,
      },
      identificationInfo: {
        governmentIdType: formData.governmentIdType,
        governmentIdNumber: formData.governmentIdNumber,
        governmentIdExpiryDate: parseDecisionDateTime(
          formData.governmentIdExpiryDate,
        ),
        governmentIdDocument: formData.governmentIdDocument,
      },
      placeholderInfo: {
        reportingTime: "08:00 AM",
        startDate: startDate,
        contactPerson: "Operations Manager",
        contactPhone: formData.phoneNumber,
        contactEmail: formData.emailAddress,
      },
    };

    handleOnboardingApplicationStage(formattedPayload);
  };

  const inputStyles = {
    backgroundColor: colors.textInputBgColor,
    color: colors.text,
  };

  return (
    <>
      <div>
        <form className="py-6 space-y-8">
          {/* Job & Company Details (read-only) */}
          <div>
            <p className="font-semibold text-[13px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-[12px]">
              Job & Company Details
            </p>
            <div className="bg-[#FAFAFA] border border-[#F0F1F3] rounded-[12px] p-[14px] flex flex-col gap-[10px] mb-[12px]">
              {[
                { label: "Job Title", value: "Equipment Operator" },
                { label: "Department", value: "Mining Operations" },
                { label: "Manager Name", value: "Operations Manager" },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between items-center"
                >
                  <span className="font-['Inter',sans-serif] text-[13px] text-[#9CA3AF]">
                    {r.label}
                  </span>
                  <span className="font-['Inter',sans-serif] text-[13px] text-[#1F2937] font-medium">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Start Date
              </label>
              <input
                disabled
                value={startDate}
                className="w-full px-4 py-3 rounded-lg border border-gray-700 opacity-70 cursor-not-allowed"
                style={inputStyles}
              />
            </div>
          </div>

          {/* Personal & Contact Details */}
          <section className="space-y-4">
            <p className="font-semibold text-[13px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-[12px]">
              Personal and Contact Details
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="Full Legal Name"
                value={formData.fullLegalName}
                onChange={(value) => updateField("fullLegalName", value)}
                colors={colors}
              />

              <InputField
                label="Preferred Name"
                value={formData.preferredName}
                onChange={(value) => updateField("preferredName", value)}
                colors={colors}
              />

              <InputField
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(value) => updateField("phoneNumber", value)}
                colors={colors}
                type="tel"
              />

              <InputField
                label="Email Address"
                type="email"
                value={formData.emailAddress}
                onChange={(value) => updateField("emailAddress", value)}
                colors={colors}
              />

              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Date of Birth
                </label>
                <DatePicker
                  name="dateOfBirth"
                  value={
                    formData?.dateOfBirth
                      ? formatDateTime(formData.dateOfBirth, false)
                      : ""
                  }
                  onChange={(value) => updateField("dateOfBirth", value)}
                  minDate={new Date()}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                Home Address
              </label>
              <textarea
                rows={3}
                value={formData.homeAddress}
                onChange={(e) => updateField("homeAddress", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-700 resize-none"
                style={inputStyles}
              />
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="space-y-4">
            <p className="font-semibold text-[13px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-[12px]">
              Emergency Contact Information
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="Emergency Contact Name"
                value={formData.emergencyContactName}
                onChange={(value) => updateField("emergencyContactName", value)}
                colors={colors}
              />

              <InputField
                label="Relationship"
                value={formData.relationship}
                onChange={(value) => updateField("relationship", value)}
                colors={colors}
              />

              <InputField
                label="Emergency Contact Phone Number"
                value={formData.emergencyContactPhoneNumber}
                onChange={(value) =>
                  updateField("emergencyContactPhoneNumber", value)
                }
                colors={colors}
              />
            </div>
          </section>

          {/* Means of Identification */}
          <section className="space-y-4">
            <p className="font-semibold text-[13px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-[12px]">
              Means of Identification
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Government ID Type
                </label>
                <select
                  value={formData.governmentIdType}
                  onChange={(e) =>
                    updateField("governmentIdType", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-700"
                  style={inputStyles}
                >
                  <option value="">Select ID Type</option>
                  <option value="National ID">National ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value="Voter Card">Voter Card</option>
                </select>
              </div>

              <InputField
                label="Government ID Number"
                value={formData.governmentIdNumber}
                onChange={(value) => updateField("governmentIdNumber", value)}
                colors={colors}
              />

              <div>
                <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
                  Government ID Expiry Date
                </label>
                <DatePicker
                  name="governmentIdExpiryDate"
                  value={
                    formData?.governmentIdExpiryDate
                      ? formatDateTime(formData.governmentIdExpiryDate, false)
                      : ""
                  }
                  onChange={(value) =>
                    updateField("governmentIdExpiryDate", value)
                  }
                  minDate={new Date()}
                />
              </div>

              <InputField
                label="Government ID Document Reference / URL"
                value={formData.governmentIdDocument}
                onChange={(value) => updateField("governmentIdDocument", value)}
                colors={colors}
              />
            </div>
          </section>
        </form>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
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
          onClick={submitForm}
          className="px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor: colors.accent,
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </motion.button>
      </div>
    </>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  colors: any;
  type?: string;
}

function InputField({
  label,
  value,
  onChange,
  colors,
  type = "text",
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (type === "tel") {
      // Allow only digits
      value = value.replace(/\D/g, "");
    }

    onChange(value);
  };

  return (
    <div>
      <label className="block font-medium text-[13px] text-[#6B7280] mb-[6px]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={handleChange}
        inputMode={type === "tel" ? "numeric" : undefined}
        pattern={type === "tel" ? "[0-9]*" : undefined}
        className="w-full px-4 py-3 rounded-lg border border-gray-700"
        style={{
          backgroundColor: colors.textInputBgColor,
          color: colors.text,
        }}
      />
    </div>
  );
}
