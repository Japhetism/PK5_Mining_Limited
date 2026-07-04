import { ContactStatus } from "@/app/interfaces";

type StatusProps = {
  status: ContactStatus | string;
};

export function ContactStatusPill({ status }: StatusProps) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: "New", className: "bg-blue-500/10 text-blue-400 text-[14px]" },
    read: { label: "Read", className: "bg-slate-500/10 text-slate-300 text-[14px]" },
    "in review": {
      label: "In review",
      className: "bg-amber-500/10 text-amber-400 text-[14px]",
    },
    replied: {
      label: "Replied",
      className: "bg-indigo-500/10 text-indigo-400 text-[14px]",
    },
    resolved: {
      label: "Resolved",
      className: "bg-emerald-500/10 text-emerald-400 text-[14px]",
    },
    closed: { label: "Closed", className: "bg-red-500/10 text-red-400 text-[14px]" },
    archived: { label: "Archived", className: "bg-gray-600/10 text-gray-400 text-[14px]" },
  };

  const meta = map[status] ?? {
    label: String(status),
    className: "bg-gray-600/10 text-gray-400 text-[14px]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${meta.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current text-[14px]" />
      {meta.label}
    </span>
  );
}