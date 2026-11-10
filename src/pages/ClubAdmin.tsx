import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Download, FileUp, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react'
import LoginCard from '../components/ui/LoginCard'
import { backend, type Donation, type Member, type MemberInput, type Payment } from '../lib/backend'
import { resetDemo } from '../lib/backend/demo'
import { useSession } from '../hooks/useSession'
import { TEAMS, getTeam, type TeamKey } from '../data/teams'
import { SEASON_MONTHS } from '../data/payments'
import { currentPeriod, feeFor, monthName, monthShort } from '../lib/membership'
import { formatEur } from '../lib/hub3'
import { matchLines, parseStatement, type MatchedLine } from '../lib/statement'

type Tab = 'uplate' | 'clanovi' | 'izvod' | 'donacije'
const today = () => new Date().toISOString().slice(0, 10)
const fmtDate = (iso: string) => iso.split('-').reverse().join('.') + '.'
const fullName = (m: Member) => `${m.last_name} ${m.first_name}`

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-app p-4 sm:p-5" style={{ backgroundColor: 'var(--surface)' }}>
      {children}
    </div>
  )
}

/** Podaci se učitavaju tek kad je administrator prijavljen (ključ uključuje e-mail). */
function useData(email: string | undefined, enabled: boolean) {
  const members = useQuery({ queryKey: ['admin', 'members', email], queryFn: backend.members, enabled })
  const payments = useQuery({ queryKey: ['admin', 'payments', email], queryFn: backend.payments, enabled })
  const donations = useQuery({ queryKey: ['admin', 'donations', email], queryFn: backend.donations, enabled })
  const qc = useQueryClient()
  const refresh = () => qc.invalidateQueries()
  return { members, payments, donations, refresh }
}

/* ---------------- Uplate: tablica tko je platio koji mjesec ---------------- */

function PaymentsTab({ members, payments, refresh }: { members: Member[]; payments: Payment[]; refresh: () => void }) {
  const [team, setTeam] = useState<TeamKey | 'sve'>('sve')
  const now = currentPeriod()
  const rows = members.filter((m) => m.active && (team === 'sve' || m.team_key === team))
  const paid = useMemo(() => new Map(payments.map((p) => [`${p.member_id}|${p.period}`, p])), [payments])
  const owedOf = (m: Member) => SEASON_MONTHS.filter((p) => p <= now && !paid.has(`${m.id}|${p}`))
  const collected = payments.filter((p) => rows.some((m) => m.id === p.member_id)).reduce((s, p) => s + p.amount, 0)
  const debtors = rows.filter((m) => owedOf(m).length > 0)

  const toggle = async (m: Member, period: string) => {
    const p = paid.get(`${m.id}|${period}`)
    if (p) {
      if (!window.confirm(`Poništiti uplatu: ${fullName(m)}, ${monthName(period)} (${formatEur(p.amount)})?`)) return
      await backend.deletePayment(p.id)
    } else {
      const fee = feeFor(m, members)
      const raw = window.prompt(`Ručna uplata: ${fullName(m)}, ${monthName(period)}.\nIznos u eurima:`, fee != null ? String(fee) : '')
      if (raw == null) return
      const amount = Number(raw.replace(',', '.'))
      if (!(amount > 0)) return
      await backend.addPayments([
        { member_id: m.id, period, amount, paid_on: today(), source: 'rucno', note: null, import_key: null },
      ])
    }
    refresh()
  }

  const exportDebtors = () => {
    const lines = [['Prezime', 'Ime', 'Ekipa', 'Broj člana', 'Neplaćeni mjeseci', 'Iznos (EUR)', 'E-mail roditelja']]
    for (const m of debtors) {
      const owed = owedOf(m)
      const fee = feeFor(m, members)
      lines.push([
        m.last_name,
        m.first_name,
        getTeam(m.team_key)?.label ?? m.team_key,
        String(m.member_no),
        owed.map(monthShort).join(', '),
        fee != null ? (fee * owed.length).toFixed(2).replace('.', ',') : '',
        m.guardians.join(', '),
      ])
    }
    const csv = '﻿' + lines.map((l) => l.map((c) => `"${c.replace(/"/g, '""')}"`).join(';')).join('\r\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    a.download = `duznici-${today()}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={team}
          onChange={(e) => setTeam(e.target.value as TeamKey | 'sve')}
          className="rounded-lg border border-app bg-[var(--surface)] px-3 py-2"
          aria-label="Ekipa"
        >
          <option value="sve">Sve ekipe</option>
          {TEAMS.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>
        <span className="text-muted text-sm">
          {rows.length} članova · {debtors.length} s dugom · naplaćeno {formatEur(collected)}
        </span>
        <button
          type="button"
          onClick={exportDebtors}
          disabled={!debtors.length}
          className="tile-hover ml-auto inline-flex items-center gap-1.5 rounded-lg border border-app px-3 py-2 text-sm disabled:opacity-50"
        >
          <Download size={15} /> Popis dužnika (CSV)
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="text-muted border-b border-app text-xs uppercase">
              <th className="px-3 py-2 text-left">Član</th>
              {SEASON_MONTHS.map((p) => (
                <th key={p} className="px-1 py-2 text-center font-semibold">
                  {monthShort(p)}
                </th>
              ))}
              <th className="px-3 py-2 text-right">Duguje</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const owed = owedOf(m)
              const fee = feeFor(m, members)
              return (
                <tr key={m.id} className="row-hover border-b border-app last:border-0">
                  <td className="px-3 py-2">
                    <div className="font-medium">{fullName(m)}</div>
                    <div className="text-muted text-xs">
                      {getTeam(m.team_key)?.label} · br. {m.member_no}
                    </div>
                  </td>
                  {SEASON_MONTHS.map((p) => {
                    const pay = paid.get(`${m.id}|${p}`)
                    const due = p <= now
                    return (
                      <td key={p} className="px-1 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => toggle(m, p)}
                          title={
                            pay
                              ? `${formatEur(pay.amount)} · ${fmtDate(pay.paid_on)} · ${pay.source === 'izvod' ? 'izvod' : 'ručno'} — klik za poništenje`
                              : `${monthName(p)} — klik za ručnu uplatu`
                          }
                          className={`grid h-7 w-7 place-items-center rounded-md text-xs font-bold ${
                            pay
                              ? pay.source === 'izvod'
                                ? 'bg-[#2e7d34] text-white'
                                : 'bg-[#2e7d34]/70 text-white'
                              : due
                                ? 'border border-[#c0392b] text-[#c0392b]'
                                : 'border border-app text-muted'
                          }`}
                        >
                          {pay ? (pay.source === 'izvod' ? '✓' : 'R') : due ? '✕' : ''}
                        </button>
                      </td>
                    )
                  })}
                  <td className="px-3 py-2 text-right font-display font-bold tabular-nums">
                    {owed.length === 0 ? '—' : fee != null ? formatEur(fee * owed.length) : `${owed.length} mj.`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-muted text-xs">
        ✓ uplata s izvoda · R ručno upisana (gotovina) · ✕ dospjelo neplaćeno. Klik na polje dodaje ili poništava uplatu.
      </p>
    </div>
  )
}

/* ---------------- Članovi ---------------- */

const emptyMember = (): MemberInput => ({
  team_key: 'pioniri',
  first_name: '',
  last_name: '',
  birth_year: null,
  active: true,
  guardians: [],
})

function MembersTab({ members, refresh }: { members: Member[]; refresh: () => void }) {
  const [edit, setEdit] = useState<MemberInput | null>(null)
  const [guardiansText, setGuardiansText] = useState('')
  const [error, setError] = useState('')

  const open = (m: MemberInput) => {
    setEdit(m)
    setGuardiansText(m.guardians.join(', '))
    setError('')
  }
  const save = async () => {
    if (!edit) return
    if (!edit.first_name.trim() || !edit.last_name.trim()) return setError('Upišite ime i prezime.')
    const guardians = guardiansText.split(/[,;\s]+/).filter(Boolean)
    if (guardians.some((g) => !/^\S+@\S+\.\S+$/.test(g))) return setError('Neki e-mail roditelja nije ispravan.')
    try {
      await backend.saveMember({ ...edit, first_name: edit.first_name.trim(), last_name: edit.last_name.trim(), guardians })
      setEdit(null)
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Spremanje nije uspjelo.')
    }
  }
  const remove = async (m: Member) => {
    if (!window.confirm(`Obrisati člana ${fullName(m)} i sve njegove uplate? To se ne može vratiti.`)) return
    await backend.deleteMember(m.id)
    refresh()
  }

  const sorted = [...members].sort((a, b) => a.team_key.localeCompare(b.team_key) || fullName(a).localeCompare(fullName(b)))
  const input = 'w-full rounded-lg border border-app bg-transparent px-3 py-2'

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => open(emptyMember())}
        className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--club-primary)] px-4 py-2 font-semibold text-white"
      >
        <Plus size={16} /> Novi član
      </button>

      {edit && (
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold uppercase">{edit.id ? 'Uredi člana' : 'Novi član'}</h3>
            <button type="button" onClick={() => setEdit(null)} aria-label="Zatvori" className="p-1">
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Ime
              <input className={input} value={edit.first_name} onChange={(e) => setEdit({ ...edit, first_name: e.target.value })} />
            </label>
            <label className="text-sm">
              Prezime
              <input className={input} value={edit.last_name} onChange={(e) => setEdit({ ...edit, last_name: e.target.value })} />
            </label>
            <label className="text-sm">
              Ekipa
              <select
                className={`${input} bg-[var(--surface)]`}
                value={edit.team_key}
                onChange={(e) => setEdit({ ...edit, team_key: e.target.value as TeamKey })}
              >
                {TEAMS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Godište
              <input
                className={input}
                inputMode="numeric"
                value={edit.birth_year ?? ''}
                onChange={(e) => setEdit({ ...edit, birth_year: Number(e.target.value) || null })}
              />
            </label>
            <label className="text-sm sm:col-span-2">
              E-mail roditelja (više adresa odvojite zarezom) — s njima se roditelji prijavljuju
              <input className={input} value={guardiansText} onChange={(e) => setGuardiansText(e.target.value)} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={edit.active} onChange={(e) => setEdit({ ...edit, active: e.target.checked })} />
              Aktivan član (plaća članarinu)
            </label>
          </div>
          {error && <p className="mt-2 text-sm text-[var(--club-red)]">{error}</p>}
          <button type="button" onClick={save} className="mt-4 rounded-lg bg-[var(--club-primary)] px-5 py-2 font-semibold text-white">
            Spremi
          </button>
        </Panel>
      )}

      <div className="overflow-x-auto rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-muted border-b border-app text-left text-xs uppercase">
              <th className="px-3 py-2">Br.</th>
              <th className="px-3 py-2">Član</th>
              <th className="px-3 py-2">Ekipa</th>
              <th className="px-3 py-2">Roditelji</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <tr key={m.id} className={`row-hover border-b border-app last:border-0 ${m.active ? '' : 'opacity-50'}`}>
                <td className="px-3 py-2 tabular-nums">{m.member_no}</td>
                <td className="px-3 py-2 font-medium">
                  {fullName(m)} {m.birth_year && <span className="text-muted text-xs">({m.birth_year}.)</span>}
                </td>
                <td className="px-3 py-2">{getTeam(m.team_key)?.label}</td>
                <td className="text-muted px-3 py-2 text-xs">{m.guardians.join(', ') || '—'}</td>
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  <button type="button" onClick={() => open(m)} className="p-1.5" aria-label={`Uredi ${fullName(m)}`}>
                    <Pencil size={15} />
                  </button>
                  <button type="button" onClick={() => remove(m)} className="p-1.5 text-[var(--club-red)]" aria-label={`Obriši ${fullName(m)}`}>
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------- Uvoz izvoda ---------------- */

type Choice = 'skip' | 'donation' | `m:${string}`

function ImportTab({ members, refresh }: { members: Member[]; refresh: () => void }) {
  const [lines, setLines] = useState<MatchedLine[]>([])
  const [choice, setChoice] = useState<Record<string, Choice>>({})
  const [period, setPeriod] = useState<Record<string, string>>({})
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async (file: File) => {
    setMsg('')
    try {
      const parsed = matchLines(parseStatement(file.name, await file.text()), members)
      const c: Record<string, Choice> = {}
      const p: Record<string, string> = {}
      for (const l of parsed) {
        c[l.line.key] = l.kind === 'membership' ? `m:${l.member.id}` : l.kind === 'donation' ? 'donation' : 'skip'
        p[l.line.key] = l.kind === 'membership' ? l.period : l.line.date.slice(0, 7)
      }
      setLines(parsed)
      setChoice(c)
      setPeriod(p)
      if (!parsed.length) setMsg('U izvodu nema priljeva.')
    } catch (e) {
      setLines([])
      setMsg(e instanceof Error ? e.message : 'Izvod se nije mogao pročitati.')
    }
  }

  const save = async () => {
    setBusy(true)
    try {
      const pays = []
      const dons = []
      for (const { line } of lines) {
        const c = choice[line.key]
        if (c === 'donation')
          dons.push({ amount: line.amount, paid_on: line.date, payer: line.payer || null, note: line.description || null, source: 'izvod' as const, import_key: line.key })
        else if (c?.startsWith('m:'))
          pays.push({
            member_id: c.slice(2),
            period: period[line.key],
            amount: line.amount,
            paid_on: line.date,
            source: 'izvod' as const,
            note: [line.payer, line.reference].filter(Boolean).join(' · ') || null,
            import_key: line.key,
          })
      }
      const a = await backend.addPayments(pays)
      const b = await backend.addDonations(dons)
      setMsg(
        `Spremljeno: ${a.added} članarina, ${b.added} donacija.` +
          (a.skipped + b.skipped ? ` Preskočeno ${a.skipped + b.skipped} (već uneseno).` : ''),
      )
      setLines([])
      refresh()
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Spremanje nije uspjelo.')
    } finally {
      setBusy(false)
    }
  }

  const sorted = [...members].sort((a, b) => fullName(a).localeCompare(fullName(b)))

  return (
    <div className="space-y-4">
      <Panel>
        <p className="text-sm">
          Preuzmite izvod iz internet bankarstva kluba kao <b>XML (camt.053)</b> ili <b>CSV</b> i učitajte ga ovdje.
          Uplate s pozivom na broj članarine upare se same, a donacije prema opisu; ostalo odaberite ručno.
        </p>
        <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[var(--club-primary)] px-4 py-2 font-semibold text-white">
          <FileUp size={16} /> Odaberi izvod
          <input
            type="file"
            accept=".xml,.csv,text/xml,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) load(f)
              e.target.value = ''
            }}
          />
        </label>
        {msg && <p className="mt-3 text-sm font-semibold">{msg}</p>}
      </Panel>

      {lines.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="text-muted border-b border-app text-left text-xs uppercase">
                  <th className="px-3 py-2">Datum</th>
                  <th className="px-3 py-2">Platitelj</th>
                  <th className="px-3 py-2">Poziv na broj / opis</th>
                  <th className="px-3 py-2 text-right">Iznos</th>
                  <th className="px-3 py-2">Knjiži kao</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => {
                  const k = l.line.key
                  const c = choice[k]
                  return (
                    <tr key={k} className="row-hover border-b border-app align-top last:border-0">
                      <td className="px-3 py-2 whitespace-nowrap">{fmtDate(l.line.date)}</td>
                      <td className="px-3 py-2">{l.line.payer || '—'}</td>
                      <td className="text-muted px-3 py-2 text-xs">
                        {[l.line.reference, l.line.description].filter(Boolean).join(' · ') || '—'}
                        {l.kind === 'unknown' && <div className="mt-0.5 text-[var(--club-red)]">{l.reason}</div>}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums">{formatEur(l.line.amount)}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col gap-1">
                          <select
                            value={c}
                            onChange={(e) => setChoice({ ...choice, [k]: e.target.value as Choice })}
                            className="rounded-md border border-app bg-[var(--surface)] px-2 py-1"
                            aria-label="Knjiži kao"
                          >
                            <option value="skip">Preskoči</option>
                            <option value="donation">Donacija</option>
                            {sorted.map((m) => (
                              <option key={m.id} value={`m:${m.id}`}>
                                Članarina: {fullName(m)} ({m.member_no})
                              </option>
                            ))}
                          </select>
                          {c?.startsWith('m:') && (
                            <select
                              value={period[k]}
                              onChange={(e) => setPeriod({ ...period, [k]: e.target.value })}
                              className="rounded-md border border-app bg-[var(--surface)] px-2 py-1"
                              aria-label="Mjesec"
                            >
                              {SEASON_MONTHS.map((p) => (
                                <option key={p} value={p}>
                                  {monthName(p)}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="rounded-lg bg-[var(--club-primary)] px-5 py-2 font-semibold text-white disabled:opacity-60"
          >
            {busy ? 'Spremam…' : 'Spremi uplate'}
          </button>
        </>
      )}
    </div>
  )
}

/* ---------------- Donacije ---------------- */

function DonationsTab({ donations, refresh }: { donations: Donation[]; refresh: () => void }) {
  const [amount, setAmount] = useState('')
  const [payer, setPayer] = useState('')
  const [date, setDate] = useState(today())
  const total = donations.reduce((s, d) => s + d.amount, 0)

  const add = async () => {
    const a = Number(amount.replace(',', '.'))
    if (!(a > 0)) return
    await backend.addDonations([{ amount: a, paid_on: date, payer: payer.trim() || null, note: null, source: 'rucno', import_key: null }])
    setAmount('')
    setPayer('')
    refresh()
  }
  const remove = async (d: Donation) => {
    if (!window.confirm(`Obrisati donaciju ${formatEur(d.amount)} (${fmtDate(d.paid_on)})?`)) return
    await backend.deleteDonation(d.id)
    refresh()
  }
  const input = 'rounded-lg border border-app bg-transparent px-3 py-2'

  return (
    <div className="space-y-4">
      <Panel>
        <div className="font-display text-3xl font-extrabold text-[var(--club-primary)]">{formatEur(total)}</div>
        <div className="text-muted text-sm">ukupno donacija ({donations.length})</div>
        <div className="mt-4 flex flex-wrap items-end gap-2">
          <input className={input} type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Datum" />
          <input className={`${input} w-28`} inputMode="decimal" placeholder="Iznos €" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className={`${input} min-w-0 flex-1`} placeholder="Donator (neobavezno)" value={payer} onChange={(e) => setPayer(e.target.value)} />
          <button type="button" onClick={add} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--club-primary)] px-4 py-2 font-semibold text-white">
            <Plus size={16} /> Dodaj
          </button>
        </div>
      </Panel>
      <div className="overflow-hidden rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
        {donations.length === 0 ? (
          <p className="text-muted p-4 text-sm">Još nema donacija.</p>
        ) : (
          donations.map((d) => (
            <div key={d.id} className="row-hover flex items-center gap-3 border-b border-app px-4 py-2.5 text-sm last:border-0">
              <span className="text-muted w-24 tabular-nums">{fmtDate(d.paid_on)}</span>
              <span className="min-w-0 flex-1 truncate">{d.payer || 'Anonimno'}</span>
              <span className="text-muted text-xs">{d.source === 'izvod' ? 'izvod' : 'ručno'}</span>
              <span className="font-display font-bold tabular-nums">{formatEur(d.amount)}</span>
              <button type="button" onClick={() => remove(d)} className="p-1 text-[var(--club-red)]" aria-label="Obriši donaciju">
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

/* ---------------- Stranica ---------------- */

const TABS: { key: Tab; label: string }[] = [
  { key: 'uplate', label: 'Uplate' },
  { key: 'clanovi', label: 'Članovi' },
  { key: 'izvod', label: 'Uvoz izvoda' },
  { key: 'donacije', label: 'Donacije' },
]

export default function ClubAdmin() {
  const { user, isAdmin, loading } = useSession()
  const [tab, setTab] = useState<Tab>('uplate')
  const data = useData(user?.email, !!user && isAdmin)

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight">Evidencija kluba</h1>
          <p className="text-muted">Članarine, članovi i donacije{backend.mode === 'demo' && ' — demo način (probni podaci)'}</p>
        </div>
        {user && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">{user.email}</span>
            {backend.mode === 'demo' && isAdmin && (
              <button
                type="button"
                onClick={() => {
                  resetDemo()
                  window.location.reload()
                }}
                className="tile-hover rounded-lg border border-app px-3 py-1.5"
              >
                Vrati probne podatke
              </button>
            )}
            <button type="button" onClick={() => backend.signOut()} className="tile-hover inline-flex items-center gap-1.5 rounded-lg border border-app px-3 py-1.5">
              <LogOut size={15} /> Odjava
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-muted">Učitavanje…</p>
      ) : !user ? (
        <div className="max-w-xl">
          <LoginCard intro="Prijava za tajnika, blagajnika i ostale ovlaštene osobe kluba." />
        </div>
      ) : !isAdmin ? (
        <Panel>
          <p>
            Račun <b>{user.email}</b> nema pristup evidenciji kluba.{' '}
            <Link to="/clanarina" className="font-semibold text-[var(--club-primary)]">
              Članarina za roditelje →
            </Link>
          </p>
        </Panel>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap gap-1 rounded-full border border-app p-1" style={{ backgroundColor: 'var(--surface)' }}>
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 font-display text-sm font-bold uppercase tracking-wide ${
                  tab === t.key ? 'bg-[var(--club-primary)] text-white' : 'text-muted'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {data.members.isLoading || data.payments.isLoading || data.donations.isLoading ? (
            <p className="text-muted">Učitavanje…</p>
          ) : data.members.error || data.payments.error || data.donations.error ? (
            <p className="text-[var(--club-red)]">Podaci se nisu mogli učitati.</p>
          ) : tab === 'uplate' ? (
            <PaymentsTab members={data.members.data ?? []} payments={data.payments.data ?? []} refresh={data.refresh} />
          ) : tab === 'clanovi' ? (
            <MembersTab members={data.members.data ?? []} refresh={data.refresh} />
          ) : tab === 'izvod' ? (
            <ImportTab members={data.members.data ?? []} refresh={data.refresh} />
          ) : (
            <DonationsTab donations={data.donations.data ?? []} refresh={data.refresh} />
          )}
        </>
      )}
    </div>
  )
}
