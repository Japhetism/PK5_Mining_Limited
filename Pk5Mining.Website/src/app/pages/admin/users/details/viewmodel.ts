import {
  deleteUser,
  getUserById,
  resetUserPassword,
  updateUser,
  updateUserStatus,
} from "@/app/api/users";
import { UpdateUserBody } from "@/app/interfaces";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const defaultFormData = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

function useUserDetailsViewModel() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [toggleOpen, setToggleOpen] = useState<boolean>(false);
  const [resetOpen, setResetOpen] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", "detail", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
    staleTime: 30_000,
  });

  const [form, setForm] = useState<UpdateUserBody>(defaultFormData);

  // hydrate form when user loads
  useMemo(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role ?? "",
      isActive: user.isActive,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(id as string),
    onSuccess: async () => {
      setDeleteOpen(false);
      setDeleting(false);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      history.back();
      toastUtil.success("User deleted successfully");
    },
    onError: (error) => {
      setDeleting(false);
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while deleting user. Please try again.",
      );

      toastUtil.error(message);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (nextActive: boolean) =>
      updateUserStatus(id as string, { isActive: nextActive }),
    onSuccess: async () => {
      setToggleOpen(false);
      setUpdating(false);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["users", "detail", id] });
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

  const resetMutation = useMutation({
    mutationFn: () => resetUserPassword(id as string),
    onSuccess: async () => {
      setResetOpen(false);
      setResetting(false);
      await queryClient.invalidateQueries({ queryKey: ["users", "detail", id] });
      // If your backend returns tempPassword/message, show toast here (sonner)
      toastUtil.success("User password reset successfully");
    },
    onError: (error) => {
      setResetting(false);
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while resetting user password. Please try again.",
      );

      toastUtil.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserBody) => updateUser(id as string, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["users", "detail", id] });
      // toast.success("User updated")
      toastUtil.success("User updated successfully");
    },
    onError: (error) => {
      setResetting(false);
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while updating user details. Please try again.",
      );

      toastUtil.error(message);
    },
  });

  const canSave = useMemo(() => {
    return (
      !!form.firstName?.trim() &&
      !!form.lastName?.trim() &&
      !!form.email?.trim() &&
      !updateMutation.isPending
    );
  }, [form, updateMutation.isPending]);

  const handleUpdateUser = () => {

  }

  const handleResetPassword = () => {

  }

  const handleDeleteUser = () => {

  }

  const handleUpdateStatus = (isActive: boolean) => {

  }

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return {
    user,
    fullName,
    canSave,
    form,
    toggleOpen,
    resetOpen,
    deleteOpen,
    resetting,
    updating,
    deleting,
    isLoading,
    setResetOpen,
    setToggleOpen,
    setDeleteOpen,
    setForm,
    handleDeleteUser,
    handleResetPassword,
    handleUpdateStatus,
    handleUpdateUser,
  };
}

export default useUserDetailsViewModel;

export type UserDetailsViewModel = ReturnType<typeof useUserDetailsViewModel>;
