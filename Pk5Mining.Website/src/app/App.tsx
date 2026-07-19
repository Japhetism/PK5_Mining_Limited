import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense, useEffect } from "react";
import { ScrollToTop } from "@/app/components/scrollToTop";
import { AppRoutes } from "./routes";
import { useTenant } from "@/tenants/useTenant";

function AppLoader() {
  const {
    logo,
    name,
    colors: { bg },
  } = useTenant();
  return (
    <div
      style={{ backgroundColor: bg }}
      className="min-h-screen flex items-center justify-center text-white"
    >
      <div className="text-sm text-gray-300">
        <img
          src={logo}
          alt={name + " Logo"}
          loading="lazy"
          className="w-30 h-auto object-contain brightness-0 invert-[.5] mb-4 animate-pulse"
        />
      </div>
    </div>
  );
}

export function App() {
  const { name, favicon } = useTenant();

  useEffect(() => {
    document.title = name;

    const link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = favicon;
    }
  }, [name, favicon]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<AppLoader />}>
        <AppRoutes />
      </Suspense>
      <Toaster position="top-right" richColors closeButton expand />
    </BrowserRouter>
  );
}
