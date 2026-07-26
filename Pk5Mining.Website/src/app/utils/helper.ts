import { CountryCode } from "node_modules/libphonenumber-js/types";
import { ZodError } from "zod";

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

  if (hour >= 0 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 24) return "Good evening";
  return "Good day";
};

export const downloadFile = async (url: string, fileName: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    throw new Error("Failed to download file");
  }
};

export function cleanParams<T extends Record<string, any>>(obj: T) {
  // removes "", undefined, null
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== "" && v !== undefined && v !== null,
    ),
  ) as Partial<T>;
}

export function toNumber(v: string | null, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatDateTime = (s?: string | null, showTime: boolean = true) => {
  if (!s) return "-";

  const date = new Date(s);

  // Check if invalid date
  if (isNaN(date.getTime())) {
    return s;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(showTime && {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  };

  return date
    .toLocaleString("en-GB", options)
    .replace(",", "")
    .replace(/\b(am|pm)\b/, (m) => m.toUpperCase());
};

export const ddmmyyyyToApiDate = (value?: string | null) => {
  if (!value) return value;

  const [day, month, year] = value.split("/");

  if (!day || !month || !year) return value;

  return `${year}-${month}-${day}`;
};

export const toTitleCase = (str: string) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const generatePassword = (length = 8): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&";
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((n) => chars[n % chars.length])
    .join("");
};

export const mapZodErrors = <T extends Record<string, any>>(
  error: ZodError<any>,
): Partial<Record<keyof T, string>> => {
  const fieldErrors: Partial<Record<keyof T, string>> = {};

  error.issues.forEach((issue) => {
    if (issue.path && issue.path.length > 0) {
      const key = issue.path[0] as keyof T;
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
  });

  return fieldErrors;
};

export function toBackendDateTimeWithBoundary(
  dateStr: string,
  type: "start" | "end" = "start",
): string {
  const [day, month, year] = dateStr.split("/").map(Number);

  if (![day, month, year].every(Number.isFinite)) {
    throw new Error("Invalid date format. Expected DD/MM/YYYY");
  }

  const hours = type === "start" ? 0 : 23;
  const minutes = type === "start" ? 0 : 59;
  const seconds = type === "start" ? 0 : 59;

  return new Date(year, month - 1, day, hours, minutes, seconds).toISOString();
}

export const limitWords = (text: string, maxWords: number) => {
  const words = text.trim().split(/\s+/);

  if (words.length <= maxWords) return text;

  return words.slice(0, maxWords).join(" ");
};

export const generateAppId = (name: string): string => {
  if (!name) return "";

  return (
    "com." +
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .split(" ")
      .join(".")
  );
};

export const isEmailAuthorized = (username: string, emailDomain: string): boolean => {
  const parts = username.trim().toLowerCase().split("@");

  if (parts.length !== 2) {
    return false; // invalid email
  }

  const domain = parts[1];

  return domain === emailDomain.trim().toLowerCase();
}

export const shouldChangePassword = (email: string, hostname: string): boolean => {
  if (!email) return false;

  if (!hostname) return false;

  const emailDomain = email.split("@")[1]?.toLowerCase();

   const hostBrand = hostname.split(".")[0].toLowerCase();
  
  return emailDomain.includes(hostBrand) || hostBrand.includes(emailDomain.split('.')[0]);
}

export const formatFileSize = (bytes?: number): string => {
  if (bytes === undefined || bytes === null || bytes < 0) return "Unknown size";

  const units = ["B", "KB", "MB", "GB", "TB"] as const;

  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
};

export const getRemoteFileSize = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const contentLength = res.headers.get("content-length");

    return formatFileSize(contentLength ? Number(contentLength) : undefined);
  } catch {
    return "Unknown size";
  }
};