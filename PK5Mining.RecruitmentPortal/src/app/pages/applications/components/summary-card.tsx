export function SummaryCard({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="bg-[#FAFAFA] border border-[#F0F1F3] rounded-[12px] p-[16px] mb-[20px]">
      <p className="font-['Inter',sans-serif] font-semibold text-[11px] text-[#9CA3AF] uppercase tracking-[0.07em] mb-[12px]">
        {title}
      </p>
      <div className="flex flex-col gap-[9px]">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex justify-between items-start gap-[12px]"
          >
            <span className="font-['Inter',sans-serif] text-[13px] text-[#9CA3AF] shrink-0">
              {r.label}
            </span>
            <span className="font-['Inter',sans-serif] text-[13px] text-[#1F2937] font-medium text-right">
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
