import { Link } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'
import PlayerPhoto from '../ui/PlayerPhoto'
import { useTeam } from '../../hooks/useTeam'

/** Vodoravna traka igrača odabrane ekipe (s fotografijom), najviše nastupa prvi. */
export default function HomePlayers() {
  const { team } = useTeam()
  const players = team.squad
    .filter((p) => p.photo)
    .sort((a, b) => b.appearances - a.appearances || b.goals - a.goals)
    .slice(0, 10)
  if (players.length < 3) return null

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 font-display text-3xl font-extrabold uppercase tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--club-primary)] text-white">
            <Users size={18} />
          </span>
          Momčad
          <span className="text-muted font-sans text-base font-semibold normal-case tracking-normal">{team.label}</span>
        </h2>
        <Link to="/momcad" className="inline-flex shrink-0 items-center gap-1 font-display text-sm font-bold uppercase tracking-wide text-[var(--club-primary)] hover:underline">
          Cijela momčad <ArrowRight size={16} />
        </Link>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 [scrollbar-width:thin]">
        {players.map((p) => (
          <Link
            key={p.id}
            to="/momcad"
            className="card-hover group relative aspect-[3/4] w-44 shrink-0 snap-start overflow-hidden rounded-2xl sm:w-52"
            style={{ background: 'linear-gradient(135deg, var(--club-primary-700), var(--club-primary))' }}
          >
            <PlayerPhoto player={p} />
            <span className="absolute left-3 top-2 font-display text-5xl font-extrabold leading-none text-white/90 drop-shadow">
              {p.number || ''}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <div className="font-display text-xl font-extrabold uppercase leading-tight">{p.name}</div>
              <div className="mt-0.5 text-xs text-white/80">
                {p.position === 'GK' ? 'Vratar' : 'Igrač'} · {p.appearances} nast.
                {p.position !== 'GK' && p.goals > 0 ? ` · ${p.goals} gol.` : ''}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
