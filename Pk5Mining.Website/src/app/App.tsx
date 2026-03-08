import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { ScrollToTop } from "@/app/components/scrollToTop";
import { AppRoutes } from "./routes";

function AppLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="text-sm text-gray-300">Loading...</div>
    </div>
  );
}

export function App() {
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
