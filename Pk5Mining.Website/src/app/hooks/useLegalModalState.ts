import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useLegalModalState() {
  const queryClient = useQueryClient();
  const queryKey = ["legal-modal-state"];

  const { data } = useQuery({
    queryKey,
    initialData: { isOpen: false, mode: "privacy" as "privacy" | "terms" },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const openModal = (mode: "privacy" | "terms") => {
    queryClient.setQueryData(queryKey, { isOpen: true, mode });
  };

  const closeModal = () => {
    queryClient.setQueryData(queryKey, (prev: any) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return {
    isOpen: data.isOpen,
    mode: data.mode,
    openModal,
    closeModal,
  };
}
