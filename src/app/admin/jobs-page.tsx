import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Edit2, Eye, XCircle, CheckCircle2 } from "lucide-react";
import { getAdminJobs, setJobActive } from "./data";
import { capitalizeFirstLetter } from "../utils/helper";

export function AdminJobsPage() {
  const navigate = useNavigate();
  const jobs = getAdminJobs();

  const toggleJob = (id: string, current: boolean) => {
    setJobActive(id, !current);
    // simple reload for now to reflect changes
    navigate(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Job openings</h1>
          <p className="text-sm text-gray-400">
            Create, update, and close job postings visible on the careers site.
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

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black/40 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Location</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Work</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    No job openings yet. Click “New job” to create one.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t border-gray-800 hover:bg-white/5"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold text-gray-100">
                        {job.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-2">
                        {job.briefDescription}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-300">
                      {job.department ?? "-"}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-300">
                      {job.location ?? "-"}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-300">
                      {capitalizeFirstLetter(job.jobType)}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-300">
                      {capitalizeFirstLetter(job.workArrangement)}
                    </td>
                    <td className="px-4 py-3 align-top">
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
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link to={`/admin/jobs/${job.id}`}>
                          <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-300">
                            <Eye className="w-4 h-4" />
                          </button>
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

