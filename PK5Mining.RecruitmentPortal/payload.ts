// new application stage
const rejectionNewPayload = {
  currentStatus: "New",
  rejectionReason: "", // mandatory
  employeeId: 122344,
}

const proceedNewPayload = {
    currentStatus: "New",
    employeeId: 122344,
}


// in review application stage
const rejectionInReviewPayload = {
  currentStatus: "In Review",
  rejectionReason: "", // mandatory
  employeeId: 122344,
}

const assessmentInReviewProceedPayload = {
    currentStatus: "In Review",
    nextProcess : "Assessment",
    assessmentType: "Online/In Person",
    onlineAssessmentLink: "https://www.assessment.com", // mandatory if assessment type is online
    scheduledDate: "", // mandatory if assessment type is in person
    scheduledTime: "", // mandatory if assessment type is in person
    deadlineDate: "", // mandatory if assessment type is online
    deadlineTime: "", // mandatory if assessment type is online
    venueAddress: "", // mandatory if assessment type is in person
    employeeId: 122344,
}

const interviewInReviewProceedPayload = {
    currentStatus: "In Review",
    nextProcess : "Interview",
    interviewType: "Virtual/Onsite",
    panelists: [],
    scheduledDate: "",
    scheduledTime: "",
    venueAddress: "", // mandatory if interview type is onsite
    employeeId: 122344,
}


// shortlisted
const rejectionShortlistedPayload = {
  currentStatus: "Shortlisted",
  rejectionReason: "", // mandatory
  employeeId: 122344,
}

const scheduleProceedPayload = {
    currentStatus: "Shortlisted",
}

const rescheduleProceedPayload = {
    currentStatus: "Shortlisted",
    rescheduledDateTime: "", // mandatory
    reason: "" // mandatory
}

// interview scheduled
const rejectionInterviewScheduledPayload = {
  currentStatus: "Interview Scheduled",
  rejectionReason: "", // mandatory
  employeeId: 122344,
}

const assessmentProceedPayload = {
    reviews: "",
    currentStatus: "Interview Scheduled",
    nextProcess : "Assessment",
    assessmentType: "Online/In Person",
    onlineAssessmentLink: "https://www.assessment.com", // mandatory if assessment type is online
    scheduledDate: "", // mandatory if assessment type is in person
    scheduledTime: "", // mandatory if assessment type is in person
    deadlineDate: "", // mandatory if assessment type is online
    deadlineTime: "", // mandatory if assessment type is online
    venueAddress: "", // mandatory if assessment type is in person
    employeeId: 122344,
}

const interviewProceedPayload = {
    reviews: "",
    currentStatus: "Interview Scheduled",
    nextProcess : "Interview",
    interviewType: "Virtual/Onsite",
    panelists: [],
    scheduledDate: "",
    scheduledTime: "",
    venueAddress: "", // mandatory if interview type is onsite
    employeeId: 122344,
}

const interviewScheduledCompletedPayload = {
    currentStatus: "Interview Scheduled",
    reviews: "",
    employeeId: 122344,
}

// Interview Completed
const rejectionInterviewCompletedPayload = {
  currentStatus: "Interview Completed",
  rejectionReason: "", // mandatory
  employeeId: 122344,
}

const interviewCompletedPayload = {
    currentStatus: "Interview Completed",
    assessmentResult: File | null, // mandatory
    employeeId: 122344,
    offerMethod: "Upload" | "Link",
    offerLetter: File | null, // mandatory if offer method is upload
    offerLetterLink: string, // mandatory if offer method is link
}


// Offer Sent 
const rejectionOfferSentPayload = {
  currentStatus: "Offer Sent",
  rejectionReason: "", // mandatory
  rejectionDecision: "Declined Offer" | "Withdrawn Offer"
  employeeId: 122344,
}

const proceedOfferSentPayload = {
    currentStatus: "Offer Sent",
    employeeId: 122344,
}

// Pre onboarding information
const rejectionPayload = {
  currentStatus: "Pre-Onboarding",
  rejectionReason: "", // mandatory
  employeeId: 122344,
}

const proceedPayload = {
   // this can be auto from backend
   companyInfo: {
    jobTitle: "",
    department: "",
    managerName: "",
    startDate: "",
   },
   personalInfo: {
    fullLegalName: "",
    preferredName: "",
    homeAddress: "",
    phoneNumber: "",
    emailAddress: "",
    dateOfBirth: "",
   },
   emergencyContactInfo: {
        fullName: "",
        relationship: "",
        phoneNumber: "",
   },
   identificationInfo: {
    governmentIdType: "",
    governmentIdNumber: "",
    governmentIdExpiryDate: "",
    governmentIdDocument: File | null,
   } 
}

