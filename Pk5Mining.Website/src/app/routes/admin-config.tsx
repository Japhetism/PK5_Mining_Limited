import { lazy } from "react";
import type { LazyExoticComponent, ComponentType } from "react";
import {
  BarChart3,
  Briefcase,
  Building,
  FileText,
  Mail,
  ShieldCheck,
  Users as UsersIcon,
  type LucideIcon,
} from "lucide-react";
import type { NavItem } from "../interfaces";
import { Permission, PERMISSIONS } from "../constants/permissions";
import { UserRole, USERROLES } from "../constants/role";

export type AdminRouteItem = {
  path: string;
  label: string;
  icon?: LucideIcon;
  show: boolean;
  canAccess: boolean;
  end?: boolean;
  element: LazyExoticComponent<ComponentType<any>>;
  role?: UserRole;
  permissions?: Permission[];
  requireAllPermissions?: boolean;
};

const Dashboard = lazy(() =>
  import("@/app/pages/admin/dashboard").then((m) => ({ default: m.Dashboard })),
);

const JobList = lazy(() =>
  import("@/app/pages/admin/jobs/list").then((m) => ({ default: m.JobList })),
);

const JobEdit = lazy(() =>
  import("@/app/pages/admin/jobs/edit").then((m) => ({ default: m.JobEdit })),
);

const JobDetail = lazy(() =>
  import("@/app/pages/admin/jobs/details").then((m) => ({
    default: m.JobDetail,
  })),
);

const ApplicationList = lazy(() =>
  import("@/app/pages/admin/applications/list").then((m) => ({
    default: m.ApplicationList,
  })),
);

const ApplicationDetail = lazy(() =>
  import("@/app/pages/admin/applications/details").then((m) => ({
    default: m.ApplicationDetail,
  })),
);

const ContactMessageList = lazy(() =>
  import("@/app/pages/admin/contact/list").then((m) => ({
    default: m.ContactMessageList,
  })),
);

const ContactMessageDetails = lazy(() =>
  import("@/app/pages/admin/contact/details").then((m) => ({
    default: m.ContactMessageDetails,
  })),
);

const Users = lazy(() =>
  import("@/app/pages/admin/users").then((m) => ({ default: m.UserList })),
);

const Subsidiaries = lazy(() =>
  import("@/app/pages/admin/subsidiaries").then((m) => ({
    default: m.SubsidiaryList,
  })),
);

const Roles = lazy(() =>
  import("@/app/pages/admin/roles").then((m) => ({
    default: m.Roles,
  })),
);

export const adminRouteItems: AdminRouteItem[] = [
  {
    path: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    show: true,
    canAccess: true,
    end: true,
    permissions: [PERMISSIONS.dashboardView],
    element: Dashboard,
  },

  {
    path: "jobs",
    label: "Job Openings",
    icon: Briefcase,
    show: true,
    canAccess: true,
    permissions: [PERMISSIONS.jobView],
    element: JobList,
  },
  {
    path: "jobs/new",
    label: "New Job",
    show: false,
    canAccess: true,
    permissions: [PERMISSIONS.jobCreate],
    element: JobEdit,
  },
  {
    path: "jobs/:jobId",
    label: "Job Detail",
    show: false,
    canAccess: true,
    permissions: [PERMISSIONS.jobView],
    element: JobDetail,
  },
  {
    path: "jobs/:jobId/edit",
    label: "Edit Job",
    show: false,
    canAccess: true,
    permissions: [PERMISSIONS.jobUpdate],
    element: JobEdit,
  },

  {
    path: "applications",
    label: "Applications",
    icon: FileText,
    show: true,
    canAccess: true,
    permissions: [PERMISSIONS.applicationView],
    element: ApplicationList,
  },
  {
    path: "applications/:applicationId",
    label: "Application Detail",
    show: false,
    canAccess: true,
    permissions: [PERMISSIONS.applicationView, PERMISSIONS.applicationUpdate],
    element: ApplicationDetail,
  },

  {
    path: "contact-messages",
    label: "Contact Messages",
    icon: Mail,
    show: false,
    canAccess: false,
    permissions: [
      PERMISSIONS.contactMessageView,
      PERMISSIONS.contactMessageUpdate,
    ],
    element: ContactMessageList,
  },
  {
    path: "contact-messages/:id",
    label: "Contact Message Detail",
    show: false,
    canAccess: false,
    permissions: [
      PERMISSIONS.contactMessageView,
      PERMISSIONS.contactMessageUpdate,
    ],
    element: ContactMessageDetails,
  },

  {
    path: "users",
    label: "Users",
    icon: UsersIcon,
    show: true,
    canAccess: true,
    role: USERROLES.superAdmin,
    permissions: [PERMISSIONS.userView],
    element: Users,
  },
  
  {
    path: "subsidiaries",
    label: "Subsidiaries",
    icon: Building,
    show: true,
    canAccess: true,
    permissions: [PERMISSIONS.subsidiarView],
    element: Subsidiaries,
  },

  {
    path: "roles",
    label: "Roles",
    icon: ShieldCheck,
    show: false,
    canAccess: false,
    permissions: [PERMISSIONS.roleView],
    element: Roles,
  },
];

export const nav: NavItem[] = adminRouteItems
  .filter((item) => item.show)
  .map((item) => ({
    to: `/admin/${item.path}`,
    label: item.label,
    icon: item.icon!,
    show: item.show,
    end: item.end,
  }));
