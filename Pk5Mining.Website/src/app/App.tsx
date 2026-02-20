import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "@/app/components/scrollToTop";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}