import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["src/lib/**/*"],
      exclude: ["**/*.stories.tsx"],
      outDir: "dist/types",
      rollupTypes: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "SellsukiDS",
      formats: ["es", "umd"],
      fileName: "sellsuki-ds",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "lucide-react": "LucideReact",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "sellsuki-ds.css";
          return assetInfo.name ?? "assets/[name]-[hash][extname]";
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: "esbuild",
    assetsInlineLimit: 0,
  },
});
