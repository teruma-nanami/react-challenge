import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({ input: "resources/js/app.tsx", refresh: true }),
        react(),
    ],
    server: {
        host: true, // 0.0.0.0 にバインド
        port: 5173,
        strictPort: true,
    },
});
