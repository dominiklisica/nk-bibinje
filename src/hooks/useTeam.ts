import { createContext, useContext } from 'react'
import { TEAMS, type Team, type TeamKey } from '../data/teams'

export interface TeamContextValue {
  team: Team
  setTeam: (key: TeamKey) => void
}

export const TeamContext = createContext<TeamContextValue>({
  team: TEAMS[0],
  setTeam: () => {},
})

/** Trenutno odabrana ekipa (uzrast) — bira se u padajućem izborniku. */
export function useTeam() {
  return useContext(TeamContext)
}
