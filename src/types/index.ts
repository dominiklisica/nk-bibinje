// =========================================================
// Tipovi podataka za NK Bibinje
// =========================================================

/** 'postponed' = termin je prošao, a utakmica nije odigrana (odgođena). */
export type MatchStatus = 'finished' | 'upcoming' | 'postponed'

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

// Detalji odigranih utakmica. Postave: prvi igrač je vratar; "(C)" označava kapetana.
export interface MatchGoal {
  side: 'home' | 'away'
  player: string
  minute: string
}

/** Karton ili izmjena; kod izmjene je `player` igrač koji ulazi. */
export interface MatchEvent {
  side: 'home' | 'away'
  type: 'yellow' | 'second_yellow' | 'red' | 'sub'
  minute: string
  player: string
  playerOut?: string
}

export interface TeamSheet {
  team: string
  starters: string[] // "12 Ivan Cindrić" (prvi je vratar, "(C)" = kapetan)
  bench: string[]
  coach: string
}

export interface MatchDetail {
  id: string
  round: number
  venue: string
  attendance?: number
  referees: string[]
  /** Napomena uz rezultat, npr. službeni rezultat bez borbe. */
  note?: string
  goals: MatchGoal[]
  /** Kartoni i izmjene, kronološki (mlađi uzrasti nemaju upisane izmjene). */
  events: MatchEvent[]
  home: TeamSheet
  away: TeamSheet
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

export interface Coach {
  name: string
  /** Broj odigranih utakmica na kojima je upisan kao trener. */
  matches: number
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
  /** Oduzeti bodovi (već uračunati u `points`), npr. 1 za "(-1)" na Semaforu. */
  deduction?: number
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
