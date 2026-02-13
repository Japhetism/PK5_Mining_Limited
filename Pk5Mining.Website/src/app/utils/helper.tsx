import { CountryCode } from "node_modules/libphonenumber-js/types";

export function capitalizeFirstLetter(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const normalizeLinkedInUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};

export const countryToIso: Record<string, CountryCode> = {
  Nigeria: "NG",
  "United States": "US",
  "United Kingdom": "GB",
  Canada: "CA",
  "South Africa": "ZA",
  Tanzania: "TZ",
  Ghana: "GH",
  Kenya: "KE",
  "United Arab Emirates": "AE",
};

export const getGreeting = (date: Date = new Date()): string => {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
};
