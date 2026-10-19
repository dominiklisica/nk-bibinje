// =========================================================
// Tipovi podataka za NK Bibinje
// =========================================================

export type MatchStatus = 'finished' | 'upcoming'

export interface Match {
  id: string
  date: string // ISO datum, npr. "2026-09-19"
  time: string // "17:00"
  home: string
  away: string
  homeScore: number | null
  awayScore: number | null
  competition: string
  /** Broj kola — opcionalno; dodaje se kad se potvrdi iz HNS-a. */
  round?: number
  /** Stadion domaćina ako je poznat. */
  venue?: string
  status: MatchStatus
}

export type PlayerPosition = 'GK' | 'OUTFIELD'

export interface Player {
  id: string
  number: number
  name: string
  position: PlayerPosition
  appearances: number
  minutes: number
  /** Postignuti golovi (za igrače). Za vratare je 0 — vidi goalsConceded. */
  goals: number
  /** Primljeni golovi — ima smisla samo za vratare (GK). */
  goalsConceded?: number
  yellowCards: number
  redCards: number
  /**
   * Putanja do fotografije igrača (npr. "/players/silov.jpg").
   * Dodaje se tek kad postoje prava na korištenje; inače se prikazuje
   * uredan placeholder. Ne koristimo tuđe fotografije bez dopuštenja.
   */
  photo?: string
}

export interface StandingRow {
  position: number
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
}

export type FormResult = 'W' | 'D' | 'L'

export interface ClubInfo {
  name: string
  fullName: string
  founded: string
  foundedYear: number
  town: string
  address: string
  stadium: string
  league: string
  season: string
}

/** Metapodaci o izvoru — svaki skup podataka nosi odakle dolazi i kada je preuzet. */
export interface SourceMeta {
  source: string
  url: string
  /** ISO datum zadnjeg preuzimanja/sinkronizacije. */
  lastUpdated: string
}
