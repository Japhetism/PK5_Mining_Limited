import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Save, ArrowLeft } from "lucide-react";
import {
  AdminJob,
  getAdminJobById,
  upsertAdminJob,
} from "./data";
import { RichTextEditor } from "./rich-text-editor";
import { useMutation } from "@tanstack/react-query";
import { createJob } from "../api/jobs";

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
] as const;

const workArrangements = [
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
] as const;

export function AdminJobEditPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

   const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      console.log("Job created");
      setSubmitted(true);
      setLoading(false);
      navigate(`/admin/jobs`);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const existing = useMemo<AdminJob | undefined>(
    () => (jobId ? getAdminJobById(jobId) : undefined),
    [jobId],
  );

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    department: existing?.department ?? "",
    location: existing?.location ?? "",
    experience: existing?.experience ?? "",
    jobType: existing?.jobType ?? "",
    workArrangement: existing?.workArrangement ?? "",
    briefDescription: existing?.briefDescription ?? "",
    description:
      existing?.description ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (jobId && !existing) {
    return <Navigate to="/admin/jobs" replace />;
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...form,
      isActive: existing?.isActive ?? true,
    });
  };

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
            {existing ? "Edit job" : "Create job"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Job title
            </label>
            <input
              name="title"
              required
              value={form.title}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm outline-none focus:border-[#c89b3c]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm outline-none focus:border-[#c89b3c]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm outline-none focus:border-[#c89b3c]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Experience
            </label>
            <input
              name="experience"
              value={form.experience}
              onChange={onChange}
              placeholder="e.g. 3+ years"
              className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm outline-none focus:border-[#c89b3c]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Type
              </label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm outline-none focus:border-[#c89b3c]"
              >
                <option value="">Select</option>
                {jobTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Work arrangement
              </label>
              <select
                name="workArrangement"
                value={form.workArrangement}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm outline-none focus:border-[#c89b3c]"
              >
                <option value="">Select</option>
                {workArrangements.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Brief description
          </label>
          <textarea
            name="briefDescription"
            value={form.briefDescription}
            onChange={onChange}
            rows={3}
            className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm outline-none focus:border-[#c89b3c] resize-none"
          />
          <p className="mt-1 text-[11px] text-gray-500">
            Shown in the careers list view. 1–2 concise sentences works best.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Full description (rich text)
          </label>
          <RichTextEditor
            value={form.descriptionHtml}
            onChange={(html) => setForm((prev) => ({ ...prev, descriptionHtml: html }))}
          />
          <p className="mt-1 text-[11px] text-gray-500">
            You can use bold, italics, and bullet points. The HTML produced here
            is rendered directly on the public job details page.
          </p>
        </div>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            whileHover={!saving ? { scale: 1.02 } : undefined}
            whileTap={!saving ? { scale: 0.98 } : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#c89b3c] text-black text-sm font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
            disabled={saving}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save job"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

