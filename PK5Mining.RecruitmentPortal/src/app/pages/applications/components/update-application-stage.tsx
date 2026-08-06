import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { useTenant } from "@/tenants/useTenant";
import { NewApplicationStage } from "./new-appication-stage";
import { RejectApplicationPayload } from "@/app/interfaces";
import { InreviewApplicationStage } from "./inreview-application-stage";
import { ShortlistedApplicationStage } from "./shortlisted-application-stage";
import { InterviewScheduledApplicationStage } from "./interview-scheduled-application-stage";
import { InterviewCompletedApplicationStage } from "./interview-completed-stage";
import { OfferSentApplicationStage } from "./offer-sent-application-stage";
import { HiredApplicationStage } from "./hired-application-stage";

interface UpdateApplicationStageProps {
  open: boolean;
  onClose: () => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  handleUpdateStatus: () => void;
  handleInReviewApplication: () => void;
  handleRejectApplication: (
    payload: Omit<RejectApplicationPayload, "id">,
  ) => void;
}

export function UpdateApplicationStage({
  open,
  onClose,
  selectedStatus,
  setSelectedStatus,
  handleUpdateStatus,
  handleInReviewApplication,
  handleRejectApplication,
}: UpdateApplicationStageProps) {
  const { colors } = useTenant();

  const renderStage = () => {
    switch (selectedStatus) {
      case "New":
        return (
          <NewApplicationStage
            onClose={onClose}
            setSelectedStatus={setSelectedStatus}
            handleUpdateStatus={handleUpdateStatus}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "In Review":
        return (
          <InreviewApplicationStage
            onClose={onClose}
            handleProceedWithApplication={() => handleInReviewApplication()}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Shortlisted":
        return (
          <ShortlistedApplicationStage
            onClose={onClose}
            handleSchedule={() => {}}
            handleReschedule={() => {}}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Interview Scheduled":
        return (
          <InterviewScheduledApplicationStage
            onClose={onClose}
            isAssessmentSchedule={false}
            corporateOfficeAddress="Corporate Office Address"
            handleProceedWithApplication={() => {}}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Interview Completed":
        return (
          <InterviewCompletedApplicationStage
            onClose={onClose}
            handleSendOffer={() => {}}
          />
        );

      case "Offer Sent":
        return (
          <OfferSentApplicationStage
            onClose={onClose}
            handleProceedWithApplication={() => {}}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Hired":
        return (
          <HiredApplicationStage
            onClose={onClose}
            jobTitle=""
            department=""
            startDate=""
            managerName=""
            handleSubmit={() => {}}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="lg"
      height="md"
      showCloseButton={false}
      panelClassName="h-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <p
            className="text-[18px] font-semibold truncate"
            style={{ color: colors.text }}
          >
            Update Application Stage
          </p>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md text-[15px]"
            style={{ color: colors.text }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {renderStage()}
      </div>
    </Modal>
  );
}
