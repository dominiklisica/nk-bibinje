import { MEMBERSHIP_MODEL, MONTHLY_FEE, RECIPIENT, SIBLING_DISCOUNT } from '../data/payments'
import type { Hub3Data } from './hub3'
import type { Member } from './backend/types'

const MONTHS = ['siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj', 'srpanj', 'kolovoz', 'rujan', 'listopad', 'studeni', 'prosinac']
const MONTHS_SHORT = ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'srp', 'kol', 'ruj', 'lis', 'stu', 'pro']

export const monthName = (period: string) => {
  const [y, m] = period.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}.`
}
export const monthShort = (period: string) => {
  const [y, m] = period.split('-').map(Number)
  return `${MONTHS_SHORT[m - 1]} ${String(y).slice(2)}`
}
export const currentPeriod = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

/** Poziv na broj (model HR00): broj člana i mjesec, npr. "245-202611". */
export const reference = (memberNo: number, period: string) => `${memberNo}-${period.replace('-', '')}`

/** Iz poziva na broj ili opisa uplate izvuci broj člana i mjesec. */
export function parseReference(text: string): { memberNo: number; period: string } | null {
  const m = text.match(/(?:^|[^\d])(\d{1,6})-(20\d{2})(0[1-9]|1[0-2])(?!\d)/)
  return m ? { memberNo: Number(m[1]), period: `${m[2]}-${m[3]}` } : null
}

/** Ime obitelji = prezime + skup e-mailova roditelja; braća i sestre imaju isto. */
const familyKey = (m: Member) => m.guardians.slice().sort().join(',') || `solo-${m.id}`

/**
 * Mjesečni iznos za člana uz popust za braću i sestre (drugo i svako sljedeće dijete
 * iste obitelji, po redoslijedu upisa). null = iznos za ekipu još nije određen.
 */
export function feeFor(member: Member, all: Member[]): number | null {
  const base = MONTHLY_FEE[member.team_key]
  if (base == null) return null
  if (!SIBLING_DISCOUNT || !member.guardians.length) return base
  const family = all
    .filter((m) => m.active && familyKey(m) === familyKey(member))
    .sort((a, b) => a.member_no - b.member_no)
  const idx = family.findIndex((m) => m.id === member.id)
  return idx > 0 ? Math.round(base * (1 - SIBLING_DISCOUNT) * 100) / 100 : base
}

export function membershipHub3(member: Member, period: string, amount: number): Hub3Data {
  const [y, mo] = period.split('-')
  return {
    amount,
    recipientName: RECIPIENT.name,
    recipientStreet: RECIPIENT.street,
    recipientCity: RECIPIENT.city,
    iban: RECIPIENT.iban,
    model: MEMBERSHIP_MODEL,
    reference: reference(member.member_no, period),
    description: `Članarina ${mo}/${y} ${member.first_name} ${member.last_name}`,
  }
}
