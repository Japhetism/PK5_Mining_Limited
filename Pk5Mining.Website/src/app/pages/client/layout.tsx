import { Outlet } from "react-router-dom";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ScrollToTop } from "@/app/components/scrollToTop";

export function ClientLayout() {
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
