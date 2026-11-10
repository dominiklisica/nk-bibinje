import type { TeamKey } from '../../data/teams'

export interface Member {
  id: string
  member_no: number
  team_key: TeamKey
  first_name: string
  last_name: string
  birth_year: number | null
  active: boolean
  /** E-mailovi roditelja/skrbnika (popunjeno za administratore). */
  guardians: string[]
}

export type MemberInput = Omit<Member, 'id' | 'member_no'> & { id?: string }

export interface Payment {
  id: string
  member_id: string
  period: string // 'GGGG-MM'
  amount: number
  paid_on: string // 'GGGG-MM-DD'
  source: 'izvod' | 'rucno'
  note: string | null
  import_key: string | null
}

export type PaymentInput = Omit<Payment, 'id'>

export interface Donation {
  id: string
  amount: number
  paid_on: string
  payer: string | null
  note: string | null
  source: 'izvod' | 'rucno'
  import_key: string | null
}

export type DonationInput = Omit<Donation, 'id'>

export interface SessionUser {
  email: string
}

/** Isto sučelje za Supabase i za demo način (podaci u pregledniku). */
export interface Backend {
  mode: 'supabase' | 'demo'
  getUser(): Promise<SessionUser | null>
  onAuthChange(cb: (u: SessionUser | null) => void): () => void
  /** Supabase: šalje poveznicu za prijavu na e-mail. Demo: prijavljuje odmah. */
  signIn(email: string): Promise<{ sent: boolean }>
  signOut(): Promise<void>
  isAdmin(): Promise<boolean>

  members(): Promise<Member[]>
  saveMember(m: MemberInput): Promise<void>
  deleteMember(id: string): Promise<void>

  payments(): Promise<Payment[]>
  addPayments(p: PaymentInput[]): Promise<{ added: number; skipped: number }>
  deletePayment(id: string): Promise<void>

  donations(): Promise<Donation[]>
  addDonations(d: DonationInput[]): Promise<{ added: number; skipped: number }>
  deleteDonation(id: string): Promise<void>
}
