import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CalendarClock,
  MapPin,
  Trophy,
  ChevronRight,
  Target,
  ArrowRight,
} from 'lucide-react'
import Crest from '../components/Crest'
import ClubCrest from '../components/ui/ClubCrest'
import Countdown from '../components/ui/Countdown'
import FormBadges from '../components/ui/FormBadges'
import SourceTag from '../components/ui/SourceTag'
import Reveal from '../components/ui/Reveal'
import { CLUB } from '../data/club'
import {
  nextMatch,
  lastResults,
  form,
  bibinjeStanding,
  topScorers,
  CLUB_NAME,
} from '../lib/stats'
import { STANDINGS } from '../data/standings'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  const wd = new Date(`${iso}T12:00:00`).toLocaleDateString('hr-HR', { weekday: 'long' })
  return `${wd}, ${d}.${m}.${y}.`
}

export default function Home() {
  const next = nextMatch()
  const results = lastResults(5)
  const myForm = form(5)
  const standing = bibinjeStanding()
  const scorers = topScorers(5)

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-16">
        {/* Pozadina: stvarna fotografija momčadi (slavlje) + zeleni overlay radi čitljivosti */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/slike/naslovna.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(13,107,45,0.80), rgba(19,138,60,0.60) 55%, rgba(10,79,35,0.82))',
            }}
          />
        </div>
        <div
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 60%, #fff 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-col items-center text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Crest size={120} />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider backdrop-blur-sm"
            >
              <Trophy size={14} /> {CLUB.league} · {CLUB.season}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 font-display text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-7xl"
            >
              {CLUB.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 max-w-xl text-lg text-white/85"
            >
              {CLUB.fullName} · osnovan {CLUB.founded}. Službena stranica s
              rezultatima, rasporedom, tablicom i statistikom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <Link
                to="/utakmice"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display font-bold uppercase tracking-wide text-[var(--club-primary)] transition-transform hover:-translate-y-0.5"
              >
                Raspored utakmica <ArrowRight size={18} />
              </Link>
              <Link
                to="/tablica"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-display font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Prvenstvena tablica
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6">
        {/* ================= SLJEDEĆA UTAKMICA ================= */}
        {next && (
          <Reveal>
            <section>
              <SectionTitle icon={<CalendarClock size={18} />} title="Sljedeća utakmica" tone="red" />
              <div
                className="overflow-hidden rounded-2xl border border-app"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="text-muted flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Trophy size={14} /> {next.competition}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock size={14} /> {formatDate(next.date)} · {next.time}
                      </span>
                      {next.venue && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} /> {next.venue}
                        </span>
                      )}
                    </div>
                    <div className="mt-5 flex items-center gap-4">
                      <TeamName name={next.home} />
                      <span className="font-display text-2xl font-bold text-muted">vs</span>
                      <TeamName name={next.away} align="right" />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <span className="text-muted text-xs uppercase tracking-wider">
                      Početak za
                    </span>
                    <Countdown date={next.date} time={next.time} />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <SourceTag />
              </div>
            </section>
          </Reveal>
        )}

        {/* ================= POSLJEDNJI REZULTATI + FORMA ================= */}
        <Reveal>
          <section>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionTitle icon={<Target size={18} />} title="Posljednji rezultati" />
              <div className="flex items-center gap-3">
                <span className="text-muted text-sm uppercase tracking-wider">Forma</span>
                <FormBadges form={myForm} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results
                .slice()
                .reverse()
                .map((r) => (
                  <div
                    key={r.match.id}
                    className="card-hover rounded-xl border border-app p-4"
                    style={{ backgroundColor: 'var(--surface)' }}
                  >
                    <div className="text-muted flex items-center justify-between text-xs">
                      <span>{formatDate(r.match.date)}</span>
                      <OutcomeChip outcome={r.outcome} />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display font-bold">
                        {r.isHome ? CLUB_NAME : r.opponent}
                      </span>
                      <span className="font-display text-xl font-extrabold tabular-nums">
                        {r.match.homeScore} : {r.match.awayScore}
                      </span>
                      <span className="font-display font-bold">
                        {r.isHome ? r.opponent : CLUB_NAME}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-3">
              <SourceTag />
            </div>
          </section>
        </Reveal>

        {/* ================= MINI TABLICA + STRIJELCI ================= */}
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <section>
              <div className="flex items-center justify-between">
                <SectionTitle icon={<Trophy size={18} />} title="Na tablici" tone="red" />
                <Link
                  to="/tablica"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--club-primary)]"
                >
                  Cijela tablica <ChevronRight size={16} />
                </Link>
              </div>
              <div
                className="overflow-hidden rounded-xl border border-app"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted border-b border-app text-left text-xs uppercase">
                      <th className="px-3 py-2 font-semibold">#</th>
                      <th className="px-3 py-2 font-semibold">Klub</th>
                      <th className="px-3 py-2 text-center font-semibold">Ut</th>
                      <th className="px-3 py-2 text-center font-semibold">GR</th>
                      <th className="px-3 py-2 text-center font-semibold">Bod</th>
                    </tr>
                  </thead>
                  <tbody>
                    {miniTableRows(standing?.position).map((row) => {
                      const mine = row.club === CLUB_NAME
                      return (
                        <tr
                          key={row.position}
                          className="border-b border-app last:border-0"
                          style={mine ? { backgroundColor: 'color-mix(in srgb, var(--club-primary) 12%, transparent)' } : undefined}
                        >
                          <td className="px-3 py-2 font-display font-bold">{row.position}</td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <ClubCrest name={row.club} size={22} />
                              <span className={mine ? 'font-bold text-[var(--club-primary)]' : ''}>
                                {row.club}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-center tabular-nums">{row.played}</td>
                          <td className="px-3 py-2 text-center tabular-nums">
                            {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                          </td>
                          <td className="px-3 py-2 text-center font-display font-extrabold tabular-nums">
                            {row.points}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3">
                <SourceTag />
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <section>
              <SectionTitle icon={<Target size={18} />} title="Najbolji strijelci" />
              <div
                className="divide-y divide-[color:var(--border)] overflow-hidden rounded-xl border border-app"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                {scorers.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-4 px-4 py-3">
                    <span className="text-muted w-5 text-center font-display font-bold">
                      {i + 1}
                    </span>
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full font-display text-sm font-bold text-white"
                      style={{ background: 'var(--club-primary)' }}
                    >
                      {p.number}
                    </span>
                    <span className="flex-1 font-semibold">{p.name}</span>
                    <span className="font-display text-lg font-extrabold">{p.goals}</span>
                    <span className="text-muted text-xs">gol.</span>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <SourceTag />
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

/* ---------- Pomoćne komponente ---------- */

function SectionTitle({
  icon,
  title,
  tone = 'green',
}: {
  icon: React.ReactNode
  title: string
  tone?: 'green' | 'red'
}) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span
        className="grid h-10 w-10 place-items-center rounded-lg text-white"
        style={{ background: tone === 'red' ? 'var(--club-red)' : 'var(--club-primary)' }}
      >
        {icon}
      </span>
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
        {title}
      </h2>
    </div>
  )
}

function TeamName({ name, align = 'left' }: { name: string; align?: 'left' | 'right' }) {
  const mine = name === CLUB_NAME
  return (
    <div className={`flex flex-1 items-center gap-3 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <ClubCrest name={name} size={38} />
      <span className={`font-display text-lg font-bold ${mine ? 'text-[var(--club-primary)]' : ''}`}>
        {name}
      </span>
    </div>
  )
}

function OutcomeChip({ outcome }: { outcome: 'W' | 'D' | 'L' }) {
  const map = {
    W: { bg: '#2e7d34', label: 'Pobjeda' },
    D: { bg: '#9a8a2e', label: 'Neriješeno' },
    L: { bg: '#c0392b', label: 'Poraz' },
  }
  const s = map[outcome]
  return (
    <span className="rounded px-2 py-0.5 text-[11px] font-bold uppercase text-white" style={{ background: s.bg }}>
      {s.label}
    </span>
  )
}

/** Nekoliko redova tablice oko pozicije Bibinja. */
function miniTableRows(myPos?: number) {
  if (!myPos) return STANDINGS.slice(0, 6)
  const start = Math.max(0, Math.min(myPos - 3, STANDINGS.length - 6))
  return STANDINGS.slice(start, start + 6)
}
