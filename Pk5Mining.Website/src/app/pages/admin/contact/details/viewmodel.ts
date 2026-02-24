import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getContactThread,
  replyToContact,
  updateContactStatus,
} from "@/app/api/contact";
import { ContactStatus } from "@/app/interfaces";
import { mockContactMessages } from "@/app/fixtures";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";

function useContactDetailsViewModel() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contact", "thread", id],
    queryFn: () => getContactThread(id as string),
    enabled: !!id,
    staleTime: 30_000,
  });

  // Mark read automatically when opened (optional)
  const markReadMutation = useMutation({
    mutationFn: () => updateContactStatus(id as string, "read"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact"] }),
  });

  const replyMutation = useMutation({
    mutationFn: (body: { subject: string; message: string }) =>
      replyToContact(id as string, body),
    onSuccess: async () => {
      setReplying(false);
      setIsReplyOpen(false);
      await queryClient.invalidateQueries({
        queryKey: ["contact", "thread", id],
      });
      await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
      toastUtil.success("Contact message replied successfully");
    },
    onError: (error) => {
      setReplying(false);
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while replying to contact message. Please try again.",
      );
      toastUtil.error(message);
    },
  });

  const statusMutation = useMutation({
    mutationFn: (status: ContactStatus) =>
      updateContactStatus(id as string, status),
    onSuccess: async () => {
      setUpdating(false);
      setConfirmOpen(false);
      await queryClient.invalidateQueries({
        queryKey: ["contact", "thread", id],
      });
      await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
      toastUtil.success("Contact message status updated successfully");
    },
    onError: (error) => {
      setUpdating(false);
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while updating contact message status. Please try again.",
      );

      toastUtil.error(message);
    },
  });

  const thread = data;
  const contact = thread?.contact;

  const defaultReplySubject = useMemo(() => {
    if (!contact?.subject) return "Re:";
    const subj = contact.subject.startsWith("Re:")
      ? contact.subject
      : `Re: ${contact.subject}`;
    return subj;
  }, [contact?.subject]);   

  const handleUpdateStatus = () => {
    if (!id) {
      toastUtil.error("Contact message not found");
      return;
    }

    statusMutation.mutate("resolved");
  }

  return {
    id,
    thread,
    contact: mockContactMessages[1],
    defaultReplySubject,
    isLoading,
    isError,
    isReplyOpen,
    replyMutation,
    statusMutation,
    markReadMutation,
    confirmOpen,
    replying,
    updating,
    setIsReplyOpen,
    setConfirmOpen,
    handleUpdateStatus,
  };
}

export default useContactDetailsViewModel;

export type ContactDetailsViewModel = ReturnType<
  typeof useContactDetailsViewModel
>;
