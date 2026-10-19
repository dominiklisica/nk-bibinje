import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, CalendarClock, Users, Flag, Shirt } from 'lucide-react'
import ClubCrest from '../components/ui/ClubCrest'
import Reveal from '../components/ui/Reveal'
import SourceTag from '../components/ui/SourceTag'
import { MATCHES } from '../data/matches'
import { MATCH_DETAILS } from '../data/matchDetails'

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

function PlayerRow({ entry, gk }: { entry: string; gk?: boolean }) {
  const p = parsePlayer(entry)
  return (
    <li className="flex items-center gap-3 py-1.5">
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded font-display text-xs font-bold"
        style={{ background: 'var(--surface-2)' }}
      >
        {p.number}
      </span>
      <span className="font-medium">{p.name}</span>
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
    </li>
  )
}

function TeamColumn({
  sheet,
}: {
  sheet: { team: string; starters: string[]; bench: string[]; coach: string }
}) {
  return (
    <div className="rounded-2xl border border-app p-5" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="mb-4 flex items-center gap-3">
        <ClubCrest name={sheet.team} size={34} />
        <h3 className="font-display text-lg font-bold">{sheet.team}</h3>
      </div>

      <h4 className="text-muted mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
        <Shirt size={14} /> Početni sastav
      </h4>
      <ul className="mb-4 divide-y divide-[color:var(--border)]">
        {sheet.starters.map((e, i) => (
          <PlayerRow key={e} entry={e} gk={i === 0} />
        ))}
      </ul>

      <h4 className="text-muted mb-1 text-xs font-semibold uppercase tracking-wider">
        Pričuvni igrači
      </h4>
      <ul className="mb-4 divide-y divide-[color:var(--border)]">
        {sheet.bench.map((e) => (
          <PlayerRow key={e} entry={e} />
        ))}
      </ul>

      <div className="text-muted border-t border-app pt-3 text-sm">
        <span className="text-xs uppercase tracking-wider">Trener:</span>{' '}
        <span className="font-semibold text-[var(--text)]">{sheet.coach}</span>
      </div>
    </div>
  )
}

export default function MatchDetail() {
  const { id } = useParams()
  const match = MATCHES.find((m) => m.id === id)
  const detail = id ? MATCH_DETAILS[id] : undefined

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
            {match.competition} · {detail.round}. kolo
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
        {/* Golovi */}
        <Reveal>
          <section>
            <h2 className="mb-4 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
              <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
              Golovi
            </h2>
            {detail.goals.length === 0 ? (
              <p className="text-muted">Bez pogodaka.</p>
            ) : (
              <div
                className="overflow-hidden rounded-2xl border border-app"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                {detail.goals.map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border-b border-app px-4 py-3 last:border-0"
                  >
                    {g.side === 'home' ? (
                      <>
                        <span className="font-display w-12 font-bold text-[var(--club-primary)]">
                          {g.minute}
                        </span>
                        <span className="font-medium">⚽ {g.player}</span>
                        <span className="text-muted ml-auto text-xs">{match.home}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-muted mr-auto text-xs">{match.away}</span>
                        <span className="font-medium">{g.player} ⚽</span>
                        <span className="font-display w-12 text-right font-bold text-[var(--club-primary)]">
                          {g.minute}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
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
              <TeamColumn sheet={detail.home} />
              <TeamColumn sheet={detail.away} />
            </div>
          </section>
        </Reveal>

        {/* Suci */}
        <Reveal delay={0.1}>
          <section className="rounded-2xl border border-app p-5" style={{ backgroundColor: 'var(--surface)' }}>
            <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider">
              <Flag size={15} /> Suci
            </h3>
            <p className="text-muted">{detail.referees.join(' · ')}</p>
          </section>
        </Reveal>

        <p className="text-muted text-sm">
          Napomena: pojedinačne izmjene i kartoni nisu strukturirano dostupni iz
          izvora, pa su ovdje prikazani početni sastavi, pričuvni igrači i
          strijelci. Gdje podatak ne postoji, ne prikazujemo ga.
        </p>
        <SourceTag />
      </div>
    </div>
  )
}
