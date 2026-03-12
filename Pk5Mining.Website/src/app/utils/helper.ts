import { CountryCode } from "node_modules/libphonenumber-js/types";
import { ByStage, NavItem, RawByStage, StageValue } from "../interfaces";
import { statuses } from "../constants";
import { Permission } from "../constants/permissions";
import { adminRouteItems } from "../routes/admin-config";
import { UserRole } from "../constants/role";

const enforcePermission = import.meta.env.VITE_ENFORCE_PERMISSION == "true";
const enforceRole = import.meta.env.VITE_ENFORCE_ROLE == "true";

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

export function mapRawByStage(rawByStage?: RawByStage): ByStage {
  const normalized = Object.fromEntries(
    Object.entries(rawByStage ?? {}).map(([k, v]) => [k.toLowerCase(), v]),
  );

  return statuses.reduce((acc, s) => {
    acc[s.value] = normalized[s.backendKey.toLowerCase()] ?? 0;
    return acc;
  }, {} as ByStage);
}

const stageSet = new Set<StageValue>(statuses.map((s) => s.value));

export function isStageValue(value: string): value is StageValue {
  return stageSet.has(value as StageValue);
}

export function normalizeStage(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, "_");
}

export function getStageMeta(value?: string | undefined) {
  if (!value) return undefined;

  const normalized = value.toLowerCase();

  return statuses.find((s) => s.value.toLowerCase() === normalized);
}

export const ddmmyyyyToApiDate = (value?: string | null) => {
  if (!value) return value;

  const [day, month, year] = value.split("/");

  if (!day || !month || !year) return value;

  return `${year}-${month}-${day}`;
};

export const hasRole = (userRole?: UserRole, requiredRole?: UserRole): boolean => {
  if (!enforceRole || !requiredRole) return true;
  return userRole === requiredRole;
}

export const hasPermissions = (
  userPermissions: Permission[] = [],
  requiredPermissions: Permission[] = [],
  requireAll = false,
) => {
  if (!enforcePermission || !requiredPermissions.length) return true;

  if (requireAll) {
    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
};

export const getVisibleNav = (userPermissions: Permission[]): NavItem[] => {
  return adminRouteItems
    .filter(
      (item) =>
        item.show &&
        hasPermissions(
          userPermissions,
          item.permissions ?? [],
          item.requireAllPermissions,
        ),
    )
    .map((item) => ({
      to: `/admin/${item.path}`,
      label: item.label,
      icon: item.icon!,
      show: item.show,
      end: item.end,
    }));
};