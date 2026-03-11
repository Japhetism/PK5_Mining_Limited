import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { ChangePassword } from "../pages/admin/password/change";

const Login = lazy(() =>
  import("@/app/pages/admin/login").then((m) => ({ default: m.Login })),
);
const ProtectedRoute = lazy(() =>
  import("@/app/auth/ProtectedRoute").then((m) => ({
    default: m.ProtectedRoute,
  })),
);
const AdminLayout = lazy(() =>
  import("@/app/pages/admin/layout").then((m) => ({ default: m.AdminLayout })),
);
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
  import("../pages/admin/contact/list").then((m) => ({
    default: m.ContactMessageList,
  })),
);
const ContactMessageDetails = lazy(() =>
  import("../pages/admin/contact/details").then((m) => ({
    default: m.ContactMessageDetails,
  })),
);
const UserList = lazy(() =>
  import("../pages/admin/users/list").then((m) => ({ default: m.UserList })),
);
const UserDetails = lazy(() =>
  import("../pages/admin/users/details").then((m) => ({
    default: m.UserDetails,
  })),
);
const SubsidiaryList = lazy(() =>
  import("../pages/admin/subsidiaries/list").then((m) => ({
    default: m.SubsidiaryList,
  })),
);

export const adminRoutes: RouteObject[] = [
  { path: "/admin/login", element: <Login /> },
  { path: "/admin/password/change", element: <ChangePassword /> },  
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
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
          { path: "users/:id", element: <UserDetails /> },
          { path: "subsidiaries", element: <SubsidiaryList /> },
        ],
      },
    ],
  },
];
