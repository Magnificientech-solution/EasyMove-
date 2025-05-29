import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import ViteRewriteAll from 'vite-plugin-rewrite-all';

// Define plugins array without top-level await
const plugins = [
  react(),
  runtimeErrorOverlay(),
];

// Add cartographer plugin conditionally
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  import("@replit/vite-plugin-cartographer").then((m) => {
    plugins.push(m.cartographer());
  });
}

export default defineConfig({
  plugins: [react(), ViteRewriteAll()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@assets": path.resolve(__dirname, "./attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      external: ['zod']
    }

  }
});

