import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Osnovna adresa stranice. BASE_PATH za hosting u podmapi (npr. /lisica/nk_bibinje/),
  // GitHub Pages poslužuje na /nk-bibinje/; lokalno i Vercel ostaju na "/".
  base: process.env.BASE_PATH ?? (process.env.GITHUB_PAGES ? '/nk-bibinje/' : '/'),
})
