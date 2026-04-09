import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, updateUser } from "@/app/api/users";
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
import {
  cleanParams,
  generatePassword,
  mapZodErrors,
  toNumber,
} from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import { ApiError } from "@/app/interfaces";
import { changePassword } from "@/app/api/auth";
import { createUserSchema, updateUserSchema } from "@/app/schemas/user.schema";

const defaultFormData: User = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  role: "",
  password: "",
  isActive: true,
  dT_Created: "",
};

enum UserAction {
  Update = "Update",
  Activate = "Activate",
  Deactivate = "Deactivate",
  Delete = "Delete",
}

const successMessages: Record<UserAction, string> = {
  [UserAction.Update]: "User updated successfully",
  [UserAction.Activate]: "User activated successfully",
  [UserAction.Deactivate]: "User deactivated successfully",
  [UserAction.Delete]: "User deleted successfully",
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
  const [confirmUpdateStatusOpen, setConfirmUpdateStatusOpen] =
    useState<boolean>(false);

  const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [actionType, setActionType] = useState<UserAction | null>(null);

  const [form, setForm] = useState(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<UserErrors | null>(null);

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
    if (confirmEditOpen) {
      const tempPassword = generatePassword();
      setForm({ ...defaultFormData, password: tempPassword });
    }

    if (!selectedUser) return;

    setForm({
      ...defaultFormData,
      ...selectedUser,
    });
  }, [selectedUser, confirmEditOpen]);

  useEffect(() => {
    if (error) {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while fetching users. Please try again.");
      toastUtil.error(message);
    }
  }, [error]);

  const createMutation = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onMutate: () => {
      setIsProcessing(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfirmEditOpen(false);
      toastUtil.success("User created successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while creating a user. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsProcessing(false),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
    onMutate: () => {
      setIsProcessing(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfirmEditOpen(false);
      const msg =
        successMessages[actionType as UserAction] ??
        successMessages[UserAction.Update];
      handleCloseModal();
      toastUtil.success(msg);
    },
    onError: (error) => {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while updating user. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => {
      setIsProcessing(false);
      setActionType(null);
    },
  });

  const changeUserPasswordMutation = useMutation({
    mutationFn: (payload: IChangePasswordPayload) => changePassword(payload),
    onMutate: () => {
      setIsProcessing(true);
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
    onSettled: () => setIsProcessing(false),
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

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    const formWithId = { ...form, id: Number(form.id), isDeleted: true };

    setActionType(UserAction.Delete);
    updateMutation.mutate(formWithId);
  };

  const handleActivateDeactivateUser = (isActive: boolean) => {
    if (!selectedUser) return;

    const formWithId = { ...form, id: Number(form.id), isActive: isActive };

    setActionType(isActive ? UserAction.Activate : UserAction.Deactivate);
    updateMutation.mutate(formWithId);
  };

  const handleCreateUser = () => {
    const result = createUserSchema.safeParse(form);

    if (!result.success) {
      setFieldErrors(mapZodErrors<CreateUserPayload>(result.error));
      return;
    }

    setFieldErrors({});

    createMutation.mutate(result.data);
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    const formWithId = { ...form, id: Number(form.id) };

    const result = updateUserSchema.safeParse(formWithId);

    if (!result.success) {
      setFieldErrors(mapZodErrors<UpdateUserPayload>(result.error));
      return;
    }

    setFieldErrors({});
    setActionType(UserAction.Update);
    updateMutation.mutate(result.data);
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
    setFieldErrors(null);
    setSelectedUser(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
    setChangePasswordOpen(false);
    setConfirmUpdateStatusOpen(false);
  };

  const handleChangeUserPassword = (password: string) => {
    if (selectedUser?.id) {
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
    isProcessing,
    confirmUpdateStatusOpen,
    onChange,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
    setSelectedUser,
    handleDeleteUser,
    handleCreateUser,
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
    handleActivateDeactivateUser,
    setConfirmUpdateStatusOpen,
  };
}

export default useUserViewModel;

export type UserViewModel = ReturnType<typeof useUserViewModel>;
