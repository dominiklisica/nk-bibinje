import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarClock, ChevronRight } from 'lucide-react'
import ClubCrest from './ClubCrest'
import type { Team } from '../../data/teams'
import { CLUB_NAME, MATCH_STATE_LABEL, matchState, matchesVs, perspective } from '../../lib/stats'

const WIDTH = 296
const GAP = 8

const OUTCOME = {
  W: { bg: '#2e7d34', label: 'Pobjeda' },
  D: { bg: '#9a8a2e', label: 'Neriješeno' },
  L: { bg: '#c0392b', label: 'Poraz' },
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  const wd = new Date(`${iso}T12:00:00`).toLocaleDateString('hr-HR', { weekday: 'short' })
  return `${wd}, ${d}.${m}.${y}.`
}

function daysUntil(iso: string) {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  return Math.round((new Date(`${iso}T12:00:00`).getTime() - today.getTime()) / 86_400_000)
}

/**
 * Mali prozor uz klub u tablici: susreti NK Bibinje s tim klubom —
 * rezultat ako je odigrano, inače datum (i za koliko dana).
 * Crta se u <body> s fiksnom pozicijom, da ga ne odreže okvir tablice.
 */
export default function HeadToHead({
  team,
  club,
  anchor,
  id,
  onPointerEnter,
  onPointerLeave,
}: {
  team: Team
  club: string
  anchor: HTMLElement
  id: string
  onPointerEnter: () => void
  onPointerLeave: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; above: boolean } | null>(null)
  const matches = matchesVs(team, club)

  useLayoutEffect(() => {
    const place = () => {
      const r = anchor.getBoundingClientRect()
      const h = ref.current?.offsetHeight ?? 0
      const above = r.bottom + GAP + h > window.innerHeight && r.top - GAP - h > 0
      const left = Math.min(Math.max(8, r.left), window.innerWidth - WIDTH - 8)
      setPos({ top: above ? r.top - GAP - h : r.bottom + GAP, left, above })
    }
    place()
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [anchor])

  return createPortal(
    <motion.div
      ref={ref}
      id={id}
      role="dialog"
      aria-label={`${CLUB_NAME} protiv ${club}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      initial={{ opacity: 0, y: pos?.above ? 6 : -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className="fixed z-[70] overflow-hidden rounded-2xl border border-app shadow-2xl"
      style={{
        width: WIDTH,
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        backgroundColor: 'var(--surface)',
      }}
    >
      <div
        className="flex items-center gap-2.5 px-4 py-3 text-white"
        style={{ background: 'linear-gradient(135deg, var(--club-primary-700), var(--club-primary))' }}
      >
        <ClubCrest name={CLUB_NAME} size={26} />
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">protiv</span>
        <ClubCrest name={club} size={26} />
        <span className="min-w-0 truncate font-display font-bold">{club}</span>
      </div>

      {matches.length === 0 ? (
        <p className="text-muted px-4 py-3 text-sm">Nema utakmica s ovim klubom u rasporedu.</p>
      ) : (
        <ul className="divide-y divide-[color:var(--border)]">
          {matches.map((m) => {
            const p = perspective(m)
            const home = m.home === CLUB_NAME
            const where = (
              <span className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
                {home ? 'Doma' : 'U gostima'}
              </span>
            )
            if (m.status === 'finished' && p) {
              const o = OUTCOME[p.outcome]
              return (
                <li key={m.id}>
                  <Link
                    to={`/utakmice/${m.id}`}
                    className="row-hover block px-4 py-3"
                  >
                    <div className="text-muted flex items-center justify-between gap-2 text-xs">
                      <span>{formatDate(m.date)}</span>
                      {where}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-display text-2xl font-extrabold tabular-nums">
                        {m.homeScore} : {m.awayScore}
                      </span>
                      <span
                        className="rounded px-2 py-0.5 text-[11px] font-bold uppercase text-white"
                        style={{ background: o.bg }}
                      >
                        {o.label}
                      </span>
                      <span className="ml-auto inline-flex items-center text-xs font-semibold text-[var(--club-primary)]">
                        Detalji <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            }
            const days = daysUntil(m.date)
            const state = matchState(m)
            return (
              <li key={m.id} className="px-4 py-3">
                <div className="text-muted flex items-center justify-between gap-2 text-xs">
                  <span>{state === 'upcoming' || state === 'finished' ? 'Nadolazeće' : MATCH_STATE_LABEL[state]}</span>
                  {where}
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-sm">
                  <CalendarClock size={15} className="shrink-0 text-[var(--club-primary)]" />
                  <span className="font-semibold">
                    {formatDate(m.date)} · {m.time}
                  </span>
                </div>
                {state === 'upcoming' && days >= 0 && (
                  <div className="text-muted mt-1 text-xs">
                    {days === 0 ? 'Danas' : days === 1 ? 'Sutra' : `Za ${days} dana`}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </motion.div>,
    document.body,
  )
}
