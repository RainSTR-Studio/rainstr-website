import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['www.rainstr-studio.top', 'rainstr-studio.top', 'localhost', '127.0.0.1']
  },
  plugins: [vue()],
});
