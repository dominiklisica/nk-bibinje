import { useState } from 'react'
import { LogIn, MailCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { backend } from '../../lib/backend'
import { DEMO_ADMIN, DEMO_PARENT } from '../../lib/backend/demo'
import { CLUB } from '../../data/club'
import { WEB3FORMS_ACCESS_KEY } from '../../data/contact'
import { savePendingJoin } from '../../lib/pendingJoin'

const field =
  'w-full min-w-0 rounded-xl border border-app bg-transparent px-4 py-2.5 outline-none focus:border-[var(--club-primary)]'

/** Javlja klubu e-mailom (Web3Forms, kao kontakt obrazac) tko se prijavljuje kao roditelj. */
async function notifyClub(child: string, parent: string, email: string) {
  if (!WEB3FORMS_ACCESS_KEY) return
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `[${CLUB.name}] Prijava roditelja: ${child}`,
      from_name: `${CLUB.name} — članarina`,
      'Ime i prezime djeteta': child,
      'Ime i prezime roditelja': parent,
      'E-mail roditelja': email,
      replyto: email,
    }),
  }).catch(() => {})
}

/**
 * Prijava e-mailom (Supabase šalje poveznicu, bez lozinke); u demo načinu ulaz odmah.
 * `parent`: traži i ime djeteta i roditelja te o prijavi obavještava klub.
 */
export default function LoginCard({ intro, parent = false }: { intro: string; parent?: boolean }) {
  const [child, setChild] = useState('')
  const [parentName, setParentName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const demo = backend.mode === 'demo'

  const fail = (msg: string) => {
    setState('error')
    setError(msg)
  }

  const submit = async (value: string, withNames = parent) => {
    const mail = value.trim().toLowerCase()
    const names = { child: child.trim().replace(/\s+/g, ' '), parent: parentName.trim().replace(/\s+/g, ' ') }
    if (withNames && names.child.split(' ').length < 2) return fail('Upišite ime i prezime djeteta.')
    if (withNames && names.parent.split(' ').length < 2) return fail('Upišite ime i prezime roditelja.')
    if (!/^\S+@\S+\.\S+$/.test(mail)) return fail('Upišite ispravnu e-mail adresu.')
    setState('sending')
    if (withNames) savePendingJoin({ email: mail, child_name: names.child, parent_name: names.parent })
    try {
      const { sent } = await backend.signIn(mail, withNames ? { child_name: names.child, parent_name: names.parent } : undefined)
      if (withNames && !demo) await notifyClub(names.child, names.parent, mail)
      setState(sent ? 'sent' : 'idle')
    } catch (e) {
      fail(e instanceof Error ? e.message : 'Prijava nije uspjela.')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-app p-6 text-center" style={{ backgroundColor: 'var(--surface)' }}>
        <MailCheck size={36} className="mx-auto text-[var(--club-primary)]" />
        <h2 className="mt-3 font-display text-2xl font-extrabold uppercase">Provjerite e-mail</h2>
        <p className="text-muted mt-2">
          Poslali smo poveznicu za prijavu na <b className="text-[var(--text)]">{email.trim()}</b>. Otvorite je na ovom uređaju.
        </p>
        {parent && <p className="text-muted mt-2 text-sm">Klub je dobio obavijest o vašoj prijavi.</p>}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-app p-6" style={{ backgroundColor: 'var(--surface)' }}>
      <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold uppercase">
        <LogIn size={20} className="text-[var(--club-primary)]" /> Prijava
      </h2>
      <p className="text-muted mt-2 text-sm">{intro}</p>
      <form
        className={`mt-4 flex flex-col gap-2 ${parent ? '' : 'sm:flex-row'}`}
        onSubmit={(e) => {
          e.preventDefault()
          submit(email)
        }}
      >
        {parent && (
          <>
            <label className="text-sm">
              Ime i prezime djeteta
              <input value={child} onChange={(e) => setChild(e.target.value)} autoComplete="off" className={`${field} mt-1`} />
            </label>
            <label className="text-sm">
              Ime i prezime roditelja
              <input value={parentName} onChange={(e) => setParentName(e.target.value)} autoComplete="name" className={`${field} mt-1`} />
            </label>
          </>
        )}
        <label className={parent ? 'text-sm' : 'contents'}>
          {parent && 'E-mail roditelja'}
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vas.email@primjer.hr"
            className={`${field} ${parent ? 'mt-1' : 'flex-1'}`}
            aria-label="E-mail adresa"
          />
        </label>
        <button
          type="submit"
          disabled={state === 'sending'}
          className={`rounded-xl bg-[var(--club-primary)] px-5 py-2.5 font-display font-bold uppercase tracking-wide text-white disabled:opacity-60 ${parent ? 'mt-2 sm:self-start' : ''}`}
        >
          {state === 'sending' ? 'Šaljem…' : demo ? 'Uđi' : 'Pošalji poveznicu'}
        </button>
      </form>
      {state === 'error' && <p className="mt-2 text-sm text-[var(--club-red)]">{error}</p>}
      <p className="text-muted mt-3 text-xs">
        Prijavom prihvaćate da klub vodi evidenciju članarine —{' '}
        <Link to="/privatnost" className="underline">
          što se čuva i tko to vidi
        </Link>
        .
      </p>

      {demo && (
        <div className="mt-5 rounded-xl border border-dashed border-app p-4 text-sm">
          <div className="font-semibold">Demo način</div>
          <p className="text-muted mt-1">
            Baza još nije povezana, pa su ovo izmišljeni podaci spremljeni samo u ovom pregledniku. Isprobajte:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => submit(DEMO_PARENT, false)} className="tile-hover rounded-lg border border-app px-3 py-1.5">
              Roditelj ({DEMO_PARENT})
            </button>
            <button type="button" onClick={() => submit(DEMO_ADMIN, false)} className="tile-hover rounded-lg border border-app px-3 py-1.5">
              Klub ({DEMO_ADMIN})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
