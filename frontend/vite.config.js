import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/" // absolute asset URLs so /assets/* resolves from any sub-route under BrowserRouter
});
