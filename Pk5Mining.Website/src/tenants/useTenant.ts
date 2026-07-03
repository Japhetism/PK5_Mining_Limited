
import { agroSubjects, miningSubjects } from "@/app/constants";
import agroLogo from "@/assets/images/pk5agroimage.png";
// import miningLogo from "@/assets/images/pk5miningimage.png";
import miningLogo from "@/assets/images/logo.png";
import { progress } from "motion/react";

const agroDomain = import.meta.env.VITE_AGRO_DOMAIN;
const agroAppId = import.meta.env.VITE_APP_AGRO_ID ?? "";
const miningAppId = import.meta.env.VITE_APP_ID ?? "";

const agroSubsidiaryId = import.meta.env.VITE_AGRO_SUBSIDIARY_ID ?? "";
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
      statsbg: isAgro ? "#072C1E80" : "#00000075",
      card: isAgro ? "#072C1E" : "#FFFFFF",
      accent: isAgro ? "#4ade80" : "#c89b3c",
      text: isAgro ? "#ffffff" : "#111827",
      subtext: isAgro ? "#C3C7C5" : "#6B7280",
      headerText: isAgro ? "#041A12" : "#0F0F0F",
      border: isAgro ? "#e5e7eb" : "#1f2937",
      label: isAgro ? "#c3c7c5" : "#9ca3af",
      progressBgColor: isAgro ? "#4D6F47" : "#0000004A",
      iconColor: isAgro ? "#C89B3C" : "#5A5324",
      primaryAccentColor: isAgro ? "#C89B3C" : "#C89B3C70",
      // new additions
      headerBorderColor: isAgro ? "#4ade80" : "#E5E7EB",
      outletBgColor: isAgro ? "#041A12" : "#F5F7FA",
      sidemenuTextColor: isAgro ? "#C3C7C5" : "#E5E7EB",
      sidemenuActiveBgColor: isAgro ? "#C89B3C" : "#C89B3C",
      cardBorderColor: isAgro ? "#4ade80" : "#E5E7EB",
      cardIconBgColor: isAgro ? "#4ade80" : "#C89B3C",
      cardIconColor: isAgro ? "#C89B3C" : "#FFFFFF",
      progressBarFilledColor: isAgro ? "#4ade80" : "#C89B3C",
      tableHeaderBgColor: isAgro ? "#4ade80" : "#E5E7EB",
      tableBorderColor: isAgro ? "#4ade80" : "#E5E7EB",
      paginatiionIconColor: isAgro ? "#4ade80" : "#1E3A8A",
      textInputBgColor: isAgro ? "#041A12" : "#E3CA95E5",
    },
    appId: isAgro ? agroAppId : miningAppId,
    subsidiaryId: isAgro ? agroSubsidiaryId : miningSubsidiaryId,
    contactMessageSubjects: isAgro ? agroSubjects : miningSubjects,
    emailDomain: isAgro ? agroEmailDomain : miningEmailDomain,
  };
};