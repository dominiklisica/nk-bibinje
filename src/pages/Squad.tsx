import PageHeader from '../components/ui/PageHeader'
import SourceTag from '../components/ui/SourceTag'
import Reveal from '../components/ui/Reveal'
import PlayerPhoto from '../components/ui/PlayerPhoto'
import { goalkeepers, outfielders } from '../lib/stats'
import type { Player } from '../types'

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-lg font-extrabold tabular-nums">{value}</div>
      <div className="text-muted text-[10px] uppercase tracking-wide">{label}</div>
    </div>
  )
}

function PlayerCard({ player }: { player: Player }) {
  const isGK = player.position === 'GK'
  return (
    <div
      className="card-hover overflow-hidden rounded-2xl border border-app"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Fotografija igrača ako postoji; inače uredan placeholder s brojem. */}
      <div
        className="relative flex aspect-square items-end justify-between p-4"
        style={{ background: 'linear-gradient(135deg, var(--club-primary-700), var(--club-primary))' }}
      >
        <PlayerPhoto player={player} />
        <span className="relative font-display text-4xl font-extrabold leading-none text-white/90">
          {player.number}
        </span>
        <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {isGK ? 'Vratar' : 'Igrač'}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-bold leading-tight">{player.name}</h3>
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-app pt-4">
          <Stat value={player.appearances} label="Nastupi" />
          <Stat value={player.minutes} label="Minute" />
          {isGK ? (
            <Stat value={player.goalsConceded ?? 0} label="Primljeni" />
          ) : (
            <Stat value={player.goals} label="Golovi" />
          )}
        </div>
        {(player.yellowCards > 0 || player.redCards > 0) && (
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted">
            {player.yellowCards > 0 && (
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-2.5 rounded-sm bg-[#f1c40f]" /> {player.yellowCards}
              </span>
            )}
            {player.redCards > 0 && (
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-2.5 rounded-sm bg-[#c0392b]" /> {player.redCards}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Group({ title, players }: { title: string; players: Player[] }) {
  return (
    <section className="mb-12">
      <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
        <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
        {title}
        <span className="text-muted text-base font-semibold">({players.length})</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((p, i) => (
          <Reveal key={p.id} delay={Math.min((i % 4) * 0.06, 0.24)}>
            <PlayerCard player={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Squad() {
  return (
    <div>
      <PageHeader
        title="Momčad"
        subtitle="Sastav NK Bibinje u sezoni 2026/27 sa statistikom nastupa."
        bgImage="/slike/momcad.jpg"
      >
        <p className="mt-4 max-w-2xl text-sm text-white/80">
          Službeni izvor (HNS) razlikuje vratare i ostale igrače. Detaljnije
          pozicije (branič / vezni / napadač) i fotografije dodat ćemo kroz
          administratorsko sučelje, bez izmišljanja podataka.
        </p>
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Group title="Vratari" players={goalkeepers()} />
        <Group title="Igrači" players={outfielders()} />
        <SourceTag />
      </div>
    </div>
  )
}
