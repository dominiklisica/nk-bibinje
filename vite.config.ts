import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages poslužuje stranicu na /nk-bibinje/; lokalno i ostalo ostaje "/".
  base: process.env.GITHUB_PAGES ? '/nk-bibinje/' : '/',
})
