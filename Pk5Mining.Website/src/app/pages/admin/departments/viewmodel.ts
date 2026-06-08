import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { ApiError, StatusFilter } from "@/app/interfaces";
import { cleanParams, mapZodErrors, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import {
  Department,
  DepartmentErrors,
  DepartmentsQuery,
  UpdateDepartmentPayload,
  CreateDepartmentPayload,
} from "@/app/interfaces/department";
import { getDepartments,updateDepartment,  updateDepartmentStatus, createDepartment, deleteDepartment } from "@/app/api/departments";
import { createDepartmentSchema, updateDepartmentSchema } from "@/app/schemas/department.schema";
import { useTenant } from "@/tenants/useTenant";


const defaultFormData: Department = {
  id: "",
  name: "",
  description: "",
  isActive: true,
  status: "Active",
  dT_Created: "",
  dT_Updated: "",
  dT_Modified: ""
};

enum DepartmentAction {
  Update = "Update",
  Activate = "Activate",
  Deactivate = "Deactivate",
  Delete = "Delete",
}

const successMessages: Record<DepartmentAction, string> = {
  [DepartmentAction.Update]: "Department updated successfully",
  [DepartmentAction.Activate]: "Department activated successfully",
  [DepartmentAction.Deactivate]: "Department deactivated successfully",
  [DepartmentAction.Delete]: "Department deleted successfully",
};

function useDepartmentViewModel() {
  const { subsidiaryId } = useTenant();
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [confirmUpdateDepartmentOpen, setConfirmUpdateDepartmentOpen] = useState<boolean>(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);
  const [confirmViewOpen, setConfirmViewOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [actionType, setActionType] = useState<DepartmentAction | null>(null);

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
    name: searchParams.get("name") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.search, debouncedFilters.name]);

  const queryParams: DepartmentsQuery = useMemo(() => {
    const raw: DepartmentsQuery = {
      pageNumber,
      pageSize,
      name: debouncedFilters.name,
      search: debouncedFilters.search,
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
      queryParams.name,
      queryParams.search,
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

  const createMutation = useMutation({
    mutationFn: (payload: CreateDepartmentPayload) => createDepartment(payload),
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["departments"] });
      setConfirmEditOpen(false);
      setForm(defaultFormData);
      toastUtil.success("Department created successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while creating a department. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

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
      setSelectedDepartment(null);

      await queryClient.invalidateQueries({ queryKey: ["departments"] });

      setConfirmEditOpen(false);
      const msg =
        successMessages[actionType as DepartmentAction] ??
        successMessages[DepartmentAction.Update];
      setForm(defaultFormData);
      handleCloseModal();
      toastUtil.success(msg);
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

  const updateStatusMutation = useMutation({
      mutationFn: (isActive: boolean) => {
        if (
          !selectedDepartment ||
          !("id" in selectedDepartment) ||
          typeof selectedDepartment.id !== "number"
        ) {
          throw new Error("Cannot update: missing department id");
        }
        return updateDepartmentStatus(selectedDepartment.id, isActive);
      },
      onMutate: () => {
        setIsUpdating(true);
      },
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["departments"] });
        setConfirmUpdateDepartmentOpen(false);
        setConfirmOpen(false);
        setConfirmDeleteOpen(false);
        setSelectedDepartment(null);
        setForm(defaultFormData);
        toastUtil.success(
          `Department status updated to ${data?.isActive} successfully`,
        );
      },
      onError: (err) => {
        const message =
          (err as ApiError)?.message ??
          (err instanceof Error
            ? err.message
            : "An error occurred while updating the department status. Please try again.");
        toastUtil.error(message);
      },
      onSettled: () => setIsUpdating(false),
    });

  const deleteMutation = useMutation({
    mutationFn: (payload: Department) => {
      if (
        !payload ||
        !("id" in payload) ||
        typeof payload.id !== "number"
      ) {
        throw new Error("Cannot delete: missing department id");
      }
      return deleteDepartment(payload.id);
    },
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["departments"] });
      setConfirmDeleteOpen(false);
      setSelectedDepartment(null);
      setForm(defaultFormData);
      toastUtil.success("Department deleted successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while deleting the department. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
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

  const handleCreateDepartment = () => {
    const result = createDepartmentSchema.safeParse(form);

    if (!result.success) {
      setFieldErrors(mapZodErrors<CreateDepartmentPayload>(result.error));
      return;
    }

    setFieldErrors({});

    const payload: CreateDepartmentPayload = {
      ...result.data,
      status: "Active",
      subsidiaryId: subsidiaryId,
      dT_Updated: new Date().toISOString(),
    };

    createMutation.mutate(payload);
  };

  const handleUpdateDepartment = () => {
    if (!selectedDepartment) return;

    const formWithId = { ...form, id: Number(form.id) };

    const result = updateDepartmentSchema.safeParse(formWithId);

    if (!result.success) {
      setFieldErrors(mapZodErrors<CreateDepartmentPayload>(result.error));
      return;
    }

    const payload = {
      ...result.data,
      status: selectedDepartment.status,
      subsidiaryId: subsidiaryId,
    };
    setFieldErrors({});

    updateMutation.mutate(payload);
  };

  const handleDeleteDepartment = () => {
    if (!selectedDepartment) return;

    deleteMutation.mutate(selectedDepartment);
  };

  const handleUpdateDepartmentStatus = () => {
    if (!selectedDepartment) return;

    setIsUpdating(true);

    const isActive = !selectedDepartment?.isActive ;
    
    updateStatusMutation.mutate(isActive);
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    confirmUpdateDepartmentOpen,
    filters,
    queryClient,
    form,
    fieldErrors,
    onChange,
    setIsFilter,
    setFilterStatus,
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
    handleCreateDepartment,
    handleUpdateDepartment,
    handleDeleteDepartment,
    handleUpdateDepartmentStatus,
  };
}

export default useDepartmentViewModel;

export type DepartmentViewModel = ReturnType<typeof useDepartmentViewModel>;
