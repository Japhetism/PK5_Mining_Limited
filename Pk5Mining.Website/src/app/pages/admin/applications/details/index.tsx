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
  } = useApplicationDetailsViewModel();

  if (isLoading) return <ApplicationDetailsSkeleton />;

  const permissions = user?.role?.permissions ?? [];

  const canUpdateApplication =
    permissions.includes(PERMISSIONS.applicationUpdate as any) ||
    !enforcePermission;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => history.back()}
          className="inline-flex items-center gap-1 text-xs"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
      </div>

      <div className="mx-auto space-y-6">
        {/* --- Top Header Profile Bar --- */}
        <div
          className="border rounded-xl p-4 flex items-center justify-between shadow-lg"
          style={{ background: colors.card, borderColor: colors.border }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#C89B3C] flex items-center justify-center text-[#14161d] font-bold text-lg">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white tracking-wide">
                {app?.firstName} {app?.lastName}
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">Applicant</p>
            </div>
          </div>

          {/* Live Status Badge */}
          <div
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gray-800 ${statusStyle.bg}`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${statusStyle.dot}`}
            ></span>

            <span
              className={`text-xs font-medium tracking-wide ${statusStyle.text}`}
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
              className="border rounded-xl p-6 shadow-md"
              style={{ background: colors.bg, borderColor: colors.border }}
            >
              <h2 className="text-base font-semibold text-white mb-6 tracking-wide">
                Contact and Application details
              </h2>

              <div className="rounded-lg" style={{ background: colors.card }}>
                <div className="p-8 space-y-4 ">
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">Name:</span>
                    <span className="text-sm font-semibold text-white col-span-2 break-words break-all whitespace-normal overflow-hidden">
                      {app?.firstName} {app?.lastName}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">Email:</span>
                    <span className="text-sm font-semibold text-white col-span-2 break-words break-all whitespace-normal overflow-hidden">
                      {app?.email}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">Phone Number:</span>
                    <span className="text-sm font-semibold text-white col-span-2 break-words break-all whitespace-normal overflow-hidden">
                      {app?.phoneNumber}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">Country:</span>
                    <span className="text-sm font-semibold text-white col-span-2 break-words break-all whitespace-normal overflow-hidden">
                      {app?.country}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">Linkedin:</span>

                    <span className="text-sm font-semibold text-white col-span-2 break-words break-all whitespace-normal overflow-hidden">
                      {app?.linkedIn}
                    </span>
                  </div>
                </div>

                <div className="border-b-[0.1px] border-white/50" />
                <div className="p-8 space-y-4">
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">Role:</span>
                    <span className="text-sm font-semibold text-white col-span-2">
                      {app?.job?.title || app?.jobs?.title}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">
                      Date Submitted:
                    </span>
                    <span className="text-sm font-semibold text-white col-span-2">
                      {app?.dT_Created &&
                        new Date(app?.dT_Created).toLocaleString("en-GB")}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1">
                    <span className="text-sm text-gray-400">Last Updated:</span>
                    <span className="text-sm font-semibold text-white col-span-2 flex items-center gap-1">
                      {app?.dT_Modified &&
                        new Date(app?.dT_Modified).toLocaleString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CV / Document Section */}
            <div
              className="border rounded-xl p-6 shadow-md"
              style={{ background: colors.bg, borderColor: colors.border }}
            >
              <div
                className="rounded-lg p-4"
                style={{ background: colors.card }}
              >
                <div className="flex items-start space-x-4 p-4 mb-6">
                  {/* Mock Thumbnail Visual representation */}
                  <div className="w-20 h-24 bg-white/10 rounded border border-gray-700 p-1.5 flex flex-col justify-between shrink-0 overflow-hidden">
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
                    <h4 className="text-sm font-medium text-white truncate">
                      {app?.firstName} {app?.lastName}.pdf
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      File Size: <span className="text-gray-300">{size}</span>
                    </p>
                  </div>
                </div>

                {/* Document Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center space-x-2 border border-gray-700 hover:border-gray-500 hover:bg-white/5 text-white py-2.5 px-4 rounded-lg transition text-sm font-medium"
                    onClick={() => setIsViewerOpen(true)}
                  >
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  {resumeUrl && (
                    <button
                      className="flex items-center justify-center space-x-2 bg-[#cca043] hover:bg-[#b88f36] text-black py-2.5 px-4 rounded-lg transition text-sm font-semibold"
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
            className="lg:col-span-6 border rounded-xl p-6 shadow-md flex flex-col justify-between"
            style={{ background: colors.card, borderColor: colors.border }}
          >
            <div>
              <h2 className="text-base font-semibold text-white mb-5 tracking-wide">
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
                      className={`relative h-11 px-9 text-xs font-normal transition-all flex items-center justify-center tracking-wide
                        ${idx === 0 ? "clip-chevron-first" : "clip-chevron-middle"}
                          ${
                            isActive
                              ? "bg-[#C89B3C] text-black font-semibold"
                              : "bg-[#9F9F9F] text-black hover:bg-[#363a47] hover:text-white"
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
              <h3 className="text-sm font-semibold text-white mb-4 mt-10 tracking-wide">
                Activity Timeline and Internal Note
              </h3>
              <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-800">
                {timelineEvents?.length > 0 ? (
                  timelineEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="relative flex items-start space-x-3 group"
                    >
                      {/* Node Dot indicator */}
                      <div className="absolute -left-[15px] mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-400 border-2 border-[#14161d] group-hover:bg-cyan-400 transition-colors" />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 leading-relaxed font-normal">
                          {event.title}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-sm text-gray-500">
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

      <ConfirmModal
        open={!!selectedStatus}
        onClose={() => setSelectedStatus(null)}
        onConfirm={handleUpdateStatus}
        title="Update Application Status"
        description={`Are you sure you want to update the job application status to ${(selectedStatus && getStageMeta(selectedStatus)?.label) || "Unknown"}?`}
        confirmText="Yes, update"
        cancelText="No"
        loading={updating}
      />
    </div>
  );
}
