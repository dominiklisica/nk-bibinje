import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import ClubCrest from './ClubCrest'
import { TEAMS, type Team } from '../../data/teams'
import { useTeam } from '../../hooks/useTeam'
import { CLUB_NAME } from '../../lib/stats'

function TeamText({ team }: { team: Team }) {
  return (
    <span className="min-w-0 text-left">
      <span className="block truncate font-display text-base font-bold uppercase leading-tight tracking-wide">
        {team.label} {CLUB_NAME}
      </span>
      <span className="text-muted block truncate text-xs">{team.league} · 2026/27</span>
    </span>
  )
}

/**
 * Padajući izbornik ekipe (uzrasta), po uzoru na HNS Semafor:
 * svaka stavka pokazuje ekipu ("Pioniri NK Bibinje") i ligu u kojoj igra.
 */
export default function TeamPicker({ className = '' }: { className?: string }) {
  const { team, setTeam } = useTeam()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    if (open) listRef.current?.focus()
  }, [open])

  const openList = () => {
    setActive(TEAMS.findIndex((t) => t.key === team.key))
    setOpen(true)
  }
  const choose = (i: number) => {
    setTeam(TEAMS[i].key)
    setOpen(false)
  }

  const onListKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') setActive((i) => Math.min(i + 1, TEAMS.length - 1))
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(i - 1, 0))
    else if (e.key === 'Home') setActive(0)
    else if (e.key === 'End') setActive(TEAMS.length - 1)
    else if (e.key === 'Enter' || e.key === ' ') choose(active)
    else if (e.key === 'Escape' || e.key === 'Tab') setOpen(false)
    else return
    e.preventDefault()
  }

  return (
    <div ref={rootRef} className={`relative w-full max-w-md text-[var(--text)] ${className}`}>
      <span className="mb-1.5 block text-left text-xs font-semibold uppercase tracking-wider text-white/85">
        Odaberi ekipu
      </span>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            openList()
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className="flex w-full items-center gap-3 rounded-xl border border-app px-3 py-2.5 shadow-lg transition-colors hover:border-[var(--club-primary)]"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <ClubCrest name={CLUB_NAME} size={36} />
        <TeamText team={team} />
        <ChevronDown
          size={20}
          className={`ml-auto shrink-0 text-[var(--club-primary)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label="Ekipe NK Bibinje"
          aria-activedescendant={`${listId}-${active}`}
          onKeyDown={onListKey}
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-app p-1 shadow-xl outline-none"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          {TEAMS.map((t, i) => {
            const selected = t.key === team.key
            return (
              <li
                key={t.key}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5"
                style={
                  i === active
                    ? { backgroundColor: 'color-mix(in srgb, var(--club-primary) 12%, transparent)' }
                    : undefined
                }
              >
                <ClubCrest name={CLUB_NAME} size={30} />
                <TeamText team={t} />
                {selected && <Check size={18} className="ml-auto shrink-0 text-[var(--club-primary)]" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
