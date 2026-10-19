import { Link } from 'react-router-dom'
import { Home as HomeIcon } from 'lucide-react'
import Crest from '../components/Crest'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <Crest size={72} />
      <div className="font-display mt-6 text-7xl font-extrabold" style={{ color: 'var(--club-primary)' }}>
        404
      </div>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase">Stranica nije pronađena</h1>
      <p className="text-muted mt-3">
        Tražena stranica ne postoji ili je premještena.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-bold uppercase tracking-wide text-white"
        style={{ background: 'var(--club-primary)' }}
      >
        <HomeIcon size={18} /> Početna stranica
      </Link>
    </div>
  )
}
