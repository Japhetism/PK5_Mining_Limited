import { motion } from "motion/react";
import { Save, ArrowLeft } from "lucide-react";
import { isValidDepartment, isValidName } from "@/app/utils/validator";
import { jobTypes, workArrangements } from "@/app/constants";
import useJobEditViewModel from "./viewmodel";
import { RichTextEditor } from "@/app/components/ui/rich-text-editor";
import { DatePicker } from "@/app/components/ui/date-picker";
import { formatDateTime, limitWords } from "@/app/utils/helper";
import { useTenant } from "@/tenants/useTenant";
import { SearchableSelect } from "@/app/components/searchable-select";
import { PERMISSIONS } from "@/app/constants/permissions";
import { PermissionGuard } from "@/app/components/permission-guard";

const maxWordsBriefDescription = 50;

export function JobEdit() {
  const { colors } = useTenant();
  const {
    existing,
    form,
    fieldErrors,
    loading,
    departments,
    navigate,
    onSubmit,
    setFieldErrors,
    onChange,
    setForm,
  } = useJobEditViewModel();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-[16px] mb-2"
            style={{ color: colors.text }}
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </button>
          <h1 className="text-[18px] font-bold" style={{ color: colors.text }}>
            {existing ? "Edit Job" : "Create Job"}
          </h1>
          <p className="text-[15px]" style={{ color: colors.text }}>
            Configure how this role appears on the public careers page.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-xl p-6 space-y-6"
        style={{ backgroundColor: colors.card }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Job title
              <span className="ml-1 text-red-500">*</span>
            </label>
            <motion.input
              name="title"
              value={form.title}
              onChange={onChange}
              onBlur={() => {
                if (!isValidName(form.title)) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    title: "Invalid job title",
                  }));
                } else {
                  setFieldErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.title;
                    return updated;
                  });
                }
              }}
              className={`w-full px-4 py-3 rounded-lg text-[18px] focus:outline-none transition-colors focus:border-[#c89b3c]`}
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
            {fieldErrors.title && (
              <p className="text-[13px] text-red-500 mt-1">{fieldErrors.title}</p>
            )}
          </div>
          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Department
              <span className="ml-1 text-red-500">*</span>
            </label>
            <SearchableSelect
              name="department"
              value={form.department ?? ""}
              options={departments.map((d) => ({
                value: d.name,
                label: d.name,
              }))}
              onChange={onChange}
              placeholder="Select department"
              className={`w-full px-4 py-3 rounded-lg text-[18px] focus:outline-none transition-colors focus:border-[#c89b3c]`}
              styles={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
            {fieldErrors.department && (
              <p className="text-[13px] text-red-500 mt-1">
                {fieldErrors.department}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Location
              <span className="ml-1 text-red-500">*</span>
            </label>
            <motion.input
              name="location"
              value={form.location}
              onChange={onChange}
              onBlur={() => {
                if (!form.location) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    location: "Location is required",
                  }));
                } else {
                  setFieldErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.location;
                    return updated;
                  });
                }
              }}
              className={`w-full px-4 py-3 rounded-lg text-[18px] focus:outline-none transition-colors focus:border-[#c89b3c]`}
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
            {fieldErrors.location && (
              <p className="text-[13px] text-red-500 mt-1">
                {fieldErrors.location}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Close Date
            </label>
            <DatePicker
              name="dT_Expiry"
              value={formatDateTime(form.dT_Expiry, false)}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  dT_Expiry: value,
                }));
              }}
              error={!!fieldErrors.dT_Expiry}
              disablePastDates
              fromYear={new Date().getFullYear()}
            />
            {fieldErrors.dT_Expiry && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.dT_Expiry}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Experience
              <span className="ml-1 text-red-500">*</span>
            </label>
            <motion.input
              name="experience"
              value={form.experience}
              onChange={onChange}
              placeholder="e.g. 3+ years"
              onBlur={() => {
                if (!form.experience) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    experience: "Work experience is required",
                  }));
                } else {
                  setFieldErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.experience;
                    return updated;
                  });
                }
              }}
              className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors focus:border-[#c89b3c]`}
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
            {fieldErrors.experience && (
              <p className="text-[13px] text-red-500 mt-1">
                {fieldErrors.experience}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Type
                <span className="ml-1 text-red-500">*</span>
              </label>
              <motion.select
                name="jobType"
                value={form.jobType}
                onChange={(e) => {
                  onChange(e);

                  const value = e.target.value;

                  if (value) {
                    setFieldErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.jobType;
                      return updated;
                    });
                  }
                }}
                onBlur={() => {
                  if (!form.jobType) {
                    setFieldErrors((prev) => ({
                      ...prev,
                      jobType: "Job type is required",
                    }));
                  }
                }}
                className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors focus:border-[#c89b3c]`}
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              >
                <option value="">Select</option>
                {jobTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </motion.select>
              {fieldErrors.jobType && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.jobType}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-[16px] font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Work Arrangement
                <span className="ml-1 text-red-500">*</span>
              </label>
              <motion.select
                name="workArrangement"
                value={form.workArrangement}
                onChange={(e) => {
                  onChange(e);

                  const value = e.target.value;

                  if (value) {
                    setFieldErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.workArrangement;
                      return updated;
                    });
                  }
                }}
                onBlur={() => {
                  if (!form.workArrangement) {
                    setFieldErrors((prev) => ({
                      ...prev,
                      workArrangement: "Work arrangement is required",
                    }));
                  }
                }}
                className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors focus:border-[#c89b3c]`}
                style={{
                  backgroundColor: colors.textInputBgColor,
                  color: colors.text,
                }}
              >
                <option value="">Select</option>
                {workArrangements.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </motion.select>
              {fieldErrors.workArrangement && (
                <p className="text-[13px] text-red-500 mt-1">
                  {fieldErrors.workArrangement}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label
            className="block text-[16px] font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Brief Description
            <span className="ml-1 text-red-500">*</span>
          </label>
          <motion.textarea
            name="briefDescription"
            value={form.briefDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const truncated = limitWords(
                e.target.value,
                maxWordsBriefDescription,
              );
              setForm((prev) => ({ ...prev, briefDescription: truncated }));

              setFieldErrors((prev) => {
                const updated = { ...prev };
                delete updated.briefDescription;
                return updated;
              });
            }}
            onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
              e.preventDefault();
              const paste = e.clipboardData.getData("text");
              const combined = form.briefDescription + " " + paste;
              const truncated = limitWords(combined, maxWordsBriefDescription);

              setForm((prev) => ({ ...prev, briefDescription: truncated }));

              setFieldErrors((prev) => {
                const updated = { ...prev };
                delete updated.briefDescription;
                return updated;
              });
            }}
            onBlur={() => {
              if (!form.briefDescription) {
                setFieldErrors((prev) => ({
                  ...prev,
                  briefDescription: "Brief description is required",
                }));
              } else {
                setFieldErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.briefDescription;
                  return updated;
                });
              }
            }}
            rows={3}
            className={`w-full px-4 py-3 rounded-lg text-[16p] focus:outline-none transition-colors focus:border-[#c89b3c] resize-none`}
            style={{
              backgroundColor: colors.textInputBgColor,
              color: colors.text,
            }}
          />
          <div className="flex justify-between">
            <p className="mt-1 text-[14px] text-gray-500">
              Shown in the careers list view. 1–2 concise sentences works best.
            </p>
            <p className="text-[14px] text-gray-500">
              {form.briefDescription.trim().split(/\s+/).filter(Boolean).length}{" "}
              / {maxWordsBriefDescription} words
            </p>
          </div>
          {fieldErrors.briefDescription && (
            <p className="text-[13px] text-red-500 mt-1">
              {fieldErrors.briefDescription}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-[16px] font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Full Description (rich text)
            <span className="ml-1 text-red-500">*</span>
          </label>
          <RichTextEditor
            value={form.description}
            onChange={(html) =>
              setForm((prev) => ({ ...prev, description: html }))
            }
            error={Boolean(fieldErrors.description)}
          />
          <p className="mt-1 text-[14px] text-gray-500">
            You can use bold, italics, and bullet points. The HTML produced here
            is rendered directly on the public job details page.
          </p>
          {fieldErrors.description && (
            <p className="text-[13px] text-red-500 mt-1">
              {fieldErrors.description}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <PermissionGuard
            permission={[PERMISSIONS.jobUpdate, PERMISSIONS.jobCreate]}
          >
            <motion.button
              type="submit"
              whileHover={!loading ? { scale: 1.02 } : undefined}
              whileTap={!loading ? { scale: 0.98 } : undefined}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[16px] font-semibold disabled:opacity-70"
              style={{ backgroundColor: colors.accent, color: colors.card }}
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {existing
                ? loading
                  ? "Updating..."
                  : "Update Job"
                : loading
                  ? "Saving..."
                  : "Save Job"}
            </motion.button>
          </PermissionGuard>
        </div>
      </form>
    </div>
  );
}
