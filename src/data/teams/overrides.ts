import type { Player } from '../../types'
import type { TeamKey } from './index'

// Ručni ispravci podataka o igračima, po ekipi i imenu igrača.
// Primjenjuju se preko podataka sa Semafora, a `npm run sync` ovu datoteku ne dira.
export const PLAYER_OVERRIDES: Partial<Record<TeamKey, Record<string, Partial<Player>>>> = {
  seniori: {
    // Kazne nakon isključenja su istekle — crveni kartoni se više ne prikazuju.
    'Mate Lukić': { redCards: 0 },
    'Stipe Gambiraža': { redCards: 0 },
  },
}

export function applyOverrides(key: TeamKey, squad: Player[]): Player[] {
  const o = PLAYER_OVERRIDES[key]
  return o ? squad.map((p) => (o[p.name] ? { ...p, ...o[p.name] } : p)) : squad
}
