import { Link } from "react-router-dom";
import { motion } from "motion/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Plus,
  Eye,
  XCircle,
  CheckCircle2,
  MoreVerticalIcon,
  Pencil,
} from "lucide-react";
import { JobDto, StatusFilter } from "@/app/interfaces";
import { capitalizeFirstLetter, formatDateTime } from "@/app/utils/helper";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { jobTypes, statusOptions } from "@/app/constants";
import useJobListViewModel from "./viewmodel";
import { useTenant } from "@/tenants/useTenant";
import { SearchableSelect } from "@/app/components/searchable-select";
import { PermissionGuard } from "@/app/components/permission-guard";
import { PERMISSIONS } from "@/app/constants/permissions";

export function JobList() {
  const { colors } = useTenant();
  const {
    jobs,
    filters,
    filterStatus,
    filterJobType,
    isLoading,
    isFilter,
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    error,
    confirmOpen,
    selectedJob,
    isUpdating,
    queryClient,
    departments,
    setConfirmOpen,
    setSelectedJob,
    updateFilter,
    setIsFilter,
    setFilterStatus,
    setFilterJobType,
    onChangePage,
    onChangePageSize,
    handleUpdateStatus,
    handleNavigateToJobDetailWebsite,
  } = useJobListViewModel();

  const columns: PaginatedTableColumn<JobDto>[] = [
    {
      key: "title",
      header: "Title",
      render: (job) => (
        <div>
          <button
            onClick={() => handleNavigateToJobDetailWebsite(job.id)}
            className="flex-1 cursor-pointer"
            title="View public page"
          >
            <div className="font-semibold" style={{ color: colors.accent }}>
              {job.title}
            </div>
          </button>
          <div className="text-[15px] line-clamp-2" style={{ color: colors.subtext }}>
            {job.id}
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      render: (job) => job.department ?? "-",
    },
    {
      key: "location",
      header: "Location",
      render: (job) => job.location ?? "-",
    },
    {
      key: "type",
      header: "Type",
      render: (job) => (job.jobType ? capitalizeFirstLetter(job.jobType) : "-"),
    },
    {
      key: "work",
      header: "Work",
      render: (job) =>
        job.workArrangement ? capitalizeFirstLetter(job.workArrangement) : "-",
    },
    {
      key: "status",
      header: "Status",
      render: (job) => (
        <span
          className={
            job.isActive
              ? "inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[14px] text-green-400"
              : "inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-[14px] text-red-400"
          }
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {job.isActive ? "Open" : "Closed"}
        </span>
      ),
    },
    {
      key: "applicationsCount",
      header: "Applications",
      render: (job) => job.applicationsCount ?? "0",
    },
    {
      key: "dateAdded",
      header: "Date Added",
      render: (job) => (job.dT_Created ? formatDateTime(job.dT_Created) : "-"),
    },
    {
      key: "closeDate",
      header: "Close Date",
      render: (job) =>
        job.dT_Expiry ? formatDateTime(job.dT_Expiry, false) : "-",
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (job) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center"
              style={{ color: colors.text }}
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-[180px] rounded-lg p-1 shadow-xl"
              style={{ backgroundColor: colors.card }}
            >
              <DropdownMenu.Item asChild>
                <Link
                  to={`/admin/jobs/${job.id}`}
                  onClick={() => {
                    queryClient.setQueryData(["jobs", String(job.id)], job);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 outline-none focus:outline-none focus:bg-black/5"
                  style={{ color: colors.text }}
                >
                  <Eye className="w-4 h-4" />
                  View details
                </Link>
              </DropdownMenu.Item>

              <PermissionGuard permission={PERMISSIONS.jobUpdate}>
                <DropdownMenu.Item asChild>
                  <Link
                    to={`/admin/jobs/${job.id}/edit`}
                    onClick={() => {
                      queryClient.setQueryData(["jobs", String(job.id)], job);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 outline-none focus:outline-none focus:bg-black/5"
                    style={{ color: colors.text }}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Job
                  </Link>
                </DropdownMenu.Item>
              </PermissionGuard>

              <PermissionGuard permission={PERMISSIONS.jobUpdate}>
                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedJob(job);
                    setConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                >
                  {job.isActive ? (
                    <span className="flex items-center gap-2 text-red-400">
                      <XCircle className="w-4 h-4" />
                      Close job
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Reopen job
                    </span>
                  )}
                </DropdownMenu.Item>
              </PermissionGuard>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-[18px] font-bold mb-1" style={{ color: colors.text }}>
            Job openings
          </h1>
          <p className="text-[15px]" style={{ color: colors.subtext }}>
            Create, update, and close job postings.
          </p>
        </div>

        <PermissionGuard permission={PERMISSIONS.jobCreate}>
          <Link to="/admin/jobs/new" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 text-[16px] font-semibold rounded-lg"
              style={{ backgroundColor: colors.accent, color: colors.card }}
            >
              <Plus className="w-4 h-4" />
              New job
            </motion.button>
          </Link>
        </PermissionGuard>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-10 p-6 rounded-[12px]" style={{ backgroundColor: colors.card }}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="min-w-0">
            <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
              Department
            </label>
            <SearchableSelect
              name="departmentId"
              value={filters.department ?? ""}
              options={[
                { value: "", label: "All Departments" },
                ...departments.map((d) => ({
                  value: d.name,
                  label: d.name,
                })),
              ]}
              onChange={(e) => updateFilter("department", e.target.value)}
              placeholder="Search by department"
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
              styles={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>

          <div className="min-w-0">
            <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
              Location
            </label>
            <input
              name="location"
              type="text"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              placeholder="Search by location"
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>

          <div className="min-w-0">
            <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as StatusFilter);
                setIsFilter(true);
              }}
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
              Job Type
            </label>
            <select
              value={filterJobType}
              onChange={(e) => {
                setFilterJobType(e.target.value);
                setIsFilter(true);
              }}
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">All Job Type</option>
              {jobTypes.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="min-w-0 overflow-x-auto rounded-xl">
        <PaginatedTable<JobDto>
          data={jobs}
          columns={columns}
          isLoading={isLoading}
          isFilter={isFilter}
          emptyTitle="No job openings yet. Click “New job” to create one."
          noResultsTitle="No results found. Try changing your filters."
          setPageNumber={onChangePage}
          setPageSize={onChangePageSize}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
        />
      </div>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleUpdateStatus}
        title={
          selectedJob?.isActive ? "Close Job Opening" : "Reopen Job Opening"
        }
        description={`Are you sure you want to ${selectedJob?.isActive ? "close" : "reopen"} the job opening for "${selectedJob?.title}"?`}
        confirmText={`Yes, ${selectedJob?.isActive ? "close" : "reopen"}`}
        cancelText="No"
        loading={isUpdating}
      />
    </div>
  );
}
