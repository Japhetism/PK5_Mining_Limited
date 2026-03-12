import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContactMessages } from "@/app/api/contact";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { ContactMessageDto, ContactQuery, ContactStatus } from "@/app/interfaces";
import { toastUtil } from "@/app/utils/toast";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";

/**
 * Enhanced Contact List ViewModel
 * 
 * Updated for your actual API response fields:
 * - firstName, lastName (instead of name)
 * - company (instead of website)
 * - messageBody (instead of message)
 * - dT_Modified (instead of dT_Updated)
 * - status: "Resolved" | "Pending" | "Open"
 */

export interface AdvancedFilters {
  search: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  phoneNumber: string;
  status: string;
  startDate: string;
  endDate: string;
}

function useContactListViewModel() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // ============================================
  // PAGINATION STATE
  // ============================================
  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  // ============================================
  // QUICK SEARCH STATE (real-time, debounced)
  // ============================================
  const [quickSearch, setQuickSearch] = useState(
    searchParams.get("search") ?? ""
  );
  const debouncedQuickSearch = useDebouncedValue(quickSearch, 400);

  // ============================================
  // ADVANCED FILTER STATES
  // ============================================
  // Temporary filter state (UI inputs - not yet applied)
  const [temporaryFilters, setTemporaryFilters] = useState<AdvancedFilters>({
    search: "",
    firstName: searchParams.get("firstName") ?? "",
    lastName: searchParams.get("lastName") ?? "",
    email: searchParams.get("email") ?? "",
    company: searchParams.get("company") ?? "",
    subject: searchParams.get("subject") ?? "",
    phoneNumber: searchParams.get("phoneNumber") ?? "",
    status: searchParams.get("status") ?? "all",
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("endDate") ?? "",
  });

  // Applied filter state (only changes on "Apply" button click)
  const [appliedFilters, setAppliedFilters] = useState<AdvancedFilters>({
    search: "",
    firstName: searchParams.get("firstName") ?? "",
    lastName: searchParams.get("lastName") ?? "",
    email: searchParams.get("email") ?? "",
    company: searchParams.get("company") ?? "",
    subject: searchParams.get("subject") ?? "",
    phoneNumber: searchParams.get("phoneNumber") ?? "",
    status: searchParams.get("status") ?? "all",
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("endDate") ?? "",
  });

  // Track filter status separately
  const [filterStatus, setFilterStatus] = useState<ContactStatus | "all">(
    (searchParams.get("status") ?? "all") as any
  );

  // ============================================
  // QUICK SEARCH EFFECT
  // ============================================
  useEffect(() => {
    setPageNumber(1);
  }, [debouncedQuickSearch]);

  // ============================================
  // BUILD QUERY PARAMS (from applied filters + quick search)
  // ============================================
  const queryParams: ContactQuery = useMemo(() => {
    const raw: any = {
      pageNumber,
      pageSize,
      search: debouncedQuickSearch,
    };

    // Add applied advanced filters
    if (appliedFilters.firstName) raw.firstName = appliedFilters.firstName;
    if (appliedFilters.lastName) raw.lastName = appliedFilters.lastName;
    if (appliedFilters.email) raw.email = appliedFilters.email;
    if (appliedFilters.phoneNumber) raw.phoneNumber = appliedFilters.phoneNumber;
    if (appliedFilters.company) raw.company = appliedFilters.company;
    if (appliedFilters.subject) raw.subject = appliedFilters.subject;
    if (appliedFilters.status && appliedFilters.status !== "all") 
      raw.status = appliedFilters.status;
    if (appliedFilters.startDate) raw.startDate = appliedFilters.startDate;
    if (appliedFilters.endDate) raw.endDate = appliedFilters.endDate;

    return cleanParams(raw) as ContactQuery;
  }, [pageNumber, pageSize, debouncedQuickSearch, appliedFilters]);

  // ============================================
  // FETCH REAL DATA FROM CLOUD
  // ============================================
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "contactMessages",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.search ?? "",
      queryParams.firstName ?? "",
      queryParams.lastName ?? "",
      queryParams.email ?? "",
      queryParams.company ?? "",
      queryParams.subject ?? "",
      queryParams.phoneNumber ?? "",
      queryParams.status ?? "",
      queryParams.startDate ?? "",
      queryParams.endDate ?? "",
    ],
    queryFn: () => getContactMessages(queryParams),
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
  });

   console.log(data);

  // ============================================
  // ERROR HANDLING
  // ============================================
  useEffect(() => {
    if (error) {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while fetching contact messages. Please try again.",
      );
      toastUtil.error(message);
    }
  }, [error]);

  // ============================================
  // QUICK SEARCH HANDLER (real-time)
  // ============================================
  const handleQuickSearch = (value: string) => {
    setQuickSearch(value);
    setPageNumber(1);
  };

  // ============================================
  // ADVANCED FILTER HANDLERS
  // ============================================
  const updateTemporaryFilter = (key: keyof AdvancedFilters, value: string) => {
    setTemporaryFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters (only called when "Apply Filters" button is clicked)
  const handleApplyFilters = () => {
    setAppliedFilters(temporaryFilters);
    setFilterStatus(temporaryFilters.status as ContactStatus | "all");
    setPageNumber(1);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const emptyFilters: AdvancedFilters = {
      search: "",
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      subject: "",
      phoneNumber: "",
      status: "all",
      startDate: "",
      endDate: "",
    };
    
    setTemporaryFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setFilterStatus("all");
    setQuickSearch("");
    setPageNumber(1);
  };

  // ============================================
  // PAGINATION HANDLERS
  // ============================================
  const onChangePage = (next: number) => setPageNumber(next);
  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  // ============================================
  // EXTRACT DATA FROM RESPONSE
  // ============================================
  const contactMessages: ContactMessageDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  // ============================================
  // CHECK IF FILTERS ARE ACTIVE
  // ============================================
  const hasActiveFilters = useMemo(() => {
    return (
      appliedFilters.firstName !== "" ||
      appliedFilters.lastName !== "" ||
      appliedFilters.email !== "" ||
      appliedFilters.phoneNumber !== "" ||
      appliedFilters.company !== "" ||
      appliedFilters.subject !== "" ||
      appliedFilters.status !== "all" ||
      appliedFilters.startDate !== "" ||
      appliedFilters.endDate !== ""
    );
  }, [appliedFilters]);

  // ============================================
  // SYNC URL PARAMS
  // ============================================
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    newParams.set("pageNumber", pageNumber.toString());
    newParams.set("pageSize", pageSize.toString());
    
    if (debouncedQuickSearch) newParams.set("search", debouncedQuickSearch);
    if (appliedFilters.firstName) newParams.set("firstName", appliedFilters.firstName);
    if (appliedFilters.lastName) newParams.set("lastName", appliedFilters.lastName);
    if (appliedFilters.email) newParams.set("email", appliedFilters.email);
    if (appliedFilters.phoneNumber) newParams.set("phoneNumber", appliedFilters.phoneNumber);
    if (appliedFilters.company) newParams.set("company", appliedFilters.company);
    if (appliedFilters.subject) newParams.set("subject", appliedFilters.subject);
    if (appliedFilters.status && appliedFilters.status !== "all") 
      newParams.set("status", appliedFilters.status);
    if (appliedFilters.startDate) newParams.set("startDate", appliedFilters.startDate);
    if (appliedFilters.endDate) newParams.set("endDate", appliedFilters.endDate);

    setSearchParams(newParams);
  }, [pageNumber, pageSize, debouncedQuickSearch, appliedFilters, setSearchParams]);

  return {
    // Data
    contactMessages,
    isLoading,
    totalCount,
    totalPages,

    // Pagination
    pageNumber,
    pageSize,
    onChangePage,
    onChangePageSize,

    // Quick Search
    quickSearch,
    handleQuickSearch,

    // Advanced Filters
    temporaryFilters,
    appliedFilters,
    updateTemporaryFilter,
    handleApplyFilters,
    handleClearFilters,
    hasActiveFilters,
    filterStatus,
    setFilterStatus,

    // Other
    queryClient,
    error,
  };
}

export default useContactListViewModel;

export type ContactListViewModel = ReturnType<
  typeof useContactListViewModel
>;