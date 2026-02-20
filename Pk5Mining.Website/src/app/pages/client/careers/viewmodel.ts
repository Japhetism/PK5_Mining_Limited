import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveJobs } from "@/app/api/jobs";
import { JobDto } from "@/app/interfaces";

function useCareersViewModel() {
  const queryClient = useQueryClient();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const openPositionsRef = useRef<HTMLElement | null>(null);
  const { hash } = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getActiveJobs,
  });

  const jobs: JobDto[] = data ?? [];

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (hash === "#open-positions") {
      // wait a tick so layout/sections mount first
      requestAnimationFrame(() => {
        openPositionsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [hash]);

  return {
    jobs,
    isLoading,
    error,
    expandedJob,
    openPositionsRef,
    queryClient,
    scrollToOpenPositions,
    setExpandedJob,
  };
}

export default useCareersViewModel;

export type CareersViewModel = ReturnType<typeof useCareersViewModel>;
