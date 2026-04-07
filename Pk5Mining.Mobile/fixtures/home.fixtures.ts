import { OverviewData, QuickActionData, RecentAlert } from "../types/home.types";

export const overviewData: OverviewData[] = [
  {
    id: "1OD",
    title: "Today's Tasks",
    count: 5,
    icon: "clipboard",
    color: "#dbeafe",
    bgcolor: "#2563eb",
    pending: 3,
  },
  {
    id: "2OD",
    title: "Leave Requests",
    count: 2,
    icon: "calendar",
    color: "#f3e8ff",
    bgcolor: "#9333ea",
    pending: 1,
  },
  {
    id: "3OD",
    title: "Reports",
    count: 4,
    icon: "alert-circle",
    color: "#ffedd5",
    bgcolor: "#F57C00",
    pending: 2,
  },
  {
    id: "4OD",
    title: "Safety Alerts",
    count: 1,
    icon: "alert-triangle",
    color: "#fee2e2",
    bgcolor: "#dc2626",
    pending: 1,
  },
  {
    id: "5OD",
    title: "Active Workers",
    count: 45,
    icon: "users",
    color: "#dbeafe",
    bgcolor: "#2563eb",
    isManager: true,
  },
  {
    id: "6OD",
    title: "Completion Rate",
    count: 85,
    icon: "trending-up",
    color: "#dcfce7",
    bgcolor: "#16a34a",
    isManager: true,
  }
];

export const quickActions: QuickActionData[] = [
  {
    id: "1QA",
    title: "My Tasks",
    icon: "clipboard",
    color: "#F57C00",
    bgcolor: "#fff7ed",
    route: "/tasks",
  },
  {
    id: "2QA",
    title: "Apply Leave",
    icon: "calendar",
    color: "#9333ea",
    bgcolor: "#f3e8ff",
    route: "/leave/apply",
  },
  {
    id: "3QA",
    title: "Report Issue",
    icon: "alert-circle",
    color: "#dc2626",
    bgcolor: "#fee2e2",
    route: "/report",
  }
]

export const recentAlerts: RecentAlert[] = [
  {
    id: "1RA",
    title: "New Task Assigned",
    sub: "You have been assigned: Inspect Tunnel B Support Beams",
    icon: "clipboard",
    color: "#2563eb",
    bgcolor: "#dbeafe",
  },
  {
    id: "2RA",
    title: "Safety Alert",
    sub: "Scheduled safety drill at 14:00 today in all sections.",
    icon: "alert-triangle",
    color: "#dc2626",
    bgcolor: "#fee2e2",
  }
]