import { motion } from "motion/react";
import { BarChart3, Briefcase, FileText, PieChart } from "lucide-react";
import { DashboardSkeleton } from "@/app/components/ui/dashboard-skeleton";
import useDashboardViewModel from "./viewmodel";
import { statuses } from "@/app/constants";
import { useTenant } from "@/tenants/useTenant";

export function Dashboard() {
  const { colors } = useTenant();
  const {
    openJobs,
    closedJobs,
    totalApps,
    newApps,
    byJob,
    byStage,
    totalJobs,
    isLoading,
  } = useDashboardViewModel();

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold mb-2" style={{ color: colors.text }}>
          Dashboard
        </h1>
        <p className="text-[18px]" style={{ color: colors.subtext }}>
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
            totalJobs
              ? Math.round(((totalJobs - openJobs) / totalJobs) * 100)
              : 0
          }
          suffix="% closed"
        />
        <StatCard
          icon={BarChart3}
          label="Avg. apps / role"
          value={totalJobs ? Math.round(totalApps / totalJobs) : 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 pb-10" style={{ backgroundColor: colors.card, color: colors.text, borderColor: colors.cardBorderColor }}>
          <h2 className="text-[20px] font-semibold mb-4" style={{ color: colors.text }}>
            Applications by role
          </h2>
          {byJob.length === 0 ? (
            <p className="text-xs" style={{ color: colors.subtext }}>
              No job openings configured yet.
            </p>
          ) : (
            <ul className="space-y-5">
              {byJob.map((row) => (
                <li key={row.title} className="text-[16px]" style={{ color: colors.text }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="truncate">{row.title}</span>
                    <span className="text-gray-400">{row.count}</span>
                  </div>
                  <div className="h-[10px] rounded-full overflow-hidden" style={{ backgroundColor: colors.progressBgColor}}>
                    <div
                      className="h-full"
                      style={{
                        backgroundColor: colors.progressBarFilledColor,
                        width:
                          totalApps === 0
                            ? "0%"
                            : `${(row.count / totalApps) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border rounded-xl p-5" style={{ backgroundColor: colors.card, color: colors.text, borderColor: colors.cardBorderColor }}>
          <h2 className="text-[20px] font-semibold mb-4" style={{ color: colors.text }}>
            Application Pipelines
          </h2>
          <div className="grid grid-cols-2 gap-10 text-[20px]">
            {statuses.map((s) => {
              const count = byStage[s.value];
              return (
                <div key={s.value} className="space-y-1">
                  <p className="uppercase tracking-wide mb-5">
                    {s.label}
                  </p>
                  <p>{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type StatProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number;
  subtitle?: string;
  suffix?: string;
};

function StatCard({ icon: Icon, label, value, subtitle, suffix }: StatProps) {
  const { colors } = useTenant();
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="border-[1px] rounded-[12px] p-4 flex items-center gap-5"
      style={{ backgroundColor: colors.card, color: colors.text, borderColor: colors.cardBorderColor }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.cardIconBgColor }}>
        <Icon className="w-5 h-5" style={{ color: colors.cardIconColor }} />
      </div>
      <div className="min-w-0 flex flex-col gap-3">
        <p className="text-[16px]" style={{ color: colors.subtext }}>
          {label}
        </p>
        <p className="text-[24px] font-semibold" style={{ color: colors.text }}>
          {value}
          {suffix ? (
            <span className="text-xs text-gray-400 ml-1">{suffix}</span>
          ) : null}
        </p>
        {subtitle && (
          <p className="text-[15px] truncate" style={{ color: colors.subtext }}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
