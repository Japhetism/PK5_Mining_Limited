import { useState } from "react";
import { motion } from "motion/react";
import { useTenant } from "@/tenants/useTenant";

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
  governmentIdNumber: string;
  governmentIdType: string;
}

interface HiredApplicationStageProps {
  onClose: () => void;
  handleSubmit: (payload: HiredFormPayload) => void;

  jobTitle: string;
  department: string;
  startDate: string;
  managerName: string;
}

export function HiredApplicationStage({
  onClose,
  handleSubmit,
  jobTitle,
  department,
  startDate,
  managerName,
}: HiredApplicationStageProps) {
  const { colors } = useTenant();

  const [formData, setFormData] =
    useState<HiredFormPayload>({
      fullLegalName: "",
      preferredName: "",
      homeAddress: "",
      phoneNumber: "",
      emailAddress: "",
      dateOfBirth: "",
      emergencyContactName: "",
      relationship: "",
      emergencyContactPhoneNumber: "",
      governmentIdNumber: "",
      governmentIdType: "",
    });

  const updateField = (
    field: keyof HiredFormPayload,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      value,
    }));
  };

  const isSubmitDisabled =
    !formData.fullLegalName.trim() ||
    !formData.preferredName.trim() ||
    !formData.homeAddress.trim() ||
    !formData.phoneNumber.trim() ||
    !formData.emailAddress.trim() ||
    !formData.dateOfBirth ||
    !formData.emergencyContactName.trim() ||
    !formData.relationship.trim() ||
    !formData.emergencyContactPhoneNumber.trim() ||
    !formData.governmentIdNumber.trim() ||
    !formData.governmentIdType;

  const submitForm = () => {
    handleSubmit(formData);
  };

  const inputStyles = {
    backgroundColor: colors.textInputBgColor,
    color: colors.text,
  };

  return (
    <>
      <div
        className="max-h-[65vh] overflow-y-auto scrollbar-black pr-2"
        style={
          {
            "--scrollbar-track": colors.bg,
          } as React.CSSProperties
        }
      >
        <form className="p-6 space-y-8">
          {/* Job & Company Details */}
          <section className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text }}
            >
              Job and Company Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Job Title
                </label>

                <input
                  disabled
                  value={jobTitle}
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 opacity-70"
                  style={inputStyles}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Department
                </label>

                <input
                  disabled
                  value={department}
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 opacity-70"
                  style={inputStyles}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Start Date
                </label>

                <input
                  disabled
                  value={startDate}
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 opacity-70"
                  style={inputStyles}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Manager Name
                </label>

                <input
                  disabled
                  value={managerName}
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 opacity-70"
                  style={inputStyles}
                />
              </div>
            </div>
          </section>

          {/* Personal & Contact Details */}
          <section className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text }}
            >
              Personal and Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Legal Name"
                value={formData.fullLegalName}
                onChange={(value) =>
                  updateField("fullLegalName", value)
                }
                colors={colors}
              />

              <InputField
                label="Preferred Name"
                value={formData.preferredName}
                onChange={(value) =>
                  updateField("preferredName", value)
                }
                colors={colors}
              />

              <InputField
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(value) =>
                  updateField("phoneNumber", value)
                }
                colors={colors}
              />

              <InputField
                label="Email Address"
                type="email"
                value={formData.emailAddress}
                onChange={(value) =>
                  updateField("emailAddress", value)
                }
                colors={colors}
              />

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Date of Birth
                </label>

                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    updateField(
                      "dateOfBirth",
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-700"
                  style={inputStyles}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: colors.text }}
              >
                Home Address
              </label>

              <textarea
                rows={3}
                value={formData.homeAddress}
                onChange={(e) =>
                  updateField(
                    "homeAddress",
                    e.target.value,
                  )
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-700 resize-none"
                style={inputStyles}
              />
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text }}
            >
              Emergency Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Emergency Contact Name"
                value={formData.emergencyContactName}
                onChange={(value) =>
                  updateField(
                    "emergencyContactName",
                    value,
                  )
                }
                colors={colors}
              />

              <InputField
                label="Relationship"
                value={formData.relationship}
                onChange={(value) =>
                  updateField(
                    "relationship",
                    value,
                  )
                }
                colors={colors}
              />

              <InputField
                label="Emergency Contact Phone Number"
                value={
                  formData.emergencyContactPhoneNumber
                }
                onChange={(value) =>
                  updateField(
                    "emergencyContactPhoneNumber",
                    value,
                  )
                }
                colors={colors}
              />
            </div>
          </section>

          {/* Means of Identification */}
          <section className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text }}
            >
              Means of Identification
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Government ID Type
                </label>

                <select
                  value={formData.governmentIdType}
                  onChange={(e) =>
                    updateField(
                      "governmentIdType",
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-700"
                  style={inputStyles}
                >
                  <option value="">
                    Select ID Type
                  </option>
                  <option value="National ID">
                    National ID
                  </option>
                  <option value="Passport">
                    Passport
                  </option>
                  <option value="Driver's License">
                    Driver's License
                  </option>
                  <option value="Voter Card">
                    Voter Card
                  </option>
                </select>
              </div>

              <InputField
                label="Government ID Number"
                value={formData.governmentIdNumber}
                onChange={(value) =>
                  updateField(
                    "governmentIdNumber",
                    value,
                  )
                }
                colors={colors}
              />
            </div>
          </section>
        </form>
      </div>

      {/* Footer */}
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
          whileHover={
            !isSubmitDisabled
              ? { scale: 1.02 }
              : undefined
          }
          whileTap={
            !isSubmitDisabled
              ? { scale: 0.98 }
              : undefined
          }
          onClick={submitForm}
          className="px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: colors.card,
            backgroundColor: colors.accent,
          }}
        >
          Submit
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
  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: colors.text }}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full px-4 py-3 rounded-lg border border-gray-700"
        style={{
          backgroundColor:
            colors.textInputBgColor,
          color: colors.text,
        }}
      />
    </div>
  );
}