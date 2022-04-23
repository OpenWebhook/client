import { defineConfig, splitVendorChunkPlugin } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), splitVendorChunkPlugin()],
  build: {
    sourcemap: true,
  },
});
