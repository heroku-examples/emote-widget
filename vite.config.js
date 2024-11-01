import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  define: {
    "process.env": {}, // Adds an empty object for `process.env`
  },
  build: {
    devtools: true,
    sourcemap: true,
    cssCodeSplit: false, // Outputs CSS in a single file
    lib: {
      entry: "src/EmoteWidget.jsx",
      name: "EmoteWidget",
      fileName: "emote.widget",
      formats: ["iife"], // Outputs in a format compatible with browsers
    },
  },
});
