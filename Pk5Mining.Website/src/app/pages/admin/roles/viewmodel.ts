import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { ApiError, StatusFilter } from "@/app/interfaces";
import { cleanParams, mapZodErrors, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import {
  CreateRolePayload,
  Role,
  RoleErrors,
  RolesQuery,
  UpdateRolePayload,
} from "@/app/interfaces/role";
import { Permission } from "@/app/interfaces/permission";
import { createRole, getRoles, updateRole, updateRoleStatus } from "@/app/api/roles";
import { getPermissions } from "@/app/api/permissions";
import { getSubsidiaries } from "@/app/api/subsidiaries";
import { createRoleSchema, updateRoleSchema } from "@/app/schemas/role.schema";

const defaultFormData: Role = {
  id: "",
  name: "",
  description: "",
  isSystem: false,
  status: "Active",
  permissionIds: [],
  dT_Created: "",
  dT_Modified: "",
};

function useRoleViewModel() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmUpdateStatusOpen, setConfirmUpdateStatusOpen] = useState<boolean>(false);
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

  const {
    data: permissionData,
    isLoading: isLoadingPermission,
    error: permissionError,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermissions(),
    staleTime: 30_000,
  });

  // intended to be a light version of subsidiary for dropdown, so we can avoid unnecessary data fetching and processing
  const {
    data: subsidiaryData,
    isLoading: isLoadingSubsidiary,
    error: subsidiaryError,
  } = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: () => getSubsidiaries({ pageNumber: 1, pageSize: 9999 }),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (error) {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while fetching roles. Please try again.");
      toastUtil.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (!selectedRole) return;

    const permissionIds = selectedRole.permissions?.map((p) => p.id) || [];

    setForm({
      ...defaultFormData,
      ...selectedRole,
      permissionIds: permissionIds,
      dT_Modified: selectedRole.dT_Modified ?? "",
    });
  }, [selectedRole]);

  const createMutation = useMutation({
    mutationFn: (payload: CreateRolePayload) => createRole(payload),
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
      setConfirmEditOpen(false);
      toastUtil.success("Role created successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while creating a role. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

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
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
      setConfirmEditOpen(false);
      setSelectedRole(null);
      toastUtil.success("Role updated successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while updating role. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (status: "Active" | "Inactive") => {
      if (
        !selectedRole ||
        !("id" in selectedRole) ||
        typeof selectedRole.id !== "number"
      ) {
        throw new Error("Cannot update: missing role id");
      }
      return updateRoleStatus(selectedRole.id, status);
    },
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
      setConfirmUpdateStatusOpen(false);
      setSelectedRole(null);
      toastUtil.success(
        `Role status updated to ${data?.status} successfully`,
      );
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while updating the role status. Please try again.");
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

  // const handleUpdateStatus = () => {
  //   if (!selectedRole) return;

  //   setIsUpdating(true);

  //   updateMutation.mutate({
  //     ...selectedRole,
  //     isActive: !selectedRole.isActive,
  //   });
  // };

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

  const handleCreateRole = () => {
    const result = createRoleSchema.safeParse(form);

    if (!result.success) {
      setFieldErrors(mapZodErrors<CreateRolePayload>(result.error));
      return;
    }

    setFieldErrors({});

    const payload: CreateRolePayload = {
      ...result.data,
      status: "Active",
    };

    createMutation.mutate(payload);
  };

  const handleUpdateRole = () => {
    if (!selectedRole) return;

    const formWithId = { ...form, id: Number(form.id) };

    const result = updateRoleSchema.safeParse(formWithId);

    if (!result.success) {
      setFieldErrors(mapZodErrors<UpdateRolePayload>(result.error));
      return;
    }

    const payload = {
      ...result.data,
      status: selectedRole.status,
    };

    setFieldErrors({});
    updateMutation.mutate(payload);
  };

  const handleUpdateStatus = () => {
    if (!selectedRole) return;

    setIsUpdating(true);

    const status = selectedRole?.status === "Active" ? "Inactive" : "Active"

    updateStatusMutation.mutate(status);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
  };

  const handlePermissionToggle = (newPermissions: number[]) => {
    // We simulate a change event to stay compatible with your existing onChange
    onChange({
      target: { name: "permissionIds", value: newPermissions },
    } as any);
  };

  const roles: Role[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  const permissions: Permission[] = permissionData ?? [];

  const subsidiaries = subsidiaryData?.data ?? [];

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
    confirmUpdateStatusOpen,
    filters,
    queryClient,
    form,
    fieldErrors,
    permissions,
    permissionError,
    subsidiaries,
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
    setConfirmUpdateStatusOpen,
    setFieldErrors,
    setForm,
    handleCloseModal,
    handlePermissionToggle,
    handleCreateRole,
    handleUpdateRole,
  };
}

export default useRoleViewModel;

export type RoleViewModel = ReturnType<typeof useRoleViewModel>;
