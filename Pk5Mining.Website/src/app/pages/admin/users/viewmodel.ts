import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
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
  password: "",
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
  }, [debouncedFilters.name, debouncedFilters.email, debouncedFilters.userName]);

  const queryParams: UsersQuery = useMemo(() => {
    const raw: UsersQuery = {
      pageNumber,
      pageSize,
      name: debouncedFilters.name,
      email: debouncedFilters.email,
      userName: debouncedFilters.userName,
      isActive:
        filterStatus === "inactive" ? false : filterStatus === "active" ? true : "",
    };
    return cleanParams(raw) as UsersQuery;
  }, [pageNumber, pageSize, filterStatus, debouncedFilters]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => getUsers(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (selectedUser) {
      setForm({ ...defaultFormData, ...selectedUser });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (error) {
      toastUtil.error(getAxiosErrorMessage(error, "An error occurred while fetching users."));
    }
  }, [error]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User deleted successfully");
      handleCloseModal();
    },
    onError: (err) => toastUtil.error(getAxiosErrorMessage(err)),
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User created successfully");
      handleCloseModal();
    },
    onError: (err) => toastUtil.error(getAxiosErrorMessage(err)),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(String(payload.id), payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User updated successfully");
      handleCloseModal();
    },
    onError: (err) => toastUtil.error(getAxiosErrorMessage(err)),
  });

  const changeUserPasswordMutation = useMutation({
    mutationFn: (payload: IChangePasswordPayload) => changePassword(payload),
    onSuccess: () => {
      toastUtil.success("Password changed successfully.");
      handleCloseModal();
    },
    onError: (err) => {
      const message = (err as ApiError)?.message ?? "An error occurred. Please try again.";
      toastUtil.error(message);
    },
  });

  const handleCreateuser = () => {
    if (!form.email || !form.username || !form.firstName) {
      toastUtil.error("Please fill in required fields (*)");
      return;
    }
    const { id, dT_Created, ...payload } = form;
    createMutation.mutate(payload as CreateUserPayload);
  };

  const handleUpdateUser = () => {
    if (!selectedUser?.id) return;
    // Remove read-only fields that might cause 500 errors if sent back to the server
    const { dT_Created, ...payload } = form;
    updateMutation.mutate({ ...payload, id: selectedUser.id } as UpdateUserPayload);
  };

  const handleDeleteUser = () => {
    if (!selectedUser?.id) return;
    deleteMutation.mutate(selectedUser.id.toString());
  };

  const handleChangeUserPassword = (password: string) => {
    if (!selectedUser?.id) return;
    changeUserPasswordMutation.mutate({
      userId: selectedUser.id.toString(), // The check above ensures this is safe
      newPassword: password
    });
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
    setChangePasswordOpen(false);
    setFieldErrors({});
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  return {
    users: data?.data ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    filters,
    filterStatus,
    isFilter,
    pageNumber,
    pageSize,
    isLoading,
    isProcessing: 
      createMutation.isPending || 
      updateMutation.isPending || 
      deleteMutation.isPending || 
      changeUserPasswordMutation.isPending,
    selectedUser,
    confirmOpen,
    confirmEditOpen,
    confirmDeleteOpen,
    changePasswordOpen,
    form,
    fieldErrors,
    onChange,
    updateFilter,
    onChangePage: (next: number) => setPageNumber(next),
    onChangePageSize: (size: number) => { setPageSize(size); setPageNumber(1); },
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