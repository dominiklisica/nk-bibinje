import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DEFAULT_TEAM, getTeam, type TeamKey } from '../data/teams'
import { TeamContext } from '../hooks/useTeam'

const STORAGE_KEY = 'nkb-ekipa'

function storedTeam(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * Pamti odabranu ekipu. Poveznica s ?ekipa=pioniri otvara tu ekipu
 * (za dijeljenje); inače se koristi zadnji odabir iz preglednika.
 */
export default function TeamProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams()
  const [key, setKey] = useState<TeamKey>(
    () => (getTeam(params.get('ekipa')) ?? getTeam(storedTeam()) ?? getTeam(DEFAULT_TEAM)!).key,
  )

  // Poveznica s ?ekipa= vrijedi i kad je stranica već otvorena
  // (stanje se usklađuje tijekom prikaza, bez dodatnog efekta).
  const fromUrl = getTeam(params.get('ekipa'))?.key
  const [lastFromUrl, setLastFromUrl] = useState(fromUrl)
  if (fromUrl !== lastFromUrl) {
    setLastFromUrl(fromUrl)
    if (fromUrl) setKey(fromUrl)
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, key)
    } catch {
      // privatni način rada — odabir vrijedi samo do osvježavanja
    }
  }, [key])

  const setTeam = useCallback(
    (next: TeamKey) => {
      setKey(next)
      if (params.has('ekipa')) {
        const p = new URLSearchParams(params)
        p.set('ekipa', next)
        setParams(p, { replace: true })
      }
    },
    [params, setParams],
  )

  const value = useMemo(() => ({ team: getTeam(key)!, setTeam }), [key, setTeam])
  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}
