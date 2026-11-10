import type { Backend, Donation, Member, Payment, SessionUser } from './types'

// Demo način: izmišljeni podaci spremljeni samo u ovom pregledniku (localStorage).
// Služi za isprobavanje dok Supabase nije postavljen. Prijava bez e-maila:
//   roditelj@demo.hr — roditelj dvoje djece,  klub@demo.hr — administrator kluba.
export const DEMO_PARENT = 'roditelj@demo.hr'
export const DEMO_ADMIN = 'klub@demo.hr'

const KEY = 'nkb-demo-v1'
const USER_KEY = 'nkb-demo-user'

interface Store {
  members: Member[]
  payments: Payment[]
  donations: Donation[]
}

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

function seed(): Store {
  const m = (no: number, team: Member['team_key'], first: string, last: string, year: number, guardians: string[]): Member => ({
    id: `demo-${no}`,
    member_no: no,
    team_key: team,
    first_name: first,
    last_name: last,
    birth_year: year,
    active: true,
    guardians,
  })
  const members = [
    m(101, 'pioniri', 'Luka', 'Primjer', 2013, [DEMO_PARENT]),
    m(102, 'tici', 'Ana', 'Primjer', 2017, [DEMO_PARENT]),
    m(103, 'pioniri', 'Marko', 'Testić', 2013, ['marko.roditelj@demo.hr']),
    m(104, 'mladji-pioniri', 'Ivan', 'Probić', 2015, ['probic@demo.hr']),
    m(105, 'papaline', 'Petra', 'Demić', 2019, ['demic@demo.hr']),
    m(106, 'seniori', 'Josip', 'Ogledni', 1999, []),
  ]
  const pay = (member: string, period: string, amount: number, source: Payment['source'] = 'izvod'): Payment => ({
    id: uid(),
    member_id: member,
    period,
    amount,
    paid_on: `${period}-10`,
    source,
    note: null,
    import_key: null,
  })
  return {
    members,
    payments: [
      pay('demo-101', '2026-09', 30),
      pay('demo-101', '2026-10', 30),
      pay('demo-102', '2026-09', 25, 'rucno'),
      pay('demo-103', '2026-09', 30),
      pay('demo-103', '2026-10', 30),
      pay('demo-103', '2026-11', 30),
      pay('demo-104', '2026-09', 30),
    ],
    donations: [
      { id: uid(), amount: 50, paid_on: '2026-10-21', payer: 'Navijač Primjer', note: null, source: 'izvod', import_key: null },
    ],
  }
}

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Store
  } catch {
    // nedostupna pohrana — koristi svježe probne podatke
  }
  return seed()
}

export function demoBackend(): Backend {
  let store = load()
  let user: SessionUser | null = null
  try {
    const u = localStorage.getItem(USER_KEY)
    user = u ? { email: u } : null
  } catch {
    user = null
  }
  const listeners = new Set<(u: SessionUser | null) => void>()
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store))
    } catch {
      // privatni način — promjene vrijede do osvježavanja
    }
  }
  const setUser = (u: SessionUser | null) => {
    user = u
    try {
      if (u) localStorage.setItem(USER_KEY, u.email)
      else localStorage.removeItem(USER_KEY)
    } catch {
      // nema pohrane
    }
    listeners.forEach((cb) => cb(u))
  }
  const isAdmin = () => user?.email === DEMO_ADMIN
  const mine = (m: Member) => isAdmin() || (!!user && m.guardians.includes(user.email))
  const requireAdmin = () => {
    if (!isAdmin()) throw new Error('Samo administrator kluba može mijenjati podatke.')
  }
  const delay = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 120))

  return {
    mode: 'demo',
    getUser: () => delay(user),
    onAuthChange(cb) {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    async signIn(email) {
      setUser({ email: email.trim().toLowerCase() })
      return { sent: false }
    },
    async signOut() {
      setUser(null)
    },
    isAdmin: () => delay(isAdmin()),

    // Roditelj vidi samo svoj e-mail među skrbnicima (kao pravila u Supabaseu).
    members: () =>
      delay(store.members.filter(mine).map((m) => (isAdmin() ? m : { ...m, guardians: m.guardians.filter((g) => g === user?.email) }))),
    async saveMember({ id, ...m }) {
      requireAdmin()
      const guardians = [...new Set(m.guardians.map((g) => g.trim().toLowerCase()).filter(Boolean))]
      if (id) store.members = store.members.map((x) => (x.id === id ? { ...x, ...m, guardians } : x))
      else {
        const no = Math.max(100, ...store.members.map((x) => x.member_no)) + 1
        store.members.push({ ...m, guardians, id: uid(), member_no: no })
      }
      save()
    },
    async deleteMember(id) {
      requireAdmin()
      store.members = store.members.filter((x) => x.id !== id)
      store.payments = store.payments.filter((p) => p.member_id !== id)
      save()
    },

    payments: () => {
      const ids = new Set(store.members.filter(mine).map((m) => m.id))
      return delay(store.payments.filter((p) => ids.has(p.member_id)))
    },
    async addPayments(list) {
      requireAdmin()
      let added = 0
      for (const p of list) {
        const dup = store.payments.some(
          (x) => (x.member_id === p.member_id && x.period === p.period) || (p.import_key && x.import_key === p.import_key),
        )
        if (!dup) {
          store.payments.push({ ...p, id: uid() })
          added++
        }
      }
      save()
      return { added, skipped: list.length - added }
    },
    async deletePayment(id) {
      requireAdmin()
      store.payments = store.payments.filter((p) => p.id !== id)
      save()
    },

    donations: () => delay(isAdmin() ? [...store.donations].sort((a, b) => b.paid_on.localeCompare(a.paid_on)) : []),
    async addDonations(list) {
      requireAdmin()
      let added = 0
      for (const d of list) {
        if (!(d.import_key && store.donations.some((x) => x.import_key === d.import_key))) {
          store.donations.push({ ...d, id: uid() })
          added++
        }
      }
      save()
      return { added, skipped: list.length - added }
    },
    async deleteDonation(id) {
      requireAdmin()
      store.donations = store.donations.filter((d) => d.id !== id)
      save()
    },
  }
}

/** Vraća demo podatke na početno stanje. */
export function resetDemo() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nema pohrane
  }
}
