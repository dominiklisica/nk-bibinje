import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { asset } from '../../lib/asset'
import { NEWS, newsImage, type NewsCategory, type NewsItem } from '../../data/news'

const CAT_COLOR: Record<NewsCategory, string> = {
  Najava: 'var(--club-primary)',
  Obavijest: 'var(--club-red)',
  Izvještaj: 'var(--club-ink)',
}

const shortDate = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return `${Number(d)}. ${Number(m)}. ${y}.`
}
const summary = (n: NewsItem) => n.excerpt || n.body[0] || ''

function Meta({ item, light = false }: { item: NewsItem; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-wide">
      <span className="rounded-full px-2.5 py-0.5 text-white" style={{ background: CAT_COLOR[item.category] }}>
        {item.category}
      </span>
      <span className={`whitespace-nowrap ${light ? 'text-white/80' : 'text-muted'}`}>{shortDate(item.date)}</span>
    </div>
  )
}

/** Vijesti na naslovnici: najnovija velika, sljedeće tri manje. */
export default function HomeNews() {
  const [main, ...rest] = NEWS.slice(0, 4)
  if (!main) return null
  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 font-display text-3xl font-extrabold uppercase tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--club-primary)] text-white">
            <Newspaper size={18} />
          </span>
          Vijesti
        </h2>
        <Link to="/vijesti" className="inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wide text-[var(--club-primary)] hover:underline">
          Sve vijesti <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="h-full">
          <Link
            to={`/vijesti#${main.id}`}
            className="card-hover group relative flex h-full min-h-[340px] items-end overflow-hidden rounded-2xl text-white sm:min-h-[420px]"
          >
            <img
              src={asset(newsImage(main))}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="relative p-6 sm:p-8">
              <Meta item={main} light />
              <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">{main.title}</h3>
              <p className="mt-2 line-clamp-2 max-w-2xl text-white/85">{summary(main)}</p>
            </div>
          </Link>
        </Reveal>

        <div className="grid gap-4">
          {rest.map((n, i) => (
            <Reveal key={n.id} delay={0.05 + i * 0.05}>
              <Link
                to={`/vijesti#${n.id}`}
                className="card-hover group flex h-full gap-4 overflow-hidden rounded-2xl border border-app p-3"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl sm:w-32">
                  <img
                    src={asset(newsImage(n))}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 py-1">
                  <Meta item={n} />
                  <h3 className="mt-1.5 line-clamp-2 font-display text-lg font-bold leading-snug">{n.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
