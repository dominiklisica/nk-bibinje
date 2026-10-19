import { Link } from 'react-router-dom'
import { MapPin, Calendar, Trophy } from 'lucide-react'
import Crest from '../Crest'
import { CLUB } from '../../data/club'
import { NAV_ITEMS } from '../../data/nav'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-app" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Crest size={48} />
            <div>
              <div className="font-display text-xl font-extrabold uppercase leading-none">
                {CLUB.name}
              </div>
              <div className="text-muted text-sm">{CLUB.fullName}</div>
            </div>
          </div>
          <ul className="text-muted mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={15} /> {CLUB.address}
            </li>
            <li className="flex items-center gap-2">
              <Calendar size={15} /> Osnovan {CLUB.founded}
            </li>
            <li className="flex items-center gap-2">
              <Trophy size={15} /> {CLUB.league} · sezona {CLUB.season}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
            Stranice
          </h4>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm hover:text-[var(--club-primary)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
            Podaci
          </h4>
          <p className="text-muted mt-4 text-sm leading-relaxed">
            Sportski podaci (rezultati, raspored, tablica, statistika) preuzeti su
            sa službenog portala Hrvatskog nogometnog saveza (HNS Semafor / COMET).
          </p>
        </div>
      </div>

      <div className="border-t border-app">
        <div className="text-muted mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} {CLUB.name}. Sva prava pridržana.</span>
          <span>Portfolio projekt · izrada web stranice</span>
        </div>
      </div>
    </footer>
  )
}
