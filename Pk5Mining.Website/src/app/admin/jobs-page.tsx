import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Eye, Edit2, XCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/jobs";
import { JobDto } from "../interfaces";
import { capitalizeFirstLetter } from "../utils/helper";
import { PaginatedTable, PaginatedTableColumn } from "../components/ui/paginated-table";

type StatusFilter = "all" | "open" | "closed";

export function AdminJobsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  const jobs: JobDto[] = data ?? [];

  const toggleJob = (id: number, isActive: boolean) => {
    // navigate(`/admin/jobs/${id}/edit`);
  }

  const columns: PaginatedTableColumn<JobDto>[] = [
    {
      key: "title",
      header: "Title",
      render: (job) => (
        <div>
          <div className="font-semibold text-gray-100">{job.title}</div>
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
              : "inline-flex items-center gap-1 rounded-full bg-gray-600/10 px-2 py-0.5 text-xs text-gray-400"
          }
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {job.isActive ? "Open" : "Closed"}
        </span>
      )
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (job) => (
        <div className="inline-flex items-center gap-1">
          <Link to={`/admin/jobs/${job.id}`}>
            <Eye className="w-4 h-4 inline text-gray-300" />
          </Link>
          <Link to={`/admin/jobs/${job.id}/edit`}>
            <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-300">
              <Edit2 className="w-4 h-4" />
            </button>
          </Link>
          <button
            type="button"
            onClick={() => toggleJob(job.id, job.isActive)}
            className="p-1.5 rounded-md hover:bg-white/10 text-gray-300"
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

      {error ? (
        <div className="text-sm text-red-400">Failed to load jobs.</div>
      ) : (
        <PaginatedTable<JobDto>
          data={jobs}
          columns={columns}
          isLoading={isLoading}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search title, dept, location..."
          statusValue={status}
          onStatusChange={(v) => setStatus(v as StatusFilter)}
          statusOptions={[
            { value: "all", label: "All statuses" },
            { value: "open", label: "Open" },
            { value: "closed", label: "Closed" },
          ]}
          onClearFilters={() => {
            setSearch("");
            setStatus("all");
          }}
          emptyTitle='No job openings yet. Click “New job” to create one.'
          noResultsTitle="No results found. Try changing your filters."
          filterFn={(job, q, statusVal) => {
            const matchesSearch =
              !q ||
              [
                job.title,
                job.briefDescription,
                job.department,
                job.location,
                job.jobType,
                job.workArrangement,
              ]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q));

            const matchesStatus =
              statusVal === "all" ||
              (statusVal === "open" && job.isActive) ||
              (statusVal === "closed" && !job.isActive);

            return matchesSearch && matchesStatus;
          }}
        />
      )}
    </div>
  );
}