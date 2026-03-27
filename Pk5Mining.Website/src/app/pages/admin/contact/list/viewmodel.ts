import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContactMessages } from "@/app/api/contact";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { cleanParams, toNumber } from "@/app/utils/helper";
import {
  AdvanceFilter,
  ContactMessageDto,
  ContactQuery,
  ContactStatus,
} from "@/app/interfaces";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";

export interface AdvancedFilters {
  search: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  phoneNumber: string;
  status: string;
  startDate: string;
  endDate: string;
}

const defaultAdvanceFilters: AdvanceFilter = {
  email: "",
  subject: "",
  name: "",
  appId: "",
  startDate: "",
  endDate: "",
};

function useContactListViewModel() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedContactMessage, setSelectedContactMessage] =
    useState<ContactMessageDto | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(true);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [advanceFilters, setAdvanceFilters] = useState<AdvanceFilter>(
    defaultAdvanceFilters,
  );
  const [appliedAdvanceFilters, setAppliedAdvanceFilters] =
    useState<AdvanceFilter | null>(null);
  const [applyAdvanceFilters, setApplyAdvanceFilters] =
    useState<boolean>(false);

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

  const queryParams: ContactQuery = useMemo(() => {
    if (appliedAdvanceFilters) {
      const { email: advEmailFilter, ...restAdvanceFilters } =
        appliedAdvanceFilters;
      return cleanParams({
        pageNumber,
        pageSize,
        email: advEmailFilter?.trim() || undefined,
        ...restAdvanceFilters,
      }) as ContactQuery;
    }

    return cleanParams({
      pageNumber,
      pageSize,
      email: debouncedFilters.email || undefined,
    }) as ContactQuery;
  }, [pageNumber, pageSize, debouncedFilters, appliedAdvanceFilters]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "contactMessages",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.email ?? "",
      queryParams.subject ?? "",
      queryParams.name ?? "",
      queryParams.appId ?? "",
      queryParams.startDate ?? "",
      queryParams.endDate ?? "",
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
  }, [error, data, applyAdvanceFilters]);

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  const updateAdvanceFilters = (
    key: keyof typeof advanceFilters,
    value: string,
  ) => {
    setAdvanceFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  const handleCloseModal = () => {
    setConfirmOpen(false);
    setSelectedContactMessage(null);
  };

  const handleApplyAdanceFilters = () => {
    const { startDate, endDate } = advanceFilters;

    const hasStart = Boolean(startDate);
    const hasEnd = Boolean(endDate);

    let errorMessage = "";

    if (hasStart !== hasEnd) {
      errorMessage = "Please select both start and end dates.";
    } else if (hasStart && hasEnd) {
      const start = new Date(startDate!);
      const end = new Date(endDate!);

      if (start > end) {
        errorMessage = "Start date cannot be later than end date.";
      }
    }

    if (errorMessage) {
      toastUtil.error(errorMessage);
      return;
    }

    setPageNumber(1);
    updateFilter("email", "");
    setAppliedAdvanceFilters(advanceFilters);
    setIsFilterPanelOpen(false);
  };

  const handleClearAdvanceFilters = () => {
    setAdvanceFilters(defaultAdvanceFilters);
    setAppliedAdvanceFilters(null);
    setIsFilter(false);
  };

  const contactMessages: ContactMessageDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    contactMessages,
    isLoading,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    queryClient,
    error,
    selectedContactMessage,
    confirmOpen,
    isFilterPanelOpen,
    filters,
    isFilter,
    advanceFilters,
    appliedAdvanceFilters,
    setConfirmOpen,
    setIsFilterPanelOpen,
    setSelectedContactMessage,
    onChangePage,
    onChangePageSize,
    handleCloseModal,
    setFilters,
    setIsFilter,
    updateFilter,
    updateAdvanceFilters,
    handleApplyAdanceFilters,
    handleClearAdvanceFilters,
  };
}

export default useContactListViewModel;

export type ContactListViewModel = ReturnType<typeof useContactListViewModel>;
