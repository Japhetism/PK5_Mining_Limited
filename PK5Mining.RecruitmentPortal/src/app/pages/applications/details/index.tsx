import { useState } from "react";
import {
  ArrowLeft,
  LayoutGrid,
  Clock,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Calendar,
  FileText,
  Download,
  Eye,
} from "lucide-react";
import ApplicationDetailsSkeleton from "@/app/components/ui/application-details-loader";
import { ResumeViewerModal } from "@/app/components/ui/resume-viewer-modal";
import { UpdateApplicationStage } from "../components/update-application-stage";
import { useAuth } from "@/app/context/AuthContext";
import { useTenant } from "@/tenants/useTenant";
import { PERMISSIONS } from "@/app/constants/permissions";
import { downloadFile } from "@/app/utils/helper";
import useApplicationDetailsViewModel from "./viewmodel";
import { ApplicationStatusPill } from "@/app/components/ui/application-status-pill";

export function ApplicationDetail() {
  const { user } = useAuth();
  const { colors } = useTenant();
  const {
    app,
    isLoading,
    selectedStatus,
    resumeUrl,
    resumeFileName,
    isViewerOpen,
    updating,
    size,
    timelineEvents,
    initials,
    appStatus,
    setIsViewerOpen,
    handleUpdateStatus,
    setSelectedStatus,
    handleNewApplicationStage,
    handleInReviewApplicationStage,
    handleShortlistedApplicationStage,
    handleScheduledInterviewApplicationStage,
  } = useApplicationDetailsViewModel();

  const [activeTab, setActiveTab] = useState<"all" | "pending" | "processed">(
    "pending",
  );

  const permissions = user?.role?.permissions ?? [];

  const permission = PERMISSIONS.applicationUpdate;

  const requiredPermissions = Array.isArray(permission)
    ? permission
    : [permission];

  const canUpdateApplication = requiredPermissions.some((required) =>
    permissions.some((p) => p.name === required),
  );

  const status = appStatus?.toLowerCase();

  const header =
    status === "interview completed"
      ? "Send Offer Letter"
      : status === "hired"
        ? "New Hire Preboarding Information"
        : status === "offer sent"
          ? "Offer Decision"
          : "Candidate Decision";

  if (isLoading) return <ApplicationDetailsSkeleton />;

  return (
    <div className="space-y-6">
      {/* Top Header / Back Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          type="button"
          onClick={() => history.back()}
          className="inline-flex items-center gap-1 text-[16px] mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Candidates
        </button>

        {/* Filter Pills */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "all"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            All (25)
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "pending"
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <Clock className="w-4 h-4" />
            Pending (15)
          </button>
          <button
            onClick={() => setActiveTab("processed")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "processed"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Processed (11)
          </button>
        </div>
      </div>

      {/* Main Candidate Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-xs p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4 w-full">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center w-full gap-3">
                <h1 className="text-xl font-bold text-gray-900 truncate">
                  {app?.firstName} {app?.lastName}
                </h1>
                {/* Live Status Badge */}
                <ApplicationStatusPill status={appStatus ?? ""} />
              </div>
              <p className="text-sm text-gray-500">Candidate</p>
            </div>
          </div>
        </div>

        {/* Candidate Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[34%_34%_27%] gap-6 pt-6 items-center">
          {/* Column 1: Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 shrink-0 text-gray-400 mt-1" />
              <div className="grid grid-cols-[140px_1fr] min-w-0 flex-1">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900 break-all">
                  {app?.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gray-400 mt-1" />
              <div className="grid grid-cols-[140px_1fr]">
                <p className="text-sm text-gray-400">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">
                  {app?.phoneNumber}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-gray-400 mt-1" />
              <div className="grid grid-cols-[140px_1fr]">
                <p className="text-sm text-gray-400">Country</p>
                <p className="text-sm font-medium text-gray-900">
                  {app?.country}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Application Info */}
          <div className="space-y-4 md:border-x md:border-gray-100 md:px-6">
            <div className="flex items-start gap-3">
              <Briefcase className="w-4 h-4 text-gray-400 mt-1" />
              <div className="grid grid-cols-[140px_1fr]">
                <p className="text-sm text-gray-400">Role Applied</p>
                <p className="text-sm font-medium text-gray-900">
                  {app?.job?.title || app?.jobs?.title}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-400 mt-1" />
              <div className="grid grid-cols-[140px_1fr]">
                <p className="text-sm text-gray-400">Date Submitted</p>
                <p className="text-sm font-medium text-gray-900">
                  {app?.dT_Created &&
                    new Date(app?.dT_Created).toLocaleString("en-GB")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gray-400 mt-1" />
              <div className="grid grid-cols-[140px_1fr]">
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {app?.dT_Modified &&
                    new Date(app?.dT_Modified).toLocaleString("en-GB")}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: CV Card & Actions */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg border border-gray-200">
                <FileText className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {app?.firstName} {app?.lastName}.pdf
                </p>
                <p className="text-xs text-gray-500">PDF • {size}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Uploaded:{" "}
                  {app?.dT_Created &&
                    new Date(app?.dT_Created).toLocaleString("en-GB")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsViewerOpen(true)}
              >
                <Eye className="w-3.5 h-3.5 text-gray-500" />
                Preview
              </button>
              {resumeUrl && (
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
                  style={{ color: colors.card, backgroundColor: colors.accent }}
                  onClick={() => downloadFile(resumeUrl, resumeFileName)}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Decision & Activity Timeline */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Box: Candidate Decision Form */}
        {canUpdateApplication && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{header}</h2>
              {appStatus === "hired" && (
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  Complete this form to initiate onboarding for Precious Udomitizer.
                </p>
              )}
              <UpdateApplicationStage
                candidateStatus={appStatus ?? ""}
                loading={updating}
                handleNewApplicationStage={handleNewApplicationStage}
                handleInReviewApplication={handleInReviewApplicationStage}
                handleShortlistedApplicationStage={
                  handleShortlistedApplicationStage
                }
                handleScheduledApplicationStage={handleScheduledInterviewApplicationStage}
              />
            </div>
          </div>
        )}

        {/* Right Box: Activity Timeline */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Activity Timeline
            </h2>

            {/* Timeline List */}
            <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#D9D9D9]">
              {timelineEvents?.length > 0 ? (
                timelineEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-start space-x-3 group"
                  >
                    {/* Node Dot indicator */}
                    <div className="absolute -left-[15px] mt-1.5 w-2.5 h-2.5 rounded-full bg-[#D9D9D9] border-2 border-[#D9D9D9] group-hover:bg-[#D9D9D9] transition-colors" />

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[15px] leading-relaxed font-normal"
                        style={{ color: colors.text }}
                      >
                        {event.title}
                      </p>
                      <p
                        className="text-[14px] mt-1"
                        style={{ color: colors.subtext }}
                      >
                        {event.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center">
                  <p className="text-[16px]" style={{ color: colors.text }}>
                    No timeline events available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ResumeViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        resume={app?.resume ?? ""}
        firstName={app?.firstName ?? ""}
        lastName={app?.lastName ?? ""}
      />
    </div>
  );
}
