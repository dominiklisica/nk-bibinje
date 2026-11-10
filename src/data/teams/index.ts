import type { Coach, Match, MatchDetail, Player, StandingRow } from '../../types'
import * as seniori from './seniori'
import * as pioniri from './pioniri'
import * as mladjiPioniri from './mladji-pioniri'
import * as tici from './tici'
import * as papaline from './papaline'
import { applyOverrides } from './overrides'

// Sve ekipe NK Bibinje u sezoni 2026/27 — izvor: HNS Semafor (COMET).
// Podaci ekipa (seniori.ts, pioniri.ts ...) generiraju se naredbom `npm run sync`.
// Redoslijed je redoslijed u padajućem izborniku.
export type TeamKey = 'seniori' | 'pioniri' | 'mladji-pioniri' | 'tici' | 'papaline'

export interface Team {
  key: TeamKey
  /** Naziv uzrasta, npr. "Pioniri". */
  label: string
  /** Kratki opis uzrasta (format igre). */
  category: string
  league: string
  /** Natjecanje na HNS Semaforu (parametar ?cid=). */
  semaforCid: number
  /** Mlađi uzrasti na Semaforu nemaju evidentirane minute. */
  hasMinutes: boolean
  matches: Match[]
  details: Record<string, MatchDetail>
  standings: StandingRow[]
  squad: Player[]
  coaches: Coach[]
}

export const TEAMS: Team[] = [
  {
    key: 'seniori',
    label: 'Seniori',
    category: 'Seniori',
    league: '1. ŽNL Zadarska',
    semaforCid: 115235266,
    hasMinutes: true,
    matches: seniori.MATCHES,
    details: seniori.MATCH_DETAILS,
    standings: seniori.STANDINGS,
    squad: applyOverrides('seniori', seniori.SQUAD),
    coaches: seniori.COACHES,
  },
  {
    key: 'pioniri',
    label: 'Pioniri',
    category: 'Pioniri (10+1)',
    league: 'MŽNL Pioniri A',
    semaforCid: 116265214,
    hasMinutes: false,
    matches: pioniri.MATCHES,
    details: pioniri.MATCH_DETAILS,
    standings: pioniri.STANDINGS,
    squad: applyOverrides('pioniri', pioniri.SQUAD),
    coaches: pioniri.COACHES,
  },
  {
    key: 'mladji-pioniri',
    label: 'Mlađi pioniri',
    category: 'Mlađi pioniri (8+1)',
    league: 'MŽNL Mlađi pioniri C',
    semaforCid: 116553575,
    hasMinutes: false,
    matches: mladjiPioniri.MATCHES,
    details: mladjiPioniri.MATCH_DETAILS,
    standings: mladjiPioniri.STANDINGS,
    squad: applyOverrides('mladji-pioniri', mladjiPioniri.SQUAD),
    coaches: mladjiPioniri.COACHES,
  },
  {
    key: 'tici',
    label: 'Limači (7+1)',
    category: 'Limači (7+1)',
    league: 'MŽNL Tići A',
    semaforCid: 116554937,
    hasMinutes: false,
    matches: tici.MATCHES,
    details: tici.MATCH_DETAILS,
    standings: tici.STANDINGS,
    squad: applyOverrides('tici', tici.SQUAD),
    coaches: tici.COACHES,
  },
  {
    key: 'papaline',
    label: 'Limači (6+1)',
    category: 'Limači (6+1)',
    league: 'MŽNL Papaline A',
    semaforCid: 116555537,
    hasMinutes: false,
    matches: papaline.MATCHES,
    details: papaline.MATCH_DETAILS,
    standings: papaline.STANDINGS,
    squad: applyOverrides('papaline', papaline.SQUAD),
    coaches: papaline.COACHES,
  },
]

export const DEFAULT_TEAM: TeamKey = 'seniori'

export function getTeam(key: string | null | undefined): Team | undefined {
  return TEAMS.find((t) => t.key === key)
}

/** Ekipa kojoj pripada utakmica (id-jevi su jedinstveni preko svih ekipa). */
export function teamOfMatch(matchId: string): Team | undefined {
  return TEAMS.find((t) => t.matches.some((m) => m.id === matchId))
}

export function semaforUrl(team: Team): string {
  return `https://semafor.hns.family/klubovi/213/nk-bibinje/?cid=${team.semaforCid}`
}
