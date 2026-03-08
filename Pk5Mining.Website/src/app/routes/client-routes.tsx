import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const ClientLayout = lazy(() =>
  import("@/app/pages/client/layout").then((m) => ({
    default: m.ClientLayout,
  })),
);
const Home = lazy(() =>
  import("@/app/pages/client/home").then((m) => ({ default: m.Home })),
);
const About = lazy(() =>
  import("@/app/pages/client/about").then((m) => ({ default: m.About })),
);
const Careers = lazy(() =>
  import("@/app/pages/client/careers").then((m) => ({ default: m.Careers })),
);
const Contact = lazy(() =>
  import("@/app/pages/client/contact").then((m) => ({ default: m.Contact })),
);
const JobDetails = lazy(() =>
  import("@/app/pages/client/careers/job-details").then((m) => ({
    default: m.JobDetails,
  })),
);
const Sustainability = lazy(() =>
  import("@/app/pages/client/sustainability").then((m) => ({
    default: m.Sustainability,
  })),
);

export const clientRoutes: RouteObject[] = [
  {
    element: <ClientLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "sustainability", element: <Sustainability /> },
      { path: "careers", element: <Careers /> },
      { path: "contact", element: <Contact /> },
      { path: "careers/job/:jobId", element: <JobDetails /> },
    ],
  },
];
