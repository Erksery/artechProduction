import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgr from "vite-plugin-svgr";
// @ts-ignore
import { terser } from "rollup-plugin-terser";
import mkcert from "vite-plugin-mkcert";
import path from "path";
import config from "./config";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      https: false,
      proxy: {
        "/api": {
          target: config.apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [
      react(),
      process?.env?.ODR ? viteSingleFile() : null,
      svgr(),
      mkcert(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
      outDir: "build",
      rollupOptions: {
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
    },
  });
};
