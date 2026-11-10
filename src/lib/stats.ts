import type { Team } from '../data/teams'
import type { FormResult, Match, Player, StandingRow } from '../types'

export const CLUB_NAME = 'NK Bibinje'

const isBibinje = (name: string) => name === CLUB_NAME

/** Rezultat utakmice iz perspektive NK Bibinje. */
export interface BibinjeResult {
  match: Match
  isHome: boolean
  opponent: string
  goalsFor: number
  goalsAgainst: number
  outcome: FormResult
}

export function perspective(match: Match): BibinjeResult | null {
  if (match.homeScore === null || match.awayScore === null) return null
  const isHome = isBibinje(match.home)
  const goalsFor = isHome ? match.homeScore : match.awayScore
  const goalsAgainst = isHome ? match.awayScore : match.homeScore
  const outcome: FormResult =
    goalsFor > goalsAgainst ? 'W' : goalsFor < goalsAgainst ? 'L' : 'D'
  return {
    match,
    isHome,
    opponent: isHome ? match.away : match.home,
    goalsFor,
    goalsAgainst,
    outcome,
  }
}

/** Sve utakmice ekipe NK Bibinje, kronološki. */
export function bibinjeMatches(team: Team): Match[] {
  return team.matches
    .filter((m) => isBibinje(m.home) || isBibinje(m.away))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function finishedMatches(team: Team): Match[] {
  return bibinjeMatches(team).filter((m) => m.status === 'finished')
}

/** Nadolazeće i odgođene utakmice (odgođene su još neodigrane). */
export function upcomingMatches(team: Team): Match[] {
  return bibinjeMatches(team).filter((m) => m.status !== 'finished')
}

// Stanje neodigrane utakmice računa se u pregledniku prema trenutnom vremenu,
// da odbrojavanje i oznake ostanu točni i kad podaci nisu svježe preuzeti.
const MATCH_LENGTH = 2 * 3_600_000
const AWAIT_RESULT = 7 * 86_400_000

export const kickoff = (m: Match) => new Date(`${m.date}T${m.time || '12:00'}:00`).getTime()

/** 'live' do 2 h od početka, 'awaiting' (čeka upis rezultata) do 7 dana, zatim 'postponed'. */
export type MatchState = 'finished' | 'upcoming' | 'live' | 'awaiting' | 'postponed'

export function matchState(m: Match, now = Date.now()): MatchState {
  if (m.status === 'finished') return 'finished'
  const since = now - kickoff(m)
  if (since < 0) return 'upcoming'
  if (since < MATCH_LENGTH) return 'live'
  if (since < AWAIT_RESULT) return 'awaiting'
  return 'postponed'
}

export const MATCH_STATE_LABEL: Record<Exclude<MatchState, 'finished' | 'upcoming'>, string> = {
  live: 'U tijeku',
  awaiting: 'Čeka rezultat',
  postponed: 'Odgođeno',
}

/** Prva utakmica koja još nije završila (ili je upravo u tijeku). */
export function nextMatch(team: Team, now = Date.now()): Match | undefined {
  return bibinjeMatches(team).find((m) => {
    const s = matchState(m, now)
    return s === 'upcoming' || s === 'live'
  })
}

export function lastResult(team: Team): BibinjeResult | undefined {
  const finished = finishedMatches(team)
  const last = finished[finished.length - 1]
  return last ? perspective(last) ?? undefined : undefined
}

/** Zadnjih n rezultata (najnoviji zadnji). */
export function lastResults(team: Team, n = 5): BibinjeResult[] {
  return finishedMatches(team)
    .slice(-n)
    .map((m) => perspective(m))
    .filter((r): r is BibinjeResult => r !== null)
}

/** Forma (W/D/L) zadnjih n utakmica, kronološki. */
export function form(team: Team, n = 5): FormResult[] {
  return lastResults(team, n).map((r) => r.outcome)
}

export function bibinjeStanding(team: Team): StandingRow | undefined {
  return team.standings.find((r) => isBibinje(r.club))
}

/** Agregirana sezonska statistika — izračunato iz odigranih utakmica. */
export interface SeasonStats {
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalsPerGame: number
  home: { wins: number; draws: number; losses: number }
  away: { wins: number; draws: number; losses: number }
}

export function seasonStats(team: Team): SeasonStats {
  const results = finishedMatches(team)
    .map((m) => perspective(m))
    .filter((r): r is BibinjeResult => r !== null)

  const base = {
    played: results.length,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalsPerGame: 0,
    home: { wins: 0, draws: 0, losses: 0 },
    away: { wins: 0, draws: 0, losses: 0 },
  }

  for (const r of results) {
    base.goalsFor += r.goalsFor
    base.goalsAgainst += r.goalsAgainst
    const bucket = r.isHome ? base.home : base.away
    if (r.outcome === 'W') {
      base.wins++
      bucket.wins++
    } else if (r.outcome === 'D') {
      base.draws++
      bucket.draws++
    } else {
      base.losses++
      bucket.losses++
    }
  }
  base.goalsPerGame = base.played
    ? Math.round((base.goalsFor / base.played) * 100) / 100
    : 0
  return base
}

/** Najbolji strijelci — samo igrači s postignutim golovima. */
export function topScorers(team: Team, n = 5): Player[] {
  return [...team.squad]
    .filter((p) => p.goals > 0)
    .sort((a, b) => b.goals - a.goals || b.minutes - a.minutes || b.appearances - a.appearances)
    .slice(0, n)
}

// Tablica ponekad uz naziv nosi oduzete bodove, npr. "NŠK Pag (-1)".
const clubKey = (name: string) => name.replace(/\s*\(-\d+\)\s*$/, '').trim().toLowerCase()

/** Sve utakmice ekipe protiv zadanog kluba (oba susreta), kronološki. */
export function matchesVs(team: Team, club: string): Match[] {
  const key = clubKey(club)
  return bibinjeMatches(team).filter((m) => clubKey(isBibinje(m.home) ? m.away : m.home) === key)
}

/** Jedna utakmica u kojoj je igrač bio u zapisniku. */
export interface PlayerMatchLine {
  match: Match
  result: BibinjeResult | null
  started: boolean
  captain: boolean
  /** Minute golova, npr. ["23'", "80' (11 m)"]. */
  goals: string[]
}

/** Dodatna statistika igrača izračunata iz zapisnika odigranih utakmica. */
export interface PlayerSeason {
  lines: PlayerMatchLine[]
  starts: number
  benchListed: number
  captaincies: number
  /** Pobjede–neriješeno–porazi utakmica u kojima je bio u početnom sastavu. */
  record: { wins: number; draws: number; losses: number }
}

const sheetName = (entry: string) =>
  entry.replace(/\(C\)/, '').trim().replace(/^\S+\s+/, '')

export function playerSeason(team: Team, player: Player): PlayerSeason {
  const lines: PlayerMatchLine[] = []
  for (const match of finishedMatches(team)) {
    const d = team.details[match.id]
    if (!d) continue
    const sheet = isBibinje(d.home.team) ? d.home : d.away
    const side = sheet === d.home ? 'home' : 'away'
    const starter = sheet.starters.find((e) => sheetName(e) === player.name)
    const bench = sheet.bench.find((e) => sheetName(e) === player.name)
    const entry = starter ?? bench
    if (!entry) continue
    const goals = d.goals
      .filter((g) => g.side === side && g.player.replace(/ \((11 m)\)$/, '') === player.name)
      .map((g) => (g.player.endsWith('(11 m)') ? `${g.minute} (11 m)` : g.minute))
    lines.push({
      match,
      result: perspective(match),
      started: !!starter,
      captain: /\(C\)/.test(entry),
      goals,
    })
  }
  const record = { wins: 0, draws: 0, losses: 0 }
  for (const l of lines) {
    if (!l.started || !l.result) continue
    if (l.result.outcome === 'W') record.wins++
    else if (l.result.outcome === 'D') record.draws++
    else record.losses++
  }
  return {
    lines: lines.reverse(), // najnovije prve
    starts: lines.filter((l) => l.started).length,
    benchListed: lines.filter((l) => !l.started).length,
    captaincies: lines.filter((l) => l.captain).length,
    record,
  }
}

export const goalkeepers = (team: Team) => team.squad.filter((p) => p.position === 'GK')
export const outfielders = (team: Team) => team.squad.filter((p) => p.position === 'OUTFIELD')
