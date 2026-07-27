import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { ApplicationStatusFilter, JobApplicationDto } from "@/app/interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import {
  formatDate,
  formatDateTime,
  toBackendDateTimeWithBoundary,
} from "@/app/utils/helper";
import { ApplicationStatusPill } from "@/app/components/ui/application-status-pill";
import useApplicationsListViewModel from "./viewmodel";
import { useTenant } from "@/tenants/useTenant";
import { DatePicker } from "@/app/components/ui/date-picker";
import { SearchableSelect } from "@/app/components/searchable-select";

export function ApplicationList() {
  const { isAgro, colors } = useTenant();
  const {
    queryClient,
    apps,
    totalCount,
    totalPages,
    jobTitles,
    candidateEmails,
    statuses,
    filters,
    filterStartDate,
    filterEndDate,
    filterEmail,
    filterJobTitle,
    filterStatus,
    isLoading,
    isFilter,
    pageNumber,
    pageSize,
    setFilters,
    setFilterStartDate,
    setFilterEndDate,
    setFilterEmail,
    setFilterJobTitle,
    setFilterStatus,
    setStatus,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setShouldUpdateDropdown,
    handleResetFilters,
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
          <div
            className="text-[18px] font-semibold"
            style={{ color: colors.text }}
          >
            {app.firstName} {app.lastName}
          </div>
          <div className="text-[15px]" style={{ color: colors.text }}>
            {app.email}
          </div>
        </div>
      ),
    },
    {
      key: "job",
      header: "Job Role",
      render: (app) => (
        <div>
          <div className="text-[16px]" style={{ color: colors.text }}>
            {app?.job?.title ?? "-"}
          </div>
          {app?.job?.id && (
            <div className="text-[15px]" style={{ color: colors.text }}>
              {app?.job?.id}
            </div>
          )}
        </div>
      ),
    },
    ...(isAgro
      ? []
      : [
          {
            key: "country",
            header: "Country",
            render: (app: any) => app.country ?? "-",
          },
        ]),
    {
      key: "status",
      header: "Status",
      render: (app) => (
        <ApplicationStatusPill status={app.status?.toLowerCase()} />
      ),
    },
    {
      key: "submitted",
      header: "Date Submitted",
      render: (app) => formatDateTime(app.dT_Created),
    },
    {
      key: "modified",
      header: "Date Modified",
      render: (app) => formatDateTime(app.dT_Modified),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (app) => (
        <Link
          to={`/admin/candidates/${app.id}`}
          title="View candidate application details"
          onClick={() => {
            queryClient.setQueryData(["applications", String(app.id)], app);
          }}
        >
          <button
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[16px]"
            style={{ backgroundColor: colors.accent, color: colors.card }}
          >
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
          <h1
            className="text-[18px] font-bold mb-1"
            style={{ color: colors.text }}
          >
            Candidates
          </h1>
          <p className="text-[15px]" style={{ color: colors.text }}>
            Evaluate incoming candidate applications, manage status updates, and
            retrieve resumes.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className="space-y-3 mb-10 p-6 rounded-[12px]"
        style={{ backgroundColor: colors.card }}
      >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="min-w-0">
          <label
            className="block text-[16px] font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Start Date
          </label>
          <DatePicker
            name="startDate"
            value={
              filterStartDate ? formatDateTime(filterStartDate, false) : ""
            }
            onChange={(value) =>
              setFilterStartDate(toBackendDateTimeWithBoundary(value))
            }
            maxDate={filterEndDate ? new Date(filterEndDate) : new Date()}
          />
        </div>

        <div className="min-w-0">
          <label
            className="block text-[16px] font-semibold mb-2"
            style={{ color: colors.text }}
          >
            End Date
          </label>
          <DatePicker
            name="endDate"
            value={filterEndDate ? formatDateTime(filterEndDate, false) : ""}
            onChange={(value) =>
              setFilterEndDate(toBackendDateTimeWithBoundary(value, "end"))
            }
            minDate={filterStartDate ? new Date(filterStartDate) : new Date()}
            maxDate={new Date()}
            classes="right-0"
          />
        </div>

        <div className="min-w-0">
          <label
            className="block text-[16px] font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Email Address
          </label>
          <SearchableSelect
            name="titleId"
            value={filterEmail ?? ""}
            options={[
              { value: "", label: "All Email Addresses" },
              ...candidateEmails.map((email) => ({
                value: email,
                label: email,
              })),
            ]}
            onChange={(e) => {
              setFilterEmail(e.target.value);
              setShouldUpdateDropdown(false);
            }}
            placeholder="Search by job title"
            className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
            styles={{
              backgroundColor: colors.textInputBgColor,
              color: colors.text,
            }}
          />
        </div>

        <div className="min-w-0">
          <label
            className="block text-[16px] font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Job Title
          </label>
          <SearchableSelect
            name="titleId"
            value={filterJobTitle ?? ""}
            options={[
              { value: "", label: "All Jobs" },
              ...jobTitles.map((jobTitle) => ({
                value: jobTitle,
                label: jobTitle,
              })),
            ]}
            onChange={(e) => {
              setFilterJobTitle(e.target.value);
              setShouldUpdateDropdown(false);
            }}
            placeholder="Search by job title"
            className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
            styles={{
              backgroundColor: colors.textInputBgColor,
              color: colors.text,
            }}
          />
        </div>

        <div className="min-w-0">
          <label
            className="block text-[16px] font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Status
          </label>
          <SearchableSelect
            name="titleId"
            value={filterStatus ?? ""}
            options={[
              { value: "", label: "All Statuses" },
              ...statuses.map((status) => ({
                value: status,
                label: status,
              })),
            ]}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setShouldUpdateDropdown(false);
            }}
            placeholder="Search by job title"
            className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
            styles={{
              backgroundColor: colors.textInputBgColor,
              color: colors.text,
            }}
          />
        </div>
        </div>
        <div className="flex flex-end">
          <button
            onClick={handleResetFilters}
            className="text-[16px] hover:underline ml-auto"
            style={{ color: colors.text }}
          >
            Clear all
          </button>
        </div>
      </div>

      <PaginatedTable<JobApplicationDto>
        data={apps}
        columns={columns}
        isLoading={isLoading}
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
