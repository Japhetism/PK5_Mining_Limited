import { MailIcon } from "lucide-react";
import { ArrowRight } from "@/assets/svgs/arrowRight";
import useLoginViewModel from "../viewmodel";
import { useTenant } from "@/tenants/useTenant";

export function LoginForm() {
  const { colors } = useTenant();
  const { email, error, setEmail, handleSSOSignin, handleSSOSigninByEmail } =
    useLoginViewModel();

  return (
    <div className="absolute flex flex-col gap-[40px] items-start left-[24px] right-[24px] lg:right-auto lg:left-[103px] top-[220px] lg:top-[35%] lg:w-[415.9px] z-30">
      <div className="bg-white h-[49.5px] relative rounded-[10.395px] shrink-0 w-full">
        <div className="relative rounded-[inherit] size-full overflow-hidden flex items-center">
          <div className="absolute left-[12px] z-10 flex items-center justify-center w-[28px] h-[28px] bg-[#D9D9D9]/40 rounded-full pointer-events-none">
            <div className="scale-75 text-black/70 flex items-center justify-center">
              <MailIcon color="#C89B3C" />
            </div>
          </div>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full h-full rounded-[10.395px] bg-transparent pl-[48px] pr-4 text-[14px] text-black font-['Inter',sans-serif] font-light focus:outline-none placeholder:text-black/50"
          />
        </div>

        <div
          aria-hidden
          className="absolute border-[1.039px] border-[rgba(200,155,60,0.99)] border-solid inset-0 pointer-events-none rounded-[10.395px]"
        />
      </div>

      {error && (
        <p className="-mt-6 ml-1 text-[13px] font-['Inter',sans-serif] text-red-400">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSSOSigninByEmail}
        className="bg-[#c89b3c] h-[49.5px] overflow-hidden relative rounded-[10.395px] shrink-0 w-full cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all"
      >
        <div className="absolute inset-0 flex items-center justify-center gap-[9.356px]">
          <span className="font-['Inter',sans-serif] font-bold text-[14.553px] text-black">
            Continue
          </span>
          <div className="h-[8.446px] relative shrink-0 w-[12.285px]">
            <ArrowRight />
          </div>
        </div>
      </button>

      <div className="flex items-center w-full gap-4">
        <div className="flex-1 h-px bg-[#C89B3C]" />

        <p className="px-3 text-[14px] sm:text-[16px] text-white font-['Inter',sans-serif] whitespace-nowrap">
          OR
        </p>

        <div className="flex-1 h-px bg-[#C89B3C]" />
      </div>

      <button
        type="button"
        onClick={handleSSOSignin}
        style={{ backgroundColor: colors.card }}
        className="h-[49.5px] relative rounded-[10.395px] shrink-0 w-full cursor-pointer hover:bg-[#111] active:scale-[0.98] transition-all"
      >
        <div className="relative flex items-center justify-center w-full h-full rounded-[10.395px] border border-white/80  overflow-hidden"
        >
          <span className="font-['Inter',sans-serif] font-bold text-[14.553px] text-white">
            Sign in with SSO
          </span>
        </div>
        <div
          aria-hidden
          className="absolute border border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[10.395px]"
        />
      </button>
    </div>
  );
}
