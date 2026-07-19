import { Lock } from "@/assets/svgs/lock";
import { StatsBar } from "./components/StatsBar";
import { LoginForm } from "./components/LoginForm";
import { useTenant } from "@/tenants/useTenant";
import { LOGIN_CONTENT } from "@/app/constants/login";

export function Login() {
  const { isAgro } = useTenant();
  const data = isAgro ? LOGIN_CONTENT.agro : LOGIN_CONTENT.mining;
  return (
    <div className="bg-black relative w-screen min-h-screen lg:h-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          alt={data.bgAlt}
          className="w-full h-full object-cover"
          src={data.bgImage}
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] opacity-65 overflow-hidden w-full h-full lg:h-full lg:hidden">
        <img
          alt={data.bgAlt}
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={data.formBgImage}
          loading="lazy"
        />
      </div>

      <div className="absolute left-8 md:left-16 top-[47px] w-[184px] h-[67px] ">
        <div
          style={{
            position: "absolute",
            left: "calc(50% + 1.89px)",
            top: "calc(50% + 1.2px)",
            width: 170.4,
            height: 58.08,
            transform: "translate(-50%,-50%)",
          }}
        >
          <img alt={data.logoAlt} src={data.logo} loading="lazy" />
        </div>
      </div>

      <p
        className="absolute font-['Rajdhani',sans-serif] font-bold text-[32px] sm:text-[42px] lg:text-[50px] text-white left-[20px] sm:left-[30px] lg:left-[47px] top-[130px] lg:top-[160px] z-20 max-w-[90%] lg:max-w-[600px] hidden lg:block"
        style={{ lineHeight: "normal" }}
      >
        {data.headline}
      </p>

      <p
        className="absolute font-['Segoe_UI',sans-serif] text-[15px] sm:text-[18px] lg:text-[22px] text-white w-[90%] lg:w-[530px] left-[20px] lg:left-[47px] top-[260px] sm:top-[290px] lg:top-[280px] z-20 hidden lg:block"
        style={{ lineHeight: "normal" }}
      >
        {data.description}
      </p>

      <div className="hidden lg:block">
        <StatsBar stats={data.stats} />
      </div>

      <div className="absolute lg:inset-y-0 right-0 w-full lg:w-[622px] h-auto lg:h-full z-20 top-[180px] lg:top-0">
        <div className="absolute inset-0 lg:inset-y-0 lg:right-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] opacity-65 overflow-hidden w-full h-[500px] lg:h-full">
          <img
            alt={data.bgAlt}
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full hidden lg:block"
            src={data.formBgImage}
            loading="lazy"
          />
        </div>
        <div className="-translate-x-1/2 absolute left-1/2 size-[79.2px] top-[40px] lg:top-[14%] z-20">
          <Lock />
        </div>

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

        <LoginForm btnBgColor={data.btnBgColor} />
      </div>
    </div>
  );
}
