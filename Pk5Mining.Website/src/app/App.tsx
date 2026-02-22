import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/app/components/scrollToTop";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
      />
    </BrowserRouter>
  );
}
