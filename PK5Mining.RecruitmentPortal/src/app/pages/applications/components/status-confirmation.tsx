import { ConfirmModal } from "@/app/components/ui/confirm-modal";

interface StatusConfirmationProps {
  title?: string;
  isConfirmed: boolean;
  setIsConfirmed: (isConfirmed: boolean) => void;
}

export function StatusConfirmation({
  title = "I confirm that I have reviewed this candidate's application and supporting documents.",
  isConfirmed,
  setIsConfirmed,
}: StatusConfirmationProps) {
  return (
    <div className="mb-[20px] p-[16px] bg-[#FEF9C3] rounded-[12px] border border-[#FDE68A]">
      <label className="flex items-start gap-[10px] cursor-pointer">
        <div className="relative shrink-0 mt-[2px]">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="absolute opacity-0 inset-0 cursor-pointer z-10 w-full h-full"
          />
          <div
            className={`w-[18px] h-[18px] rounded-[5px] border-[2px] flex items-center justify-center transition-all duration-200 ${
              isConfirmed
                ? "bg-[#22C55E] border-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.15)]"
                : "border-[#D1D5DB] bg-white"
            }`}
          >
            {isConfirmed && (
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                style={{ animation: "cdCheckIn 0.15s ease-out" }}
              >
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="font-['Inter',sans-serif] text-[13px] text-[#374151] leading-relaxed select-none">
          {title}
        </span>
      </label>
      {isConfirmed && (
        <div
          className="flex items-center gap-[6px] mt-[10px] ml-[28px]"
          style={{ animation: "cdFadeIn 0.2s ease-out" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#22C55E" />
            <path
              d="M4 7L6 9L10 5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-['Inter',sans-serif] text-[12px] text-[#16A34A] font-semibold">
            Review acknowledged
          </span>
        </div>
      )}
    </div>
  );
}
