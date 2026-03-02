import { statuses } from "@/app/constants";

type StageValue = (typeof statuses)[number]["value"];

type StatusProps = {
  status: StageValue;
};

const colorMap: Record<
  StageValue,
  { className: string }
> = {
  new: { className: "bg-blue-500/10 text-blue-400" },
  in_review: { className: "bg-amber-500/10 text-amber-400" },
  shortlisted: { className: "bg-emerald-500/10 text-emerald-400" },
  interview_scheduled: {
    className: "bg-cyan-500/10 text-cyan-400",
  },
  offer_sent: {
    className: "bg-indigo-500/10 text-indigo-400",
  },
  rejected: { className: "bg-red-500/10 text-red-400" },
  hired: { className: "bg-purple-500/10 text-purple-400" },
};

export function ApplicationStatusPill({ status }: StatusProps) {
  const statusMeta = statuses.find((s) => s.value === status);

  const meta = statusMeta
    ? {
        label: statusMeta.label,
        className: colorMap[status]?.className,
      }
    : {
        label: status,
        className: "bg-gray-600/10 text-gray-400",
      };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${meta.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}