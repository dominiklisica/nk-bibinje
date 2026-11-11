import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Backend, Donation, Member, Payment } from './types'

type Row = Omit<Member, 'guardians'> & { member_guardians?: { email: string }[] }

const num = <T extends { amount: number | string }>(r: T) => ({ ...r, amount: Number(r.amount) })

export function supabaseBackend(url: string, key: string): Backend {
  const db: SupabaseClient = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  })
  const fail = (e: { message: string } | null) => {
    if (e) throw new Error(e.message)
  }

  return {
    mode: 'supabase',

    async getUser() {
      const { data } = await db.auth.getSession()
      const email = data.session?.user.email
      return email ? { email: email.toLowerCase() } : null
    },
    onAuthChange(cb) {
      const { data } = db.auth.onAuthStateChange((_e, s) => cb(s?.user.email ? { email: s.user.email.toLowerCase() } : null))
      return () => data.subscription.unsubscribe()
    },
    async signIn(email, data) {
      const { error } = await db.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        // data (ime djeteta i roditelja) sprema se uz korisnika u Supabase → Authentication → Users
        options: { emailRedirectTo: window.location.href.split('#')[0], data },
      })
      fail(error)
      return { sent: true }
    },
    async signOut() {
      await db.auth.signOut()
    },
    async isAdmin() {
      const { data, error } = await db.rpc('is_admin')
      fail(error)
      return data === true
    },

    async members() {
      const { data, error } = await db
        .from('members')
        .select('*, member_guardians(email)')
        .order('last_name')
      fail(error)
      return ((data ?? []) as Row[]).map(({ member_guardians, ...m }) => ({
        ...m,
        guardians: (member_guardians ?? []).map((g) => g.email),
      }))
    },
    async saveMember({ guardians, id, ...m }) {
      let memberId = id
      if (memberId) {
        fail((await db.from('members').update(m).eq('id', memberId)).error)
      } else {
        const { data, error } = await db.from('members').insert(m).select('id').single()
        fail(error)
        memberId = (data as { id: string }).id
      }
      fail((await db.from('member_guardians').delete().eq('member_id', memberId)).error)
      const rows = [...new Set(guardians.map((g) => g.trim().toLowerCase()).filter(Boolean))].map((email) => ({
        member_id: memberId,
        email,
      }))
      if (rows.length) fail((await db.from('member_guardians').insert(rows)).error)
    },
    async deleteMember(id) {
      fail((await db.from('members').delete().eq('id', id)).error)
    },

    async payments() {
      const { data, error } = await db.from('payments').select('*').order('period')
      fail(error)
      return ((data ?? []) as Payment[]).map(num)
    },
    async addPayments(list) {
      let added = 0
      for (const p of list) {
        const { error } = await db.from('payments').insert(p)
        if (!error) added++
        else if (error.code !== '23505') throw new Error(error.message) // 23505 = već postoji
      }
      return { added, skipped: list.length - added }
    },
    async deletePayment(id) {
      fail((await db.from('payments').delete().eq('id', id)).error)
    },

    async donations() {
      const { data, error } = await db.from('donations').select('*').order('paid_on', { ascending: false })
      fail(error)
      return ((data ?? []) as Donation[]).map(num)
    },
    async addDonations(list) {
      let added = 0
      for (const d of list) {
        const { error } = await db.from('donations').insert(d)
        if (!error) added++
        else if (error.code !== '23505') throw new Error(error.message)
      }
      return { added, skipped: list.length - added }
    },
    async deleteDonation(id) {
      fail((await db.from('donations').delete().eq('id', id)).error)
    },
  }
}
