
import agroLogo from "@/assets/images/pk5agroimage.png";
import miningLogo from "@/assets/images/pk5miningimage.png";

const agroDomain = import.meta.env.VITE_AGRO_DOMAIN;
const agroAppId = import.meta.env.VITE_APP_AGRO_ID ?? "";
const miningAppId = import.meta.env.VITE_APP_ID ?? "";

const agroSubsidiaryId = import.meta.env.VITE_AGRO_SUBSIDIARY_ID ?? "";
const miningSubsidiaryId = import.meta.env.VITE_MINING_SUBSIDIARY_ID ?? "";

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
      card: isAgro ? "#072C1E" : "#1a1a1a",
      accent: isAgro ? "#4ade80" : "#c89b3c",
      text: isAgro ? "#ffffff" : "#ffffff",
      headerText: isAgro ? "#ffffff" : "#0F0F0F",
      border: isAgro ? "#e5e7eb" : "#1f2937",
      label: isAgro ? "#041A12" : "#9ca3af",
      progressBgColor: isAgro ? "#4D6F47" : "#0F0F0F",
      iconColor: isAgro ? "#C89B3C" : "#5A5324",
      primaryAccentColor: isAgro ? "#C89B3C" : "#C89B3C70",
    },
    appId: isAgro ? agroAppId : miningAppId,
    subsidiaryId: isAgro ? agroSubsidiaryId : miningSubsidiaryId,
  };
};