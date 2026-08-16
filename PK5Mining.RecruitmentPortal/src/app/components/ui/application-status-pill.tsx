import { statuses, statusStyles } from "@/app/constants";
import { StageValue } from "@/app/interfaces";
import { normalizeStage, isStageValue } from "@/app/utils/helper";

type StatusProps = {
  status: string;
};

export function ApplicationStatusPill({ status }: StatusProps) {
  const normalized = normalizeStage(status);

  const stage: StageValue | null = isStageValue(normalized) ? normalized : null;

  const appStatus = statuses.find((s) => s.value === stage)?.label ?? stage;

  const statusStyle =
    statusStyles[appStatus?.toLowerCase() as keyof typeof statusStyles] ??
    statusStyles.new;

  const meta = stage
    ? {
        label: appStatus,
        className: `${statusStyle.bg} ${statusStyle.text}`,
      }
    : {
        label: status,
        className: "bg-gray-600/10 text-gray-400",
      };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-0.5 text-[13px] whitespace-nowrap ${meta.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
