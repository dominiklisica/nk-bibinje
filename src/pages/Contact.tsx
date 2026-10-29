import { useState, type FormEvent } from 'react'
import { MapPin, Shield, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { CLUB } from '../data/club'
import { CONTACT_TOPICS, WEB3FORMS_ACCESS_KEY } from '../data/contact'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const INFO = [
  { icon: MapPin, label: 'Adresa', value: CLUB.address },
  { icon: Shield, label: 'Stadion', value: CLUB.stadium },
]

const inputClass =
  'w-full rounded-xl border border-app px-4 py-3 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--club-primary)] focus:ring-2 focus:ring-[color:var(--club-primary)]/25'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const configured = WEB3FORMS_ACCESS_KEY !== ''

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    setStatus('sending')
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[${CLUB.name}] ${data.topic}: ${data.name}`,
          from_name: `${CLUB.name} — web stranica`,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Slanje nije uspjelo.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Slanje nije uspjelo.')
      setStatus('error')
    }
  }

  return (
    <div>
      <PageHeader
        title="Kontakt"
        subtitle="Imate pitanje, prijedlog ili želite surađivati s klubom? Pošaljite nam upit i javit ćemo vam se."
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <div
            className="rounded-2xl border border-app p-6 sm:p-8"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <h2 className="flex items-center gap-3 font-display text-2xl font-extrabold uppercase">
              <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
              Pošaljite upit
            </h2>

            {status === 'sent' ? (
              <div className="mt-8 flex flex-col items-center py-10 text-center">
                <CheckCircle2 size={56} style={{ color: 'var(--club-primary)' }} />
                <div className="font-display mt-4 text-2xl font-bold">Hvala na poruci!</div>
                <p className="text-muted mt-2 max-w-md">
                  Upit je zaprimljen. Odgovor ćemo poslati na e-mail adresu koju ste upisali.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 rounded-full border border-app px-6 py-2.5 font-display font-bold uppercase tracking-wide hover:text-[var(--club-primary)] transition-colors"
                >
                  Nova poruka
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Ime i prezime *</span>
                  <input name="name" required maxLength={100} autoComplete="name" className={inputClass} style={{ backgroundColor: 'var(--bg)' }} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">E-mail *</span>
                  <input name="email" type="email" required maxLength={150} autoComplete="email" className={inputClass} style={{ backgroundColor: 'var(--bg)' }} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Telefon</span>
                  <input name="phone" type="tel" maxLength={30} autoComplete="tel" className={inputClass} style={{ backgroundColor: 'var(--bg)' }} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Tema *</span>
                  <select name="topic" required defaultValue={CONTACT_TOPICS[0]} className={inputClass} style={{ backgroundColor: 'var(--bg)' }}>
                    {CONTACT_TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold">Poruka *</span>
                  <textarea name="message" required minLength={10} maxLength={5000} rows={6} className={`${inputClass} resize-y`} style={{ backgroundColor: 'var(--bg)' }} />
                </label>

                {/* Zamka za botove — ljudi ovo polje ne vide */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm sm:col-span-2" style={{ backgroundColor: 'color-mix(in srgb, var(--club-red) 12%, transparent)', color: 'var(--club-red)' }}>
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{error} Pokušajte ponovno za nekoliko trenutaka.</span>
                  </div>
                )}
                {!configured && (
                  <p className="text-muted text-sm sm:col-span-2">
                    Obrazac još nije povezan s e-mailom kluba, pa slanje privremeno nije moguće.
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={!configured || status === 'sending'}
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-display font-bold uppercase tracking-wide text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background: 'var(--club-primary)' }}
                  >
                    {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {status === 'sending' ? 'Šaljem…' : 'Pošalji upit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          {INFO.map((it) => (
            <div
              key={it.label}
              className="rounded-2xl border border-app p-5"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-lg text-white"
                style={{ background: 'var(--club-primary)' }}
              >
                <it.icon size={20} />
              </span>
              <div className="text-muted mt-3 text-xs uppercase tracking-wider">{it.label}</div>
              <div className="font-display mt-1 font-bold">{it.value}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  )
}
