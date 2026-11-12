import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Hourglass, LogOut, ShieldCheck, UserPlus } from 'lucide-react'
import { clearPendingJoin, readPendingJoin } from '../lib/pendingJoin'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import Hub3Barcode from '../components/ui/Hub3Barcode'
import LoginCard from '../components/ui/LoginCard'
import { backend, type Member, type Payment } from '../lib/backend'
import { useSession } from '../hooks/useSession'
import { getTeam } from '../data/teams'
import { SEASON_MONTHS } from '../data/payments'
import { currentPeriod, feeFor, membershipHub3, monthName, monthShort } from '../lib/membership'
import { formatEur } from '../lib/hub3'

function ChildCard({ member, all, payments }: { member: Member; all: Member[]; payments: Payment[] }) {
  const paid = new Map(payments.filter((p) => p.member_id === member.id).map((p) => [p.period, p]))
  const now = currentPeriod()
  const firstUnpaid = SEASON_MONTHS.find((p) => !paid.has(p) && p <= now) ?? SEASON_MONTHS.find((p) => !paid.has(p))
  const [selected, setSelected] = useState<string | undefined>(firstUnpaid)
  const fee = feeFor(member, all)
  const owed = SEASON_MONTHS.filter((p) => p <= now && !paid.has(p))

  return (
    <section className="rounded-2xl border border-app p-5 sm:p-6" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl font-extrabold">
          {member.first_name} {member.last_name}
        </h2>
        <span className="text-muted text-sm">
          {getTeam(member.team_key)?.label} · član br. {member.member_no}
        </span>
      </div>
      <p className="mt-1 text-sm">
        {owed.length === 0 ? (
          <span className="font-semibold text-[var(--club-primary)]">Sve dospjele članarine su plaćene. Hvala!</span>
        ) : (
          <span>
            Neplaćeno: <b>{owed.length}</b> {owed.length === 1 ? 'mjesec' : 'mjeseca'}
            {fee != null && <> · ukupno <b>{formatEur(fee * owed.length)}</b></>}
          </span>
        )}
      </p>

      <div className="mt-4 grid grid-cols-5 gap-1.5 sm:grid-cols-10" role="list" aria-label="Mjeseci sezone">
        {SEASON_MONTHS.map((p) => {
          const pay = paid.get(p)
          const due = p <= now
          const active = selected === p
          return (
            <button
              key={p}
              type="button"
              role="listitem"
              disabled={!!pay}
              onClick={() => setSelected(p)}
              title={pay ? `Plaćeno ${pay.paid_on.split('-').reverse().join('.')}.` : monthName(p)}
              className={`tile-hover flex flex-col items-center rounded-lg border px-1 py-2 text-xs ${
                pay
                  ? 'border-transparent bg-[color:var(--club-primary)]/15 text-[var(--club-primary)]'
                  : active
                    ? 'border-[var(--club-primary)] ring-2 ring-[var(--club-primary)]'
                    : due
                      ? 'border-[var(--club-red)] text-[var(--club-red)]'
                      : 'border-app text-muted'
              }`}
            >
              <span className="font-semibold uppercase">{monthShort(p)}</span>
              <span className="mt-0.5 h-4">{pay ? <Check size={14} /> : due ? '!' : ''}</span>
            </button>
          )
        })}
      </div>
      <div className="text-muted mt-2 flex flex-wrap gap-x-4 text-xs">
        <span className="text-[var(--club-primary)]">✓ plaćeno</span>
        <span className="text-[var(--club-red)]">! dospjelo</span>
        <span>sivo — još nije dospjelo (može se platiti unaprijed)</span>
      </div>

      {selected && !paid.has(selected) && (
        <div className="mt-6 border-t border-app pt-5">
          <h3 className="mb-3 font-display text-lg font-bold uppercase">Uplata za {monthName(selected)}</h3>
          {fee == null ? (
            <p className="text-muted text-sm">Iznos članarine za ovu ekipu još nije određen — barkod će se pojaviti kad klub upiše iznos.</p>
          ) : (
            <Hub3Barcode data={membershipHub3(member, selected, fee)} />
          )}
          <p className="text-muted mt-3 text-xs">
            Uplata se ovdje označi kao plaćena kad je klub evidentira s izvoda iz banke (obično za nekoliko dana).
          </p>
        </div>
      )}
    </section>
  )
}

/** Zahtjevi koje je roditelj poslao, a klub ih još nije potvrdio, i obrazac za još jedno dijete. */
function JoinRequests({ email, hasChildren }: { email: string; hasChildren: boolean }) {
  const qc = useQueryClient()
  // Zahtjev s obrasca za prijavu šalje se čim se roditelj prijavi poveznicom iz e-maila,
  // pa se tek onda učitaju njegovi zahtjevi (bez utrke između slanja i čitanja).
  const requests = useQuery({
    queryKey: ['join-requests', email],
    queryFn: async () => {
      const pending = readPendingJoin(email)
      if (pending) {
        await backend.requestJoin({ child_name: pending.child_name, parent_name: pending.parent_name })
        clearPendingJoin()
      }
      return backend.joinRequests()
    },
  })
  const [open, setOpen] = useState(false)
  const [child, setChild] = useState('')
  const [parent, setParent] = useState('')
  const [error, setError] = useState('')

  const submit = async () => {
    const c = child.trim().replace(/\s+/g, ' ')
    const p = parent.trim().replace(/\s+/g, ' ')
    if (c.split(' ').length < 2) return setError('Upišite ime i prezime djeteta.')
    if (p.split(' ').length < 2) return setError('Upišite svoje ime i prezime.')
    try {
      await backend.requestJoin({ child_name: c, parent_name: p })
      setOpen(false)
      setChild('')
      setError('')
      qc.invalidateQueries({ queryKey: ['join-requests', email] })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Slanje nije uspjelo.')
    }
  }

  const waiting = (requests.data ?? []).filter((r) => r.status === 'novo' && r.email === email)
  const field = 'w-full min-w-0 rounded-xl border border-app bg-transparent px-4 py-2.5 outline-none focus:border-[var(--club-primary)]'

  return (
    <>
      {requests.error && (
        <p className="text-sm text-[var(--club-red)]">
          Zahtjev za upis se nije mogao poslati klubu. Osvježite stranicu ili kliknite „Pošalji zahtjev za upis”.
        </p>
      )}
      {waiting.map((r) => (
        <div key={r.id} className="flex items-start gap-3 rounded-2xl border border-dashed border-app p-5">
          <Hourglass size={20} className="mt-0.5 shrink-0 text-[var(--club-primary)]" />
          <div>
            <div className="font-display text-lg font-bold">{r.child_name}</div>
            <p className="text-muted text-sm">
              Zahtjev za upis poslan je klubu. Kad ga klub potvrdi, ovdje ćete vidjeti članarinu i barkod za uplatu.
            </p>
          </div>
        </div>
      ))}
      {!hasChildren && waiting.length === 0 && !open && (
        <div className="rounded-2xl border border-dashed border-app p-6">
          <h2 className="font-display text-xl font-bold uppercase">Nema povezane djece</h2>
          <p className="text-muted mt-1 text-sm">
            Uz e-mail <b>{email}</b> klub još nije upisao nijedno dijete. Pošaljite zahtjev za upis i klub će ga potvrditi.
          </p>
        </div>
      )}
      {open ? (
        <div className="rounded-2xl border border-app p-5" style={{ backgroundColor: 'var(--surface)' }}>
          <h2 className="font-display text-lg font-bold uppercase">Zahtjev za upis djeteta</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className="text-sm">
              Ime i prezime djeteta
              <input value={child} onChange={(e) => setChild(e.target.value)} className={`${field} mt-1`} />
            </label>
            <label className="text-sm">
              Ime i prezime roditelja
              <input value={parent} onChange={(e) => setParent(e.target.value)} autoComplete="name" className={`${field} mt-1`} />
            </label>
          </div>
          {error && <p className="mt-2 text-sm text-[var(--club-red)]">{error}</p>}
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={submit} className="rounded-xl bg-[var(--club-primary)] px-5 py-2 font-semibold text-white">
              Pošalji klubu
            </button>
            <button type="button" onClick={() => setOpen(false)} className="tile-hover rounded-xl border border-app px-4 py-2">
              Odustani
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="tile-hover inline-flex items-center gap-1.5 rounded-lg border border-app px-4 py-2 text-sm font-semibold"
        >
          <UserPlus size={16} /> {hasChildren || waiting.length ? 'Prijavi još jedno dijete' : 'Pošalji zahtjev za upis'}
        </button>
      )}
    </>
  )
}

export default function Membership() {
  const { user, isAdmin, loading } = useSession()
  const members = useQuery({ queryKey: ['members', user?.email], queryFn: backend.members, enabled: !!user })
  const payments = useQuery({ queryKey: ['payments', user?.email], queryFn: backend.payments, enabled: !!user })
  const all = useMemo(() => members.data ?? [], [members.data])
  // Administratori vide sve članove; ovdje roditelj vidi samo svoju djecu.
  const children = useMemo(
    () => all.filter((m) => m.active && (!isAdmin || m.guardians.includes(user?.email ?? ''))),
    [all, isAdmin, user],
  )

  return (
    <div>
      <PageHeader
        title="Članarina"
        subtitle="Pregled i plaćanje članarine za vaše dijete — skenirajte barkod u mobilnoj banci."
        bgImage="/slike/galerija/slavlje-svlacionica-mladi.jpg"
        imgPosition="center 35%"
      />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        {loading ? (
          <p className="text-muted">Učitavanje…</p>
        ) : !user ? (
          <Reveal>
            <LoginCard parent intro="Upišite ime i prezime djeteta, svoje ime i prezime te e-mail adresu koju ste dali klubu pri upisu djeteta. Dobit ćete poveznicu za prijavu — lozinka nije potrebna." />
          </Reveal>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-muted">
                Prijavljeni ste kao <b className="text-[var(--text)]">{user.email}</b>
              </span>
              <div className="flex gap-2">
                {isAdmin && (
                  <Link to="/klub" className="tile-hover inline-flex items-center gap-1.5 rounded-lg border border-app px-3 py-1.5 font-semibold">
                    <ShieldCheck size={15} /> Evidencija kluba
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => backend.signOut()}
                  className="tile-hover inline-flex items-center gap-1.5 rounded-lg border border-app px-3 py-1.5"
                >
                  <LogOut size={15} /> Odjava
                </button>
              </div>
            </div>

            {members.isLoading || payments.isLoading ? (
              <p className="text-muted">Učitavanje…</p>
            ) : members.error || payments.error ? (
              <p className="text-[var(--club-red)]">Podaci se nisu mogli učitati. Pokušajte ponovno kasnije.</p>
            ) : (
              <>
                {children.map((m, i) => (
                  <Reveal key={m.id} delay={Math.min(i * 0.05, 0.2)}>
                    <ChildCard member={m} all={all} payments={payments.data ?? []} />
                  </Reveal>
                ))}
                <JoinRequests email={user.email} hasChildren={children.length > 0} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
