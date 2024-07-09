import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": {
        target: "https://bh1-n3-ka.situscepat.net",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/authentications": {
        target: "https://bh1-n3-ka.situscepat.net",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/api": {
        target: "https://bh1-n3-ka.situscepat.net",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/prx": {
        target: "https://bh1-n3-ka.situscepat.net",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/memo": {
        target: "https://bh1-n3-ka.situscepat.net",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/banks": {
        target: "https://bh1-n3-ka.situscepat.net",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      "/content": {
        target: "https://bh1-n3-ka.situscepat.net",
        changeOrigin: true,
        secure: false,
        credentials: "omit",
      },
      '/globalbola': {
        target: 'https://sinarperak.b-cdn.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/globalbola/, ''),
      },
    },
  },
});
