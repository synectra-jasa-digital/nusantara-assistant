import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for a plain React SPA deployed on Vercel.
// The /api folder is picked up automatically by Vercel as serverless
// functions and is not part of this build - it runs on its own.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // When running `vite dev` locally, proxy /api to `vercel dev`
      // (run on port 3000) so the chat page works without extra setup.
      '/api': 'http://localhost:3000',
    },
  },
})
