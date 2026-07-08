import { Link, useNavigate } from "react-router-dom";
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
import { capitalizeFirstLetter, formatDateTime } from "@/app/utils/helper";
import { Badge } from "@/app/components/ui/badge";
import { JobDetailsSkeleton } from "@/app/components/ui/job-details-skeleton";
import { PaginatedCard } from "@/app/components/ui/applicant-details-card";
import { JobApplicationDto } from "@/app/interfaces";
import { ResumeViewerModal } from "@/app/components/ui/resume-viewer-modal";
import useJobDetailsViewModel from "./viewmodel";
import { ApplicationStatusPill } from "@/app/components/ui/application-status-pill";
import { useTenant } from "@/tenants/useTenant";
import { PermissionGuard } from "@/app/components/permission-guard";
import { PERMISSIONS } from "@/app/constants/permissions";

export function JobDetail() {
  const { colors } = useTenant();
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
    handleNavigateToJobDetailWebsite,
  } = useJobDetailsViewModel();

  const navigate = useNavigate();

  if (isLoading) return <JobDetailsSkeleton className="mt-6" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <button
            onClick={() => navigate("/admin/jobs")}
            className="inline-flex items-center gap-1 text-[16px] mb-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </button>
          <div>
            {job && (
              <Badge variant="secondary" className="mb-1 mt-4">
                {job?.department}
              </Badge>
            )}
            <h1 className="text-[18px] font-bold mb-1" style={{ color: colors.text }}>
              {job?.title}
            </h1>
            <p className="text-[15px] text-gray-600" style={{ color: colors.text }}>
              {job?.briefDescription}
            </p>
            <div className="flex flex-wrap gap-4 text-[15px] mb-6" style={{ color: colors.text }}>
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
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: colors.card }}
          >
            <div
              className="text-[16px] leading-relaxed
                [&_p]:mb-3
                [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc
                [&_li]:mb-1.5
                [&_p>strong]:block [&_p>strong]:mt-4 [&_p>strong]:mb-2
                [&_p>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: job?.description ?? "" }}
              style={{ color: colors.text }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-xl p-4 text-[16px]"
            style={{ backgroundColor: colors.card, color: colors.text }}
          >
            {job && (
              <>
                <p
                  className="text-[16px] font-semibold mb-1"
                  style={{ color: colors.text }}
                >
                  Status
                </p>
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
              </>
            )}

            {job?.experience && (
              <>
                <p
                  className="text-[16px] font-semibold mb-1"
                  style={{ color: colors.text }}
                >
                  Experience
                </p>
                <p className="mb-3" style={{ color: colors.text }}>
                  {job.experience}
                </p>
              </>
            )}

            {job?.dT_Created && (
              <>
                <p
                  className="text-[16px] font-semibold mb-1"
                  style={{ color: colors.text }}
                >
                  Posted
                </p>
                <p className="mb-3" style={{ color: colors.text }}>
                  {formatDateTime(job.dT_Created)}
                </p>
              </>
            )}

            {job?.dT_Modified && (
              <>
                <p
                  className="text-[16px] font-semibold mb-1"
                  style={{ color: colors.text }}
                >
                  Updated
                </p>
                <p className="mb-3" style={{ color: colors.text }}>
                  {formatDateTime(job.dT_Modified)}
                </p>
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
                      title={
                        isExpired ? formatDateTime(job.dT_Expiry, false) : ""
                      }
                      className="text-[16px] font-semibold mb-1"
                      style={{ color: colors.text }}
                    >
                      {isExpired ? "Closed" : "Closing on"}
                    </p>

                    {!isExpired && (
                      <p className="mb-3" style={{ color: colors.text }}>
                        {formatDateTime(job.dT_Expiry, false)}
                      </p>
                    )}
                  </>
                );
              })()}

            {job && (
              <div className="flex gap-2 mt-4">
                <PermissionGuard permission={PERMISSIONS.jobUpdate}>
                  <Link to={`/admin/jobs/${job?.id}/edit`} className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2 border rounded-lg text-[16px] font-semibold"
                      style={{ backgroundColor: colors.card, color: colors.text, borderColor: colors.accent }}
                    >
                      Edit job
                    </motion.button>
                  </Link>
                </PermissionGuard>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigateToJobDetailWebsite(job.id)}
                  className="flex-1 w-full px-4 py-2 rounded-lg text-[#c89b3c] text-[16px] font-semibold"
                  style={{ backgroundColor: colors.accent, color: colors.card }}
                >
                  View public page
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="mb-2" style={{ color: colors.text }}>
          Candidates
        </h3>
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
          emptyTitle="No candidate found"
          renderCard={(a) => (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-[16px] font-medium break-words" style={{ color: colors.text }}>
                    {a.firstName} {a.lastName}
                  </div>
                  <div className="text-[16px] break-all" style={{ color: colors.text }}>
                    {a.email}
                  </div>
                </div>

                <div className="text-[16px] break-all sm:text-right" style={{ color: colors.text }}>
                  Applicant ID: {a.id}
                </div>
              </div>

              <div className="flex flex-wrap">
                <ApplicationStatusPill status={a.status?.toLowerCase()} />
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-[15px]" style={{ color: colors.text }}>
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="break-all">{a.email}</span>
                </div>

                <div className="flex items-start gap-2 text-[15px]" style={{ color: colors.text }}>
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="break-words">{a.phoneNumber ?? "-"}</span>
                </div>

                <div className="flex items-start gap-2 text-[15px]" style={{ color: colors.text }}>
                  <Linkedin className="w-4 h-4 mt-0.5 shrink-0" />
                  <a
                    className="break-all hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    href={
                      a?.linkedIn?.startsWith("http")
                        ? a.linkedIn
                        : `https://${a?.linkedIn}`
                    }
                  >
                    {a.linkedIn ?? "-"}
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  to={`/admin/applications/${a.id}`}
                  title="View application details"
                  onClick={() => {
                    queryClient.setQueryData(["applications", String(a.id)], a);
                  }}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-[16px] rounded-lg"
                  style={{ backgroundColor: colors.accent, color: colors.card }}
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span className="truncate">View Details</span>
                </Link>

                <motion.button
                  type="button"
                  onClick={() => {
                    setSelectedApplicant(a);
                    setIsViewerOpen(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-[16px] rounded-lg border"
                  style={{ backgroundColor: colors.card, color: colors.text, borderColor: colors.accent }}
                  title="View resume"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span className="truncate">Resume</span>
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
