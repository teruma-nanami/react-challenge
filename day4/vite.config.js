import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/day4/",
  plugins: [react()],
  // Ensure a single React/ReactDOM instance is used in this sub-project
  // resolve: {
  //   dedupe: ["react", "react-dom"],
  // },
});
