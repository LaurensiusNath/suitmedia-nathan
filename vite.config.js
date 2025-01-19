import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://suitmedia-backend.suitdev.com/api"
  : "/api";

export default defineConfig({
  plugins: [react()],
  base: "/suitmedia-nathan",
  define: {
    "process.env.API_BASE_URL": JSON.stringify(API_BASE_URL),
  },
  server: {
    proxy: {
      "/api": {
        target: "https://suitmedia-backend.suitdev.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
