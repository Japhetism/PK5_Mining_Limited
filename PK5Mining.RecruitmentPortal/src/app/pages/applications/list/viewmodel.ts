import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplications } from "@/app/api/applications";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import {
  ApiError,
  ApplicationsQuery,
  ApplicationStatusFilter,
  JobApplicationDto,
} from "@/app/interfaces";
import {
  cleanParams,
  getLastMonthToDateRange,
  sortAlphabetically,
  toNumber,
} from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";

function useApplicationsListViewModel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { startDate, endDate } = getLastMonthToDateRange();

  const defaultFilter = location.state?.defaultFilter ?? "";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<string>(startDate);
  const [filterEndDate, setFilterEndDate] = useState<string>(endDate);
  const [filterJobTitle, setFilterJobTitle] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>(defaultFilter);
  const [filterJobId, setFilterJobId] = useState<string>("");
  const [filterCandidateEmail, setFilterCandidateEmail] = useState<string>("");
  const [filterCandidateId, setFilterCandidateId] = useState<string>("");
  const [filterCandidateName, setFilterCandidateName] = useState<string>("");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [filters, setFilters] = useState({
    email: searchParams.get("email") ?? "",
  });

  const [shouldUpdateDropdown, setShouldUpdateDropdown] =
    useState<boolean>(true);

  const [dropdownOptions, setDropdownOptions] = useState({
    candidateNames: [] as string[],
    candidateEmails: [] as string[],
    candidateIds: [] as string[],
    jobTitles: [] as string[],
    jobIds: [] as string[],
    statuses: [] as string[],
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.email]);

  const queryParams: ApplicationsQuery = useMemo(() => {
    const raw: ApplicationsQuery = {
      pageNumber,
      pageSize,
      startDate: filterStartDate,
      endDate: filterEndDate,
      candidateEmail: filterCandidateEmail,
      candidateId: filterCandidateId ? Number(filterCandidateId) : "",
      candidateName: filterCandidateName,
      jobId: filterJobId ? Number(filterJobId) : "",
      jobTitle: filterJobTitle,
      status: filterStatus,
    };

    // clean out empty strings
    return cleanParams(raw) as ApplicationsQuery;
  }, [
    pageNumber,
    pageSize,
    filterStartDate,
    filterEndDate,
    filterStatus,
    filterCandidateEmail,
    filterCandidateName,
    filterCandidateId,
    filterJobTitle,
    filterJobId,
    debouncedFilters,
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "applications",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.email ?? "",
      queryParams.endDate ?? "",
      queryParams.startDate ?? "",
      queryParams.status ?? "",
      queryParams.candidateEmail ?? "",
      queryParams.candidateName ?? "",
      queryParams.candidateId ?? "",
      queryParams.jobTitle ?? "",
      queryParams.jobId ?? ""
    ],
    queryFn: () => getApplications(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!data || !shouldUpdateDropdown) return;

    setDropdownOptions({
      candidateNames: sortAlphabetically(data.candidateNames ?? []),
      candidateEmails: sortAlphabetically(data.candidateEmails ?? []),
      candidateIds: data.candidateIds,
      jobTitles: sortAlphabetically(data.jobTitles ?? []),
      jobIds: data.jobIds,
      statuses: sortAlphabetically(data.statuses ?? []),
    });
  }, [shouldUpdateDropdown, data]);

  useEffect(() => {
    if (error) {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while fetching applications. Please try again.");
      toastUtil.error(message);
    }
  }, [error]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const handleResetFilters = () => {
    setFilterCandidateEmail("");
    setFilterCandidateName("");
    setFilterCandidateId("");
    setFilterJobTitle("");
    setFilterJobId("");
    setFilterStatus("");
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    setShouldUpdateDropdown(true);
  };

  const apps: JobApplicationDto[] = data?.jobApplications ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  // dropdown options
  const candidateEmails = dropdownOptions.candidateEmails;
  const statuses = dropdownOptions.statuses;
  const jobTitles = dropdownOptions.jobTitles;
  const candidateNames = dropdownOptions.candidateNames;
  const candidateIds = dropdownOptions.candidateIds;
  const jobIds = dropdownOptions.jobIds;

  return {
    queryClient,
    apps,
    totalCount,
    totalPages,
    isLoading,
    search,
    status,
    filterStartDate,
    filterEndDate,
    isFilter,
    filters,
    filterCandidateEmail,
    filterCandidateName,
    filterCandidateId,
    filterStatus,
    filterJobTitle,
    filterJobId,
    pageNumber,
    pageSize,
    candidateEmails,
    candidateNames,
    candidateIds,
    statuses,
    jobTitles,
    jobIds,
    updateFilter,
    setSearch,
    setStatus,
    setFilterStartDate,
    setFilterEndDate,
    setIsFilter,
    setFilterCandidateEmail,
    setFilterCandidateName,
    setFilterCandidateId,
    setFilterStatus,
    setFilterJobTitle,
    setFilterJobId,
    setFilters,
    onChangePage,
    onChangePageSize,
    setShouldUpdateDropdown,
    handleResetFilters,
  };
}

export default useApplicationsListViewModel;

export type ApplicationsListViewModel = ReturnType<
  typeof useApplicationsListViewModel
>;
