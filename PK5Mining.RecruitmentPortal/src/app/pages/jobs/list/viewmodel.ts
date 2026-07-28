import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobs, updateJob } from "@/app/api/jobs";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import {
  ApiError,
  JobDto,
  JobsQuery,
  UpdateJobPayload,
} from "@/app/interfaces";
import {
  cleanParams,
  getLastMonthToDateRange,
  sortAlphabetically,
  toNumber,
} from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import { useTenant } from "@/tenants/useTenant";

function useJobListViewModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isAgro } = useTenant();

  const { startDate, endDate } = getLastMonthToDateRange();

  const AGRO_BASE_URL = import.meta.env.VITE_AGRO_APP_JOB_BASE_URL;
  const SHOULD_USE_AGRO_URL = !!(isAgro && AGRO_BASE_URL);

  const defaultFilter = location.state?.defaultFilter ?? "";

  console.log("default filter from job ", defaultFilter)

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<string>(defaultFilter);
  const [filterJobType, setFilterJobType] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterJobTitle, setFilterJobTitle] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<string>(startDate);
  const [filterEndDate, setFilterEndDate] = useState<string>(endDate);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [shouldUpdateDropdown, setShouldUpdateDropdown] =
    useState<boolean>(true);

  const [dropdownOptions, setDropdownOptions] = useState({
    departments: [] as string[],
    locations: [] as string[],
    statuses: [] as string[],
    jobTypes: [] as string[],
    titles: [] as string[],
  });

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
        filterStatus?.toLowerCase() === "close"
          ? false
          : filterStatus?.toLowerCase() === "open"
            ? true
            : "",
      jobType: filterJobType,
      department: debouncedFilters.department,
      location: debouncedFilters.location,
      startDate: filterStartDate,
      endDate: filterEndDate,
      title: filterJobTitle,
    };

    // clean out empty strings
    return cleanParams(raw) as JobsQuery;
  }, [
    pageNumber,
    pageSize,
    debouncedFilters,
    filterStatus,
    filterJobType,
    filterStartDate,
    filterEndDate,
    filterJobTitle,
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "jobs",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.department ?? "",
      queryParams.location ?? "",
      queryParams.isActive ?? "",
      queryParams.jobType ?? "",
      queryParams.startDate ?? "",
      queryParams.endDate ?? "",
      queryParams.title ?? "",
    ],
    queryFn: () => getJobs(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!data || !shouldUpdateDropdown) return;

    setDropdownOptions({
      departments: sortAlphabetically(data.departments ?? []),
      locations: sortAlphabetically(data.locations ?? []),
      statuses: sortAlphabetically(data.statuses ?? []),
      jobTypes: sortAlphabetically(data.jobTypes ?? []),
      titles: sortAlphabetically(data.titles ?? []),
    });
  }, [shouldUpdateDropdown, data]);

  useEffect(() => {
    if (error) {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while fetching jobs. Please try again.");
      toastUtil.error(message);
    }
  }, [error]);

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateJobPayload) => {
      if (
        !selectedJob ||
        !("id" in selectedJob) ||
        typeof selectedJob.id !== "number"
      ) {
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
    onError: (err) => {
      setIsUpdating(false);
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while updating the job. Please try again.");
      toastUtil.error(message);
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
    setShouldUpdateDropdown(false);
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

  const handleResetFilters = () => {
    setFilterStatus("");
    setFilterJobType("");
    setFilterDepartment("");
    setFilterLocation("");
    setFilterJobTitle("");
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    updateFilter("department", "");
    updateFilter("location", "");
    setIsFilter(true);
    setShouldUpdateDropdown(true);
  };

  const jobs: JobDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  // dropdown options
  const departments = dropdownOptions.departments;
  const locations = dropdownOptions.locations;
  const statuses = dropdownOptions.statuses;
  const jobTypes = dropdownOptions.jobTypes;
  const titles = dropdownOptions.titles;

  return {
    jobs,
    isLoading,
    error,
    filterStatus,
    filterJobType,
    filterJobTitle,
    filterDepartment,
    filterLocation,
    filterStartDate,
    filterEndDate,
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
    departments,
    locations,
    statuses,
    jobTypes,
    titles,
    setIsFilter,
    setFilterStatus,
    setFilterJobTitle,
    setFilterJobType,
    setFilterDepartment,
    setFilterLocation,
    setFilterStartDate,
    setFilterEndDate,
    handleUpdateStatus,
    setSelectedJob,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setConfirmOpen,
    handleNavigateToJobDetailWebsite,
    handleResetFilters,
    setShouldUpdateDropdown,
  };
}

export default useJobListViewModel;

export type JobsListViewModel = ReturnType<typeof useJobListViewModel>;
