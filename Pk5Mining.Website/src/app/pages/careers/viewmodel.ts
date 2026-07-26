import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveJobs } from "@/app/api/jobs";
import { JobDto } from "@/app/interfaces";
import { toTitleCase } from "@/app/utils/helper";

const defaultFilters = {
  title: "",
  department: "",
  location: "",
};

function useCareersViewModel() {
  const queryClient = useQueryClient();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const openPositionsRef = useRef<HTMLElement | null>(null);
  const { hash } = useLocation();
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [canSearch, setCanSearch] = useState<boolean>(false);

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getActiveJobs,
  });

  const jobs: JobDto[] = data ?? [];
  const departments = useMemo(() => {
    const map = new Map(
      jobs
        .map((job) => job.department)
        .filter(Boolean)
        .map((d) => [d!.toLowerCase(), d]),
    );

    return [...map.values()]
      .map(toTitleCase)
      .sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const locations = useMemo(() => {
    const map = new Map(
      jobs
        .map((job) => job.location)
        .filter(Boolean)
        .map((l) => [l!.toLowerCase(), l]),
    );

    return [...map.values()]
      .map(toTitleCase)
      .sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesTitle = job.title
        .toLowerCase()
        .includes(appliedFilters.title.toLowerCase());

      const matchesDepartment = appliedFilters.department
        ? job.department?.toLowerCase() ===
          appliedFilters.department.toLowerCase()
        : true;

      const matchesLocation = appliedFilters.location
        ? job.location?.toLowerCase() === appliedFilters.location.toLowerCase()
        : true;

      return matchesTitle && matchesDepartment && matchesLocation;
    });
  }, [jobs, appliedFilters]);

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  return {
    jobs,
    filteredJobs,
    filters,
    departments,
    locations,
    isLoading,
    error,
    expandedJob,
    openPositionsRef,
    queryClient,
    scrollToOpenPositions,
    setExpandedJob,
    setFilters,
    handleSearch,
  };
}

export default useCareersViewModel;

export type CareersViewModel = ReturnType<typeof useCareersViewModel>;
