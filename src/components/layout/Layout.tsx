import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from '../../hooks/useTheme'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export default function Layout() {
  const { theme, toggle } = useTheme()
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggle} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
