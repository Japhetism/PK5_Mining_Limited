import { Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  LocateIcon,
  Mail,
  Phone,
  FileText,
  Eye,
  Linkedin,
} from "lucide-react";
import { capitalizeFirstLetter, formatDate } from "@/app/utils/helper";
import { Badge } from "@/app/components/ui/badge";
import { JobDetailsSkeleton } from "@/app/components/ui/job-details-skeleton";
import { PaginatedCard } from "@/app/components/ui/applicant-details-card";
import { JobApplicationDto } from "@/app/interfaces";
import { ResumeViewerModal } from "@/app/components/ui/resume-viewer-modal";
import useJobDetailsViewModel from "./viewmodel";
import { ApplicationStatusPill } from "@/app/components/ui/application-status-pill";

export function JobDetail() {
  const {
    job,
    isLoading,
    applications,
    jobApplicationsLoading,
    totalCount,
    pageNumber,
    pageSize,
    totalPages,
    selectedApplicant,
    queryClient,
    isViewerOpen,
    onChangePage,
    onChangePageSize,
    setIsViewerOpen,
    setSelectedApplicant,
  } = useJobDetailsViewModel();

  if (isLoading) return <JobDetailsSkeleton className="mt-6" />;

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
                    : "inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-xs text-red-400"
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
                <p className="mb-3">{formatDate(job.dT_Created)}</p>
              </>
            )}

            {job?.dT_Modified && (
              <>
                <p className="text-xs font-semibold text-gray-400 mb-1">
                  Updated
                </p>
                <p className="mb-3">{formatDate(job.dT_Modified)}</p>
              </>
            )}

            {job?.dT_Expiry &&
              (() => {
                const expiryDate = new Date(job.dT_Expiry);
                const now = new Date();

                const isExpired = expiryDate.getTime() < now.getTime();

                return (
                  <>
                    <p
                      title={isExpired ? formatDate(job.dT_Expiry) : ""}
                      className="text-xs font-semibold text-gray-400 mb-1"
                    >
                      {isExpired ? "Closed" : "Closing on"}
                    </p>

                    {!isExpired && (
                      <p className="mb-3">{formatDate(job.dT_Expiry)}</p>
                    )}
                  </>
                );
              })()}

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

      <div>
        <PaginatedCard<JobApplicationDto>
          data={applications}
          isLoading={jobApplicationsLoading}
          isFilter={false}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
          setPageNumber={onChangePage}
          setPageSize={onChangePageSize}
          pageSizeOptions={[6, 9, 12, 24]}
          renderCard={(a) => (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-100 truncate">
                    {a.firstName} {a.lastName}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {a.email}
                  </div>
                </div>
                <div className="text-xs text-gray-400 truncate">
                  Applicant ID: {a.id}
                </div>
              </div>
              <ApplicationStatusPill status={a.status} />

              {/* Contact */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{a.email}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{a.phoneNumber ?? "-"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{a.linkedIn ?? "-"}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/applications/${a.id}`}
                  title="View application details"
                  onClick={() => {
                    queryClient.setQueryData(["applications", String(a.id)], a);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-200 hover:bg-white/5"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>

                <motion.button
                  type="button"
                  onClick={() => {
                    setSelectedApplicant(a);
                    setIsViewerOpen(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-200 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="View resume"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </motion.button>
              </div>
            </div>
          )}
        />
      </div>
      <ResumeViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        resume={selectedApplicant?.resume ?? ""}
        firstName={selectedApplicant?.firstName ?? ""}
        lastName={selectedApplicant?.lastName ?? ""}
      />
    </div>
  );
}
