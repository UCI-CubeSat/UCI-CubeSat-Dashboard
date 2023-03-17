import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/UCI-CubeSat-Dashboard/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  build: {
    outDir: './build'
  }
})
