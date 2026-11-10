import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Check, LogOut, ShieldCheck } from 'lucide-react'
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
            <LoginCard intro="Prijavite se e-mail adresom koju ste dali klubu pri upisu djeteta. Dobit ćete poveznicu za prijavu — lozinka nije potrebna." />
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
            ) : children.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-app p-6">
                <h2 className="font-display text-xl font-bold uppercase">Nema povezane djece</h2>
                <p className="text-muted mt-1 text-sm">
                  Uz e-mail <b>{user.email}</b> klub još nije upisao nijedno dijete. Javite se treneru ili tajniku kluba da vas povežu.
                </p>
              </div>
            ) : (
              children.map((m, i) => (
                <Reveal key={m.id} delay={Math.min(i * 0.05, 0.2)}>
                  <ChildCard member={m} all={all} payments={payments.data ?? []} />
                </Reveal>
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}
