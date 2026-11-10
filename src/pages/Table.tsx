import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import HeadToHead from '../components/ui/HeadToHead'
import Reveal from '../components/ui/Reveal'
import ClubCrest from '../components/ui/ClubCrest'
import TeamPicker from '../components/ui/TeamPicker'
import { CLUB } from '../data/club'
import { CLUB_NAME } from '../lib/stats'
import { useTeam } from '../hooks/useTeam'

const COLS: { key: string; label: string; title: string }[] = [
  { key: 'played', label: 'Ut', title: 'Odigrane utakmice' },
  { key: 'won', label: 'Pob', title: 'Pobjede' },
  { key: 'drawn', label: 'Ner', title: 'Neriješeno' },
  { key: 'lost', label: 'Por', title: 'Porazi' },
  { key: 'goalsFor', label: 'G+', title: 'Postignuti golovi' },
  { key: 'goalsAgainst', label: 'G−', title: 'Primljeni golovi' },
  { key: 'goalDiff', label: 'GR', title: 'Gol-razlika' },
]

export default function Table() {
  const { team } = useTeam()
  // Prozorčić s utakmicama protiv kluba: mišem se otvara prelaskom, dodirom/klikom ostaje otvoren.
  const [open, setOpen] = useState<{ club: string; anchor: HTMLElement; pinned: boolean } | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const popId = useId()

  const cancelHide = () => window.clearTimeout(closeTimer.current)
  const show = (club: string, anchor: HTMLElement, pinned: boolean) => {
    cancelHide()
    setOpen((o) => (o?.pinned && o.club !== club && !pinned ? o : { club, anchor, pinned: pinned || (o?.club === club && o.pinned) }))
  }
  const hideSoon = () => {
    cancelHide()
    closeTimer.current = window.setTimeout(() => setOpen((o) => (o?.pinned ? o : null)), 160)
  }
  const toggle = (club: string, anchor: HTMLElement) => {
    cancelHide()
    setOpen((o) => (o?.club === club && o.pinned ? null : { club, anchor, pinned: true }))
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!open.anchor.contains(t) && !document.getElementById(popId)?.contains(t)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, popId])

  useEffect(() => () => cancelHide(), [])
  // Prozorčić pripada klubu iz tablice trenutne ekipe; nakon promjene ekipe se ne prikazuje.
  const visible = open && team.standings.some((r) => r.club === open.club) ? open : null

  return (
    <div>
      <PageHeader
        title="Prvenstvena tablica"
        subtitle={`${team.league} · sezona ${CLUB.season}`}
        bgImage="/slike/tablica-hd.jpg"
        imgPosition="center 60%"
      >
        <TeamPicker className="mt-6" />
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Reveal
          className="overflow-x-auto rounded-2xl border border-app"
        ><div style={{ backgroundColor: 'var(--surface)' }} className="rounded-2xl">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-muted border-b border-app text-xs uppercase">
                <th className="px-3 py-3 text-left font-semibold">#</th>
                <th className="px-3 py-3 text-left font-semibold">Klub</th>
                {COLS.map((c) => (
                  <th key={c.key} title={c.title} className="px-3 py-3 text-center font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-3 py-3 text-center font-semibold">Bod</th>
              </tr>
            </thead>
            <tbody>
              {team.standings.map((row) => {
                const mine = row.club === CLUB_NAME
                return (
                  <tr
                    key={row.position}
                    className="row-hover border-b border-app last:border-0"
                    style={
                      mine
                        ? { backgroundColor: 'color-mix(in srgb, var(--club-primary) 12%, transparent)' }
                        : undefined
                    }
                  >
                    <td className="px-3 py-3">
                      <span
                        className="inline-grid h-6 w-6 place-items-center rounded font-display text-xs font-bold"
                        style={
                          row.position <= 1
                            ? { background: 'var(--club-accent)', color: '#fff' }
                            : mine
                              ? { background: 'var(--club-primary)', color: '#fff' }
                              : { color: 'var(--text-muted)' }
                        }
                      >
                        {row.position}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {mine ? (
                        <div className="flex items-center gap-2.5">
                          <ClubCrest name={row.club} size={28} />
                          <span className="font-display font-bold text-[var(--club-primary)]">{row.club}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          aria-expanded={open?.club === row.club}
                          aria-controls={open?.club === row.club ? popId : undefined}
                          onPointerEnter={(e) => e.pointerType === 'mouse' && show(row.club, e.currentTarget, false)}
                          onPointerLeave={(e) => e.pointerType === 'mouse' && hideSoon()}
                          onClick={(e) => toggle(row.club, e.currentTarget)}
                          className={`-mx-1.5 flex items-center gap-2.5 rounded-lg px-1.5 py-1 text-left font-medium transition-colors hover:bg-[var(--surface-2)] ${
                            open?.club === row.club ? 'bg-[var(--surface-2)]' : ''
                          }`}
                        >
                          <ClubCrest name={row.club} size={28} />
                          <span className="underline decoration-dotted decoration-1 underline-offset-4 [text-decoration-color:var(--text-muted)]">
                            {row.club}
                          </span>
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums">{row.played}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{row.won}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{row.drawn}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{row.lost}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{row.goalsFor}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{row.goalsAgainst}</td>
                    <td className="px-3 py-3 text-center tabular-nums">
                      {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                    </td>
                    <td className="px-3 py-3 text-center font-display text-base font-extrabold tabular-nums">
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
        </div></Reveal>
        <AnimatePresence>
          {visible && (
            <HeadToHead
              key={visible.club}
              id={popId}
              team={team}
              club={visible.club}
              anchor={visible.anchor}
              onPointerEnter={cancelHide}
              onPointerLeave={hideSoon}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
