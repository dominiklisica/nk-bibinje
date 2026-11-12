// Gradi src/data/history.ts (povijest seniorskih sezona) iz scripts/semafor-raw/povijest-seniori.json.
// Taj JSON se čita u pregledniku sa Semafora (stranica kluba za svaku sezonu, vidi semafor-browser.js
// semaforClubPage) i sprema pod ključem sezone, npr. "2022/23".
//
// Pokretanje: node scripts/history-build.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BIB = 'NK Bibinje'
const raw = JSON.parse(readFileSync(join(ROOT, 'scripts/semafor-raw/povijest-seniori.json'), 'utf8'))

const league = (comp) => {
  const m = comp.match(/(\d)\.\s*žnl/i)
  return m ? `${m[1]}. ŽNL Zadarska` : comp
}

const seasons = Object.entries(raw)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([season, d]) => {
    const row = d.standings.find((s) => s.club === BIB)
    const matches = d.matches
      .filter((m) => m.date && (m.home === BIB || m.away === BIB))
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((m) => ({
        date: m.date,
        round: m.round,
        home: m.home,
        away: m.away,
        homeScore: m.homeScore,
        awayScore: m.awayScore,
        ...(m.note ? { note: m.note } : {}),
      }))
    const scorers = d.players
      .filter((p) => p.role !== 'Vratar' && p.goals > 0)
      .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name, 'hr'))
      .slice(0, 5)
      .map((p) => ({ name: p.name, goals: p.goals, apps: p.apps }))
    return {
      season,
      league: league(d.comp),
      position: row?.position ?? null,
      teams: d.standings.length,
      standings: d.standings.map(({ position, club, played, won, drawn, lost, goalsFor, goalsAgainst, points, deduction }) => ({
        position, club, played, won, drawn, lost, goalsFor, goalsAgainst, points, ...(deduction ? { deduction } : {}),
      })),
      matches,
      scorers,
      players: d.players.length,
    }
  })

// Najbolji strijelci svih sezona (zbroj po imenu; vratari isključeni jer Semafor kod njih vodi primljene golove)
const total = new Map()
for (const d of Object.values(raw)) {
  for (const p of d.players) {
    if (p.role === 'Vratar' || !p.name) continue
    const t = total.get(p.name) ?? { name: p.name, goals: 0, apps: 0, seasons: 0 }
    t.goals += p.goals
    t.apps += p.apps
    t.seasons += 1
    total.set(p.name, t)
  }
}
const allTime = [...total.values()].filter((p) => p.goals > 0).sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name, 'hr')).slice(0, 10)
const mostApps = [...total.values()].sort((a, b) => b.apps - a.apps || a.name.localeCompare(b.name, 'hr')).slice(0, 10)

writeFileSync(
  join(ROOT, 'src/data/history.ts'),
  `// Povijest seniorskih sezona NK Bibinje — generirano skriptom scripts/history-build.mjs
// iz HNS Semafora (COMET). Ne uređuj ručno.

export interface HistoryMatch {
  date: string
  round: number | null
  home: string
  away: string
  homeScore: number | null
  awayScore: number | null
  /** npr. "BB" (bez borbe) */
  note?: string
}

export interface HistoryRow {
  position: number
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  deduction?: number
}

export interface HistorySeason {
  season: string
  league: string
  /** Konačni plasman NK Bibinje (null ako ga nema u tablici). */
  position: number | null
  teams: number
  standings: HistoryRow[]
  matches: HistoryMatch[]
  scorers: { name: string; goals: number; apps: number }[]
  players: number
}

/** Najnovija sezona prva. */
export const HISTORY: HistorySeason[] = ${JSON.stringify(seasons)}

export interface CareerTotal {
  name: string
  goals: number
  apps: number
  seasons: number
}

/** Najbolji strijelci svih sezona na Semaforu (od ${seasons.at(-1).season}.). */
export const ALL_TIME_SCORERS: CareerTotal[] = ${JSON.stringify(allTime)}

/** Najviše prvenstvenih nastupa. */
export const MOST_APPEARANCES: CareerTotal[] = ${JSON.stringify(mostApps)}
`,
)
console.log(`Sezona: ${seasons.length}, utakmica: ${seasons.reduce((n, s) => n + s.matches.length, 0)}`)
for (const s of seasons) console.log(`${s.season} ${s.league}: ${s.position}. od ${s.teams}, ${s.matches.length} ut., strijelac: ${s.scorers[0]?.name ?? '-'} ${s.scorers[0]?.goals ?? ''}`)
