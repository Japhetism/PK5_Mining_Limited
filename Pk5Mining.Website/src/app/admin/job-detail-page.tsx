import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Clock, LocateIcon } from "lucide-react";
import { capitalizeFirstLetter } from "../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../api/jobs";
import { Badge } from "../components/ui/badge";
import { JobDetailsSkeleton } from "../components/ui/job-details-skeleton";

export function AdminJobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();

  const {
    data,
    isLoading,
    isError,
    error: fetchError,
  } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobById(jobId as string),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
  });

  const job = data ?? undefined;

  if (!job  && !isLoading) {
    return <Navigate to="/admin/jobs" replace />;
  }

  if (isLoading) return <JobDetailsSkeleton className="mt-6" />;

  if (isError) {
    return (
      <div className="space-y-4 mt-6">
        <p className="text-red-400">Failed to load job details.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Link
            to="/admin/jobs"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to jobs
          </Link>
          <div>
            <Badge variant="secondary" className="mb-1 mt-4">
              {job?.department}
            </Badge>
            <h1 className="text-2xl font-bold mb-1">{job?.title}</h1>
            <p className="text-sm">{job?.briefDescription}</p>
            <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
              {job?.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-[#c89b3c]" /> {job?.location}
                </span>
              )}
              {job?.jobType && (
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-[#c89b3c]" />{" "}
                  {job?.jobType && capitalizeFirstLetter(job.jobType)}
                </span>
              )}
              {job?.workArrangement && (
                <span className="flex items-center gap-1">
                  <LocateIcon className="w-3 h-3 text-[#c89b3c]" />{" "}
                  {job?.workArrangement &&
                    capitalizeFirstLetter(job.workArrangement)}
                </span>
              )}
              {job?.experience && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c89b3c]" />
                  {job?.experience} experience
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
            <div
              className="text-sm text-gray-200 leading-relaxed
                [&_p]:mb-3
                [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc
                [&_li]:mb-1.5
                [&_p>strong]:block [&_p>strong]:mt-4 [&_p>strong]:mb-2
                [&_p>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: job?.description ?? "" }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-sm text-gray-300">
            <p className="text-xs font-semibold text-gray-400 mb-1">Status</p>
            <p className="mb-3">
              <span
                className={
                  job?.isActive
                    ? "inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400"
                    : "inline-flex items-center gap-1 rounded-full bg-gray-600/10 px-2 py-0.5 text-xs text-gray-400"
                }
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {job?.isActive ? "Open" : "Closed"}
              </span>
            </p>

            {job?.experience && (
              <>
                <p className="text-xs font-semibold text-gray-400 mb-1">
                  Experience
                </p>
                <p className="mb-3">{job.experience}</p>
              </>
            )}

            {job?.dT_Created && (
              <>
                <p className="text-xs font-semibold text-gray-400 mb-1">
                  Posted
                </p>
                <p className="mb-3">
                  {new Date(job.dT_Created).toLocaleDateString()}
                </p>
              </>
            )}

            {job?.dT_Modified && (
              <>
                <p className="text-xs font-semibold text-gray-400 mb-1">
                  Updated
                </p>
                <p className="mb-3">
                  {new Date(job.dT_Modified).toLocaleDateString()}
                </p>
              </>
            )}

            <div className="flex gap-2 mt-4">
              <Link to={`/admin/jobs/${job?.id}/edit`} className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 text-xs font-semibold hover:border-[#c89b3c]"
                >
                  Edit job
                </motion.button>
              </Link>
              <Link
                to={`/careers/job/${job?.id}`}
                className="flex-1"
                target="_blank"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-3 py-2 rounded-lg bg-[#c89b3c]/10 text-[#c89b3c] text-xs font-semibold hover:bg-[#c89b3c]/20"
                >
                  View public page
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
