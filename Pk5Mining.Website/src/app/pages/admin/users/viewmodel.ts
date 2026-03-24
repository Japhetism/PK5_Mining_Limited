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
  IChangePasswordPayload,
  UpdateUserPayload,
  User,
  UserErrors,
  UsersQuery,
} from "@/app/interfaces/user";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import { ApiError } from "@/app/interfaces";
import { changePassword } from "@/app/api/auth";

const defaultFormData: User = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  role: "",
  isActive: true,
  dT_Created: "",
};

function useUserViewModel() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);

  const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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
    userName: searchParams.get("userName") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [
    debouncedFilters.name,
    debouncedFilters.email,
    debouncedFilters.userName,
  ]);

  const queryParams: UsersQuery = useMemo(() => {
    const raw: UsersQuery = {
      pageNumber,
      pageSize,
      name: debouncedFilters.name,
      email: debouncedFilters.email,
      userName: debouncedFilters.userName,
      isActive:
        filterStatus === "inactive"
          ? false
          : filterStatus === "active"
            ? true
            : "",
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
      queryParams.userName ?? "",
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
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfirmEditOpen(false);
      toastUtil.success("User updated successfully");
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while updating user. Please try again.",
      );
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

  const changeUserPasswordMutation = useMutation({
    mutationFn: (payload: IChangePasswordPayload) => changePassword(payload),
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: () => {
      setChangePasswordOpen(false);
      toastUtil.success("Password changed successfully.");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred. Please try again.");

      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
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

  const handleUpdateUser = () => {
    if (selectedUser) {
      const payload: UpdateUserPayload = {
        ...form,
        id: String(form.id),
      };

      updateMutation.mutate(payload);
    }
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
    setSelectedUser(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
    setChangePasswordOpen(false);
  };

  const handleChangeUserPassword = (password: string) => {
    if (selectedUser) {
      changeUserPasswordMutation.mutate({
        userId: selectedUser?.id?.toString(),
        newPassword: password,
      });
    }
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
    changePasswordOpen,
    isUpdating,
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
    setChangePasswordOpen,
    handleChangeUserPassword,
  };
}

export default useUserViewModel;

export type UserViewModel = ReturnType<typeof useUserViewModel>;
