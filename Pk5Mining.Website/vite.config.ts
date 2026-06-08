import { defineConfig, loadEnv } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const baseURL =
    mode === "production"
      ? env.VITE_API_PROD_BASE_URL
      : env.VITE_API_DEV_BASE_URL;

  return {
    server: {
      host: true, 
      port: 5173,
      allowedHosts: [
        "pk5miningltd.local",
        "pk5agroallied.local"
      ],
      proxy: {
        "/api": {
          target: baseURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (
                id.includes("react") ||
                id.includes("react-dom") ||
                id.includes("react-router-dom")
              ) {
                return "react-vendor";
              }

              if (id.includes("@tanstack/react-query")) {
                return "query-vendor";
              }

              if (id.includes("lucide-react")) {
                return "icons-vendor";
              }

              if (id.includes("motion")) {
                return "motion-vendor";
              }

              if (id.includes("sonner")) {
                return "ui-vendor";
              }
            }
          },
        },
      },
    },
  };
});