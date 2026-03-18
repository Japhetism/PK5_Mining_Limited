import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveJobs } from "@/app/api/jobs";
import { JobDto } from "@/app/interfaces";
import { toTitleCase } from "@/app/utils/helper";

function useCareersViewModel() {
  const queryClient = useQueryClient();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const openPositionsRef = useRef<HTMLElement | null>(null);
  const { hash } = useLocation();
  const [filters, setFilters] = useState({
    title: "",
    department: "",
    location: "",
  });
  const [filteredJobs, setFilteredJobs] = useState<JobDto[]>([]);

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

  const handleSearch = () => {
    // If no filters, show all jobs
    if (!filters.title && !filters.department && !filters.location) {
      setFilteredJobs(jobs);
      return;
    }

    const result = jobs.filter((job) => {
      const matchesTitle = job.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());

      const matchesDepartment = filters.department
        ? job.department?.toLowerCase() === filters.department.toLowerCase()
        : true;

      const matchesLocation = filters.location
        ? job.location?.toLowerCase() === filters.location.toLowerCase()
        : true;

      return matchesTitle && matchesDepartment && matchesLocation;
    });

    setFilteredJobs(result);
  };

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

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
