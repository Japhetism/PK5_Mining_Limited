import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobs, updateJob } from "@/app/api/jobs";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import {
  JobDto,
  JobsQuery,
  StatusFilter,
  UpdateJobPayload,
} from "@/app/interfaces";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";

function useJobListViewModel() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [filterJobType, setFilterJobType] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [filters, setFilters] = useState({
    department: searchParams.get("department") ?? "",
    location: searchParams.get("location") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.department, debouncedFilters.location]);

  const queryParams: JobsQuery = useMemo(() => {
    const raw: JobsQuery = {
      pageNumber,
      pageSize,
      isActive:
        filterStatus === "closed" ? false : filterStatus === "open" ? true : "",
      jobType: filterJobType,
      department: debouncedFilters.department,
      location: debouncedFilters.location,
    };

    // clean out empty strings
    return cleanParams(raw) as JobsQuery;
  }, [pageNumber, pageSize, debouncedFilters, filterStatus, filterJobType]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "jobs",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.department ?? "",
      queryParams.location ?? "",
      queryParams.isActive ?? "",
      queryParams.jobType ?? "",
    ],
    queryFn: () => getJobs(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (error) {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while fetching jobs. Please try again.",
      );
      toast.error(message);
    }
  }, [error]);

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateJobPayload) => {
      if (!selectedJob || !("id" in selectedJob)) {
        throw new Error("Cannot update: missing job id");
      }
      return updateJob(selectedJob.id, payload);
    },
    onSuccess: async () => {
      setIsUpdating(false);
      setConfirmOpen(false);
      setSelectedJob(null);

      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err: unknown) => {
      console.error(err);
      setIsUpdating(false);
      const message = getAxiosErrorMessage(
        err,
        "An error occurred while updating the job. Please try again.",
      );
      toast.error(message);
    },
  });

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  const handleUpdateStatus = () => {
    if (!selectedJob) return;

    setIsUpdating(true);

    updateMutation.mutate({
      ...selectedJob,
      isActive: !selectedJob.isActive,
      jobType: selectedJob.jobType ?? undefined,
      workArrangement: selectedJob.workArrangement ?? undefined,
      briefDescription: selectedJob.briefDescription ?? undefined,
    });
  };

  const jobs: JobDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    jobs,
    isLoading,
    error,
    filterStatus,
    filterJobType,
    filterDepartment,
    filterLocation,
    isFilter,
    selectedJob,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    isUpdating,
    confirmOpen,
    filters,
    queryClient,
    setIsFilter,
    setFilterStatus,
    setFilterJobType,
    setFilterDepartment,
    setFilterLocation,
    handleUpdateStatus,
    setSelectedJob,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setConfirmOpen,
  };
}

export default useJobListViewModel;

export type JobsListViewModel = ReturnType<typeof useJobListViewModel>;
