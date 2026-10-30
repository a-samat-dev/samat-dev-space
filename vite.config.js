import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In production the site and the URL shortener API share a hostname (samat-dev.space), with the
// API below /url-shortener. During development that path is forwarded:
//   - by default to the url-shortener project's local `docker compose up` (gateway on :8080,
//     which serves the API at the root, hence the rewrite);
//   - with URL_SHORTENER_PROXY=https://samat-dev.space to the live system.
const liveTarget = process.env.URL_SHORTENER_PROXY

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/url-shortener': liveTarget
        ? { target: liveTarget, changeOrigin: true }
        : {
            target: 'http://localhost:8080',
            rewrite: (path) => path.replace(/^\/url-shortener/, ''),
          },
    },
  },
})
