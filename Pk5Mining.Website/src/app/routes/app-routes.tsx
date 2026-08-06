import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Layout = lazy(() =>
  import("@/app/pages/layout").then((m) => ({
    default: m.Layout,
  })),
);
const Home = lazy(() =>
  import("@/app/pages/home").then((m) => ({ default: m.Home })),
);
const About = lazy(() =>
  import("@/app/pages/about").then((m) => ({ default: m.About })),
);
const OperationsPage = lazy(() =>
  import("@/app/pages/operations").then((m) => ({ default: m.OperationsPage })),
);
const ImpactPage = lazy(() =>
  import("@/app/pages/impact").then((m) => ({ default: m.ImpactPage })),
);
const Careers = lazy(() =>
  import("@/app/pages/careers").then((m) => ({ default: m.Careers })),
);
const Contact = lazy(() =>
  import("@/app/pages/contact").then((m) => ({ default: m.Contact })),
);
const JobDetails = lazy(() =>
  import("@/app/pages/careers/job-details").then((m) => ({
    default: m.JobDetails,
  })),
);
const Sustainability = lazy(() =>
  import("@/app/pages/sustainability").then((m) => ({
    default: m.Sustainability,
  })),
);
const Investors = lazy(() =>
  import("@/app/pages/investors").then((m) => ({
    default: m.Investors,
  })),
);

export const appRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "operations", element: <OperationsPage /> },
      { path: "impact", element: <ImpactPage /> },
      { path: "sustainability", element: <Sustainability /> },
      { path: "careers", element: <Careers /> },
      { path: "careers/job/:jobId", element: <JobDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "investors", element: <Investors /> },
    ],
  },
];
