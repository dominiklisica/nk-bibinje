import PageHeader from '../components/ui/PageHeader'
import SourceTag from '../components/ui/SourceTag'
import Reveal from '../components/ui/Reveal'
import FormBadges from '../components/ui/FormBadges'
import { seasonStats, form, topScorers } from '../lib/stats'
import { SQUAD } from '../data/squad'

function Tile({ value, label, accent }: { value: string | number; label: string; accent?: boolean }) {
  return (
    <div
      className="rounded-2xl border border-app p-5"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div
        className="font-display text-4xl font-extrabold tabular-nums"
        style={accent ? { color: 'var(--club-primary)' } : undefined}
      >
        {value}
      </div>
      <div className="text-muted mt-1 text-sm">{label}</div>
    </div>
  )
}

export default function Stats() {
  const s = seasonStats()
  const scorers = topScorers(6)

  return (
    <div>
      <PageHeader
        title="Statistika"
        subtitle="Sezonski učinak NK Bibinje."
        bgImage="/slike/galerija/slavlje-3.jpg"
        imgPosition="center 12%"
      />
      <Reveal className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6">
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Tile value={s.played} label="Odigrano" />
            <Tile value={s.wins} label="Pobjede" accent />
            <Tile value={s.draws} label="Neriješeno" />
            <Tile value={s.losses} label="Porazi" />
            <Tile value={s.goalsFor} label="Dani golovi" />
            <Tile value={s.goalsAgainst} label="Primljeni" />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-app p-6" style={{ backgroundColor: 'var(--surface)' }}>
            <h3 className="font-display text-lg font-bold uppercase">Golovi po utakmici</h3>
            <div className="font-display mt-2 text-5xl font-extrabold" style={{ color: 'var(--club-primary)' }}>
              {s.goalsPerGame.toLocaleString('hr-HR')}
            </div>
            <p className="text-muted mt-1 text-sm">prosjek postignutih golova</p>
          </div>

          <div className="rounded-2xl border border-app p-6" style={{ backgroundColor: 'var(--surface)' }}>
            <h3 className="font-display text-lg font-bold uppercase">Doma</h3>
            <div className="font-display mt-2 text-3xl font-extrabold tabular-nums">
              {s.home.wins}-{s.home.draws}-{s.home.losses}
            </div>
            <p className="text-muted mt-1 text-sm">pobjede – neriješeno – porazi</p>
          </div>

          <div className="rounded-2xl border border-app p-6" style={{ backgroundColor: 'var(--surface)' }}>
            <h3 className="font-display text-lg font-bold uppercase">U gostima</h3>
            <div className="font-display mt-2 text-3xl font-extrabold tabular-nums">
              {s.away.wins}-{s.away.draws}-{s.away.losses}
            </div>
            <p className="text-muted mt-1 text-sm">pobjede – neriješeno – porazi</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-app p-6" style={{ backgroundColor: 'var(--surface)' }}>
            <h3 className="mb-4 font-display text-lg font-bold uppercase">Forma</h3>
            <FormBadges form={form(5)} size={34} />
            <p className="text-muted mt-3 text-sm">posljednje odigrane utakmice (kronološki)</p>
          </div>

          <div className="rounded-2xl border border-app p-6" style={{ backgroundColor: 'var(--surface)' }}>
            <h3 className="mb-4 font-display text-lg font-bold uppercase">Najbolji strijelci</h3>
            <div className="space-y-2">
              {scorers.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="w-8 font-display font-bold tabular-nums">{p.goals}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--surface-2)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(p.goals / scorers[0].goals) * 100}%`, background: 'var(--club-primary)' }}
                    />
                  </div>
                  <span className="w-40 truncate text-sm">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Statistika po igraču ===== */}
        <section>
          <h3 className="mb-4 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
            <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
            Statistika po igraču
          </h3>
          <div
            className="overflow-x-auto rounded-2xl border border-app"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="text-muted border-b border-app text-xs uppercase">
                  <th className="px-3 py-3 text-left font-semibold">#</th>
                  <th className="px-3 py-3 text-left font-semibold">Igrač</th>
                  <th className="px-3 py-3 text-center font-semibold" title="Nastupi">Nast.</th>
                  <th className="px-3 py-3 text-center font-semibold">Minute</th>
                  <th className="px-3 py-3 text-center font-semibold">Golovi</th>
                  <th className="px-3 py-3 text-center font-semibold" title="Žuti kartoni">ŽK</th>
                  <th className="px-3 py-3 text-center font-semibold" title="Crveni kartoni">CK</th>
                </tr>
              </thead>
              <tbody>
                {[...SQUAD]
                  .sort((a, b) => b.minutes - a.minutes)
                  .map((p) => {
                    const isGK = p.position === 'GK'
                    return (
                      <tr key={p.id} className="border-b border-app last:border-0">
                        <td className="px-3 py-2.5">
                          <span
                            className="inline-grid h-6 w-6 place-items-center rounded font-display text-xs font-bold text-white"
                            style={{ background: 'var(--club-primary)' }}
                          >
                            {p.number}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="font-medium">{p.name}</span>
                          {isGK && (
                            <span
                              className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                              style={{ background: 'var(--club-red)' }}
                            >
                              Vratar
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums">{p.appearances}</td>
                        <td className="px-3 py-2.5 text-center tabular-nums">{p.minutes}</td>
                        <td className="px-3 py-2.5 text-center font-display font-bold tabular-nums">
                          {isGK ? '—' : p.goals}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-muted">
                          {p.yellowCards || '–'}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums text-muted">
                          {p.redCards || '–'}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </section>

        <SourceTag />
      </Reveal>
    </div>
  )
}
