import { Link } from 'react-router-dom'
import { ExternalLink, Calendar, ChevronRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { NEWS, NEWS_SOURCE, type NewsCategory } from '../data/news'

const LINK_CLASS =
  'mt-5 mr-5 inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-[var(--club-primary)] hover:underline'

const CAT_STYLE: Record<NewsCategory, string> = {
  Najava: 'var(--club-primary)',
  Obavijest: 'var(--club-red)',
  Izvještaj: 'var(--club-ink)',
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  const wd = new Date(`${iso}T12:00:00`).toLocaleDateString('hr-HR', {
    weekday: 'long',
  })
  return `${wd}, ${d}.${m}.${y}.`
}

export default function News() {
  return (
    <div>
      <PageHeader
        title="Vijesti"
        subtitle="Najave, izvještaji i obavijesti NK Bibinje."
        bgImage="/slike/vijesti.jpg"
        imgPosition="center 40%"
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="space-y-5">
          {NEWS.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 0.06, 0.3)}>
              <article
                className="card-hover overflow-hidden rounded-2xl border border-app"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div
                  className="h-1.5 w-full"
                  style={{ background: CAT_STYLE[item.category] }}
                />
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                      style={{ background: CAT_STYLE[item.category] }}
                    >
                      {item.category}
                    </span>
                    <span className="text-muted inline-flex items-center gap-1.5 text-sm">
                      <Calendar size={14} /> {formatDate(item.date)}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight">
                    {item.title}
                  </h2>

                  <div className="mt-3 space-y-2">
                    {item.body.map((p, j) => (
                      <p key={j} className="text-muted leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {item.matchId && (
                    <Link
                      to={`/utakmice/${item.matchId}`}
                      className={LINK_CLASS}
                    >
                      Detalji utakmice <ChevronRight size={15} />
                    </Link>
                  )}
                  {item.facebook && (
                    <a
                      href={NEWS_SOURCE}
                      target="_blank"
                      rel="noreferrer"
                      className={LINK_CLASS}
                    >
                      Službena objava <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
