import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContactMessages } from "@/app/api/contact";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { ContactMessageDto, ContactQuery } from "@/app/interfaces";
import { toastUtil } from "@/app/utils/toast";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";

/**
 * Enhanced Contact List ViewModel
 * 
 * Features:
 * - Quick search (debounced, real-time) - shows results immediately
 * - Advanced filters - only apply on "Apply Filters" button click
 * - Uses REAL cloud data (getContactMessages API)
 * - Separate state for filter inputs vs applied filters
 */

export interface AdvancedFilters {
  search: string;
  name: string;
  email: string;
  subject: string;
  website: string;
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
    name: searchParams.get("name") ?? "",
    email: searchParams.get("email") ?? "",
    subject: searchParams.get("subject") ?? "",
    website: searchParams.get("website") ?? "",
    phoneNumber: searchParams.get("phoneNumber") ?? "",
    status: searchParams.get("status") ?? "all",
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("endDate") ?? "",
  });

  // Applied filter state (only changes on "Apply" button click)
  const [appliedFilters, setAppliedFilters] = useState<AdvancedFilters>({
    search: "",
    name: searchParams.get("name") ?? "",
    email: searchParams.get("email") ?? "",
    subject: searchParams.get("subject") ?? "",
    website: searchParams.get("website") ?? "",
    phoneNumber: searchParams.get("phoneNumber") ?? "",
    status: searchParams.get("status") ?? "all",
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("endDate") ?? "",
  });

  // ============================================
  // QUICK SEARCH EFFECT
  // ============================================
  useEffect(() => {
    setPageNumber(1); // Reset to page 1 when quick search changes
  }, [debouncedQuickSearch]);

  // ============================================
  // BUILD QUERY PARAMS (from applied filters + quick search)
  // ============================================
  const queryParams: ContactQuery = useMemo(() => {
    const raw: any = {
      pageNumber,
      pageSize,
      search: debouncedQuickSearch, // Quick search is real-time
    };

    // Add applied advanced filters (only if Apply button was clicked)
    if (appliedFilters.name) raw.name = appliedFilters.name;
    if (appliedFilters.email) raw.email = appliedFilters.email;
    if (appliedFilters.phoneNumber) raw.phoneNumber = appliedFilters.phoneNumber;
    if (appliedFilters.subject) raw.subject = appliedFilters.subject;
    if (appliedFilters.website && appliedFilters.website !== "all") 
      raw.website = appliedFilters.website;
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
      queryParams.name ?? "",
      queryParams.email ?? "",
      queryParams.subject ?? "",
      queryParams.website ?? "",
      queryParams.phoneNumber ?? "",
      queryParams.status ?? "",
      queryParams.dT_startDate ?? "",
      queryParams.dT_endDate ?? "",
    ],
    queryFn: () => getContactMessages(queryParams),
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
  });

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
  // Update temporary filter (UI input - doesn't trigger API call)
  const updateTemporaryFilter = (key: keyof AdvancedFilters, value: string) => {
    setTemporaryFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters (only called when "Apply Filters" button is clicked)
  const handleApplyFilters = () => {
    // Copy temporary filters to applied filters
    setAppliedFilters(temporaryFilters);
    setPageNumber(1); // Reset to page 1
    // Panel will be closed by the component
  };

  // Clear all filters
  const handleClearFilters = () => {
    const emptyFilters: AdvancedFilters = {
      search: "",
      name: "",
      email: "",
      subject: "",
      website: "",
      phoneNumber: "",
      status: "all",
      startDate: "",
      endDate: "",
    };
    
    // Reset both temporary and applied filters
    setTemporaryFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setQuickSearch("");
    setPageNumber(1);
    // Panel will be closed by the component
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
      appliedFilters.name !== "" ||
      appliedFilters.email !== "" ||
      appliedFilters.phoneNumber !== "" ||
      appliedFilters.subject !== "" ||
      appliedFilters.website !== "" ||
      appliedFilters.status !== "all" ||
      appliedFilters.startDate !== "" ||
      appliedFilters.endDate !== ""
    );
  }, [appliedFilters]);

  // ============================================
  // SYNC URL PARAMS (Optional - for bookmarking)
  // ============================================
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    newParams.set("pageNumber", pageNumber.toString());
    newParams.set("pageSize", pageSize.toString());
    
    if (debouncedQuickSearch) newParams.set("search", debouncedQuickSearch);
    if (appliedFilters.name) newParams.set("name", appliedFilters.name);
    if (appliedFilters.email) newParams.set("email", appliedFilters.email);
    if (appliedFilters.phoneNumber) newParams.set("phoneNumber", appliedFilters.phoneNumber);
    if (appliedFilters.subject) newParams.set("subject", appliedFilters.subject);
    if (appliedFilters.website && appliedFilters.website !== "all") 
      newParams.set("website", appliedFilters.website);
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

    // Quick Search (real-time)
    quickSearch,
    handleQuickSearch,

    // Advanced Filters
    temporaryFilters,      // Current UI inputs (not applied yet)
    appliedFilters,        // Currently applied filters
    updateTemporaryFilter, // Update UI inputs
    handleApplyFilters,    // Apply button click
    handleClearFilters,    // Clear button click
    hasActiveFilters,

    // Other
    queryClient,
    error,
  };
}

export default useContactListViewModel;

export type ContactListViewModel = ReturnType<
  typeof useContactListViewModel
>;