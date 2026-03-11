import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import {
  StatusFilter,
} from "@/app/interfaces";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import { SubsidiariesQuery, Subsidiary, SubsidiaryErrors, UpdateSubsidiaryPayload } from "@/app/interfaces/subsidiary";
import { getSubsidiaries, updateSubsidiary } from "@/app/api/subsidiary";

const defaultFormData = {
  id: "",
  name: "",
  code: "",
  country: "",
  timezone: "",
  address: "",
  email: "",
  isActive: true,
  dT_Created: "",
  dT_Updated: "",
}

function useSubsidiaryListViewModel() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<Subsidiary | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [form, setForm] = useState(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<SubsidiaryErrors>({});

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

  const queryParams: SubsidiariesQuery = useMemo(() => {
    const raw: SubsidiariesQuery = {
      pageNumber,
      pageSize,
      isActive:
        filterStatus === "closed" ? false : filterStatus === "open" ? true : "",
    };

    // clean out empty strings
    return cleanParams(raw) as SubsidiariesQuery;
  }, [pageNumber, pageSize, debouncedFilters, filterStatus]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "subsidiaries",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.isActive ?? "",
    ],
    queryFn: () => getSubsidiaries(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (error) {
      const message =
        error ?? "An error occurred while fetching subsidaries. Please try again.";
      toastUtil.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (!selectedSubsidiary) return;

    setForm({
      ...defaultFormData,
      ...selectedSubsidiary,
      dT_Updated: selectedSubsidiary.dT_Updated ?? ""
    })
  }, [selectedSubsidiary]);

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateSubsidiaryPayload) => {
      if (
        !selectedSubsidiary ||
        !("id" in selectedSubsidiary) ||
        typeof selectedSubsidiary.id !== "number"
      ) {
        throw new Error("Cannot update: missing subsidiary id");
      }
      return updateSubsidiary(selectedSubsidiary.id, payload);
    },
    onSuccess: async () => {
      setIsUpdating(false);
      setConfirmOpen(false);
      setSelectedSubsidiary(null);

      await queryClient.invalidateQueries({ queryKey: ["subsidiaries"] });
    },
    onError: (err: unknown) => {
      setIsUpdating(false);
      const message = err ?? "An error occurred while updating the subsidary. Please try again.";
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
  };

  const handleUpdateStatus = () => {
    if (!selectedSubsidiary) return;

    setIsUpdating(true);

    updateMutation.mutate({
      ...selectedSubsidiary,
      isActive: !selectedSubsidiary.isActive,
    });
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('form is ', form);
  }

  const handleCloseEditModal = () => {
    setSelectedSubsidiary(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
  }

  const subsidaries: Subsidiary[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    subsidaries,
    isLoading,
    error,
    filterStatus,
    isFilter,
    selectedSubsidiary,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    isUpdating,
    confirmOpen,
    confirmDeleteOpen,
    confirmEditOpen,
    filters,
    queryClient,
    form,
    fieldErrors,
    onChange,
    setIsFilter,
    setFilterStatus,
    handleUpdateStatus,
    setSelectedSubsidiary,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setFieldErrors,
    setForm,
    handleCloseEditModal,
  };
}

export default useSubsidiaryListViewModel;

export type SubsidiaryListViewModel = ReturnType<typeof useSubsidiaryListViewModel>;
