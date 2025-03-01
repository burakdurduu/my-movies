import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],
    envDir: "../",
    server: {
      proxy: {
        "/api": {
          target: isProduction
            ? "https://my-movies-76a1.onrender.com/"
            : "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
});
