import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { ApplicationStatusFilter, JobApplicationDto } from "@/app/interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import { formatDate } from "@/app/utils/helper";
import { ApplicationStatusPill } from "@/app/components/ui/application-status-pill";
import useApplicationsListViewModel from "./viewmodel";

export function ApplicationList() {

  const {
    queryClient,
    apps,
    totalCount,
    totalPages,
    filters,
    isLoading,
    isFilter,
    pageNumber,
    pageSize,
    setFilters,
    setStatus,
    updateFilter,
    onChangePage,
    onChangePageSize,
  } = useApplicationsListViewModel();

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

      <PaginatedTable<JobApplicationDto>
        data={apps}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Search name, email, role, country..."
        statusValue={status}
        onStatusChange={(v) => setStatus(v as ApplicationStatusFilter)}
        emptyTitle="No applications yet. Once candidates apply, they will appear here."
        noResultsTitle="No results found. Try changing your filters."
        setPageNumber={onChangePage}
        setPageSize={onChangePageSize}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        isFilter={isFilter}
      />
    </div>
  );
}