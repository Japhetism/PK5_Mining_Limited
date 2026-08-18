import { NewApplicationStage } from "./new-appication-stage";
import { InreviewApplicationStage } from "./inreview-application-stage";
import { ShortlistedApplicationStage } from "./shortlisted-application-stage";
import { InterviewScheduledApplicationStage } from "./interview-scheduled-application-stage";
import { InterviewCompletedApplicationStage } from "./interview-completed-stage";
import { OfferSentApplicationStage } from "./offer-sent-application-stage";
import { HiredApplicationStage } from "./hired-application-stage";
import { InReviewApplicationStagePayload, NewApplicationStagePayload } from "@/app/interfaces";

interface UpdateApplicationStageProps {
  loading: boolean;
  candidateStatus: string;
  handleNewApplicationStage: (
    payload: Omit<NewApplicationStagePayload, "applicationId">,
  ) => void;
  handleInReviewApplication: (
    payload: Omit<InReviewApplicationStagePayload, "applicationId">,
  ) => void;
  handleShortlistedApplicationStage: () => void;
}

export function UpdateApplicationStage({
  loading,
  candidateStatus,
  handleInReviewApplication,
  handleNewApplicationStage,
  handleShortlistedApplicationStage,
}: UpdateApplicationStageProps) {
  const renderStage = () => {
    switch (candidateStatus?.toLowerCase()) {
      case "new":
        return (
          <NewApplicationStage
            loading={loading}
            handleNewApplicationStage={handleNewApplicationStage}
          />
        );

      case "in review":
        return (
          <InreviewApplicationStage
            loading={loading}
            handleInReviewApplicationStage={handleInReviewApplication}
          />
        );

      case "shortlisted":
        return (
          <ShortlistedApplicationStage
            loading={loading}
            handleShortlistedApplicationStage={
              handleShortlistedApplicationStage
            }
          />
        );

      case "interview scheduled":
        return (
          <InterviewScheduledApplicationStage
            loading={loading}
            isAssessmentSchedule={false}
            corporateOfficeAddress="Corporate Office Address"
            handleProceedWithApplication={() => {}}
          />
        );

      case "interview completed":
        return (
          <InterviewCompletedApplicationStage
            loading={loading}
            handleSendOffer={() => {}}
          />
        );

      case "offer sent":
        return (
          <OfferSentApplicationStage
            loading={loading}
            handleProceedWithApplication={() => {}}
          />
        );

      case "hired":
        return (
          <HiredApplicationStage
            loading={loading}
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
