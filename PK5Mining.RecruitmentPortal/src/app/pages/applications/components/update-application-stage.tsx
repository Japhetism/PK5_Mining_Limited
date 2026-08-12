import { useTenant } from "@/tenants/useTenant";
import { NewApplicationStage } from "./new-appication-stage";
import { NewApplicationStagePayload } from "@/app/interfaces";
import { InreviewApplicationStage } from "./inreview-application-stage";
import { ShortlistedApplicationStage } from "./shortlisted-application-stage";
import { InterviewScheduledApplicationStage } from "./interview-scheduled-application-stage";
import { InterviewCompletedApplicationStage } from "./interview-completed-stage";
import { OfferSentApplicationStage } from "./offer-sent-application-stage";
import { HiredApplicationStage } from "./hired-application-stage";

interface UpdateApplicationStageProps {
  loading: boolean;
  candidateStatus: string;
  handleNewApplicationStage: (
    payload: Omit<NewApplicationStagePayload, "applicationId">,
  ) => void;
  handleInReviewApplication: () => void;
}

export function UpdateApplicationStage({
  loading,
  candidateStatus,
  handleInReviewApplication,
  handleNewApplicationStage,
}: UpdateApplicationStageProps) {
  const { colors } = useTenant();

  const renderStage = () => {
    switch (candidateStatus) {
      case "New":
        return (
          <NewApplicationStage
            loading={loading}
            handleNewApplicationStage={handleNewApplicationStage}
          />
        );

      case "In Review":
        return (
          <InreviewApplicationStage
            handleProceedWithApplication={() => handleInReviewApplication()}
          />
        );

      case "Shortlisted":
        return (
          <ShortlistedApplicationStage
            handleSchedule={() => {}}
            handleReschedule={() => {}}
          />
        );

      case "Interview Scheduled":
        return (
          <InterviewScheduledApplicationStage
            isAssessmentSchedule={false}
            corporateOfficeAddress="Corporate Office Address"
            handleProceedWithApplication={() => {}}
          />
        );

      case "Interview Completed":
        return (
          <InterviewCompletedApplicationStage handleSendOffer={() => {}} />
        );

      case "Offer Sent":
        return (
          <OfferSentApplicationStage handleProceedWithApplication={() => {}} />
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
