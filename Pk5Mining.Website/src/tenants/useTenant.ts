const agroDomain = import.meta.env.VITE_AGRO_DOMAIN;

export const useTenant = () => {
  const hostname = window.location.hostname;
  const isAgro = hostname.includes(agroDomain);

  return {
    isAgro,
    name: isAgro ? "PK5 Agro-Allied" : "PK5 Mining Ltd",
    favicon: isAgro ? "/agro-favicon.ico" : "/mining-favicon.ico",
    colors: {
      bg: isAgro ? "#ffffff" : "#0f0f0f",
      card: isAgro ? "#0b260c" : "#1a1a1a",
      accent: isAgro ? "#4ade80" : "#c89b3c",
    }
  };
};