import { useTenant } from "@/tenants/useTenant";

interface StatsBarProps {
  stats: { value: string; label: string }[];
}

export function StatsBar({ stats }: StatsBarProps) {
  const { colors } = useTenant();
  return (
    <div className="absolute left-[47px] bottom-[5%] w-[657.5px] h-[117px] rounded-[18px] z-20 flex items-center overflow-hidden px-8"
      style={{ backgroundColor: colors.statsbg }}>
      <div className="grid grid-cols-3 w-full h-[85.5px]">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-center items-start pl-8 ${idx !== stats.length - 1 ? "border-r border-[#C89B3C]" : ""
              }`}
          >
            <span className="font-['Inter',sans-serif] font-bold text-[#c89b3c] text-[24px] leading-tight">
              {stat.value}
            </span>
            <span className="font-['Rajdhani',sans-serif] font-bold text-[18px] text-white tracking-wide mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
