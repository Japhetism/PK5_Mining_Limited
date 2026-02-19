import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Edit,
  Edit2,
  Eye,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Save,
  SaveOff,
  X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getApplicationById } from "../api/applications";
import { ApplicationDetailsSkeleton } from "../components/ui/application-details-loader";
import { downloadFile } from "../utils/helper";
import { ConfirmModal } from "../components/ui/confirm-modal";

const statuses = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
] as const;

export function AdminApplicationDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications", applicationId],
    queryFn: () => getApplicationById(applicationId as string),
    enabled: !!applicationId,
    staleTime: 5 * 60 * 1000,
  });

  const app = data ?? undefined;

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // loader for iframe
  const [resumeLoading, setResumeLoading] = useState(false);
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const resumeUrl = useMemo(() => {
    const url = app?.resume?.trim();
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  }, [app?.resume]);

  const resumeFileName = useMemo(() => {
    const first = app?.firstName ?? "candidate";
    const last = app?.lastName ?? "resume";
    return `${first}-${last}-resume.pdf`;
  }, [app?.firstName, app?.lastName]);

  // Close modal on ESC
  useEffect(() => {
    if (!isViewerOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsViewerOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isViewerOpen]);

  // whenever modal opens, show loader until iframe fires onLoad
  useEffect(() => {
    if (isViewerOpen && resumeUrl) setResumeLoading(true);
  }, [isViewerOpen, resumeUrl]);

  const handleUpdateStatus = () => {
    setConfirmOpen(false);
    setEditStatus(false);
  };

  if (!app && !isLoading) {
    return <Navigate to="/admin/applications" replace />;
  }

  if (isLoading) return <ApplicationDetailsSkeleton />;

  if (isError) {
    return (
      <div className="space-y-4 mt-6">
        <p className="text-red-400">Failed to load job application details.</p>
      </div>
    );
  }

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

        <div className="flex items-center gap-2">
          <motion.select
            defaultValue={app?.status}
            onChange={(e) => setSelectedStatus(e.target.value)}
            disabled={!editStatus}
            className="rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-1.5 text-xs text-gray-100 outline-none focus:border-[#c89b3c]"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </motion.select>
          {!editStatus && (
            <motion.button
              onClick={() => setEditStatus(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a]"
            >
              <Edit2 className="w-3 h-3 text-gray-300" />
              Edit Status
            </motion.button>
          )}
          {editStatus && (
            <div className="flex gap-2">
              <motion.button
                onClick={() => setConfirmOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a]"
              >
                <Save className="w-3 h-3 text-gray-300" />
                Update Status
              </motion.button>
              <motion.button
                onClick={() => setEditStatus(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a]"
              >
                <SaveOff className="w-3 h-3 text-gray-300" />
                Cancel
              </motion.button>
            </div>
          )}
        </div>
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
          <p className="flex flex-col gap-2 text-xs text-gray-400">
            <span>
              Job applied for{" "}
              <span className="font-semibold">{app?.job?.title ?? "-"}</span>
            </span>
            <span>
              Submitted on{" "}
              {app?.dT_Created && new Date(app?.dT_Created).toLocaleString()}
            </span>
            <span>
              Updated on{" "}
              {app?.dT_Modified && new Date(app?.dT_Modified).toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* Resume Viewer Modal (in-app) */}
      {isViewerOpen && resumeUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 sm:p-6"
          onMouseDown={() => setIsViewerOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-5xl h-[85vh] bg-[#0f0f0f] rounded-xl border border-gray-800 shadow-xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-200 truncate">
                  {app?.firstName} {app?.lastName} — Resume
                </p>
                <p className="text-xs text-gray-500">Press ESC to close</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsViewerOpen(false)}
                  className="p-2 rounded-md hover:bg-white/10 text-gray-300"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div className="relative w-full h-[calc(85vh-56px)]">
              {/* Loader overlay */}
              {resumeLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-9 w-9 rounded-full border-2 border-gray-500 border-t-transparent animate-spin" />
                    <p className="text-xs text-gray-300">Loading resume...</p>
                  </div>
                </div>
              )}

              <iframe
                src={resumeUrl}
                title="Resume Viewer"
                className="w-full h-full bg-black"
                onLoad={() => setResumeLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}

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
