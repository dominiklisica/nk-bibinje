import PageHeader from '../components/ui/PageHeader'
import SourceTag from '../components/ui/SourceTag'
import Reveal from '../components/ui/Reveal'
import ClubCrest from '../components/ui/ClubCrest'
import { STANDINGS } from '../data/standings'
import { CLUB } from '../data/club'
import { CLUB_NAME } from '../lib/stats'

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
  return (
    <div>
      <PageHeader
        title="Prvenstvena tablica"
        subtitle={`${CLUB.league} · sezona ${CLUB.season}`}
      />
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
              {STANDINGS.map((row) => {
                const mine = row.club === CLUB_NAME
                return (
                  <tr
                    key={row.position}
                    className="border-b border-app last:border-0"
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
                      <div className="flex items-center gap-2.5">
                        <ClubCrest name={row.club} size={28} />
                        <span className={mine ? 'font-display font-bold text-[var(--club-primary)]' : 'font-medium'}>
                          {row.club}
                        </span>
                      </div>
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
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div></Reveal>
        <div className="mt-4">
          <SourceTag />
        </div>
      </div>
    </div>
  )
}
