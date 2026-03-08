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

export function JobList() {
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
    setConfirmOpen,
    setSelectedJob,
    updateFilter,
    setIsFilter,
    setFilterStatus,
    setFilterJobType,
    onChangePage,
    onChangePageSize,
    handleUpdateStatus,
  } = useJobListViewModel();

  const columns: PaginatedTableColumn<JobDto>[] = [
    {
      key: "title",
      header: "Title",
      render: (job) => (
        <div>
          <Link
            to={`/careers/job/${job.id}`}
            className="flex-1"
            target="_blank"
            title="View public page"
          >
            <div className="font-semibold text-[#c89b3c]">{job.title}</div>
          </Link>
          <div className="text-xs text-gray-500 line-clamp-2">{job.id}</div>
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
              ? "inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400"
              : "inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-xs text-red-400"
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
              className="inline-flex h-8 w-8 items-center justify-center text-gray-300"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-[180px] rounded-lg bg-[#111111] p-1 shadow-xl"
            >
              <DropdownMenu.Item asChild>
                <Link
                  to={`/admin/jobs/${job.id}`}
                  onClick={() => {
                    queryClient.setQueryData(["jobs", String(job.id)], job);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 outline-none focus:outline-none focus:bg-white/10"
                >
                  <Eye className="w-4 h-4" />
                  View details
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <Link
                  to={`/admin/jobs/${job.id}/edit`}
                  onClick={() => {
                    queryClient.setQueryData(["jobs", String(job.id)], job);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 outline-none focus:outline-none focus:bg-white/10"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Job
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onSelect={() => {
                  setSelectedJob(job);
                  setConfirmOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
              >
                {job.isActive ? (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    Close job
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Reopen job
                  </>
                )}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Job openings</h1>
          <p className="text-sm text-gray-400">
            Create, update, and close job postings.
          </p>
        </div>

        <Link to="/admin/jobs/new">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#c89b3c] text-black text-sm font-semibold rounded-lg hover:bg-[#d4a84a]"
          >
            <Plus className="w-4 h-4" />
            New job
          </motion.button>
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="w-full sm:w-[200px]">
            <input
              name="department"
              type="text"
              value={filters.department}
              onChange={(e) => updateFilter("department", e.target.value)}
              placeholder="Search by department"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
            />
          </div>

          <div className="w-full sm:w-[200px]">
            <input
              name="location"
              type="text"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              placeholder="Search by location"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as StatusFilter);
              setIsFilter(true);
            }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={filterJobType}
            onChange={(e) => {
              setFilterJobType(e.target.value);
              setIsFilter(true);
            }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
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
