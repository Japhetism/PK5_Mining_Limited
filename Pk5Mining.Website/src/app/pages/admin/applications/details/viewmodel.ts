import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicationById,
  updateJobApplicationStatus,
} from "@/app/api/applications";
import { ApiError } from "@/app/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";

function useApplicationDetailsViewModel() {
  const queryClient = useQueryClient();
  const { applicationId } = useParams<{ applicationId: string }>();

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

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
      queryClient.invalidateQueries({
        queryKey: ["applications", applicationId],
      });
      toastUtil.success("Application status updated successfully");
    },
    onError: (err: unknown) => {
      setUpdating(false);

      const message = getAxiosErrorMessage(
        error,
        "An error occurred while updating application status. Please try again.",
      );

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

  useEffect(() => {
    if (error) {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while fetching application details. Please try again.",
      );
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
  }
}

export default useApplicationDetailsViewModel;

export type ApplicationDetailsViewModel = ReturnType<typeof useApplicationDetailsViewModel>;
