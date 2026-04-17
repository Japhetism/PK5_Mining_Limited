const agroDomain = import.meta.env.VITE_AGRO_DOMAIN;

export const useTenant = () => {
  const hostname = window.location.hostname;
  const isAgro = hostname.includes(agroDomain);

  return {
    isAgro,
    name: isAgro ? "PK5 Agro-Allied" : "PK5 Mining Ltd",
    favicon: isAgro ? "/agro-favicon.ico" : "/mining-favicon.ico",
    colors: {
      bg: isAgro ? "#041A12" : "#0F0F0F",
      card: isAgro ? "#072C1E" : "#1a1a1a",
      accent: isAgro ? "#4ade80" : "#c89b3c",
      text: isAgro ? "#ffffff" : "#ffffff",
      border: isAgro ? "#e5e7eb" : "#1f2937",
      label: isAgro ? "#041A12" : "#9ca3af",
    }
  };
};