import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { StatusFilter } from "@/app/interfaces";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import {
  Role,
  RoleErrors,
  RolesQuery,
  UpdateRolePayload,
} from "@/app/interfaces/role";
import { getRoles, updateRole } from "@/app/api/roles";

const defaultFormData: Role = {
  id: "",
  name: "",
  description: "",
  isSystem: false,
  isActive: true,
  permissions: [],
  dT_Created: "",
  dT_Updated: "",
};

function useRoleViewModel() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [form, setForm] = useState<Role>(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<RoleErrors>({});

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

  const queryParams: RolesQuery = useMemo(() => {
    const raw: RolesQuery = {
      pageNumber,
      pageSize,
      isActive:
        filterStatus === "closed" ? false : filterStatus === "open" ? true : "",
    };

    // clean out empty strings
    return cleanParams(raw) as RolesQuery;
  }, [pageNumber, pageSize, debouncedFilters, filterStatus]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "roles",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.isActive ?? "",
    ],
    queryFn: () => getRoles(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (error) {
      const message =
        error ?? "An error occurred while fetching roles. Please try again.";
      toastUtil.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (!selectedRole) return;

    setForm({
      ...defaultFormData,
      ...selectedRole,
      dT_Updated: selectedRole.dT_Updated ?? "",
    });
  }, [selectedRole]);

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateRolePayload) => {
      if (
        !selectedRole ||
        !("id" in selectedRole) ||
        typeof selectedRole.id !== "number"
      ) {
        throw new Error("Cannot update: missing role id");
      }
      return updateRole(selectedRole.id, payload);
    },
    onSuccess: async () => {
      setIsUpdating(false);
      setConfirmOpen(false);
      setSelectedRole(null);

      await queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: unknown) => {
      setIsUpdating(false);
      const message =
        err ?? "An error occurred while updating role. Please try again.";
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
    if (!selectedRole) return;

    setIsUpdating(true);

    updateMutation.mutate({
      ...selectedRole,
      isActive: !selectedRole.isActive,
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
    setSelectedRole(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
  };

  const roles: Role[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    roles,
    isLoading,
    error,
    filterStatus,
    isFilter,
    selectedRole,
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
    setSelectedRole,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setFieldErrors,
    setForm,
    handleCloseModal,
  };
}

export default useRoleViewModel;

export type RoleViewModel = ReturnType<typeof useRoleViewModel>;
