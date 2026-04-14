import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { ApiError, StatusFilter } from "@/app/interfaces";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import {
  Department,
  DepartmentErrors,
  DepartmentsQuery,
  UpdateDepartmentPayload,
} from "@/app/interfaces/department";
import { getDepartments, updateDepartment } from "@/app/api/departments";

const defaultFormData: Department = {
  id: "",
  name: "",
  description: "",
  isActive: true,
  dT_Created: "",
  dT_Updated: "",
};

function useDepartmentViewModel() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);
  const [confirmViewOpen, setConfirmViewOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [form, setForm] = useState<Department>(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<DepartmentErrors>({});

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

  const queryParams: DepartmentsQuery = useMemo(() => {
    const raw: DepartmentsQuery = {
      pageNumber,
      pageSize,
      isActive:
        filterStatus === "closed" ? false : filterStatus === "open" ? true : "",
    };

    // clean out empty strings
    return cleanParams(raw) as DepartmentsQuery;
  }, [pageNumber, pageSize, debouncedFilters, filterStatus]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "departments",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.isActive ?? "",
    ],
    queryFn: () => getDepartments(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (error) {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while fetching departments. Please try again.");
      toastUtil.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (!selectedDepartment) return;

    setForm({
      ...defaultFormData,
      ...selectedDepartment,
      dT_Updated: selectedDepartment.dT_Updated ?? "",
    });
  }, [selectedDepartment]);

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateDepartmentPayload) => {
      if (
        !selectedDepartment ||
        !("id" in selectedDepartment) ||
        typeof selectedDepartment.id !== "number"
      ) {
        throw new Error("Cannot update: missing department id");
      }
      return updateDepartment(selectedDepartment.id, payload);
    },
    onSuccess: async () => {
      setIsUpdating(false);
      setConfirmOpen(false);
      setSelectedDepartment(null);

      await queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err) => {
      setIsUpdating(false);
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while updating department. Please try again.");
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
    if (!selectedDepartment) return;

    setIsUpdating(true);

    updateMutation.mutate({
      ...selectedDepartment,
      isActive: !selectedDepartment.isActive,
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
  };

  const handleCloseModal = () => {
    setSelectedDepartment(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
    setConfirmViewOpen(false);
  };

  const departments: Department[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    departments,
    isLoading,
    error,
    filterStatus,
    isFilter,
    selectedDepartment,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    isUpdating,
    confirmOpen,
    confirmDeleteOpen,
    confirmEditOpen,
    confirmViewOpen,
    filters,
    queryClient,
    form,
    fieldErrors,
    onChange,
    setIsFilter,
    setFilterStatus,
    handleUpdateStatus,
    setSelectedDepartment,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setConfirmViewOpen,
    setFieldErrors,
    setForm,
    handleCloseModal,
  };
}

export default useDepartmentViewModel;

export type DepartmentViewModel = ReturnType<typeof useDepartmentViewModel>;
