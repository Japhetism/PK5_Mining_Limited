
import miningLogo from "@/assets/images/logo.png";
import agroLogo from "@/assets/images/agrologo2.png";

const agroDomain = import.meta.env.VITE_AGRO_DOMAIN;
const miningAppId = import.meta.env.VITE_APP_ID ?? "";

const miningSubsidiaryId = import.meta.env.VITE_MINING_SUBSIDIARY_ID ?? "";

const miningEmailDomain = import.meta.env.VITE_PK5_MINING_EMAIL_DOMAIN;
const agroEmailDomain = import.meta.env.VITE_PK5_AGRO_EMAIL_DOMAIN;

export const useTenant = () => {
  const hostname = window.location.hostname;
  const isAgro = hostname.includes(agroDomain);

  return {
    isAgro,
    name: isAgro ? "PK5 Agro-Allied" : "PK5 Mining Ltd",
    favicon: isAgro ? "/favicon.ico" : "/favicon.png",
    logo: isAgro ? agroLogo : miningLogo,
    colors: {
      bg: isAgro ? "#041A12" : "#0F0F0F",
      card: "#FFFFFF",
      accent: "#c89b3c",
      text: "#111827",
      subtext: "#6B7280",
      headerText: "#0F0F0F",
      border: "#1f2937",
      label: "#9ca3af",
      progressBgColor: "#0000004A",
      iconColor: "#5A5324",
      primaryAccentColor: "#C89B3C70",
      // new additions
      headerBorderColor: "#E5E7EB",
      outletBgColor: "#F5F7FA",
      sidemenuTextColor: "#E5E7EB",
      sidemenuActiveBgColor: "#C89B3C",
      cardBorderColor: "#E5E7EB",
      cardIconBgColor: "#C89B3C",
      cardIconColor: "#FFFFFF",
      progressBarFilledColor: "#C89B3C",
      tableHeaderBgColor: "#E5E7EB",
      tableBorderColor: "#E5E7EB",
      paginatiionIconColor: "#1E3A8A",
      textInputBgColor: "#E3CA95E5",
      tableLoaderColor: "#E5E7EB",
      innerCard: "#E5E7EB",
    },
    appId: miningAppId,
    subsidiaryId: miningSubsidiaryId,
    emailDomain: isAgro ? agroEmailDomain : miningEmailDomain,
  };
};