import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Eye, Edit2, XCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobs, updateJob } from "../api/jobs";
import { ApiError, JobDto, JobsQuery, UpdateJobPayload } from "../interfaces";
import { capitalizeFirstLetter, cleanParams, formatDate, toNumber } from "../utils/helper";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "../components/ui/paginated-table";
import { ConfirmModal } from "../components/ui/confirm-modal";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { jobTypes } from "../constants";

type StatusFilter = "all" | "open" | "closed";

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" }
]

export function AdminJobsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [filterJobType, setFilterJobType] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [filters, setFilters] = useState({
    department: searchParams.get("department") ?? "",
    location: searchParams.get("location") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.department, debouncedFilters.location]);

  const queryParams: JobsQuery = useMemo(() => {
    const raw: JobsQuery = {
      pageNumber,
      pageSize,
      isActive:
        filterStatus === "closed" ? false : filterStatus === "open" ? true : "",
      jobType: filterJobType,
      department: debouncedFilters.department,
      location: debouncedFilters.location,
    };

    // clean out empty strings
    return cleanParams(raw) as JobsQuery;
  }, [pageNumber, pageSize, debouncedFilters, filterStatus, filterJobType]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "jobs",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.department ?? "",
      queryParams.location ?? "",
      queryParams.isActive ?? "",
      queryParams.jobType ?? "",
    ],
    queryFn: () => getJobs(queryParams),
    staleTime: 30_000,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateJobPayload) => {
      if (!selectedJob || !("id" in selectedJob)) {
        throw new Error("Cannot update: missing job id");
      }
      return updateJob(selectedJob.id, payload);
    },
    onSuccess: async () => {
      setIsUpdating(false);
      setConfirmOpen(false);
      setSelectedJob(null);

      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err: unknown) => {
      console.error(err);
      setIsUpdating(false);
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error ? err.message : undefined) ??
        "An error occurred while updating the job. Please try again.";

      setUpdateError(message);
    },
  });

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  const jobs: JobDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;
  
  const toggleJob = (id: number, isActive: boolean) => {
    // navigate(`/admin/jobs/${id}/edit`);
  };

  const handleUpdateStatus = () => {
    if (!selectedJob) return;

    setUpdateError("");
    setIsUpdating(true);

    updateMutation.mutate({
      ...selectedJob,
      isActive: !selectedJob.isActive,
      jobType: selectedJob.jobType ?? undefined,
      workArrangement: selectedJob.workArrangement ?? undefined,
      briefDescription: selectedJob.briefDescription ?? undefined,
    });
  };

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
          <div className="text-xs text-gray-500 line-clamp-2">
            {job.briefDescription}
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
      key: "applicationsCount",
      header: "Date Added",
       render: (job) => job.dT_Created ? formatDate(job.dT_Created) : "-",
    },
    {
      key: "Close Date",
      header: "Close Date",
       render: (job) => job.dT_Expiry ? formatDate(job.dT_Expiry) : "-",
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (job) => (
        <div className="inline-flex items-center gap-1">
          <Link
            to={`/admin/jobs/${job.id}`}
            title="View job details"
            onClick={() => {
              queryClient.setQueryData(["jobs", String(job.id)], job);
            }}
          >
            <Eye className="w-4 h-4 inline text-gray-300" />
          </Link>
          <button
            type="button"
            onClick={() => {
              setSelectedJob(job);
              setConfirmOpen(true);
            }}
            className="p-1.5 rounded-md hover:bg-white/10 text-gray-300"
            title={job.isActive ? "Close job" : "Reopen job"}
          >
            {job.isActive ? (
              <XCircle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            )}
          </button>
        </div>
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

          {/* <div className="flex-1 text-right">
            {onClearFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-300 hover:bg-white/5"
              >
                Clear
              </button>
            )}
          </div> */}
        </div>

      {error ? (
        <div className="text-sm text-red-400">Failed to load jobs.</div>
      ) : (
        <PaginatedTable<JobDto>
          data={jobs}
          columns={columns}
          isLoading={isLoading}
          searchValue={search}
          isFilter={isFilter}
          onSearchChange={setSearch}
          searchPlaceholder="Search title, dept, location..."
          statusValue={filterStatus}
          onStatusChange={(v) => setFilterStatus(v as StatusFilter)}
          emptyTitle="No job openings yet. Click “New job” to create one."
          noResultsTitle="No results found. Try changing your filters."
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
        />
      )}

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
