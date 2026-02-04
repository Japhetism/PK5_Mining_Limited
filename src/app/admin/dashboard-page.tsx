import { motion } from "motion/react";
import { BarChart3, Briefcase, FileText, PieChart } from "lucide-react";
import { getAdminJobs, getApplications } from "./data";

export function AdminDashboardPage() {
  const jobs = getAdminJobs();
  const apps = getApplications();

  const openJobs = jobs.filter((j) => j.isActive).length;
  const closedJobs = jobs.length - openJobs;
  const totalApps = apps.length;
  const newApps = apps.filter((a) => a.status === "new").length;

  const byJob = jobs.map((job) => ({
    title: job.title,
    count: apps.filter((a) => a.jobId === job.id).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-sm text-gray-400">
          High-level view of job openings and incoming applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Briefcase}
          label="Open roles"
          value={openJobs}
          subtitle={`${closedJobs} closed`}
        />
        <StatCard
          icon={FileText}
          label="Total applications"
          value={totalApps}
          subtitle={`${newApps} new`}
        />
        <StatCard
          icon={PieChart}
          label="Fill ratio"
          value={
            jobs.length
              ? Math.round(((jobs.length - openJobs) / jobs.length) * 100)
              : 0
          }
          suffix="% closed"
        />
        <StatCard
          icon={BarChart3}
          label="Avg. apps / role"
          value={jobs.length ? Math.round(totalApps / jobs.length) : 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-4">Applications by role</h2>
          {byJob.length === 0 ? (
            <p className="text-xs text-gray-500">
              No job openings configured yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {byJob.map((row) => (
                <li key={row.title} className="text-xs text-gray-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="truncate">{row.title}</span>
                    <span className="text-gray-400">{row.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-[#c89b3c]"
                      style={{
                        width:
                          totalApps === 0
                            ? "0%"
                            : `${(row.count / Math.max(...byJob.map((r) => r.count || 1))) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-4">Pipeline status</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {["new", "in_review", "shortlisted", "rejected", "hired"].map(
              (status) => {
                const count = apps.filter((a) => a.status === status).length;
                return (
                  <div key={status} className="space-y-1">
                    <p className="uppercase tracking-wide text-gray-400">
                      {status.replace("_", " ")}
                    </p>
                    <p className="text-lg font-semibold">{count}</p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type StatProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  subtitle?: string;
  suffix?: string;
};

function StatCard({ icon: Icon, label, value, subtitle, suffix }: StatProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex items-center gap-3"
    >
      <div className="w-9 h-9 rounded-lg bg-[#c89b3c]/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#c89b3c]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-semibold">
          {value}
          {suffix ? <span className="text-xs text-gray-400 ml-1">{suffix}</span> : null}
        </p>
        {subtitle && (
          <p className="text-[11px] text-gray-500 truncate">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

