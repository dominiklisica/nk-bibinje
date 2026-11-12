import type { TeamKey } from './teams'

// =========================================================
// ŠKOLA NOGOMETA — podaci koje upisuje klub.
// Uzrasti, lige, treneri i broj igrača dolaze automatski sa Semafora (src/data/teams).
// Dok neko polje nije upisano (null / prazno), stranica umjesto njega piše
// da se roditelj javi klubu — ništa se ne izmišlja.
// =========================================================

export interface SchoolGroup {
  /** Godišta djece, npr. '2012. – 2013.'; null = još nije upisano. */
  birthYears: string | null
  /** Termini treninga, npr. ['Ponedjeljak 17:00 – 18:30', 'Srijeda 17:00 – 18:30']. */
  training: string[]
}

/** Mlađi uzrasti redom od najstarijeg; seniori nisu dio škole. */
export const SCHOOL_GROUPS: Partial<Record<TeamKey, SchoolGroup>> = {
  pioniri: { birthYears: null, training: [] },
  'mladji-pioniri': { birthYears: null, training: [] },
  tici: { birthYears: null, training: [] },
  papaline: { birthYears: null, training: [] },
}

/** Gdje se trenira, npr. 'Igralište Franka Lisice, Bibinje'; null = ne prikazuje se. */
export const TRAINING_VENUE: string | null = null

/** Kratke napomene za roditelje, npr. 'Prvi trening je besplatan.' — upisuje klub. */
export const SCHOOL_NOTES: string[] = []
