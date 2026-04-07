import { Feather } from "@expo/vector-icons";

export type OverviewData = {
  id: string;
  title: string;
  count: number;
  icon: keyof typeof Feather.glyphMap;
  color: string;
  bgcolor: string;
  pending?: number;
  isManager?: boolean;
};

export type QuickActionData = {
  id: string;
  title: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
  bgcolor: string;
  route: string;
};

export type RecentAlert = {
  id: string;
  title: string;
  sub: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
  bgcolor: string;
};
