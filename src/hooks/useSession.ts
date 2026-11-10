import { useEffect, useState } from 'react'
import { backend, type SessionUser } from '../lib/backend'

/** Prijavljeni korisnik i je li administrator kluba. */
export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const apply = async (u: SessionUser | null) => {
      const admin = u ? await backend.isAdmin().catch(() => false) : false
      if (!alive) return
      setUser(u)
      setIsAdmin(admin)
      setLoading(false)
    }
    backend.getUser().then(apply)
    const off = backend.onAuthChange(apply)
    return () => {
      alive = false
      off()
    }
  }, [])

  return { user, isAdmin, loading }
}
