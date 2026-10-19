import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import Crest from '../Crest'
import { NAV_ITEMS } from '../../data/nav'
import { CLUB } from '../../data/club'
import type { Theme } from '../../hooks/useTheme'

interface NavbarProps {
  theme: Theme
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md font-display font-semibold uppercase tracking-wide text-sm transition-colors ${
      isActive
        ? 'text-[var(--club-primary)]'
        : 'text-[var(--text)] hover:text-[var(--club-primary)]'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? 'surface/90 backdrop-blur-md border-b border-app shadow-sm'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'color-mix(in srgb, var(--surface) 88%, transparent)' } : undefined}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Crest size={40} />
          <span className="font-display text-xl font-extrabold uppercase leading-none tracking-wide">
            {CLUB.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Svijetla tema' : 'Tamna tema'}
            className="grid h-10 w-10 place-items-center rounded-lg border border-app text-[var(--text)] hover:text-[var(--club-primary)] transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Zatvori izbornik' : 'Otvori izbornik'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-lg border border-app lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobilni izbornik */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top transition-transform lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-[130%]'
        }`}
      >
        <nav
          className="mx-4 mt-2 rounded-2xl border border-app p-2 shadow-xl"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 font-display font-semibold uppercase tracking-wide ${
                  isActive
                    ? 'bg-[var(--club-primary)] text-white'
                    : 'text-[var(--text)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
