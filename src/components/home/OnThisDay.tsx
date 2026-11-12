import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, History } from 'lucide-react'
import Reveal from '../ui/Reveal'
import ClubCrest from '../ui/ClubCrest'
import type { HistoryMatch, HistorySeason } from '../../data/history'

const BIB = 'NK Bibinje'
type Item = HistoryMatch & { season: string }

/** „prije 1 godinu / 3 godine / 9 godina / 21 godinu” */
const godina = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? 'godinu' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'godine' : 'godina'

function pick(history: HistorySeason[], today = new Date()) {
  const all: Item[] = history.flatMap((s) => s.matches.filter((m) => m.homeScore != null).map((m) => ({ ...m, season: s.season })))
  const md = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const sameDay = all.filter((m) => m.date.slice(5) === md(today))
  if (sameDay.length) return { title: 'Na današnji dan', items: sameDay }

  // Ovaj tjedan: ±3 dana
  const near = new Set([-3, -2, -1, 1, 2, 3].map((o) => md(new Date(today.getTime() + o * 86400000))))
  const week = all.filter((m) => near.has(m.date.slice(5)))
  if (week.length) return { title: 'Ovaj tjedan u povijesti', items: week }

  // Inače (npr. ljeti): jedna velika pobjeda iz arhive, svaki dan druga
  const wins = all.filter((m) => {
    const [mine, theirs] = m.home === BIB ? [m.homeScore!, m.awayScore!] : [m.awayScore!, m.homeScore!]
    return mine - theirs >= 3
  })
  const day = Math.floor(today.getTime() / 86400000)
  return { title: 'Iz klupske arhive', items: wins.length ? [wins[day % wins.length]] : [] }
}

/** Blok na naslovnici: utakmice Bibinja na današnji datum u prijašnjim sezonama. */
export default function OnThisDay() {
  const [data, setData] = useState<ReturnType<typeof pick> | null>(null)

  useEffect(() => {
    // Podaci povijesti su veliki — učitaju se tek nakon naslovnice.
    import('../../data/history').then((m) => setData(pick(m.HISTORY)))
  }, [])

  if (!data || data.items.length === 0) return null
  const items = [...data.items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  const year = new Date().getFullYear()

  return (
    <Reveal>
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-3 font-display text-3xl font-extrabold uppercase tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--club-primary)] text-white">
              <History size={18} />
            </span>
            {data.title}
          </h2>
          <Link to="/povijest" className="inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wide text-[var(--club-primary)] hover:underline">
            Povijest kluba <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((m) => {
            const [y, mo, d] = m.date.split('-')
            const ago = year - Number(y)
            const mine = m.home === BIB ? m.homeScore! : m.awayScore!
            const theirs = m.home === BIB ? m.awayScore! : m.homeScore!
            const result = mine > theirs ? 'Pobjeda' : mine < theirs ? 'Poraz' : 'Neriješeno'
            return (
              <Link
                key={m.date + m.home}
                to={`/povijest?sezona=${m.season.replace('/', '-')}`}
                className="card-hover rounded-2xl border border-app p-5"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-4xl font-extrabold text-[var(--club-primary)]">{y}.</span>
                  <span className="text-muted text-sm">
                    {Number(d)}. {Number(mo)}. · {ago > 0 ? `prije ${ago} ${godina(ago)}` : 'ove godine'}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <ClubCrest name={m.home} size={26} />
                    <span className="truncate font-display font-bold">{m.home}</span>
                  </span>
                  <span className="shrink-0 font-display text-2xl font-extrabold tabular-nums">
                    {m.homeScore}:{m.awayScore}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center justify-end gap-2 text-right">
                    <span className="truncate font-display font-bold">{m.away}</span>
                    <ClubCrest name={m.away} size={26} />
                  </span>
                </div>
                <div className="text-muted mt-3 text-xs">
                  {result} · sezona {m.season.replace('/', './')}.{m.round ? ` · ${m.round}. kolo` : ''}
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}
