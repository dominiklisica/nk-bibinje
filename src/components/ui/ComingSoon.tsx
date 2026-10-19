import { Link } from 'react-router-dom'
import { Hammer, ArrowLeft } from 'lucide-react'
import PageHeader from './PageHeader'
import Reveal from './Reveal'

/**
 * Poštena "u pripremi" stranica — jasno označava da sekcija dolazi,
 * bez nefunkcionalnih gumba i bez lažnog sadržaja.
 */
export default function ComingSoon({
  title,
  subtitle,
  planned,
}: {
  title: string
  subtitle?: string
  planned?: string[]
}) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      <Reveal className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <span
          className="inline-grid h-16 w-16 place-items-center rounded-2xl text-white"
          style={{ background: 'var(--club-primary)' }}
        >
          <Hammer size={28} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-extrabold uppercase">
          Sekcija je u pripremi
        </h2>
        <p className="text-muted mx-auto mt-3 max-w-xl">
          Ova stranica dolazi u sljedećoj fazi izrade. Neće prikazivati izmišljen
          sadržaj — bit će popunjena stvarnim podacima ili sadržajem unesenim kroz
          administratorsko sučelje.
        </p>
        {planned && planned.length > 0 && (
          <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left">
            {planned.map((p) => (
              <li
                key={p}
                className="rounded-lg border border-app px-4 py-2.5 text-sm"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-app px-5 py-2.5 font-display font-bold uppercase tracking-wide transition-colors hover:text-[var(--club-primary)]"
        >
          <ArrowLeft size={16} /> Natrag na početnu
        </Link>
      </Reveal>
    </div>
  )
}
