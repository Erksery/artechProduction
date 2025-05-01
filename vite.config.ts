import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgr from "vite-plugin-svgr";
//import mkcert from "vite-plugin-mkcert";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    server: {
      // https: false,
      cors: {
        origin: env.VITE_API_URL,
        credentials: true,
      },
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
          cookieDomainRewrite: "",
        },
      },
    },
    plugins: [
      react(),
      env.ODR ? viteSingleFile() : null,
      svgr(),
      // mkcert()
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
    },
  });
};
