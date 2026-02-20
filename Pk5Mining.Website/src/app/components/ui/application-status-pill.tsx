type StatusProps = {
  status: string;
};

export function ApplicationStatusPill({ status }: StatusProps) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: "New", className: "bg-blue-500/10 text-blue-400" },
    in_review: {
      label: "In review",
      className: "bg-amber-500/10 text-amber-400",
    },
    shortlisted: {
      label: "Shortlisted",
      className: "bg-emerald-500/10 text-emerald-400",
    },
    rejected: { label: "Rejected", className: "bg-red-500/10 text-red-400" },
    hired: { label: "Hired", className: "bg-purple-500/10 text-purple-400" },
  };

  const meta = map[status] ?? {
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