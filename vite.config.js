import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/bolster-page/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true, // Listen on all network addresses (0.0.0.0)
    port: 5173,
    allowedHosts: true // Allow tunnel domains (localtunnel, localhost.run, pinggy, etc.)
  }
}))
