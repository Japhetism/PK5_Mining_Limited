import { Outlet } from "react-router-dom";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ScrollToTop } from "@/app/components/scrollToTop";
import { useLocation } from "@/app/hooks/useLocation";

const GLOBAL_URL = "https://pk5miningltd-test-v2.vercel.app";
const US_HOST = "us-pk5miningltd-test-v2.vercel.app";

export function ClientLayout() {
  const { data, isLoading } = useLocation();

  if (isLoading) {
    return null;
  }

  const host = window.location.hostname;

  if (
    host === US_HOST &&
    data?.country_code !== "US"
  ) {
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