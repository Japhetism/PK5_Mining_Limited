import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Filter, Users } from "lucide-react";
import { getApplications } from "./data";

export function AdminApplicationsPage() {
  const apps = getApplications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Applications</h1>
          <p className="text-sm text-gray-400">
            Review incoming applications, update status, and download resumes.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 text-xs text-gray-300 hover:border-[#c89b3c]">
          <Filter className="w-3 h-3" />
          Filters
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black/40 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Candidate</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Country</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Submitted</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    No applications yet. Once candidates apply from the careers
                    site, they will appear here.
                  </td>
                </tr>
              ) : (
                apps.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t border-gray-800 hover:bg-white/5"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold text-gray-100">
                        {app.firstName} {app.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {app.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-300">
                      {app.jobTitle}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-300">
                      {app.country}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <ApplicationStatusPill status={app.status} />
                    </td>
                    <td className="px-4 py-3 align-top text-gray-300">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <Link to={`/admin/applications/${app.id}`}>
                        <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-700 text-xs text-gray-100 hover:border-[#c89b3c]">
                          <Users className="w-3 h-3" />
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type StatusProps = {
  status: string;
};

function ApplicationStatusPill({ status }: StatusProps) {
  const map: Record<string, { label: string; className: string }> = {
    new: {
      label: "New",
      className:
        "bg-blue-500/10 text-blue-400",
    },
    in_review: {
      label: "In review",
      className:
        "bg-amber-500/10 text-amber-400",
    },
    shortlisted: {
      label: "Shortlisted",
      className:
        "bg-emerald-500/10 text-emerald-400",
    },
    rejected: {
      label: "Rejected",
      className:
        "bg-red-500/10 text-red-400",
    },
    hired: {
      label: "Hired",
      className:
        "bg-purple-500/10 text-purple-400",
    },
  };

  const meta = map[status] ?? {
    label: status,
    className: "bg-gray-600/10 text-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${meta.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}

