import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStat } from "@/app/api/dashboard";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";

function useDashboardViewModel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => getDashboardStat(),
    staleTime: 30_000,
    enabled: true,
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (error) {
      const message = getAxiosErrorMessage(
        error,
        "An error occurred while fetching applications. Please try again.",
      );
      toastUtil.error(message);
    }
  }, [error]);

  // Use API response
  const jobs = data?.recentJobs ?? [];

  const totalJobs = data?.jobStats?.total ?? 0;
  const openJobs = data?.jobStats.open ?? 0;
  const closedJobs = data?.jobStats.closed ?? 0;

  const totalApps = data?.applicationStats.total ?? 0;
  const newApps = data?.applicationStats.byStage.new ?? 0;

  const rawByStage = data?.applicationStats.byStage;

  const byStage = {
    new: rawByStage?.new ?? 0,
    in_review: rawByStage?.inReview ?? 0,
    shortlisted: rawByStage?.shortlisted ?? 0,
    rejected: rawByStage?.rejected ?? 0,
    hired: rawByStage?.hired ?? 0,
  };

  // Best approximation from your response: recent jobs and their applicationCount
  const byJob = useMemo(
    () =>
      jobs.map((job) => ({
        title: job.title,
        count: job.applicationCount,
      })),
    [jobs],
  );

  return {
    isLoading,
    openJobs,
    closedJobs,
    totalApps,
    newApps,
    byJob,
    byStage,
    totalJobs,
  };
}

export default useDashboardViewModel;

export type DashboardViewModel = ReturnType<typeof useDashboardViewModel>;
