import { deleteUser, getUsers, updateUserStatus } from "@/app/api/users";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { UserDto, UsersQuery } from "@/app/interfaces";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { cleanParams, toNumber } from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useUserListViewModel() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [toggleOpen, setToggleOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isFilter, setIsFilter] = useState<boolean>(false);
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

  const queryParams: UsersQuery = useMemo(() => {
    const raw: UsersQuery = {
      pageNumber,
      pageSize,
      search: debouncedFilters.search,
    };
    
    // clean out empty strings
    return cleanParams(raw) as UsersQuery;
  }, [pageNumber, pageSize, filterStatus, debouncedFilters]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "users",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.search ?? "",
    ],
    queryFn: () => getUsers(queryParams),
    staleTime: 30_000,
  });

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
      setUpdating(false);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User deleted successfully");
    },
    onError: (error) => {
      setUpdating(false);
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while deleting user. Please try again.",
      );
      toastUtil.error(message);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateUserStatus(id, { isActive }),
    onSuccess: async () => {
      setUpdating(false);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toastUtil.success("User status updated successfully");
    },
    onError: (error) => {
      setUpdating(false);
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while updating user status. Please try again.",
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

  const handleDeleteUser = () => {

  }

  const handleUpdateStatus = (isActive: boolean) => {

  }

  const users: UserDto[] = data?.data ?? [];
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
    deleting,
    updating,
    toggleOpen,
    deleteOpen,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
    setSelectedUser,
    setDeleteOpen,
    setToggleOpen,
    handleDeleteUser,
    handleUpdateStatus
  }
}

export default useUserListViewModel;

export type UserListViewModel = ReturnType<
  typeof useUserListViewModel
>;