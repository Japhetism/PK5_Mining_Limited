import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContactMessages } from "@/app/api/contact";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { ContactMessageDto, ContactQuery } from "@/app/interfaces";
import { toastUtil } from "@/app/utils/toast";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";

function useContactListViewModel() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );
  
  const [filters, setFilters] = useState({
    search: searchParams.get("search") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.search]);

  const queryParams: ContactQuery = useMemo(() => {
    const raw: ContactQuery = {
      pageNumber,
      pageSize,
      search: debouncedFilters.search,
    };
  
    // clean out empty strings
    return cleanParams(raw) as ContactQuery;
  }, [pageNumber, pageSize, filterStatus, debouncedFilters]);

   const { data, isLoading, error } = useQuery({
    queryKey: [
      "contactMessages",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.search ?? "",
    ],
    queryFn: () => getContactMessages(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (error) {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while fetching contact messages. Please try again.",
      );
      toastUtil.error(message);
    }
  }, [error]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const contactMessages: ContactMessageDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    contactMessages,
    isLoading,
    totalCount,
    totalPages,
    filters,
    pageNumber,
    pageSize,
    filterStatus,
    isFilter,
    queryClient,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
  }
}

export default useContactListViewModel;

export type ContactListViewModel = ReturnType<
  typeof useContactListViewModel
>;