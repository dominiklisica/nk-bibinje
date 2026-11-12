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
import { asset } from '../lib/asset'
import ClubCrest from '../components/ui/ClubCrest'
import Countdown from '../components/ui/Countdown'
import FormBadges from '../components/ui/FormBadges'
import Reveal from '../components/ui/Reveal'
import TeamPicker from '../components/ui/TeamPicker'
import InstallButton from '../components/ui/InstallButton'
import { CLUB } from '../data/club'
import type { StandingRow } from '../types'
import { useTeam } from '../hooks/useTeam'
import {
  nextMatch,
  lastResults,
  form,
  bibinjeStanding,
  topScorers,
  CLUB_NAME,
} from '../lib/stats'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  const wd = new Date(`${iso}T12:00:00`).toLocaleDateString('hr-HR', { weekday: 'long' })
  return `${wd}, ${d}.${m}.${y}.`
}

export default function Home() {
  const { team } = useTeam()
  const next = nextMatch(team)
  const results = lastResults(team, 5)
  const myForm = form(team, 5)
  const standing = bibinjeStanding(team)
  const scorers = topScorers(team, 5)

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-16">
        {/* Pozadina: stvarna fotografija momčadi (slavlje) + zeleni overlay radi čitljivosti */}
        <div className="absolute inset-0 -z-10">
          <img
            src={asset('/slike/naslovna.jpg')}
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

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative z-20 mt-6 flex w-full justify-center"
            >
              <TeamPicker />
            </motion.div>

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
              {CLUB.fullName} osnovan je {CLUB.founded} godine. Na službenoj
              stranici kluba pratite rezultate, raspored, tablicu i statistiku.
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
              <InstallButton variant="hero" />
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
                className="tile-hover overflow-hidden rounded-2xl border border-app"
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
                  <Link
                    key={r.match.id}
                    to={`/utakmice/${r.match.id}`}
                    className="card-hover block rounded-xl border border-app p-4"
                    style={{ backgroundColor: 'var(--surface)' }}
                  >
                    <div className="text-muted flex items-center justify-between text-xs">
                      <span>{formatDate(r.match.date)}</span>
                      <OutcomeChip outcome={r.outcome} />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        <ClubCrest name={r.match.home} size={28} />
                        <span className="font-display font-bold leading-tight">{r.match.home}</span>
                      </span>
                      <span className="shrink-0 font-display text-xl font-extrabold tabular-nums">
                        {r.match.homeScore} : {r.match.awayScore}
                      </span>
                      <span className="flex min-w-0 flex-1 items-center justify-end gap-2 text-right">
                        <span className="font-display font-bold leading-tight">{r.match.away}</span>
                        <ClubCrest name={r.match.away} size={28} />
                      </span>
                    </div>
                  </Link>
                ))}
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
                    {miniTableRows(team.standings, standing?.position).map((row) => {
                      const mine = row.club === CLUB_NAME
                      return (
                        <tr
                          key={row.position}
                          className="row-hover border-b border-app last:border-0"
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
                            {row.deduction ? (
                              <sup
                                className="ml-0.5 text-[10px] font-bold text-[var(--club-red)]"
                                title={`Oduzeto bodova: ${row.deduction}`}
                              >
                                −{row.deduction}
                              </sup>
                            ) : null}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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
                  <div key={p.id} className="row-hover flex items-center gap-4 px-4 py-3">
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
            </section>
          </Reveal>
        </div>

        <Reveal>
          <Link
            to="/skola-nogometa"
            className="card-hover group relative mt-12 flex min-h-[200px] items-end overflow-hidden rounded-3xl p-7 text-white sm:p-9"
          >
            <img
              src={asset('/slike/galerija/druzenje-uz-svlacionicu.webp?v=1')}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: 'center 45%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--club-primary-700)] via-[color:var(--club-primary-700)]/80 to-transparent" />
            <div className="relative max-w-lg">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">Škola nogometa</span>
              <h2 className="mt-1 font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">Upiši dijete u NK Bibinje</h2>
              <p className="mt-2 text-white/85">Uzrasti, treneri i kako se upisati — sve na jednom mjestu.</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-display font-bold uppercase tracking-wide text-[var(--club-primary-700)]">
                Saznaj više <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
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
function miniTableRows(standings: StandingRow[], myPos?: number) {
  if (!myPos) return standings.slice(0, 6)
  const start = Math.max(0, Math.min(myPos - 3, standings.length - 6))
  return standings.slice(start, start + 6)
}
