import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === "serve" ? "/" : "/react-products/" // 👈 Replace with your GitHub repository name
  };
});
