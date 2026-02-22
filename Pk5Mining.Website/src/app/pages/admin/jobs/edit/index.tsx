import { motion } from "motion/react";
import { Save, ArrowLeft } from "lucide-react";
import { isValidName } from "@/app/utils/validator";
import { jobTypes, workArrangements } from "@/app/constants";
import useJobEditViewModel from "./viewmodel";
import { RichTextEditor } from "@/app/components/ui/rich-text-editor";

export function JobEdit() {
  const {
    existing,
    form,
    fieldErrors,
    loading,
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
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </button>
          <h1 className="text-2xl font-bold">
            {existing ? "Edit Job" : "Create Job"}
          </h1>
          <p className="text-sm text-gray-400">
            Configure how this role appears on the public careers page.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
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
              className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.title ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
            />
            {fieldErrors.title && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Department
              <span className="ml-1 text-red-500">*</span>
            </label>
            <motion.input
              name="department"
              value={form.department}
              onChange={onChange}
              onBlur={() => {
                if (!isValidName(form.department)) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    department: "Invalid department name",
                  }));
                } else {
                  setFieldErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.department;
                    return updated;
                  });
                }
              }}
              className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.department ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
            />
            {fieldErrors.department && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.department}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
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
              className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.location ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
            />
            {fieldErrors.location && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.location}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Close Date
            </label>
            <motion.input
              name="dT_Expiry"
              type="date"
              value={form.dT_Expiry}
              onChange={onChange}
              className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.dT_Expiry ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
            />
            {fieldErrors.dT_Expiry && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.dT_Expiry}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
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
              className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.experience ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
            />
            {fieldErrors.experience && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.experience}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                  ${fieldErrors.jobType ? "border-red-500" : "border-gray-800"}
                  focus:border-[#c89b3c]`}
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
              <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                  ${fieldErrors.workArrangement ? "border-red-500" : "border-gray-800"}
                  focus:border-[#c89b3c]`}
              >
                <option value="">Select</option>
                {workArrangements.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </motion.select>
              {fieldErrors.workArrangement && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.workArrangement}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Brief Description
            <span className="ml-1 text-red-500">*</span>
          </label>
          <motion.textarea
            name="briefDescription"
            value={form.briefDescription}
            onChange={onChange}
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
            className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
              ${fieldErrors.briefDescription ? "border-red-500" : "border-gray-800"}
              focus:border-[#c89b3c] resize-none`}
          />
          <p className="mt-1 text-[11px] text-gray-500">
            Shown in the careers list view. 1–2 concise sentences works best.
          </p>
          {fieldErrors.briefDescription && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.briefDescription}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Full Description (rich text)
            <span className="ml-1 text-red-500">*</span>
          </label>
          <RichTextEditor
            value={form.description}
            onChange={(html) =>
              setForm((prev) => ({ ...prev, description: html }))
            }
          />
          <p className="mt-1 text-[11px] text-gray-500">
            You can use bold, italics, and bullet points. The HTML produced here
            is rendered directly on the public job details page.
          </p>
          {fieldErrors.description && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.description}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#c89b3c] text-black text-sm font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
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
        </div>
      </form>
    </div>
  );
}