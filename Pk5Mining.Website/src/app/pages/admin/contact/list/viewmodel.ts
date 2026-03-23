import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContactMessages } from "@/app/api/contact";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { ContactMessageDto, ContactQuery, ContactStatus } from "@/app/interfaces";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";

export interface AdvancedFilters {
  search: string;
  name: string;
  // firstName: string;
  // lastName: string;
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
  const [contactMessage, setContactMessage] = useState<ContactMessageDto | null>(null)

  // ============================================
  // STATE
  // ============================================
  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [quickSearch, setQuickSearch] = useState(
    searchParams.get("email") ?? ""
  );
  const debouncedQuickSearch = useDebouncedValue(quickSearch, 400);

  const [temporaryFilters, setTemporaryFilters] = useState<AdvancedFilters>({
    search: "",
    name: "",
    // firstName: "",
    // lastName: "",
    email: "",
    company: "",
    subject: "",
    phoneNumber: "",
    status: "all",
    startDate: "",
    endDate: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<AdvancedFilters>({
    search: "",
    name: "",
    // firstName: "",
    // lastName: "",
    email: "",
    company: "",
    subject: "",
    phoneNumber: "",
    status: "all",
    startDate: "",
    endDate: "",
  });

  const [filterStatus, setFilterStatus] = useState<ContactStatus | "all">("all");

  // ============================================
  // RESET PAGE ON SEARCH CHANGE
  // ============================================
  useEffect(() => {
    setPageNumber(1);
  }, [debouncedQuickSearch]);

  // ============================================
  // BUILD QUERY PARAMS
  // ============================================
  const queryParams: ContactQuery = useMemo(() => {
    const raw: any = {
      pageNumber,
      pageSize,
    };

    // Add search
    if (debouncedQuickSearch) raw.email = debouncedQuickSearch;

    // Add applied filters
    if (appliedFilters.name) raw.name = appliedFilters.name;
    // if (appliedFilters.firstName) raw.firstName = appliedFilters.firstName;
    // if (appliedFilters.lastName) raw.lastName = appliedFilters.lastName;
    if (appliedFilters.email) raw.email = appliedFilters.email;
    if (appliedFilters.phoneNumber) raw.phoneNumber = appliedFilters.phoneNumber;
    if (appliedFilters.company) raw.company = appliedFilters.company;
    if (appliedFilters.subject) raw.subject = appliedFilters.subject;
    if (appliedFilters.status && appliedFilters.status !== "all") 
      raw.status = appliedFilters.status;
    if (appliedFilters.startDate) raw.startDate = appliedFilters.startDate;
    if (appliedFilters.endDate) raw.endDate = appliedFilters.endDate;

    return raw as ContactQuery;
  }, [pageNumber, pageSize, debouncedQuickSearch, appliedFilters]);

  // ============================================
  // STRINGIFY PARAMS FOR QUERY KEY
  //  CRITICAL: This is what triggers refetch!
  // ============================================
  const queryKeyString = JSON.stringify(queryParams);

  // ============================================
  // FETCH DATA
  //  CRITICAL: QueryKey must change to trigger refetch
  // ============================================
  const { data, isLoading, error } = useQuery({
    queryKey: ["contactMessages", queryKeyString],  // String version for proper change detection
    queryFn: async () => {
      const result = await getContactMessages(queryParams);
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });

  // ============================================
  // ERROR HANDLING
  // ============================================
  useEffect(() => {
    if (error) {
      const message = getAxiosErrorMessage(
        error,
        "Error fetching messages",
      );
      console.error("Error:", message);
    }
  }, [error]);

  // ============================================
  // QUICK SEARCH HANDLER
  // ============================================
  const handleQuickSearch = (value: string) => {
    setQuickSearch(value);
    setPageNumber(1);
  };

  // ============================================
  // FILTER HANDLERS
  // ============================================
  const updateTemporaryFilter = (key: keyof AdvancedFilters, value: string) => {
    setTemporaryFilters((prev) => ({ ...prev, [key]: value }));
  };

  // CRITICAL: This MUST update appliedFilters to trigger queryKey change
  const handleApplyFilters = () => {  
    // Copy to applied - THIS CHANGES queryParams - THIS CHANGES queryKey - THIS TRIGGERS REFETCH
    setAppliedFilters(temporaryFilters);
    setFilterStatus(temporaryFilters.status as ContactStatus | "all");
    setPageNumber(1);
  };

  const handleClearFilters = () => {    
    const emptyFilters: AdvancedFilters = {
      search: "",
      name: "",
      // firstName: "",
      // lastName: "",
      email: "",
      company: "",
      subject: "",
      phoneNumber: "",
      status: "all",
      startDate: "",
      endDate: "",
    };
    
    setTemporaryFilters(emptyFilters);
    setAppliedFilters(emptyFilters); // THIS TRIGGERS REFETCH
    setFilterStatus("all");
    setQuickSearch("");
    setPageNumber(1);
  };

  // ============================================
  // PAGINATION HANDLERS
  // ============================================
  const onChangePage = (next: number) => {
    setPageNumber(next);
  };

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  // ============================================
  // DATA EXTRACTION
  // ============================================
  const contactMessages: ContactMessageDto[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  // ============================================
  // CHECK ACTIVE FILTERS
  // ============================================
  const hasActiveFilters = useMemo(() => {
    return (
      appliedFilters.name !== "" ||
      // appliedFilters.firstName !== "" ||
      // appliedFilters.lastName !== "" ||
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
  // SYNC URL
  // ============================================
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    newParams.set("pageNumber", pageNumber.toString());
    newParams.set("pageSize", pageSize.toString());
    
    if (debouncedQuickSearch) newParams.set("email", debouncedQuickSearch);
    if (appliedFilters.name) newParams.set("name", appliedFilters.name);
    // if (appliedFilters.firstName) newParams.set("firstName", appliedFilters.firstName);
    // if (appliedFilters.lastName) newParams.set("lastName", appliedFilters.lastName);
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
    contactMessages,
    isLoading,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    onChangePage,
    onChangePageSize,
    quickSearch,
    handleQuickSearch,
    temporaryFilters,
    appliedFilters,
    updateTemporaryFilter,
    handleApplyFilters,
    handleClearFilters,
    hasActiveFilters,
    filterStatus,
    setFilterStatus,
    queryClient,
    error,
    contactMessage,
    setContactMessage,
  };
}

export default useContactListViewModel;

export type ContactListViewModel = ReturnType<
  typeof useContactListViewModel
>;