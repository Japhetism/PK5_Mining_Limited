import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getContactThread,
  replyToContact,
  updateContactStatus,
} from "@/app/api/contact";
import { ContactStatus } from "@/app/interfaces";

function useContactDetailsViewModel() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [isReplyOpen, setIsReplyOpen] = useState(false);

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
      setIsReplyOpen(false);
      await queryClient.invalidateQueries({
        queryKey: ["contact", "thread", id],
      });
      await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: (status: ContactStatus) =>
      updateContactStatus(id as string, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["contact", "thread", id],
      });
      await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
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

  return {
    id,
    thread,
    contact,
    defaultReplySubject,
    isLoading,
    isError,
    isReplyOpen,
    replyMutation,
    statusMutation,
    markReadMutation,
    setIsReplyOpen,

  }
}

export default useContactDetailsViewModel;

export type ContactDetailsViewModel = ReturnType<
  typeof useContactDetailsViewModel
>;