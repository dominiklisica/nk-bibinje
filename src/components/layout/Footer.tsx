import { MapPin, Calendar, Trophy } from 'lucide-react'
import Crest from '../Crest'
import { CLUB } from '../../data/club'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-app" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-12 text-center sm:px-6">
        <div className="flex items-center gap-3">
          <Crest size={48} />
          <div className="text-left">
            <div className="font-display text-xl font-extrabold uppercase leading-none">{CLUB.name}</div>
            <div className="text-muted text-sm">{CLUB.fullName}</div>
          </div>
        </div>
        <ul className="text-muted flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
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
        <span className="text-muted text-xs">
          © {new Date().getFullYear()} {CLUB.name}
        </span>
      </div>
    </footer>
  )
}
