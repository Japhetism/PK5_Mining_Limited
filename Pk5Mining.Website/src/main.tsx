import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./app/context/AuthContext";
import { App } from "./app/App";
import { startInactivityLogout } from "./app/auth/Inactivity";
import { authService } from "./app/services/sso/authService";

startInactivityLogout({ timeoutMs: 15 * 60 * 1000 });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

async function init() {
  try {
    await authService.initialize();
  } catch (error) {
    console.error("Failed to initialize MSAL:", error);
  }

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

init();