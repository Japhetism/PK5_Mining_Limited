import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense, useEffect } from "react";
import { ScrollToTop } from "@/app/components/scrollToTop";
import { AppRoutes } from "./routes";
import Logo from '../assets/images/logo.png';
import { useTenant } from "@/tenants/useTenant";

function AppLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="text-sm text-gray-300">
        <img
          src={Logo}
          alt="PK5 Mining Logo"
          loading="lazy"
          className="w-30 h-auto object-contain"
        />
      </div>
    </div>
  );
}

export function App() {
  const { name, favicon } = useTenant();

  useEffect(() => {
    document.title = name;
    
    const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
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
