import { useState } from 'react'
import { LogIn, MailCheck } from 'lucide-react'
import { backend } from '../../lib/backend'
import { DEMO_ADMIN, DEMO_PARENT } from '../../lib/backend/demo'

/** Prijava e-mailom (Supabase šalje poveznicu, bez lozinke); u demo načinu ulaz odmah. */
export default function LoginCard({ intro }: { intro: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const demo = backend.mode === 'demo'

  const submit = async (value: string) => {
    if (!/^\S+@\S+\.\S+$/.test(value.trim())) {
      setState('error')
      setError('Upišite ispravnu e-mail adresu.')
      return
    }
    setState('sending')
    try {
      const { sent } = await backend.signIn(value)
      setState(sent ? 'sent' : 'idle')
    } catch (e) {
      setState('error')
      setError(e instanceof Error ? e.message : 'Prijava nije uspjela.')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-app p-6 text-center" style={{ backgroundColor: 'var(--surface)' }}>
        <MailCheck size={36} className="mx-auto text-[var(--club-primary)]" />
        <h2 className="mt-3 font-display text-2xl font-extrabold uppercase">Provjerite e-mail</h2>
        <p className="text-muted mt-2">
          Poslali smo poveznicu za prijavu na <b className="text-[var(--text)]">{email}</b>. Otvorite je na ovom uređaju.
        </p>
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
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault()
          submit(email)
        }}
      >
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vas.email@primjer.hr"
          className="min-w-0 flex-1 rounded-xl border border-app bg-transparent px-4 py-2.5 outline-none focus:border-[var(--club-primary)]"
          aria-label="E-mail adresa"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="rounded-xl bg-[var(--club-primary)] px-5 py-2.5 font-display font-bold uppercase tracking-wide text-white disabled:opacity-60"
        >
          {state === 'sending' ? 'Šaljem…' : demo ? 'Uđi' : 'Pošalji poveznicu'}
        </button>
      </form>
      {state === 'error' && <p className="mt-2 text-sm text-[var(--club-red)]">{error}</p>}

      {demo && (
        <div className="mt-5 rounded-xl border border-dashed border-app p-4 text-sm">
          <div className="font-semibold">Demo način</div>
          <p className="text-muted mt-1">
            Baza još nije povezana, pa su ovo izmišljeni podaci spremljeni samo u ovom pregledniku. Isprobajte:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => submit(DEMO_PARENT)} className="tile-hover rounded-lg border border-app px-3 py-1.5">
              Roditelj ({DEMO_PARENT})
            </button>
            <button type="button" onClick={() => submit(DEMO_ADMIN)} className="tile-hover rounded-lg border border-app px-3 py-1.5">
              Klub ({DEMO_ADMIN})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
