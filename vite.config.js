import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react'
import path from 'path';
const aliases = {
  '@': path.resolve(__dirname, './src')
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),eslint()],
  resolve: {
    alias: aliases
  }
})
