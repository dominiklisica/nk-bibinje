import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { captureInstallPrompt } from './lib/install'

// TanStack Query klijent — spreman za kasnije dohvaćanje podataka s API-ja.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false },
  },
})

// Ponuda preglednika za instalaciju dolazi odmah pri učitavanju — hvatamo je za gumb "Instaliraj aplikaciju".
captureInstallPrompt()

// Aplikacija (PWA): service worker samo u produkciji, da lokalni razvoj ne vrti stare datoteke.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
