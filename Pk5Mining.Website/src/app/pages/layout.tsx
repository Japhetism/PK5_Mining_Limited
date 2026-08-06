import { Outlet } from "react-router-dom";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ScrollToTop } from "@/app/components/scrollToTop";
import { useUserLocation } from "@/app/hooks/useUserLocation";
import Logo from "@/assets/images/logo.png";

const GLOBAL_URL = import.meta.env.VITE_GLOBAL_URL ?? "";
const US_HOST = import.meta.env.VITE_US_HOST;

export function Layout() {
  const { data, isLoading } = useUserLocation();

  if (isLoading) {
    return (
      <div>
        <img
          src={Logo}
          alt="PK5 Mining Logo"
          loading="lazy"
          className="w-30 h-auto object-contain"
        />
      </div>
    );
  }

  const host = window.location.hostname;

  if (host === US_HOST && data?.country_code !== "US") {
    window.location.replace(GLOBAL_URL);
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
