function useDashboardViewModel() {
  const jobs: any[] = [];
  const apps: any[] = [];

  const openJobs = jobs?.filter((j) => j.isActive).length;
  const closedJobs = jobs?.length - openJobs;
  const totalApps = apps?.length;
  const newApps = apps?.filter((a) => a.status === "new").length;

  const byJob = jobs.map((job) => ({
    title: job.title,
    count: apps.filter((a) => a.jobId === job.id).length,
  }));

  return {
    openJobs,
    closedJobs,
    totalApps,
    newApps,
    byJob,
    jobs,
    apps,
  };
}

export default useDashboardViewModel;

export type DashboardViewModel = ReturnType<typeof useDashboardViewModel>;
