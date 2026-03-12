import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  updateUserStatus,
} from "@/app/api/users";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import {
  CreateUserPayload,
  UpdateUserPayload,
  User,
  UserErrors,
  UsersQuery,
} from "@/app/interfaces/user";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";

const defaultFormData: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  phone: "",
  role: "",
  isActive: true,
  dT_Created: "",
  dT_Updated: "",
};

function useUserViewModel() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);

  const [form, setForm] = useState(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<UserErrors>({});

  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [filters, setFilters] = useState({
    name: searchParams.get("name") ?? "",
    email: searchParams.get("email") ?? "",
    phone: searchParams.get("phone") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.name, debouncedFilters.email, debouncedFilters.phone]);

  const queryParams: UsersQuery = useMemo(() => {
    const raw: UsersQuery = {
      pageNumber,
      pageSize,
      name: debouncedFilters.name,
      email: debouncedFilters.email,
      phone: debouncedFilters.phone,
      isActive: filterStatus,
    };

    // clean out empty strings
    return cleanParams(raw) as UsersQuery;
  }, [pageNumber, pageSize, filterStatus, debouncedFilters]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "users",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.name ?? "",
      queryParams.email ?? "",
      queryParams.phone ?? "",
      queryParams.isActive ?? "",
    ],
    queryFn: () => getUsers(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!selectedUser) return;

    setForm({
      ...defaultFormData,
      ...selectedUser,
      dT_Updated: selectedUser.dT_Updated ?? "",
    });
  }, [selectedUser]);

  useEffect(() => {
    if (error) {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while fetching users. Please try again.",
      );
      toastUtil.error(message);
    }
  }, [error]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User deleted successfully");
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while deleting user. Please try again.",
      );
      toastUtil.error(message);
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User created successfully");
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while creating user. Please try again.",
      );
      toastUtil.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload.id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User updated successfully");
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while updating user. Please try again.",
      );
      toastUtil.error(message);
    },
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const handleDeleteUser = () => {};

  const handleCreateuser = () => {};

  const handleUpdateUser = () => {};

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
  };

  const users: User[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    users,
    totalCount,
    totalPages,
    filters,
    filterStatus,
    isFilter,
    pageNumber,
    pageSize,
    isLoading,
    selectedUser,
    confirmOpen,
    confirmEditOpen,
    confirmDeleteOpen,
    form,
    fieldErrors,
    onChange,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
    setSelectedUser,
    handleDeleteUser,
    handleCreateuser,
    handleUpdateUser,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setForm,
    handleCloseModal,
    setFilters,
    setFieldErrors,
  };
}

export default useUserViewModel;

export type UserViewModel = ReturnType<typeof useUserViewModel>;
