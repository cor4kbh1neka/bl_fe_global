import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": {
        target: "https://back-staging.bosraka.com",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/authentications": {
        target: "https://back-staging.bosraka.com",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/api": {
        target: "https://back-staging.bosraka.com",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/prx": {
        target: "https://back-staging.bosraka.com",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/memo": {
        target: "https://back-staging.bosraka.com",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/banks": {
        target: "https://back-staging.bosraka.com",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/content": {
        target: "https://back-staging.bosraka.com",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
    },
  },
});
