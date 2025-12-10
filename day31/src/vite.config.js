import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        host: "0.0.0.0", // コンテナ外からアクセス可能にする
        port: 5173,
        watch: {
            usePolling: true, // Docker環境でファイル変更検知を安定させる
        },
    },
});
