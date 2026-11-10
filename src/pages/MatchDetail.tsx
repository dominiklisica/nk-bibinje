import { Link, useParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowUp, MapPin, CalendarClock, Users, Flag, Shirt } from 'lucide-react'
import ClubCrest from '../components/ui/ClubCrest'
import Reveal from '../components/ui/Reveal'
import { teamOfMatch } from '../data/teams'
import type { MatchDetail, MatchEvent, TeamSheet } from '../types'

function parsePlayer(entry: string) {
  const captain = /\(C\)/.test(entry)
  const clean = entry.replace(/\(C\)/, '').trim()
  const sp = clean.indexOf(' ')
  return {
    number: clean.slice(0, sp),
    name: clean.slice(sp + 1),
    captain,
  }
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  const wd = new Date(`${iso}T12:00:00`).toLocaleDateString('hr-HR', { weekday: 'long' })
  return `${wd}, ${d}.${m}.${y}.`
}

// Događaj bez upisane minute (ima ih u zapisnicima) ide na kraj tijeka utakmice.
const minuteNum = (m: string) => {
  if (!m) return 999
  const [a, b] = m.replace("'", '').split('+').map(Number)
  return a + (b || 0) / 100
}
const stripGoalSuffix = (p: string) => p.replace(/ \((11 m|autogol)\)$/, '')

/* ---------- Ikone događaja ---------- */

function CardIcon({ type }: { type: 'yellow' | 'second_yellow' | 'red' }) {
  if (type === 'second_yellow') {
    return (
      <span className="relative inline-block h-3.5 w-3.5 shrink-0" aria-label="Drugi žuti karton">
        <span className="absolute left-0 top-0 h-3 w-2.5 rounded-sm bg-[#f1c40f]" />
        <span className="absolute bottom-0 right-0 h-3 w-2.5 rounded-sm bg-[#c0392b]" />
      </span>
    )
  }
  return (
    <span
      className={`inline-block h-3.5 w-2.5 shrink-0 rounded-sm ${type === 'yellow' ? 'bg-[#f1c40f]' : 'bg-[#c0392b]'}`}
      aria-label={type === 'yellow' ? 'Žuti karton' : 'Crveni karton'}
    />
  )
}

const SubIn = () => <ArrowUp size={14} className="shrink-0 text-[#2e7d34]" aria-label="Ulazi" />
const SubOut = () => <ArrowDown size={14} className="shrink-0 text-[#c0392b]" aria-label="Izlazi" />

/* ---------- Tijek utakmice ---------- */

type TimelineItem =
  | { kind: 'goal'; side: 'home' | 'away'; minute: string; player: string }
  | ({ kind: 'event' } & MatchEvent)

function TimelineText({ item }: { item: TimelineItem }) {
  if (item.kind === 'goal') {
    return (
      <span className="inline-flex items-center gap-2 font-semibold">
        <span aria-label="Gol">⚽</span> {item.player}
      </span>
    )
  }
  if (item.type === 'sub') {
    return (
      <span className="inline-flex flex-col leading-tight">
        {item.player && (
          <span className="inline-flex items-center gap-1.5">
            <SubIn /> {item.player}
          </span>
        )}
        {item.playerOut && (
          <span className="text-muted inline-flex items-center gap-1.5 text-sm">
            <SubOut /> {item.playerOut}
          </span>
        )}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2">
      <CardIcon type={item.type} /> {item.player}
      {item.type === 'second_yellow' && <span className="text-muted text-xs">(drugi žuti)</span>}
    </span>
  )
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
      {items.map((it, i) => {
        const home = it.side === 'home'
        const isGoal = it.kind === 'goal'
        return (
          <div
            key={i}
            className="row-hover grid grid-cols-[1fr_3.5rem_1fr] items-center gap-2 border-b border-app px-3 py-2.5 last:border-0 sm:px-4"
            style={isGoal ? { backgroundColor: 'color-mix(in srgb, var(--club-primary) 8%, transparent)' } : undefined}
          >
            <div className="min-w-0 text-right">{home && <TimelineText item={it} />}</div>
            <div
              className={`text-center font-display font-bold tabular-nums ${isGoal ? 'text-[var(--club-primary)]' : 'text-muted'}`}
            >
              {it.minute || '—'}
            </div>
            <div className="min-w-0">{!home && <TimelineText item={it} />}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Sastavi ---------- */

/** Oznake uz igrača u sastavu: golovi, kartoni i izmjene s minutama. */
interface PlayerMarks {
  goals: string[]
  cards: { type: 'yellow' | 'second_yellow' | 'red'; minute: string }[]
  subIn?: string
  subOut?: string
}

function marksFor(detail: MatchDetail, side: 'home' | 'away') {
  const map = new Map<string, PlayerMarks>()
  const get = (name: string) => {
    if (!map.has(name)) map.set(name, { goals: [], cards: [] })
    return map.get(name)!
  }
  for (const g of detail.goals) {
    if (g.side === side && !g.player.endsWith('(autogol)')) get(stripGoalSuffix(g.player)).goals.push(g.minute)
  }
  for (const e of detail.events ?? []) {
    if (e.side !== side) continue
    if (e.type === 'sub') {
      if (e.player) get(e.player).subIn = e.minute
      if (e.playerOut) get(e.playerOut).subOut = e.minute
    } else get(e.player).cards.push({ type: e.type, minute: e.minute })
  }
  return map
}

function PlayerRow({ entry, gk, marks }: { entry: string; gk?: boolean; marks?: PlayerMarks }) {
  const p = parsePlayer(entry)
  return (
    <li className="row-hover -mx-2 flex items-center gap-3 rounded-md px-2 py-1.5">
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded font-display text-xs font-bold"
        style={{ background: 'var(--surface-2)' }}
      >
        {p.number}
      </span>
      <span className="min-w-0 font-medium">{p.name}</span>
      {gk && (
        <span className="rounded bg-[var(--club-primary)] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
          GK
        </span>
      )}
      {p.captain && (
        <span className="rounded bg-[var(--club-red)] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
          Kapetan
        </span>
      )}
      {marks && (
        <span className="text-muted ml-auto flex shrink-0 flex-wrap items-center justify-end gap-x-2.5 gap-y-1 text-xs tabular-nums">
          {marks.goals.map((m, i) => (
            <span key={`g${i}`} className="inline-flex items-center gap-0.5" title={`Gol ${m}`}>
              ⚽<span>{m}</span>
            </span>
          ))}
          {marks.cards.map((c, i) => (
            <span key={`c${i}`} className="inline-flex items-center gap-1">
              <CardIcon type={c.type} />
              {c.minute}
            </span>
          ))}
          {marks.subIn && (
            <span className="inline-flex items-center">
              <SubIn />
              {marks.subIn}
            </span>
          )}
          {marks.subOut && (
            <span className="inline-flex items-center">
              <SubOut />
              {marks.subOut}
            </span>
          )}
        </span>
      )}
    </li>
  )
}

function TeamColumn({ sheet, marks }: { sheet: TeamSheet; marks: Map<string, PlayerMarks> }) {
  const markOf = (entry: string) => marks.get(parsePlayer(entry).name)
  return (
    <div className="tile-hover rounded-2xl border border-app p-5" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="mb-4 flex items-center gap-3">
        <ClubCrest name={sheet.team} size={34} />
        <h3 className="font-display text-lg font-bold">{sheet.team}</h3>
      </div>

      {sheet.starters.length === 0 ? (
        <p className="text-muted text-sm">Sastav nije prijavljen.</p>
      ) : (
        <>
      <h4 className="text-muted mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
        <Shirt size={14} /> Početni sastav
      </h4>
      <ul className="mb-4 divide-y divide-[color:var(--border)]">
        {sheet.starters.map((e, i) => (
          <PlayerRow key={e} entry={e} gk={i === 0} marks={markOf(e)} />
        ))}
      </ul>

      <h4 className="text-muted mb-1 text-xs font-semibold uppercase tracking-wider">
        Pričuvni igrači
      </h4>
      <ul className="mb-4 divide-y divide-[color:var(--border)]">
        {sheet.bench.map((e) => (
          <PlayerRow key={e} entry={e} marks={markOf(e)} />
        ))}
      </ul>

      <div className="text-muted border-t border-app pt-3 text-sm">
        <span className="text-xs uppercase tracking-wider">Trener:</span>{' '}
        <span className="font-semibold text-[var(--text)]">{sheet.coach}</span>
      </div>
        </>
      )}
    </div>
  )
}

export default function MatchDetail() {
  const { id } = useParams()
  const team = id ? teamOfMatch(id) : undefined
  const match = team?.matches.find((m) => m.id === id)
  const detail = id ? team?.details[id] : undefined

  if (!match || !detail || match.homeScore === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold">Detalji nisu dostupni</h1>
        <p className="text-muted mt-3">Za ovu utakmicu još nema dostupnih detalja.</p>
        <Link to="/utakmice" className="mt-6 inline-flex items-center gap-2 text-[var(--club-primary)]">
          <ArrowLeft size={16} /> Natrag na utakmice
        </Link>
      </div>
    )
  }

  const events = detail.events ?? []
  const timeline: TimelineItem[] = [
    ...detail.goals.map((g) => ({ kind: 'goal' as const, ...g })),
    ...events.map((e) => ({ kind: 'event' as const, ...e })),
  ].sort((a, b) => minuteNum(a.minute) - minuteNum(b.minute))
  const hasSubs = events.some((e) => e.type === 'sub')

  return (
    <div>
      {/* Zaglavlje s rezultatom */}
      <div className="border-b border-app" style={{ backgroundColor: 'var(--club-primary-700)' }}>
        <div className="mx-auto max-w-5xl px-4 pb-10 pt-24 text-white sm:px-6">
          <Link
            to="/utakmice"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            <ArrowLeft size={16} /> Sve utakmice
          </Link>

          <div className="text-center text-sm font-semibold uppercase tracking-wider text-white/80">
            {team!.label} · {match.competition} · {detail.round}. kolo
          </div>

          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
              <span className="order-2 font-display text-xl font-bold sm:order-1 sm:text-right">
                {match.home}
              </span>
              <ClubCrest name={match.home} size={56} className="order-1 sm:order-2" />
            </div>
            <div className="font-display text-5xl font-extrabold tabular-nums sm:text-6xl">
              {match.homeScore} : {match.awayScore}
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <ClubCrest name={match.away} size={56} />
              <span className="font-display text-xl font-bold">{match.away}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock size={15} /> {formatDate(match.date)} · {match.time}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {detail.venue}
            </span>
            {detail.attendance != null && (
              <span className="inline-flex items-center gap-1.5">
                <Users size={15} /> {detail.attendance} gledatelja
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6">
        {/* Tijek utakmice: golovi, kartoni i izmjene */}
        <Reveal>
          <section>
            <h2 className="mb-4 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
              <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
              Tijek utakmice
            </h2>
            {detail.note ? (
              <p className="text-muted">{detail.note}</p>
            ) : timeline.length === 0 ? (
              <p className="text-muted">Bez pogodaka i upisanih događaja.</p>
            ) : (
              <>
                <div className="text-muted mb-2 grid grid-cols-[1fr_3.5rem_1fr] gap-2 px-3 text-xs font-semibold uppercase tracking-wider sm:px-4">
                  <span className="truncate text-right">{match.home}</span>
                  <span />
                  <span className="truncate">{match.away}</span>
                </div>
                <Timeline items={timeline} />
                <div className="text-muted mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
                  <span>⚽ gol</span>
                  <span className="inline-flex items-center gap-1.5"><CardIcon type="yellow" /> žuti karton</span>
                  <span className="inline-flex items-center gap-1.5"><CardIcon type="second_yellow" /> drugi žuti</span>
                  <span className="inline-flex items-center gap-1.5"><CardIcon type="red" /> crveni karton</span>
                  <span className="inline-flex items-center gap-1"><SubIn /> ulazi</span>
                  <span className="inline-flex items-center gap-1"><SubOut /> izlazi</span>
                </div>
                {!hasSubs && (
                  <p className="text-muted mt-2 text-xs">
                    Izmjene za ovu utakmicu nisu upisane u zapisnik (u mlađim uzrastima izmjene su leteće).
                  </p>
                )}
              </>
            )}
          </section>
        </Reveal>

        {/* Postave */}
        <Reveal delay={0.05}>
          <section>
            <h2 className="mb-4 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
              <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
              Sastavi
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <TeamColumn sheet={detail.home} marks={marksFor(detail, 'home')} />
              <TeamColumn sheet={detail.away} marks={marksFor(detail, 'away')} />
            </div>
          </section>
        </Reveal>

        {/* Suci */}
        <Reveal delay={0.1}>
          <section className="tile-hover rounded-2xl border border-app p-5" style={{ backgroundColor: 'var(--surface)' }}>
            <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider">
              <Flag size={15} /> Suci
            </h3>
            <p className="text-muted">{detail.referees.join(' · ')}</p>
          </section>
        </Reveal>

      </div>
    </div>
  )
}
