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
  candidateStatus: string;
  handleUpdateStatus: () => void;
  handleInReviewApplication: () => void;
  handleRejectApplication: (
    payload: Omit<RejectApplicationPayload, "id">,
  ) => void;
}

export function UpdateApplicationStage({
  candidateStatus,
  handleUpdateStatus,
  handleInReviewApplication,
  handleRejectApplication,
}: UpdateApplicationStageProps) {
  const { colors } = useTenant();

  const renderStage = () => {
    switch (candidateStatus) {
      case "New":
        return (
          <NewApplicationStage
            handleUpdateStatus={handleUpdateStatus}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "In Review":
        return (
          <InreviewApplicationStage
            handleProceedWithApplication={() => handleInReviewApplication()}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Shortlisted":
        return (
          <ShortlistedApplicationStage
            handleSchedule={() => {}}
            handleReschedule={() => {}}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Interview Scheduled":
        return (
          <InterviewScheduledApplicationStage
            isAssessmentSchedule={false}
            corporateOfficeAddress="Corporate Office Address"
            handleProceedWithApplication={() => {}}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Interview Completed":
        return (
          <InterviewCompletedApplicationStage handleSendOffer={() => {}} />
        );

      case "Offer Sent":
        return (
          <OfferSentApplicationStage
            handleProceedWithApplication={() => {}}
            handleRejectApplication={handleRejectApplication}
          />
        );

      case "Hired":
        return (
          <HiredApplicationStage
            jobTitle=""
            department=""
            startDate=""
            managerName=""
            handleSubmit={() => {}}
          />
        );

      default:
        return (
          <div className="text-gray-500 text-sm py-4">
            No decision is required for this current status.
          </div>
        );
    }
  };

  return <div>{renderStage()}</div>;
}
