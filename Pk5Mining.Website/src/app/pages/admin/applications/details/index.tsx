import React from "react";
import { Navigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Edit2,
  Eye,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Save,
  SaveOff,
} from "lucide-react";
import { ApplicationDetailsSkeleton } from "@/app/components/ui/application-details-loader";
import { downloadFile } from "@/app/utils/helper";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { ResumeViewerModal } from "@/app/components/ui/resume-viewer-modal";
import { ApplicationStatusPill } from "@/app/components/ui/application-status-pill";
import useApplicationDetailsViewModel from "./viewmodel";

const statuses = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
] as const;

export function ApplicationDetail() {
  const {
    app,
    isLoading,
    editStatus,
    setEditStatus,
    selectedStatus,
    setSelectedStatus,
    confirmOpen,
    setConfirmOpen,
    resumeUrl,
    resumeFileName,
    isViewerOpen,
    setIsViewerOpen,
    handleUpdateStatus,
    updating,
  } = useApplicationDetailsViewModel();

  if (isLoading) return <ApplicationDetailsSkeleton />;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => history.back()}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to applications
        </button>

        {app && (
          <div className="flex items-center gap-2">
            {editStatus ? (
              <motion.select
                value={selectedStatus ?? app?.status}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-1.5 text-xs text-gray-100 outline-none focus:border-[#c89b3c]"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </motion.select>
            ) : (
              <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-gray-800">
                <ApplicationStatusPill status={app?.status ?? "new"} />
              </span>
            )}
            {!editStatus && (
              <motion.button
                onClick={() => setEditStatus(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a]"
                title="Edit"
              >
                <Edit2 className="w-3 h-3 text-gray-300" />
              </motion.button>
            )}
            {editStatus && (
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setConfirmOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a]"
                  title="Save"
                >
                  <Save className="w-3 h-3 text-gray-300" />
                </motion.button>
                <motion.button
                  onClick={() => setEditStatus(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-black text-xs font-semibold hover:bg-red-700"
                  title="Cancel"
                >
                  <SaveOff className="w-3 h-3 text-gray-300" />
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1.3fr] gap-6">
        {/* Candidate */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 space-y-4 text-sm text-gray-200">
          <div>
            <h1 className="text-xl font-semibold mb-1">
              {app?.firstName} {app?.lastName}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <InfoRow
              icon={Mail}
              label="Email"
              value={app?.email ?? ""}
              href={`mailto:${app?.email}`}
            />
            <InfoRow
              icon={Phone}
              label="Phone"
              value={app?.phoneNumber ?? ""}
              href={`tel:${app?.phoneNumber}`}
            />
            <InfoRow icon={MapPin} label="Country" value={app?.country ?? ""} />
            <InfoRow
              icon={Linkedin}
              label="LinkedIn"
              value={app?.linkedIn ?? ""}
              href={
                app?.linkedIn?.startsWith("http")
                  ? app.linkedIn
                  : `https://${app?.linkedIn}`
              }
            />
          </div>
        </div>

        {/* Resume */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 text-sm text-gray-200">
          <p className="text-xs font-semibold text-white mb-2">Resume</p>

          {resumeUrl ? (
            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                onClick={() => setIsViewerOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-xs font-semibold text-gray-100 hover:border-[#c89b3c]"
                title="View resume"
              >
                <Eye className="w-4 h-4" />
                View resume
              </motion.button>

              <motion.button
                onClick={() => downloadFile(resumeUrl, resumeFileName)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a]"
                title="Download resume"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              No resume file stored for this application.
            </p>
          )}
        </div>

        {/* Other Info */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 text-sm text-gray-200">
          <p className="text-xs font-semibold text-white mb-2">
            Other Information
          </p>
          {app && (
            <p className="flex flex-col gap-2 text-xs text-gray-400">
              <span>
                Job applied for{" "}
                <span className="font-semibold">{app?.job?.title ?? "-"}</span>
              </span>
              <span>
                Submitted on{" "}
                {app?.dT_Created &&
                  new Date(app?.dT_Created).toLocaleString("en-GB")}
              </span>
              <span>
                Updated on{" "}
                {app?.dT_Modified &&
                  new Date(app?.dT_Modified).toLocaleString("en-GB")}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Resume Viewer Modal (in-app) */}
      <ResumeViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        resume={app?.resume ?? ""}
        firstName={app?.firstName ?? ""}
        lastName={app?.lastName ?? ""}
      />

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleUpdateStatus}
        title="Update Application Status"
        description={`Are you sure you want to update the job application status to ${selectedStatus || "Unknown"}?`}
        confirmText="Yes, update"
        cancelText="No"
        loading={updating}
      />
    </div>
  );
}

type InfoRowProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
};

function InfoRow({ icon: Icon, label, value, href }: InfoRowProps) {
  if (!value) return null;

  const inner = (
    <div className="flex items-center gap-2">
      <Icon className="w-3 h-3 text-[#c89b3c]" />
      <div className="min-w-0">
        <p className="text-[11px] text-gray-400">{label}</p>
        <p className="text-xs text-gray-100 truncate">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        {inner}
      </a>
    );
  }

  return inner;
}
