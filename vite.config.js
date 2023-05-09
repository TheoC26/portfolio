// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        blog: resolve(__dirname, "blog/index.html"),
        particleEffect: resolve(__dirname, "blog/particle-effect.html"),
        card: resolve(__dirname, "blog/3d-card.html"),
      },
    },
  },
});
