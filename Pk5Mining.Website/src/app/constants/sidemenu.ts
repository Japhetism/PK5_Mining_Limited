import { BarChart3, Briefcase, FileText, Mails, Users } from "lucide-react";
import { NavItem } from "../interfaces";

export const nav: NavItem[] = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: BarChart3,
    end: true,
    show: true,
  },
  { to: "/admin/jobs", label: "Job Openings", icon: Briefcase, show: true },
  {
    to: "/admin/applications",
    label: "Applications",
    icon: FileText,
    show: true,
  },
  {
    to: "/admin/contact-messages",
    label: "Contact Messages",
    icon: Mails,
    show: false,
  },
  { to: "/admin/users", label: "Users", icon: Users, show: false },
];
