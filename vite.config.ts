import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { cssCodeSplit: false, assetsInlineLimit: 0, rollupOptions: { output: { inlineDynamicImports: true } } },
});
