import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplications } from "@/app/api/applications";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import {
  ApplicationsQuery,
  ApplicationStatusFilter,
  JobApplicationDto,
} from "@/app/interfaces";
import { cleanParams, toNumber } from "@/app/utils/helper";

function useApplicationsListViewModel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ApplicationStatusFilter>("all");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [filters, setFilters] = useState({
    email: searchParams.get("email") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.email]);

  const queryParams: ApplicationsQuery = useMemo(() => {
    const raw: ApplicationsQuery = {
      pageNumber,
      pageSize,
      email: debouncedFilters.email,
    };

    // clean out empty strings
    return cleanParams(raw) as ApplicationsQuery;
  }, [pageNumber, pageSize, debouncedFilters]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "applications",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.email ?? "",
    ],
    queryFn: () => getApplications(queryParams),
    staleTime: 30_000,
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const apps: JobApplicationDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    queryClient,
    apps,
    totalCount,
    totalPages,
    isLoading,
    error,
    search,
    status,
    isFilter,
    filters,
    pageNumber,
    pageSize,
    updateFilter,
    setSearch,
    setStatus,
    setIsFilter,
    setFilters,
    onChangePage,
    onChangePageSize,
  };
}

export default useApplicationsListViewModel;

export type ApplicationsListViewModel = ReturnType<
  typeof useApplicationsListViewModel
>;
