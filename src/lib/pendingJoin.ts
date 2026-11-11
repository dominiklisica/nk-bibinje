// Ime djeteta i roditelja s obrasca za prijavu pamti se u pregledniku dok roditelj ne otvori
// poveznicu iz e-maila; tada se (s potvrđenim e-mailom) šalje klubu kao zahtjev za upis.
const KEY = 'nkb-prijava-roditelja'

export interface PendingJoin {
  email: string
  child_name: string
  parent_name: string
}

export function savePendingJoin(p: PendingJoin) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // nema pohrane — zahtjev se neće poslati, ali klub je dobio e-mail
  }
}

/** Vraća spremljeni zahtjev ako pripada prijavljenom e-mailu. */
export function readPendingJoin(email: string): PendingJoin | null {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? 'null') as PendingJoin | null
    return p && p.email === email.toLowerCase() ? p : null
  } catch {
    return null
  }
}

export function clearPendingJoin() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nema pohrane
  }
}
