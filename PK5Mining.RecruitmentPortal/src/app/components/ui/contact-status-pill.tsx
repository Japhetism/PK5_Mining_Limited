import { ContactStatus } from "@/app/interfaces";

type StatusProps = {
  status: ContactStatus | string;
};

export function ContactStatusPill({ status }: StatusProps) {
  const map: Record<string, { label: string; className: string }> = {
    new: {
      label: "New",
      className: "bg-[#DBEAFE] text-[#1E3A8A] text-[14px]",
    },

    read: {
      label: "Read",
      className: "bg-[#E2E8F0] text-[#334155] text-[14px]",
    },

    "in review": {
      label: "In Review",
      className: "bg-[#FEF3C7] text-[#92400E] text-[14px]",
    },

    replied: {
      label: "Replied",
      className: "bg-[#E0E7FF] text-[#3730A3] text-[14px]",
    },

    resolved: {
      label: "Resolved",
      className: "bg-[#B9F6B5] text-[#111827] text-[14px]",
    },

    closed: {
      label: "Closed",
      className: "bg-[#F6C2B5] text-[#111827] text-[14px]",
    },

    archived: {
      label: "Archived",
      className: "bg-[#F3F4F6] text-[#4B5563] text-[14px]",
    },
  };

  const meta = map[status] ?? {
    label: String(status),
    className: "bg-gray-600/10 text-gray-400 text-[14px]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-0.5 text-xs ${meta.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current text-[15px]" />
      {meta.label}
    </span>
  );
}
