import type { RouteObject } from "react-router-dom";
import { ClientLayout } from "@/app/pages/client/layout";
import { Home } from "@/app/pages/client/home";
import { About } from "@/app/pages/client/about";
import { Careers } from "@/app/pages/client/careers";
import { Contact } from "@/app/pages/client/contact";
import { JobDetails } from "@/app/pages/client/careers/job-details";
import { Sustainability } from "@/app/pages/client/sustainability";

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
