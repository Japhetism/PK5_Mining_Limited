import { Download, Eye, ArrowLeft } from "lucide-react";
import ApplicationDetailsSkeleton from "@/app/components/ui/application-details-loader";
import { ResumeViewerModal } from "@/app/components/ui/resume-viewer-modal";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { downloadFile, getStageMeta } from "@/app/utils/helper";
import { workflowStages } from "@/app/constants";
import { useTenant } from "@/tenants/useTenant";
import useApplicationDetailsViewModel from "./viewmodel";
import { useAuth } from "@/app/context/AuthContext";
import { PERMISSIONS } from "@/app/constants/permissions";
import { UpdateApplicationStage } from "../components/update-application-stage";

const enforcePermission = import.meta.env.VITE_ENFORCE_PERMISSION == "true";

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
    statusStyle,
    setIsViewerOpen,
    handleUpdateStatus,
    setSelectedStatus,
    handleRejectApplication,
    handleInReviewApplication,
  } = useApplicationDetailsViewModel();

  if (isLoading) return <ApplicationDetailsSkeleton />;

  const permissions = user?.role?.permissions ?? [];

  const permission = PERMISSIONS.applicationUpdate;

  const requiredPermissions = Array.isArray(permission)
  ? permission
  : [permission];

  const canUpdateApplication = requiredPermissions.some((required) =>
    permissions.some((p) => p.name === required)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => history.back()}
          className="inline-flex items-center gap-1 text-[16px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="mx-auto space-y-6">
        {/* --- Top Header Profile Bar --- */}
        <div
          className="border rounded-xl p-4 flex items-center justify-between shadow-lg"
          style={{ background: colors.card }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center font-bold text-lg">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-wide" style={{ color: colors.text }}>
                {app?.firstName} {app?.lastName}
              </h1>
              <p className="text-[15px] mt-0.5" style={{ color: colors.text }}>
                Applicant
              </p>
            </div>
          </div>

          {/* Live Status Badge */}
          <div
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-full ${statusStyle.bg}`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${statusStyle.dot}`}
            ></span>

            <span
              className={`text-[16px] font-medium tracking-wide ${statusStyle.text}`}
            >
              {app?.status}
            </span>
          </div>
        </div>

        {/* --- Main Dashboard Content Split --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Details & Documents) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Contact & Application Details Card */}
            <div
              className="rounded-xl p-6 shadow-md"
              style={{ background: colors.card }}
            >
              <h2 className="text-[18px] font-semibold mb-6 tracking-wide" style={{ color: colors.text }}>
                Contact and Application details
              </h2>

              <div className="rounded-lg" style={{ background: colors.innerCard }}>
                <div className="p-8 space-y-4 ">
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">Name:</span>
                    <span className="text-[16px] font-semibold col-span-2 break-words break-all whitespace-normal overflow-hidden" style={{ color: colors.text }}>
                      {app?.firstName} {app?.lastName}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">Email:</span>
                    <span className="text-[16px] font-semibold col-span-2 break-words break-all whitespace-normal overflow-hidden" style={{ color: colors.text }}>
                      {app?.email}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">Phone Number:</span>
                    <span className="text-[16px] font-semibold col-span-2 break-words break-all whitespace-normal overflow-hidden" style={{ color: colors.text }}>
                      {app?.phoneNumber}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">Country:</span>
                    <span className="text-[16px] font-semibold col-span-2 break-words break-all whitespace-normal overflow-hidden" style={{ color: colors.text }}>
                      {app?.country}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">Linkedin:</span>

                    <span className="text-[16px] font-semibold col-span-2 break-words break-all whitespace-normal overflow-hidden" style={{ color: colors.text }}>
                      {app?.linkedIn}
                    </span>
                  </div>
                </div>

                <div className="border-b-[0.1px] border-white/50" />
                <div className="p-8 space-y-4">
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">Role:</span>
                    <span className="text-[16px] font-semibold col-span-2" style={{ color: colors.text }}>
                      {app?.job?.title || app?.jobs?.title}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">
                      Date Submitted:
                    </span>
                    <span className="text-[16px] font-semibold col-span-2" style={{ color: colors.text }}>
                      {app?.dT_Created &&
                        new Date(app?.dT_Created).toLocaleString("en-GB")}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-[16px] text-[#6B7280]">Last Updated:</span>
                    <span className="text-[16px] font-semibold col-span-2" style={{ color: colors.text }}>
                      {app?.dT_Modified &&
                        new Date(app?.dT_Modified).toLocaleString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CV / Document Section */}
            <div
              className="rounded-xl p-6 shadow-md"
              style={{ background: colors.card }}
            >
              <div
                className="rounded-lg p-4"
                style={{ background: colors.innerCard }}
              >
                <div className="flex items-start space-x-4 p-4 mb-6">
                  {/* Mock Thumbnail Visual representation */}
                  <div className="w-20 h-24 bg-white/10 rounded border border-[#D9D9D9] p-1.5 flex flex-col justify-between shrink-0 overflow-hidden">
                    {/* Header (name bar) */}
                    <div className="space-y-1">
                      <div className="w-3/4 h-1.5 bg-white/40 rounded-sm"></div>
                      <div className="w-1/2 h-1 bg-gray-500 rounded-sm"></div>
                    </div>

                    {/* Body lines (experience/skills mimic) */}
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-gray-600 rounded-sm"></div>
                      <div className="w-5/6 h-1 bg-gray-600 rounded-sm"></div>
                      <div className="w-2/3 h-1 bg-gray-600 rounded-sm"></div>
                    </div>

                    {/* Footer */}
                    <div className="w-full h-4 bg-cyan-900/40 rounded-sm flex items-center justify-center">
                      <span className="text-[7px] text-cyan-300 font-bold tracking-wide">
                        RESUME
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-4 items-center">
                    <h4 className="text-[14px] font-medium truncate" style={{ color: colors.text }}>
                      {app?.firstName} {app?.lastName}.pdf
                    </h4>
                    <p className="text-[14px] mt-0.5" style={{ color: colors.text }}>
                      File Size: <span>{size}</span>
                    </p>
                  </div>
                </div>

                {/* Document Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center space-x-2 border py-2.5 px-4 rounded-lg transition text-[16px] font-medium"
                    style={{ color: colors.text, borderColor: colors.accent, backgroundColor: colors.card }}
                    onClick={() => setIsViewerOpen(true)}
                  >
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  {resumeUrl && (
                    <button
                      className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg transition text-[16px] font-semibold"
                      style={{ color: colors.card, backgroundColor: colors.accent }}
                      onClick={() => downloadFile(resumeUrl, resumeFileName)}
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Workflow & Activity Timeline) */}
          <div
            className="lg:col-span-6 rounded-xl p-6 shadow-md flex flex-col justify-between"
            style={{ background: colors.card }}
          >
            <div>
              <h2 className="text-[18px] font-semibold  mb-5 tracking-wide" style={{ color: colors.text }}>
                Workflow and Action panel
              </h2>

              {/* Chevron Process Steps Pipeline */}
              <div className="flex flex-wrap items-center gap-y-3 font-sans">
                {workflowStages.map((stage, idx) => {
                  const isActive =
                    app?.status?.toLowerCase() === stage.label?.toLowerCase();
                  return (
                    <button
                      disabled={!canUpdateApplication}
                      key={stage.id}
                      onClick={() => setSelectedStatus(stage.label)}
                      className={`relative h-11 px-9 text-[16px] font-normal transition-all flex items-center justify-center tracking-wide
                        ${idx === 0 ? "clip-chevron-first" : "clip-chevron-middle"}
                          ${
                            isActive
                              ? "bg-[#C89B3C] text-white font-semibold"
                              : "bg-[#E5E7EB] text-black hover:bg-[#363a47] hover:text-white"
                          }`}
                      style={{
                        marginLeft: idx === 0 ? "0px" : "-2px",
                        zIndex: workflowStages.length - idx,
                      }}
                    >
                      {/* Adjust text positioning slightly to balance the chevron cut tail */}
                      <span className={idx === 0 ? "pr-1" : "pl-2 pr-1"}>
                        {stage.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Activity Timeline */}
              <h3 className="text-[16px] font-semibold mb-4 mt-10 tracking-wide" style={{ color: colors.text }}>
                Activity Timeline and Internal Note
              </h3>
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
                        <p className="text-[15px] leading-relaxed font-normal" style={{ color: colors.text }}>
                          {event.title}
                        </p>
                        <p className="text-[14px] mt-1" style={{ color: colors.subtext }}>
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
      </div>
      <ResumeViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        resume={app?.resume ?? ""}
        firstName={app?.firstName ?? ""}
        lastName={app?.lastName ?? ""}
      />

      {/* <ConfirmModal
        open={!!selectedStatus}
        onClose={() => setSelectedStatus(null)}
        onConfirm={handleUpdateStatus}
        title="Update Application Status"
        description={`Are you sure you want to update the job application status to ${(selectedStatus && getStageMeta(selectedStatus)?.label) || "Unknown"}?`}
        confirmText="Yes, update"
        cancelText="No"
        loading={updating}
      /> */}

      <UpdateApplicationStage
        open={!!selectedStatus}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onClose={() => setSelectedStatus(null)}
        handleUpdateStatus={handleUpdateStatus}
        handleRejectApplication={handleRejectApplication}
        handleInReviewApplication={handleInReviewApplication}
      />
    </div>
  );
}
