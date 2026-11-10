import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import ClubCrest from './ClubCrest'
import PlayerPhoto from './PlayerPhoto'
import type { Team } from '../../data/teams'
import type { Player } from '../../types'
import { finishedMatches, playerSeason, seasonStats, topScorers } from '../../lib/stats'
import { asset } from '../../lib/asset'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y.slice(2)}.`
}

function Tile({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="tile-hover rounded-xl border border-app px-3 py-2.5" style={{ backgroundColor: 'var(--surface-2)' }}>
      <div className="font-display text-2xl font-extrabold tabular-nums leading-none">{value}</div>
      <div className="text-muted mt-1 text-[11px] uppercase tracking-wide">{label}</div>
    </div>
  )
}

function Meter({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="text-muted text-xs uppercase tracking-wide">{label}</span>
        <span className="whitespace-nowrap font-display font-bold tabular-nums">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--surface-2)' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, pct))}%`, background: 'var(--club-primary)' }}
        />
      </div>
    </div>
  )
}

/** Kratki pregled doprinosa ispod fotografije. */
function Contribution({ player, team }: { player: Player; team: Team }) {
  const isGK = player.position === 'GK'
  const s = playerSeason(team, player)
  const played = finishedMatches(team).length
  const teamGoals = seasonStats(team).goalsFor
  const scorers = topScorers(team, team.squad.length)
  const rank = scorers.findIndex((p) => p.id === player.id) + 1
  // Vratar: odigrane utakmice od početka bez primljenog gola.
  const cleanSheets = s.lines.filter((l) => l.started && l.result?.goalsAgainst === 0).length
  // Samo utakmice od početka — za "klupu" zapisnik ne kaže je li ušao u igru.
  const form = s.lines.filter((l) => l.started).slice(0, 5).reverse()

  return (
    <div className="relative z-10 space-y-4 p-5 sm:p-6">
      <Meter
        label="Odigrane utakmice ekipe"
        value={`${player.appearances} / ${played}`}
        pct={played ? (player.appearances / played) * 100 : 0}
      />
      {isGK ? (
        <Meter
          label="Bez primljenog gola"
          value={`${cleanSheets} / ${s.starts}`}
          pct={s.starts ? (cleanSheets / s.starts) * 100 : 0}
        />
      ) : (
        <Meter
          label="Udio u golovima ekipe"
          value={teamGoals ? `${Math.round((player.goals / teamGoals) * 100)} %` : '—'}
          pct={teamGoals ? (player.goals / teamGoals) * 100 : 0}
        />
      )}
      {!isGK && (
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-muted text-xs uppercase tracking-wide">Strijelci u ekipi</span>
          <span className="font-display font-bold">{rank > 0 ? `${rank}. mjesto` : 'bez gola'}</span>
        </div>
      )}
      {form.length > 0 && (
        <div>
          <div className="text-muted mb-1.5 text-xs uppercase tracking-wide">Forma kad igra od početka</div>
          <div className="flex gap-1.5">
            {form.map((l) => {
              const o = l.result ? OUTCOME[l.result.outcome] : null
              return o ? (
                <span
                  key={l.match.id}
                  title={`${l.result!.opponent} ${l.result!.goalsFor}:${l.result!.goalsAgainst}`}
                  className="grid h-7 w-7 place-items-center rounded font-display text-sm font-bold text-white"
                  style={{ background: o.bg }}
                >
                  {o.label}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const OUTCOME = {
  W: { bg: '#2e7d34', label: 'P' },
  D: { bg: '#9a8a2e', label: 'N' },
  L: { bg: '#c0392b', label: 'I' },
}

/**
 * Uvećana kartica igrača s dodatnom statistikom. Pozadina se zamagli;
 * zatvara se na ✕, klik izvan kartice ili tipku Esc.
 * Dijeli layoutId s karticom u mreži pa se "rasteže" iz nje.
 */
export default function PlayerModal({
  player,
  team,
  onClose,
}: {
  player: Player
  team: Team
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const isGK = player.position === 'GK'
  const s = playerSeason(team, player)
  const perGame = player.appearances ? (player.goals / player.appearances).toLocaleString('hr-HR', { maximumFractionDigits: 2 }) : '0'
  const minPerGoal = team.hasMinutes && player.goals ? Math.round(player.minutes / player.goals) : null

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 sm:p-6">
      <motion.div
        className="absolute inset-0 bg-black/45 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`player-${player.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`player-${player.id}-name`}
        // Mobitel: cijela kartica se pomiče; šire: fotografija stoji, pomiče se samo desni stupac.
        className="relative grid max-h-[90dvh] w-full max-w-3xl grid-cols-1 overflow-y-auto overflow-x-hidden overscroll-contain rounded-3xl border border-app shadow-2xl sm:h-[min(90dvh,680px)] sm:grid-cols-[2fr_3fr] sm:grid-rows-[minmax(0,1fr)] sm:overflow-hidden"
        style={{ backgroundColor: 'var(--surface)' }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        {/* Fotografija; ispod nje na širem zaslonu ostaje pozadina kartice s grbom.
            Zeleni prijelaz vidi se samo ako igrač nema fotografiju. */}
        <div className="sm:min-h-0 sm:overflow-y-auto sm:overscroll-contain">
          <div
            className="relative z-10 flex aspect-[4/3] items-end justify-between p-4 sm:aspect-[4/5]"
            style={{ background: 'linear-gradient(135deg, var(--club-primary-700), var(--club-primary))' }}
          >
            <PlayerPhoto player={player} />
            <span className="relative font-display text-6xl font-extrabold leading-none text-white/90">
              {player.number}
            </span>
            <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              {isGK ? 'Vratar' : 'Igrač'}
            </span>
          </div>
          <Contribution player={player} team={team} />
        </div>

        {/* Statistika */}
        <motion.div
          className="relative z-10 p-5 sm:min-h-0 sm:overflow-y-auto sm:overscroll-contain sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-muted text-xs font-semibold uppercase tracking-wider">
                {team.label} · {team.league}
              </div>
              <h2 id={`player-${player.id}-name`} className="mt-1 font-display text-3xl font-extrabold leading-tight">
                {player.name}
              </h2>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Zatvori"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-app hover:text-[var(--club-primary)]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Tile value={player.appearances} label="Nastupi" />
            {team.hasMinutes && <Tile value={player.minutes} label="Minute" />}
            {isGK ? (
              <Tile value={player.goalsConceded ?? '—'} label="Primljeni" />
            ) : (
              <Tile value={player.goals} label="Golovi" />
            )}
            <Tile value={s.starts} label="Početni sastav" />
            {s.captaincies > 0 && <Tile value={s.captaincies} label="Kapetan" />}
            {!isGK && <Tile value={perGame} label="Gol / utakmica" />}
            {minPerGoal && <Tile value={minPerGoal} label="Minuta po golu" />}
            <Tile value={player.yellowCards} label="Žuti kartoni" />
            <Tile value={player.redCards} label="Crveni kartoni" />
          </div>

          {s.starts > 0 && (
            <p className="text-muted mt-4 text-sm">
              Kad je u početnom sastavu, ekipa ima{' '}
              <span className="font-semibold text-[var(--text)]">
                {s.record.wins} pob. · {s.record.draws} ner. · {s.record.losses} por.
              </span>
            </p>
          )}

          <h3 className="mt-6 mb-2 font-display text-lg font-bold uppercase tracking-tight">Utakmice</h3>
          {s.lines.length === 0 ? (
            <p className="text-muted text-sm">Nema upisanih utakmica u zapisnicima.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--border)] rounded-xl border border-app">
              {s.lines.map((l) => {
                const o = l.result ? OUTCOME[l.result.outcome] : null
                return (
                  <li key={l.match.id}>
                    <Link
                      to={`/utakmice/${l.match.id}`}
                      className="row-hover flex items-center gap-3 px-3 py-2 text-sm"
                    >
                      <span className="text-muted w-16 shrink-0 tabular-nums">{formatDate(l.match.date)}</span>
                      {l.result && <ClubCrest name={l.result.opponent} size={22} className="hidden sm:block" />}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">
                          {l.result?.isHome ? '' : '@ '}
                          {l.result?.opponent}
                        </span>
                        <span className="text-muted block text-xs">
                          {l.started ? 'od početka' : 'klupa'}
                          {l.captain && <span className="ml-1.5 font-bold text-[var(--club-red)]">kapetan</span>}
                          {l.goals.length > 0 && <span className="ml-1.5">· gol {l.goals.join(', ')}</span>}
                        </span>
                      </span>
                      {l.result && o && (
                        <span className="flex shrink-0 items-center gap-1.5">
                          <span className="font-display font-bold tabular-nums">
                            {l.result.goalsFor}:{l.result.goalsAgainst}
                          </span>
                          <span className="grid h-5 w-5 place-items-center rounded text-[11px] font-bold text-white" style={{ background: o.bg }}>
                            {o.label}
                          </span>
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          <p className="text-muted mt-2 text-xs">
            Prema zapisnicima utakmica; „klupa” znači da je bio prijavljen kao pričuvni igrač.
          </p>
        </motion.div>

        {/* Grb kluba kao vodeni žig preko cijele kartice: iznad pozadina, ali ispod
            fotografije i sadržaja (oni imaju z-10). */}
        <div className="pointer-events-none absolute inset-0 z-0 grid place-items-center overflow-hidden" aria-hidden="true">
          <img src={asset('/grb.jpg')} alt="" className="crest-overlay h-[92%] max-h-[620px] w-auto object-contain" />
        </div>
      </motion.div>
    </div>
  )
}
