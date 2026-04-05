import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/Unit-Converter/",
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cooking: resolve(__dirname, "src/html/cooking.html"),
        time: resolve(__dirname, "src/html/time.html"),
        construction: resolve(__dirname, "src/html/construction.html"),
        tech: resolve(__dirname, "src/html/tech.html"),
        travel: resolve(__dirname, "src/html/travel.html"),
        health: resolve(__dirname, "src/html/health.html"),
        currency: resolve(__dirname, "src/html/currency.html"),
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
});
