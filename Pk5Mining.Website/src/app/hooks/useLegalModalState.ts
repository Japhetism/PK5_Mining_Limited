import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useLegalModalState() {
  const queryClient = useQueryClient();
  const queryKey = ["legal-modal-state"];

  const initialData = {
    isLegalModalOpen: false,
    isCookiesModalOpen: false,
    mode: "privacy" as "privacy" | "terms",
  };

  const { data } = useQuery({
    queryKey,
    queryFn: () => initialData,
    initialData,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const openModal = (mode: "privacy" | "terms" | "cookies") => {
    if (mode === "cookies") {
      queryClient.setQueryData(queryKey, (prev: any) => ({
        ...prev,
        isCookiesModalOpen: true,
      }));
    } else {
      queryClient.setQueryData(queryKey, (prev: any) => ({
        ...prev,
        isLegalModalOpen: true,
        mode,
      }));
    }
  };

  const closeModal = (target: "modal" | "cookies" | "all" = "modal") => {
    queryClient.setQueryData(queryKey, (prev: any) => ({
      ...prev,
      isLegalModalOpen:
        target === "all" || target === "modal" ? false : prev.isLegalModalOpen,
      isCookiesModalOpen:
        target === "all" || target === "cookies"
          ? false
          : prev.isCookiesModalOpen,
    }));
  };

  return {
    isLegalModalOpen: data?.isLegalModalOpen ?? false,
    isCookiesModalOpen: data?.isCookiesModalOpen ?? false,
    mode: data?.mode ?? "privacy",
    openModal,
    closeModal,
  };
}
