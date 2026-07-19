import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobApplicationsByJobId } from "@/app/api/applications";
import { getJobById } from "@/app/api/jobs";
import {
  ApiError,
  ApplicationsByJobIdQuery,
  JobApplicationDto,
} from "@/app/interfaces";
import { cleanParams } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import { useTenant } from "@/tenants/useTenant";

function useJobDetailsViewModel() {
  const queryClient = useQueryClient();
  const { jobId } = useParams<{ jobId: string }>();
  const { isAgro } = useTenant();

  const AGRO_BASE_URL = import.meta.env.VITE_AGRO_APP_JOB_BASE_URL;
    const SHOULD_USE_AGRO_URL = !!(isAgro && AGRO_BASE_URL);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<JobApplicationDto | null>(null);

  const queryParams: ApplicationsByJobIdQuery = useMemo(() => {
    const raw: ApplicationsByJobIdQuery = {
      pageNumber,
      pageSize,
    };

    return cleanParams(raw) as ApplicationsByJobIdQuery;
  }, [pageNumber, pageSize]);

  const {
    data: jobData,
    isLoading,
    isError,
    error: fetchError,
  } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobById(jobId as string),
    enabled: !!jobId,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: jobApplications,
    isLoading: jobApplicationsLoading,
    isError: jobApplicationsHasError,
    error: jobApplicationsFetchError,
  } = useQuery({
    queryKey: ["jobApplications", jobId, pageNumber, pageSize],
    queryFn: () => getJobApplicationsByJobId(jobId as string, queryParams),
    enabled: !!jobId,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (fetchError) {
      const message =
        (fetchError as ApiError)?.message ??
        (fetchError instanceof Error
          ? fetchError.message
          : "An error occurred while fetching job details. Please try again.");
      toastUtil.error(message);
    }

    if (jobApplicationsFetchError) {
      const message =
        (jobApplicationsFetchError as ApiError)?.message ??
        (jobApplicationsFetchError instanceof Error
          ? jobApplicationsFetchError.message
          : "An error occurred while fetching job applications. Please try again.");
      toastUtil.error(message);
    }
  }, [fetchError, jobApplicationsFetchError]);

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const handleNavigateToJobDetailWebsite = (jobId: number | undefined) => {
    if (!jobId) {
      toastUtil.error("Job ID is missing. Cannot navigate to job details.");
      return;
    }

    const targetUrl = SHOULD_USE_AGRO_URL
      ? `${AGRO_BASE_URL}/${jobId}/apply`
      : `/careers/job/${jobId}`;

    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const job = jobData ?? undefined;
  const applications: JobApplicationDto[] = jobApplications?.data ?? [];
  const totalCount = jobApplications?.totalCount ?? 0;
  const totalPages: number =
    jobApplications?.totalPages ??
    Math.ceil((totalCount ?? 0) / (pageSize || 1));

  return {
    job,
    isLoading,
    isError,
    applications,
    jobApplicationsLoading,
    jobApplicationsHasError,
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    selectedApplicant,
    isViewerOpen,
    queryClient,
    onChangePage,
    onChangePageSize,
    setIsViewerOpen,
    setSelectedApplicant,
    handleNavigateToJobDetailWebsite,
  };
}

export default useJobDetailsViewModel;

export type JobDetailsViewModel = ReturnType<typeof useJobDetailsViewModel>;
