import { Link, useSearchParams } from "react-router-dom";
import { Filter, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplications } from "../api/applications";
import { ApplicationsQuery, JobApplicationDto } from "../interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "../components/ui/paginated-table";
import { cleanParams, formatDate, toNumber } from "../utils/helper";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type StatusFilter =
  | "all"
  | "new"
  | "in_review"
  | "shortlisted"
  | "rejected"
  | "hired";

export function AdminApplicationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [filters, setFilters] = useState({
    email: searchParams.get("email") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.email]);

  const queryParams: ApplicationsQuery = useMemo(() => {
      const raw: ApplicationsQuery = {
        pageNumber,
        pageSize,
        email: debouncedFilters.email,
      };
  
      // clean out empty strings
      return cleanParams(raw) as ApplicationsQuery;
    }, [pageNumber, pageSize, debouncedFilters]);
  

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "applications",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.email ?? "",
    ],
    queryFn: () => getApplications(queryParams),
    staleTime: 30_000,
  });

  const apps: JobApplicationDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const columns: PaginatedTableColumn<JobApplicationDto>[] = [
    {
      key: "id",
      header: "Candidate ID",
      render: (app) => app.id ?? "-",
    },
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
      key: "job",
      header: "Job Applied For",
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
      render: (app) => formatDate(app.dT_Created),
    },
    {
      key: "modified",
      header: "Modified",
      render: (app) => formatDate(app.dT_Modified),
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
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="w-full sm:w-[360px]">
            <input
              name="email"
              type="email"
              value={filters.email}
              onChange={(e) => updateFilter("email", e.target.value)}
              placeholder="Search by email"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
            />
          </div>
        </div>
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
          emptyTitle="No applications yet. Once candidates apply, they will appear here."
          noResultsTitle="No results found. Try changing your filters."
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
          isFilter={isFilter}
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
