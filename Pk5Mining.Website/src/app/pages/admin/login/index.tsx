import { useState } from "react";
import svgPaths from "../login/components/svg-gadtsffos9";
import miningimage2 from "../../../../assets/images/miningimage2.png";
import mininglogo from "../../../../assets/images/mininglogo.png";
import miningimage1 from "../../../../assets/images/miningimage1.png";
import useLoginViewModel from "./viewmodel";

/* ── Logo pieces ─────────────────────────────────────────────────────────── */

function Group1() {
  return (
    <div className="absolute contents left-[2.11px] top-[17.13px]">
      <p className="-translate-x-1/2 absolute font-['Girassol',sans-serif] leading-[27.648px] left-[93.68px] text-[18px] text-center text-white top-[46.4px] tracking-[5px] whitespace-nowrap">
        MINING
      </p>
      <p className="-translate-x-1/2 absolute font-['Iceland',sans-serif] h-[20.88px] leading-[7.92px] left-[99.55px] overflow-hidden text-[60px] text-center text-ellipsis text-white top-[20.73px] tracking-[-2.4px] w-[97.44px] whitespace-nowrap">
        PK5
      </p>
      <div className="absolute h-[20.4px] left-[2.11px] top-[17.13px] w-[51.6px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[143.82%] left-0 max-w-none top-[-12.13%] w-full" src={mininglogo} />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[61.083px] left-[-5.81px] top-[-3.26px] w-[60px]">
      <div className="absolute inset-[-0.2%_-0.18%_0_-0.23%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.2414 61.2031">
          <g>
            <path d={svgPaths.p2c0e9960} stroke="#E7DFCD" strokeWidth="0.24" />
            <path d={svgPaths.p344e8700} fill="#E7DFCD" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Pk5Logo() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[58.08px] left-[calc(50%+1.89px)] top-[calc(50%+1.2px)] w-[170.4px]">
      <Group1 />
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute h-[67.547px] left-0 top-0 w-[65.76px]">
      <div className="absolute inset-[-1.71%_-1.56%_0_-1.98%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68.083 68.6989">
          <g>
            <path d={svgPaths.pdf49f00} stroke="url(#grad_logo)" strokeWidth="2.304" />
            <path d={svgPaths.p1fcf9a00} fill="#EAD09C" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="grad_logo" x1="1.30033" x2="68.6883" y1="23.4409" y2="37.03">
              <stop stopColor="#C89B3C" />
              <stop offset="1" stopColor="#EED7A7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Pk5AgroAlliedLogo() {
  return (
    <div className="absolute h-[67px] left-[47px] top-[47px] w-[184px] z-20">
      <Pk5Logo />
      <Group3 />
    </div>
  );
}

/* ── Form panel background ───────────────────────────────────────────────── */

function FormPanel() {
  return (
    <div className="absolute inset-0 lg:inset-y-0 lg:right-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] opacity-65 overflow-hidden w-full h-[500px] lg:h-full">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={miningimage1} />
    </div>
  );
}

/* ── Icon badge above form ───────────────────────────────────────────────── */

function Frame6() {
  return (
    <div className="-translate-x-1/2 absolute left-1/2 size-[79.2px] top-[40px] lg:top-[14%] z-20">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.2 79.2">
        <rect fill="white" fillOpacity="0.97" height="78.21" rx="39.105" width="78.21" x="0.495" y="0.495" />
        <rect height="78.21" rx="39.105" stroke="#C89B3C" strokeWidth="0.99" width="78.21" x="0.495" y="0.495" />
        <path d={svgPaths.p315eef00} fill="#C89B3C" />
      </svg>
    </div>
  );
}

/* ── Email icon in input ─────────────────────────────────────────────────── */

function EmailIcon() {
  return (
    <>
      <div className="absolute inset-[39.37%_93.22%_50.24%_5.2%]">
        <div className="absolute inset-[-10.11%_-7.94%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.58653 6.18213">
            <path d={svgPaths.p1753f000} stroke="#C89B3C" strokeLinecap="round" strokeWidth="1.0395" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[49.76%_92.57%_36.38%_4.55%]">
        <div className="absolute inset-[-7.58%_-4.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0424 7.89634">
            <path d={svgPaths.pd186900} stroke="#C89B3C" strokeLinecap="round" strokeWidth="1.0395" />
          </svg>
        </div>
      </div>
    </>
  );
}

/* ── Arrow icon ──────────────────────────────────────────────────────────── */

function ArrowRight() {
  return (
    <div className="h-[8.446px] relative shrink-0 w-[12.285px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.285 8.44594">
        <g clipPath="url(#clip_arrow)">
          <path clipRule="evenodd" d={svgPaths.p21c40370} fill="black" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.pa560200} fill="black" fillRule="evenodd" />
        </g>
        <defs>
          <clipPath id="clip_arrow">
            <rect fill="white" height="8.44594" width="12.285" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

/* ── Stats bar ───────────────────────────────────────────────────────────── */

function StatsBar() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.46)] h-[117px] left-[47px] overflow-hidden rounded-[18px] bottom-[5%] w-[607.5px] z-20">
      {/* Dividers */}
      {[202.5, 405].map((left) => (
        <div
          key={left}
          className="-translate-y-1/2 absolute flex h-[85.5px] items-center justify-center top-[calc(50%+0.75px)] w-0"
          style={{ left }}
        >
          <div className="flex-none rotate-90 w-[85.5px] h-0 relative">
            <div className="absolute inset-[-1.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.5 1.5">
                <line stroke="#C89B3C" strokeWidth="1.5" x2="85.5" y1="0.75" y2="0.75" />
              </svg>
            </div>
          </div>
        </div>
      ))}

      {/* Values */}
      <p className="absolute font-['Inter',sans-serif] font-bold text-[#c89b3c] text-[24px] left-[36px] top-[36px] whitespace-nowrap">3+</p>
      <p className="absolute font-['Inter',sans-serif] font-bold text-[#c89b3c] text-[24px] left-[238.5px] top-[36px] whitespace-nowrap">2.3M</p>
      <p className="absolute font-['Inter',sans-serif] font-bold text-[#c89b3c] text-[24px] left-[441px] top-[36px] whitespace-nowrap">99.9%</p>

      {/* Labels */}
      <p className="absolute font-['Rajdhani',sans-serif] font-bold text-[18px] text-white left-[calc(50%-267.75px)] top-[calc(50%+10.5px)] whitespace-nowrap">ACTIVE SITES</p>
      <p className="absolute font-['Rajdhani',sans-serif] font-bold text-[18px] text-white left-[calc(50%-65.25px)] top-[calc(50%+10.5px)] whitespace-nowrap">DAILY OUTPUT</p>
      <p className="absolute font-['Rajdhani',sans-serif] font-bold text-[18px] text-white left-[calc(50%+137.25px)] top-[calc(50%+10.5px)] whitespace-nowrap">SYSTEM UPTIME</p>
    </div>
  );
}

/* ── Interactive login form ──────────────────────────────────────────────── */

function LoginForm() {
  const {
    email,
    error,
    setEmail,
    handleSSOSignin,
    handleFormSubmit,
  } = useLoginViewModel();

  return (
    <div className="absolute flex flex-col gap-[40px] items-start left-[24px] right-[24px] lg:right-auto lg:left-[103px] top-[220px] lg:top-[35%] lg:w-[415.9px] z-30">
      {/* Email input */}
      <div className="bg-white h-[49.5px] relative rounded-[10.395px] shrink-0 w-full">
        <div className="relative rounded-[inherit] size-full overflow-hidden">
          {/* Icon background circle */}
          <div className="absolute left-[11.9px] size-[25px] top-[12.25px]">
            <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 25 25">
              <circle cx="12.5" cy="12.5" fill="#D9D9D9" fillOpacity="0.4" r="12.5" />
            </svg>
          </div>
          <EmailIcon />
          {/* Functional input overlaid on top */}
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="absolute inset-0 w-full h-full rounded-[10.395px] bg-transparent pl-[47px] pr-3 text-[14px] text-black font-['Inter',sans-serif] font-light focus:outline-none placeholder:text-black/50"
          />
        </div>
        <div aria-hidden className="absolute border-[1.039px] border-[rgba(200,155,60,0.99)] border-solid inset-0 pointer-events-none rounded-[10.395px]" />
      </div>

      {/* Validation / success message */}
      {error && (
        <p className="-mt-6 ml-1 text-[13px] font-['Inter',sans-serif] text-red-400">{error}</p>
      )}
      {/* Continue button */}
      <button
        type="button"
        disabled={!email}
        onClick={handleFormSubmit}
        className="bg-[#c89b3c] h-[49.5px] overflow-hidden relative rounded-[10.395px] shrink-0 w-full cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all"
      >
        <div className="absolute inset-0 flex items-center justify-center gap-[9.356px]">
          <span className="font-['Inter',sans-serif] font-bold text-[14.553px] text-black">Continue</span>
          <ArrowRight />
        </div>
      </button>

      {/* OR divider */}
      <div className="flex items-center w-full gap-4">
  <div className="flex-1 h-px bg-[#C89B3C]" />

  <p className="px-3 text-[14px] sm:text-[16px] text-white font-['Inter',sans-serif] whitespace-nowrap">
    OR
  </p>

  <div className="flex-1 h-px bg-[#C89B3C]" />
</div>

      {/* SSO button */}
      <button
        type="button"
        onClick={handleSSOSignin}
        className="bg-black h-[49.5px] relative rounded-[10.395px] shrink-0 w-full cursor-pointer hover:bg-[#111] active:scale-[0.98] transition-all"
      >
        <div className="overflow-hidden relative rounded-[inherit] size-full flex items-center justify-center">
          <span className="font-['Inter',sans-serif] font-bold text-[14.553px] text-white">Sign in with SSO</span>
        </div>
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[10.395px]" />
      </button>
    </div>
  );
}

/* ── Root ────────────────────────────────────────────────────────────────── */

export function Login() {
  return (
    <div className="bg-black relative w-screen min-h-screen lg:h-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden">
      {/* ── Background image (Spans completely across screen edge-to-edge) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          alt="Mining operations background"
          className="w-full h-full object-cover"
          src={miningimage2}
        />
      </div>

      {/* ── PK5 logo ── */}
      <div className="absolute left-8 md:left-16 top-[47px] w-[184px] h-[67px]">
        <div style={{ position: "absolute", left: 0, top: 0, width: 65.76, height: 67.547 }}>
          <svg width="68.083" height="68.699" viewBox="0 0 68.083 68.6989" fill="none">
            <path d={svgPaths.pdf49f00} stroke="url(#gradLogo)" strokeWidth="2.304" />
            <path d={svgPaths.p1fcf9a00} fill="#EAD09C" />
            <defs>
              <linearGradient id="gradLogo" gradientUnits="userSpaceOnUse" x1="1.30033" x2="68.6883" y1="23.4409" y2="37.03">
                <stop stopColor="#C89B3C" />
                <stop offset="1" stopColor="#EED7A7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div style={{ position: "absolute", left: "calc(50% + 1.89px)", top: "calc(50% + 1.2px)", width: 170.4, height: 58.08, transform: "translate(-50%,-50%)" }}>
          <p style={{ position: "absolute", left: 99.55, top: 20.73, fontFamily: "'Iceland', sans-serif", fontSize: 60, color: "#fff", transform: "translateX(-50%)", whiteSpace: "nowrap", lineHeight: "7.92px", letterSpacing: "-2.4px", margin: 0 }}>PK5</p>
          <p style={{ position: "absolute", left: 93.68, top: 46.4, fontFamily: "'Girassol', sans-serif", fontSize: 18, color: "#fff", transform: "translateX(-50%)", whiteSpace: "nowrap", letterSpacing: 5, lineHeight: "27.648px", margin: 0 }}>MINING</p>
          <div style={{ position: "absolute", left: 2.11, top: 17.13, width: 51.6, height: 20.4, overflow: "hidden" }}>
            <img alt="" src={mininglogo} style={{ position: "absolute", left: 0, top: "-12.13%", width: "100%", height: "143.82%", maxWidth: "none" }} />
          </div>
          <div style={{ position: "absolute", left: -5.81, top: -3.26, width: 60, height: 61.083 }}>
            <svg width="60.241" height="61.203" viewBox="0 0 60.2414 61.2031" fill="none">
              <path d={svgPaths.p2c0e9960} stroke="#E7DFCD" strokeWidth="0.24" />
              <path d={svgPaths.p344e8700} fill="#E7DFCD" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Hero headline ── */}
      <p
        className="absolute font-['Rajdhani',sans-serif] font-bold text-[32px] sm:text-[42px] lg:text-[50px] text-white left-[20px] sm:left-[30px] lg:left-[47px] top-[130px] lg:top-[160px] z-20 max-w-[90%] lg:max-w-[600px]"
        style={{ lineHeight: "normal" }}
      >
        Powering the Future
        <br />
        of Mineral Development
      </p>

      {/* ── Gold rule under headline ── */}
      <div className="absolute flex h-[2.195px] items-center justify-center left-[47px] top-[310px] w-[179.987px] z-20">
        <div className="rotate-[-0.7deg]">
          <div className="h-0 relative w-[180px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 1">
                <line stroke="#C89B3C" x2="180" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-headline ── */}
      <p
        className="absolute font-['Segoe_UI',sans-serif] text-[15px] sm:text-[18px] lg:text-[22px] text-white w-[90%] lg:w-[530px] left-[20px] lg:left-[47px] top-[260px] sm:top-[290px] lg:top-[280px] z-20"
        style={{ lineHeight: "normal" }}
      >
        Enterprise grade administrative control for global mining operations
      </p>

      {/* ── Stats bar ── */}

      <div className="hidden lg:block">
        <StatsBar />
      </div>

      {/* ── Right login panel (Locked to right edge, takes up 100% height) ── */}
      <div className="absolute lg:inset-y-0 right-0 w-full lg:w-[622px] h-auto lg:h-full z-20 top-[380px] lg:top-0">
        <FormPanel />
        <Frame6 />

        <p
          className="-translate-x-1/2 absolute font-['Segoe_UI',sans-serif] font-semibold text-[26px] lg:text-[34px] text-white whitespace-nowrap left-1/2 top-[140px] lg:top-[24%] z-30"
          style={{ lineHeight: "normal" }}
        >
          Admin Login
        </p>

        <p
          className="absolute font-['Inter',sans-serif] font-normal text-[16px] text-white whitespace-nowrap left-[24px] lg:left-[103px] top-[190px] lg:top-[31%] z-30"
          style={{ lineHeight: "normal" }}
        >
          Email Address
        </p>

        <LoginForm />
      </div>
    </div>
  );
}