import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStat } from "@/app/api/dashboard";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";
import { toastUtil } from "@/app/utils/toast";
import { ByStage, RawByStage } from "@/app/interfaces";
import { mapRawByStage } from "@/app/utils/helper";

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
  const openJobs = data?.jobStats.byStatus.Open ?? 0;
  const closedJobs = data?.jobStats.byStatus.Close ?? 0;

  const totalApps = data?.applicationStats.total ?? 0;
  const newApps = data?.applicationStats.byStage.New ?? 0;

  const rawByStage: RawByStage | undefined = data?.applicationStats.byStage;
  const byStage: ByStage = mapRawByStage(rawByStage);

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
