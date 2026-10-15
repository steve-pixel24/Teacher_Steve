import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3005,
    strictPort: true,
    hmr: {
      port: 3005,
    },
    // Forward API calls to the local backend (uv run fastapi dev --port 8005).
    // 127.0.0.1, not localhost: localhost can resolve to IPv6 and reach another server.
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8005",
      },
    },
  },
});
