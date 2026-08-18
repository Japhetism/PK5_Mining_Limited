import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApplicationById,
  processInReviewApplication,
  processInterviewCompletedApplication,
  processNewApplication,
  processScheduledApplication,
  processShortlistedApplication,
  updateJobApplicationStatus,
} from "@/app/api/applications";
import { toastUtil } from "@/app/utils/toast";
import {
  ApiError,
  InReviewApplicationStagePayload,
  InterviewCompletedApplicationStagePayload,
  NewApplicationStagePayload,
  ScheduledApplicationStagePayload,
  ShortlistedApplicationStagePayload,
  StageValue,
} from "@/app/interfaces";
import {
  getRemoteFileSize,
  isStageValue,
  normalizeStage,
} from "@/app/utils/helper";
import { statuses, statusStyles } from "@/app/constants";

function useApplicationDetailsViewModel() {
  const queryClient = useQueryClient();
  const { applicationId } = useParams<{ applicationId: string }>();

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const [noteText, setNoteText] = useState("");
  const [size, setSize] = useState("Loading...");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["applications", applicationId],
    queryFn: () => getApplicationById(applicationId as string),
    enabled: !!applicationId,
    staleTime: 5 * 60 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: (newStatus: string) => {
      if (!applicationId) {
        toastUtil.error("Invalid application ID");
        throw new Error("Invalid application ID");
      }
      const payload = {
        id: parseInt(applicationId, 10),
        status: newStatus,
      };
      return updateJobApplicationStatus(payload);
    },
    onSuccess: () => {
      setUpdating(false);
      setEditStatus(false);
      setConfirmOpen(false);
      setSelectedStatus(null);
      queryClient.invalidateQueries({
        queryKey: ["applications", applicationId],
      });
      toastUtil.success("Application status updated successfully");
    },
    onError: (err) => {
      setUpdating(false);
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while updating application status. Please try again.");
      toastUtil.error(message);
    },
  });

  // Close modal on ESC
  useEffect(() => {
    if (!isViewerOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsViewerOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isViewerOpen]);

  const handleUpdateStatus = () => {
    if (!selectedStatus) {
      toastUtil.error("Please select a status");
      return;
    }

    setUpdating(true);
    updateMutation.mutate(selectedStatus);
  };

  const handleNewApplicationStage = (
    payload: Omit<NewApplicationStagePayload, "applicationId">,
  ) => {
    setUpdating(true);
    processNewApplication({
      applicationId: parseInt(applicationId as string, 10),
      ...payload,
    })
      .then(() => {
        setUpdating(false);
        toastUtil.success("Application stage updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["applications", applicationId],
        });
      })
      .catch((err) => {
        setUpdating(false);
        const message =
          (err as ApiError)?.message ??
          (err instanceof Error
            ? err.message
            : "An error occurred while updating application stage. Please try again.");
        toastUtil.error(message);
      });
  };

  const handleInReviewApplicationStage = (
    payload: Omit<InReviewApplicationStagePayload, "applicationId">,
  ) => {
    setUpdating(true);
    processInReviewApplication({
      applicationId: parseInt(applicationId as string, 10),
      ...payload,
    })
      .then(() => {
        setUpdating(false);
        toastUtil.success("Application stage updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["applications", applicationId],
        });
      })
      .catch((err) => {
        setUpdating(false);
        const message =
          (err as ApiError)?.message ??
          (err instanceof Error
            ? err.message
            : "An error occurred while updating application stage. Please try again.");
        toastUtil.error(message);
      });
  };

  const handleShortlistedApplicationStage = (
    payload: Omit<ShortlistedApplicationStagePayload, "applicationId">,
  ) => {
    setUpdating(true);
    processShortlistedApplication({
      applicationId: parseInt(applicationId as string, 10),
      ...payload,
    })
      .then(() => {
        setUpdating(false);
        toastUtil.success("Application stage updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["applications", applicationId],
        });
      })
      .catch((err) => {
        setUpdating(false);
        const message =
          (err as ApiError)?.message ??
          (err instanceof Error
            ? err.message
            : "An error occurred while updating application stage. Please try again.");
        toastUtil.error(message);
      });
  };

  const handleScheduledInterviewApplicationStage = (
    payload: Omit<ScheduledApplicationStagePayload, "applicationId">,
  ) => {
    setUpdating(true);
    processScheduledApplication({
      applicationId: parseInt(applicationId as string, 10),
      ...payload,
    })
      .then(() => {
        setUpdating(false);
        toastUtil.success("Application stage updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["applications", applicationId],
        });
      })
      .catch((err) => {
        setUpdating(false);
        const message =
          (err as ApiError)?.message ??
          (err instanceof Error
            ? err.message
            : "An error occurred while updating application stage. Please try again.");
        toastUtil.error(message);
      });
  };

  const handleInterviewCompletedApplicationStage = (
    payload: Omit<InterviewCompletedApplicationStagePayload, "applicationId">,
  ) => {
    setUpdating(true);
    processInterviewCompletedApplication({
      applicationId: parseInt(applicationId as string, 10),
      ...payload,
    })
      .then(() => {
        setUpdating(false);
        toastUtil.success("Application stage updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["applications", applicationId],
        });
      })
      .catch((err) => {
        setUpdating(false);
        const message =
          (err as ApiError)?.message ??
          (err instanceof Error
            ? err.message
            : "An error occurred while updating application stage. Please try again.");
        toastUtil.error(message);
      });
  };

  useEffect(() => {
    if (error) {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while fetching application details. Please try again.");
      toastUtil.error(message);
    }
  }, [error]);

  const app = data ?? undefined;

  const resumeUrl = useMemo(() => {
    const url = app?.resume?.trim();
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  }, [app?.resume]);

  const resumeFileName = useMemo(() => {
    const first = app?.firstName ?? "candidate";
    const last = app?.lastName ?? "resume";
    return `${first}-${last}-resume.pdf`;
  }, [app?.firstName, app?.lastName]);

  // whenever modal opens, show loader until iframe fires onLoad
  useEffect(() => {
    if (isViewerOpen && resumeUrl) setResumeLoading(true);
  }, [isViewerOpen, resumeUrl]);

  useEffect(() => {
    if (!app?.resume) {
      setSize("No file");
      return;
    }

    const fetchSize = async () => {
      const result = await getRemoteFileSize(app.resume);
      setSize(result);
    };

    fetchSize();
  }, [app?.resume]);

  const timelineEvents = [];

  if (app?.dT_Created) {
    timelineEvents.push({
      title: "Application Received",
      time: new Date(app.dT_Created).toLocaleString("en-GB"),
      isNote: false,
    });
  }

  if (app?.dT_Modified) {
    timelineEvents.push({
      title: "Application Updated",
      time: new Date(app.dT_Modified).toLocaleString("en-GB"),
      isNote: true,
    });
  }

  const initials = `${app?.firstName?.[0] ?? ""}${app?.lastName?.[0] ?? ""
    }`.toUpperCase();

  const appStatus = app?.status ?? "";

  return {
    app,
    isLoading,
    isError,
    editStatus,
    setEditStatus,
    selectedStatus,
    setSelectedStatus,
    confirmOpen,
    setConfirmOpen,
    resumeUrl,
    resumeFileName,
    isViewerOpen,
    setIsViewerOpen,
    resumeLoading,
    setResumeLoading,
    error,
    handleUpdateStatus,
    updating,
    size,
    timelineEvents,
    initials,
    appStatus,
    handleNewApplicationStage,
    handleInReviewApplicationStage,
    handleShortlistedApplicationStage,
    handleScheduledInterviewApplicationStage,
    handleInterviewCompletedApplicationStage,
  };
}

export default useApplicationDetailsViewModel;

export type ApplicationDetailsViewModel = ReturnType<
  typeof useApplicationDetailsViewModel
>;
