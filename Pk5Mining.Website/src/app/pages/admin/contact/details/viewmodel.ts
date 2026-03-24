import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getContactThread,
  replyToContact,
  updateContactStatus,
} from "@/app/api/contact";
import { ContactStatus } from "@/app/interfaces";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";

function useContactDetailsViewModel(passedId?: string) {
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  // 1. Consistently get the ID and treat it as a string
  const activeId = String(passedId || params.id || "");

  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);

  const { data: thread, isLoading, isError } = useQuery({
    queryKey: ["contact", "thread", activeId],
    queryFn: () => getContactThread(activeId),
    enabled: !!activeId,
    staleTime: 30_000,
  });

  // 2. FIND the correct contact based on the ID clicked
  // We check the API response first, then fall back to mock data
  const contact = useMemo(() => {
    if (thread?.contact) return thread.contact;
    return [];
  }, [thread, activeId]);

   // Mark read automatically when opened (optional)
  const markReadMutation = useMutation({
    mutationFn: () => updateContactStatus(activeId as string, "replied"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact"] }),
  });

  const replyMutation = useMutation({
    mutationFn: (body: { subject: string; message: string }) =>
      replyToContact(activeId, body),
    onSuccess: async () => {
      setReplying(false);
      setIsReplyOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["contact", "thread", activeId] });
      await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
      toastUtil.success("Contact message replied successfully");
    },
    onError: (error) => {
      setReplying(false);
      toastUtil.error(getAxiosErrorMessage(error, "Error replying."));
    },
  });

  const statusMutation = useMutation({
    mutationFn: (status: ContactStatus) => updateContactStatus(activeId, status),
    onSuccess: async () => {
      setUpdating(false);
      setConfirmOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["contact", "thread", activeId] });
      await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
      toastUtil.success("Status updated successfully");
    },
    onError: (error) => {
      setUpdating(false);
      toastUtil.error(getAxiosErrorMessage(error, "Error updating status."));
    },
  });

  const handleUpdateStatus = () => {
    if (!activeId) return toastUtil.error("ID not found");
    setUpdating(true);
    statusMutation.mutate("resolved");
  };

  return {
    id: activeId,
    thread,
    contact, 
    isLoading,
    isError,
    isReplyOpen,
    markReadMutation,
    replyMutation,
    statusMutation,
    confirmOpen,
    replying,
    updating,
    setIsReplyOpen,
    setConfirmOpen,
    handleUpdateStatus,
  };
}

export default useContactDetailsViewModel;