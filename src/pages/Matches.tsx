import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, MapPin, Trophy, ChevronRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SourceTag from '../components/ui/SourceTag'
import Reveal from '../components/ui/Reveal'
import ClubCrest from '../components/ui/ClubCrest'
import { bibinjeMatches, perspective, CLUB_NAME } from '../lib/stats'
import type { Match } from '../types'

type Filter = 'all' | 'finished' | 'upcoming'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  const wd = new Date(`${iso}T12:00:00`).toLocaleDateString('hr-HR', { weekday: 'short' })
  return `${wd}, ${d}.${m}.${y}.`
}

function TeamSide({ name, right = false }: { name: string; right?: boolean }) {
  const mine = name === CLUB_NAME
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-2 ${right ? 'flex-row-reverse text-right' : ''}`}>
      <ClubCrest name={name} size={30} />
      <span className={`truncate font-display font-bold ${mine ? 'text-[var(--club-primary)]' : ''}`}>
        {name}
      </span>
    </div>
  )
}

function MatchRow({ match }: { match: Match }) {
  const p = perspective(match)
  const finished = match.status === 'finished'
  const body = (
    <>
      <div className="text-muted mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock size={13} /> {formatDate(match.date)} · {match.time}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Trophy size={13} /> {match.competition}
        </span>
        {match.venue && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} /> {match.venue}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <TeamSide name={match.home} />
        <div className="shrink-0 text-center">
          {finished ? (
            <span className="font-display text-2xl font-extrabold tabular-nums">
              {match.homeScore} : {match.awayScore}
            </span>
          ) : (
            <span className="rounded-md border border-app px-3 py-1 font-display text-sm font-bold text-muted">
              {match.time}
            </span>
          )}
        </div>
        <TeamSide name={match.away} right />
      </div>
      {finished && p && (
        <div className="mt-3 flex items-center justify-center gap-2">
          <span
            className="rounded px-2 py-0.5 text-[11px] font-bold uppercase text-white"
            style={{ background: p.outcome === 'W' ? '#2e7d34' : p.outcome === 'D' ? '#9a8a2e' : '#c0392b' }}
          >
            {p.outcome === 'W' ? 'Pobjeda' : p.outcome === 'D' ? 'Neriješeno' : 'Poraz'}
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[var(--club-primary)]">
            Detalji <ChevronRight size={13} />
          </span>
        </div>
      )}
    </>
  )

  const classes = 'card-hover block rounded-xl border border-app p-4'
  const style = { backgroundColor: 'var(--surface)' }
  return finished ? (
    <Link to={`/utakmice/${match.id}`} className={classes} style={style}>
      {body}
    </Link>
  ) : (
    <div className={classes} style={style}>
      {body}
    </div>
  )
}

export default function Matches() {
  const [filter, setFilter] = useState<Filter>('all')
  const all = bibinjeMatches()
  const shown = all.filter((m) =>
    filter === 'all' ? true : m.status === filter,
  )

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Sve' },
    { key: 'finished', label: 'Odigrane' },
    { key: 'upcoming', label: 'Nadolazeće' },
  ]

  return (
    <div>
      <PageHeader
        title="Utakmice"
        subtitle="Raspored i rezultati NK Bibinje u sezoni 2026/27."
        bgImage="/slike/utakmice.jpg"
      />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-6 inline-flex rounded-full border border-app p-1" style={{ backgroundColor: 'var(--surface)' }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                filter === f.key ? 'text-white' : 'text-muted'
              }`}
              style={filter === f.key ? { background: 'var(--club-primary)' } : undefined}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          {shown.map((m, i) => (
            <Reveal key={m.id} delay={Math.min(i * 0.04, 0.25)}>
              <MatchRow match={m} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6">
          <SourceTag />
        </div>
      </div>
    </div>
  )
}
