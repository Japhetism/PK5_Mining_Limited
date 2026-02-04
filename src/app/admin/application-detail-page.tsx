import { Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Download, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { getApplicationById, updateApplicationStatus } from "./data";

const statuses = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
] as const;

export function AdminApplicationDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const app = applicationId ? getApplicationById(applicationId) : undefined;

  if (!app) {
    return <Navigate to="/admin/applications" replace />;
  }

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateApplicationStatus(app.id, e.target.value as any);
  };

  return (
    <div className="space-y-6">
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
          <select
            defaultValue={app.status}
            onChange={onStatusChange}
            className="rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-1.5 text-xs text-gray-100 outline-none focus:border-[#c89b3c]"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1.3fr] gap-6">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 space-y-4 text-sm text-gray-200">
          <div>
            <h1 className="text-xl font-semibold mb-1">
              {app.firstName} {app.lastName}
            </h1>
            <p className="text-xs text-gray-400">
              Applied for <span className="font-semibold">{app.jobTitle}</span>{" "}
              on {new Date(app.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <InfoRow icon={Mail} label="Email" value={app.email} href={`mailto:${app.email}`} />
            <InfoRow icon={Phone} label="Phone" value={app.phone} href={`tel:${app.phone}`} />
            <InfoRow icon={MapPin} label="Country" value={app.country} />
            <InfoRow
              icon={Linkedin}
              label="LinkedIn"
              value={app.linkedinUrl}
              href={app.linkedinUrl}
            />
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 text-sm text-gray-200">
          <p className="text-xs font-semibold text-gray-400 mb-2">
            Resume
          </p>
          {app.resumeDataUrl ? (
            <motion.a
              href={app.resumeDataUrl}
              download={`${app.firstName}-${app.lastName}-resume.pdf`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a]"
            >
              <Download className="w-4 h-4" />
              Download resume
            </motion.a>
          ) : (
            <p className="text-xs text-gray-500">
              No resume file stored for this application.
            </p>
          )}
        </div>
      </div>
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

