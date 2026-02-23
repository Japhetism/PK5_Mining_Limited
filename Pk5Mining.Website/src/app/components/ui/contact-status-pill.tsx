import { ContactStatus } from "@/app/interfaces";

type StatusProps = {
  status: ContactStatus | string;
};

export function ContactStatusPill({ status }: StatusProps) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: "New", className: "bg-blue-500/10 text-blue-400" },
    read: { label: "Read", className: "bg-slate-500/10 text-slate-300" },
    "in review": {
      label: "In review",
      className: "bg-amber-500/10 text-amber-400",
    },
    replied: {
      label: "Replied",
      className: "bg-indigo-500/10 text-indigo-400",
    },
    resolved: {
      label: "Resolved",
      className: "bg-emerald-500/10 text-emerald-400",
    },
    closed: { label: "Closed", className: "bg-red-500/10 text-red-400" },
    archived: { label: "Archived", className: "bg-gray-600/10 text-gray-400" },
  };

  const meta = map[status] ?? {
    label: String(status),
    className: "bg-gray-600/10 text-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${meta.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}