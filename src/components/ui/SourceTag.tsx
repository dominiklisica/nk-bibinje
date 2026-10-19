import { Database } from 'lucide-react'
import { HNS_SOURCE } from '../../data/club'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}.`
}

/**
 * Jedinstvena oznaka izvora podataka — prikazuje odakle podaci dolaze
 * i kad su zadnji put ažurirani. Koristi se uz svaki prikaz stvarnih podataka.
 */
export default function SourceTag({ className = '' }: { className?: string }) {
  return (
    <a
      href={HNS_SOURCE.url}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs text-muted hover:text-[var(--club-primary)] transition-colors ${className}`}
    >
      <Database size={13} />
      <span>
        Izvor: {HNS_SOURCE.source} · ažurirano {formatDate(HNS_SOURCE.lastUpdated)}
      </span>
    </a>
  )
}
