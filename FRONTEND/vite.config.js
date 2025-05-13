import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx', // Ensures .js files are parsed as JSX
  //   },
  // },
  server: {
    port: 3000, // Or your preferred port
    proxy: {
      '/api': 'http://localhost:3001' // adjust if needed
    }
  }
});
