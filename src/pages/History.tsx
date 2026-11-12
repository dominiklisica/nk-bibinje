import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Crown, Goal, History as HistoryIcon, Medal, Shirt, Trophy } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import ClubCrest from '../components/ui/ClubCrest'
import { ALL_TIME_SCORERS, HISTORY, MOST_APPEARANCES, type HistoryMatch, type HistorySeason } from '../data/history'

const BIB = 'NK Bibinje'
const slug = (season: string) => season.replace('/', '-')
const seasonLabel = (season: string) => season.replace('/', './') + '.'

function outcome(m: HistoryMatch): 'W' | 'D' | 'L' | null {
  if (m.homeScore == null || m.awayScore == null) return null
  const [mine, theirs] = m.home === BIB ? [m.homeScore, m.awayScore] : [m.awayScore, m.homeScore]
  return mine > theirs ? 'W' : mine < theirs ? 'L' : 'D'
}

const OUTCOME_STYLE = {
  W: { bg: '#2e7d34', label: 'P' },
  D: { bg: '#9a8a2e', label: 'N' },
  L: { bg: '#c0392b', label: 'I' },
}

function record(s: HistorySeason) {
  return s.standings.find((r) => r.club === BIB)
}

const TOTALS = (() => {
  let matches = 0
  let wins = 0
  let goals = 0
  for (const s of HISTORY)
    for (const m of s.matches) {
      const o = outcome(m)
      if (!o) continue
      matches++
      if (o === 'W') wins++
      goals += (m.home === BIB ? m.homeScore : m.awayScore) ?? 0
    }
  return { matches, wins, goals, titles: HISTORY.filter((s) => s.position === 1).length }
})()

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-2xl border border-app p-4 text-center" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="font-display text-3xl font-extrabold text-[var(--club-primary)] sm:text-4xl">{value}</div>
      <div className="text-muted mt-1 text-sm">{label}</div>
    </div>
  )
}

/** Stupci: što viši, to bolji plasman. Prvaci zlatni. */
function PositionChart({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) {
  const seasons = [...HISTORY].reverse()
  const maxTeams = Math.max(...seasons.map((s) => s.teams))
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex h-56 min-w-[640px] items-end gap-1.5">
        {seasons.map((s) => {
          const h = s.position ? ((maxTeams - s.position + 1) / maxTeams) * 100 : 4
          const champ = s.position === 1
          const active = s.season === selected
          return (
            <button
              key={s.season}
              type="button"
              onClick={() => onSelect(s.season)}
              title={`${seasonLabel(s.season)} ${s.league}: ${s.position ?? '–'}. od ${s.teams}`}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <span className={`font-display text-xs font-bold ${active ? 'text-[var(--club-primary)]' : 'text-muted'}`}>{s.position ?? '–'}.</span>
              <span
                className={`w-full rounded-t-md transition-all group-hover:opacity-100 ${active ? 'opacity-100' : 'opacity-60'}`}
                style={{
                  height: `${h}%`,
                  background: champ ? 'linear-gradient(180deg,#f2c94c,#c9971c)' : active ? 'var(--club-primary)' : 'var(--club-primary-700)',
                  outline: active ? '2px solid var(--club-primary)' : undefined,
                  outlineOffset: 2,
                }}
              />
              <span className="text-muted text-[10px] leading-none">{s.season.slice(2, 4)}/{s.season.slice(5)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SeasonDetail({ s }: { s: HistorySeason }) {
  const me = record(s)
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl font-extrabold uppercase">
            Sezona {seasonLabel(s.season)}
            {s.position === 1 && <Crown size={26} className="ml-2 inline align-[-3px] text-[#e0b43a]" />}
          </h3>
          <p className="text-muted">
            {s.league} · {s.position ? `${s.position}. mjesto od ${s.teams}` : 'bez plasmana'}
            {s.season === '2019/20' && ' · prekinuto zbog pandemije'}
          </p>
        </div>
        {me && (
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              ['Bodovi', me.points],
              ['P-N-I', `${me.won}-${me.drawn}-${me.lost}`],
              ['Golovi', `${me.goalsFor}:${me.goalsAgainst}`],
            ].map(([k, v]) => (
              <span key={k} className="rounded-xl border border-app px-3 py-1.5" style={{ backgroundColor: 'var(--surface)' }}>
                <span className="text-muted">{k} </span>
                <b>{v}</b>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Tablica */}
        <div className="overflow-hidden rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="border-b border-app px-4 py-3 font-display text-lg font-bold uppercase">Konačna tablica</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted text-xs uppercase">
                <tr>
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-2 py-2 text-left">Klub</th>
                  <th className="px-2 py-2 text-center">Ut</th>
                  <th className="px-2 py-2 text-center">Gol.</th>
                  <th className="px-3 py-2 text-right">Bod</th>
                </tr>
              </thead>
              <tbody>
                {s.standings.map((r) => {
                  const mine = r.club === BIB
                  return (
                    <tr key={r.club} className={`border-t border-app ${mine ? 'font-bold' : ''}`} style={mine ? { background: 'color-mix(in srgb, var(--club-primary) 14%, transparent)' } : undefined}>
                      <td className="px-3 py-1.5 tabular-nums">{r.position}.</td>
                      <td className="px-2 py-1.5">
                        <span className="flex items-center gap-2">
                          <ClubCrest name={r.club} size={20} />
                          {r.club}
                          {r.deduction ? <span className="text-xs text-[var(--club-red)]">({r.deduction})</span> : null}
                        </span>
                      </td>
                      <td className="px-2 py-1.5 text-center tabular-nums">{r.played}</td>
                      <td className="px-2 py-1.5 text-center tabular-nums">
                        {r.goalsFor}:{r.goalsAgainst}
                      </td>
                      <td className="px-3 py-1.5 text-right font-display font-bold tabular-nums">{r.points}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {/* Strijelci */}
          {s.scorers.length > 0 && (
            <div className="rounded-2xl border border-app p-4" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="mb-2 font-display text-lg font-bold uppercase">Strijelci</div>
              <ol className="space-y-1.5">
                {s.scorers.map((p, i) => (
                  <li key={p.name} className="flex items-center gap-3">
                    <span className="text-muted w-5 text-right font-display font-bold">{i + 1}</span>
                    <span className="flex-1 font-semibold">{p.name}</span>
                    <span className="font-display text-lg font-extrabold">{p.goals}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Rezultati */}
          <div className="rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="border-b border-app px-4 py-3 font-display text-lg font-bold uppercase">Rezultati</div>
            <ul className="max-h-[420px] divide-y divide-[color:var(--border)] overflow-y-auto text-sm">
              {s.matches.map((m, i) => {
                const o = outcome(m)
                const home = m.home === BIB
                return (
                  <li key={i} className="flex items-center gap-3 px-4 py-2">
                    <span className="text-muted w-20 shrink-0 tabular-nums">{m.date.split('-').reverse().join('.')}.</span>
                    <span className="text-muted w-5 shrink-0 text-xs">{home ? 'D' : 'G'}</span>
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <ClubCrest name={home ? m.away : m.home} size={18} />
                      <span className="truncate">{home ? m.away : m.home}</span>
                    </span>
                    <span className="font-display font-bold tabular-nums">
                      {m.homeScore ?? '–'}:{m.awayScore ?? '–'}
                      {m.note && <span className="text-muted ml-1 text-xs">{m.note}</span>}
                    </span>
                    {o && (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded text-[11px] font-bold text-white" style={{ background: OUTCOME_STYLE[o].bg }}>
                        {OUTCOME_STYLE[o].label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="text-muted border-t border-app px-4 py-2 text-xs">D = doma, G = u gostima · P pobjeda, N neriješeno, I izgubljeno</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Leaders({ title, icon: Icon, rows, value }: { title: string; icon: typeof Goal; rows: typeof ALL_TIME_SCORERS; value: 'goals' | 'apps' }) {
  return (
    <div className="rounded-2xl border border-app p-5" style={{ backgroundColor: 'var(--surface)' }}>
      <h3 className="mb-3 flex items-center gap-2 font-display text-xl font-bold uppercase">
        <Icon size={20} className="text-[var(--club-primary)]" /> {title}
      </h3>
      <ol className="space-y-2">
        {rows.map((p, i) => (
          <li key={p.name} className="flex items-center gap-3">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-sm font-bold ${i < 3 ? 'text-white' : 'text-muted'}`} style={i < 3 ? { background: ['#c9971c', '#9aa0a6', '#a0632e'][i] } : undefined}>
              {i + 1}
            </span>
            <span className="flex-1">
              <span className="font-semibold">{p.name}</span>
              <span className="text-muted block text-xs">
                {p.seasons} {p.seasons === 1 ? 'sezona' : p.seasons < 5 ? 'sezone' : 'sezona'} · {value === 'goals' ? `${p.apps} nastupa` : `${p.goals} golova`}
              </span>
            </span>
            <span className="font-display text-2xl font-extrabold">{p[value]}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function History() {
  const [params, setParams] = useSearchParams()
  const selected = useMemo(() => {
    const p = params.get('sezona')
    return HISTORY.find((s) => slug(s.season) === p)?.season ?? HISTORY[0].season
  }, [params])
  const season = HISTORY.find((s) => s.season === selected)!
  const select = (s: string) => setParams({ sezona: slug(s) }, { replace: true, preventScrollReset: true })
  const first = HISTORY[HISTORY.length - 1].season

  return (
    <div>
      <PageHeader
        title="Povijest kluba"
        subtitle={`Sve sezone seniora od ${seasonLabel(first)} — plasmani, tablice, rezultati i strijelci.`}
        bgImage="/slike/galerija/bibinje-dalmatinac-2012.jpg?v=1"
        imgPosition="center 35%"
      />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6">
        <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={HISTORY.length} label="sezona" />
          <Stat value={TOTALS.matches} label="prvenstvenih utakmica" />
          <Stat value={TOTALS.wins} label="pobjeda" />
          <Stat value={TOTALS.goals} label="postignutih golova" />
        </Reveal>

        <section>
          <h2 className="mb-2 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
            <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
            Plasman po sezonama
          </h2>
          <p className="text-muted mb-5 text-sm">
            Što viši stupac, to bolji plasman. <span className="font-semibold text-[#c9971c]">Zlatni</span> su naslovi prvaka
            ({HISTORY.filter((s) => s.position === 1).map((s) => `${seasonLabel(s.season)} ${s.league.replace(' Zadarska', '')}`).join(', ')}).
            Klikni stupac za detalje sezone.
          </p>
          <PositionChart selected={selected} onSelect={select} />
        </section>

        <section>
          <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6">
            {HISTORY.map((s) => (
              <button
                key={s.season}
                type="button"
                onClick={() => select(s.season)}
                className={`shrink-0 rounded-full border px-4 py-1.5 font-display text-sm font-bold ${
                  s.season === selected ? 'border-[var(--club-primary)] bg-[var(--club-primary)] text-white' : 'tile-hover border-app'
                }`}
              >
                {s.position === 1 && <Trophy size={13} className="mr-1 inline align-[-2px]" />}
                {s.season}
              </button>
            ))}
          </div>
          <SeasonDetail s={season} />
        </section>

        <section>
          <h2 className="mb-2 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
            <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
            Rekorderi
          </h2>
          <p className="text-muted mb-5 text-sm">Prvenstvene utakmice seniora od {seasonLabel(first)} do prošle sezone, prema zapisnicima HNS-a.</p>
          <div className="grid gap-5 md:grid-cols-2">
            <Leaders title="Najbolji strijelci" icon={Medal} rows={ALL_TIME_SCORERS} value="goals" />
            <Leaders title="Najviše nastupa" icon={Shirt} rows={MOST_APPEARANCES} value="apps" />
          </div>
        </section>

        <p className="text-muted flex items-center gap-2 text-xs">
          <HistoryIcon size={14} /> Izvor: HNS Semafor (COMET). Starije sezone mogu imati nepotpune zapisnike.
        </p>
      </div>
    </div>
  )
}
