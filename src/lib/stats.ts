import { MATCHES } from '../data/matches'
import { STANDINGS } from '../data/standings'
import { SQUAD } from '../data/squad'
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

/** Sve utakmice NK Bibinje, kronološki. */
export function bibinjeMatches(): Match[] {
  return MATCHES.filter((m) => isBibinje(m.home) || isBibinje(m.away)).sort(
    (a, b) => a.date.localeCompare(b.date),
  )
}

export function finishedMatches(): Match[] {
  return bibinjeMatches().filter((m) => m.status === 'finished')
}

export function upcomingMatches(): Match[] {
  return bibinjeMatches().filter((m) => m.status === 'upcoming')
}

export function nextMatch(): Match | undefined {
  return upcomingMatches()[0]
}

export function lastResult(): BibinjeResult | undefined {
  const finished = finishedMatches()
  const last = finished[finished.length - 1]
  return last ? perspective(last) ?? undefined : undefined
}

/** Zadnjih n rezultata (najnoviji zadnji). */
export function lastResults(n = 5): BibinjeResult[] {
  return finishedMatches()
    .slice(-n)
    .map((m) => perspective(m))
    .filter((r): r is BibinjeResult => r !== null)
}

/** Forma (W/D/L) zadnjih n utakmica, kronološki. */
export function form(n = 5): FormResult[] {
  return lastResults(n).map((r) => r.outcome)
}

export function bibinjeStanding(): StandingRow | undefined {
  return STANDINGS.find((r) => isBibinje(r.club))
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

export function seasonStats(): SeasonStats {
  const results = finishedMatches()
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
export function topScorers(n = 5): Player[] {
  return [...SQUAD]
    .filter((p) => p.goals > 0)
    .sort((a, b) => b.goals - a.goals || b.minutes - a.minutes)
    .slice(0, n)
}

export const goalkeepers = () => SQUAD.filter((p) => p.position === 'GK')
export const outfielders = () => SQUAD.filter((p) => p.position === 'OUTFIELD')
