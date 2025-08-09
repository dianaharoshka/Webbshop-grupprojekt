import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "products.html"),
        checkout: resolve(__dirname, "payment-page.html"),
      },
    },
  },
});
