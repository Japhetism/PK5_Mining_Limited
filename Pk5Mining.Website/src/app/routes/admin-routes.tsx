import type { RouteObject } from "react-router-dom";
import { Login } from "@/app/pages/admin/login";
import { ProtectedRoute } from "@/app/auth/ProtectedRoute";
import { AdminLayout } from "@/app/pages/admin/layout";
import { Dashboard } from "@/app/pages/admin/dashboard";
import { JobList } from "@/app/pages/admin/jobs/list";
import { JobEdit } from "@/app/pages/admin/jobs/edit";
import { JobDetail } from "@/app/pages/admin/jobs/details";
import { ApplicationList } from "@/app/pages/admin/applications/list";
import { ApplicationDetail } from "@/app/pages/admin/applications/details";
import { ContactMessageList } from "../pages/admin/contact/list";
import { ContactMessageDetails } from "../pages/admin/contact/details";
import { UserList } from "../pages/admin/users/list";
import { UserDetails } from "../pages/admin/users/details";

export const adminRoutes: RouteObject[] = [
  { path: "/admin/login", element: <Login /> },

  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "jobs", element: <JobList /> },
          { path: "jobs/new", element: <JobEdit /> },
          { path: "jobs/:jobId", element: <JobDetail /> },
          { path: "jobs/:jobId/edit", element: <JobEdit /> },
          { path: "applications", element: <ApplicationList /> },
          {
            path: "applications/:applicationId",
            element: <ApplicationDetail />,
          },
          { path: "contact-messages", element: <ContactMessageList /> },
          { path: "contact-messages/:id", element: <ContactMessageDetails /> },
          { path: "users", element: <UserList /> },
          { path: "users/:id", element: <UserDetails /> }
        ],
      },
    ],
  },
];
