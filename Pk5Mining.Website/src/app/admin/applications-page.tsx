import { Link } from "react-router-dom";
import { Filter, Users } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplications } from "../api/applications";
import { JobApplicationDto } from "../interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "../components/ui/paginated-table";

type StatusFilter =
  | "all"
  | "new"
  | "in_review"
  | "shortlisted"
  | "rejected"
  | "hired";

export function AdminApplicationsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  const apps: JobApplicationDto[] = (data ?? []) as JobApplicationDto[];

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  const columns: PaginatedTableColumn<JobApplicationDto>[] = [
    {
      key: "candidate",
      header: "Candidate",
      render: (app) => (
        <div>
          <div className="font-semibold text-gray-100">
            {app.firstName} {app.lastName}
          </div>
          <div className="text-xs text-gray-500">{app.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (app) => app?.job?.title ?? "-",
    },
    {
      key: "country",
      header: "Country",
      render: (app) => app.country ?? "-",
    },
    {
      key: "status",
      header: "Status",
      render: (app) => <ApplicationStatusPill status={app.status} />,
    },
    {
      key: "submitted",
      header: "Submitted",
      render: (app) => new Date(app.dT_Created).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (app) => (
        <Link
          to={`/admin/applications/${app.id}`}
          title="View application details"
          onClick={() => {
            queryClient.setQueryData(
              ["applications", String(app.id)],
              app,
            );
          }}
        >
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-700 text-xs text-gray-100 hover:border-[#c89b3c]">
            <Users className="w-3 h-3" />
            View
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Applications</h1>
          <p className="text-sm text-gray-400">
            Review incoming applications, update status, and download resumes.
          </p>
        </div>

        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 text-xs text-gray-300 hover:border-[#c89b3c]"
        >
          <Filter className="w-3 h-3" />
          Clear filters
        </button>
      </div>

      {error ? (
        <div className="text-sm text-red-400">Failed to load applications.</div>
      ) : (
        <PaginatedTable<JobApplicationDto>
          data={apps}
          columns={columns}
          isLoading={isLoading}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search name, email, role, country..."
          statusValue={status}
          onStatusChange={(v) => setStatus(v as StatusFilter)}
          statusOptions={[
            { value: "all", label: "All statuses" },
            { value: "new", label: "New" },
            { value: "in_review", label: "In review" },
            { value: "shortlisted", label: "Shortlisted" },
            { value: "rejected", label: "Rejected" },
            { value: "hired", label: "Hired" },
          ]}
          onClearFilters={clearFilters}
          emptyTitle="No applications yet. Once candidates apply, they will appear here."
          noResultsTitle="No results found. Try changing your filters."
          filterFn={(app, q, statusVal) => {
            const matchesSearch =
              !q ||
              [
                app.firstName,
                app.lastName,
                app.email,
                app.country,
                app.status,
                app?.job?.title,
              ]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q));

            const matchesStatus =
              statusVal === "all" || app.status === statusVal;

            return matchesSearch && matchesStatus;
          }}
        />
      )}
    </div>
  );
}

type StatusProps = {
  status: string;
};

export function ApplicationStatusPill({ status }: StatusProps) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: "New", className: "bg-blue-500/10 text-blue-400" },
    in_review: {
      label: "In review",
      className: "bg-amber-500/10 text-amber-400",
    },
    shortlisted: {
      label: "Shortlisted",
      className: "bg-emerald-500/10 text-emerald-400",
    },
    rejected: { label: "Rejected", className: "bg-red-500/10 text-red-400" },
    hired: { label: "Hired", className: "bg-purple-500/10 text-purple-400" },
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
