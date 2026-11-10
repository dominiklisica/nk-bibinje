import { useState } from 'react'
import { HeartHandshake } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import Hub3Barcode from '../components/ui/Hub3Barcode'
import {
  DONATION_AMOUNTS,
  DONATION_DESCRIPTION,
  DONATION_MODEL,
  RECIPIENT,
} from '../data/payments'

export default function Donations() {
  const [preset, setPreset] = useState<number | null>(DONATION_AMOUNTS[1] ?? null)
  const [custom, setCustom] = useState('')
  const customValue = Number(custom.replace(',', '.'))
  const amount = custom ? (customValue > 0 ? Math.round(customValue * 100) / 100 : null) : preset

  return (
    <div>
      <PageHeader
        title="Donacije"
        subtitle="Podržite rad kluba i naših mlađih uzrasta — svaki euro ide za opremu, putovanja i turnire."
        bgImage="/slike/galerija/navijaci-tribina.jpg"
        imgPosition="center 40%"
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <Reveal>
          <section className="rounded-2xl border border-app p-5 sm:p-6" style={{ backgroundColor: 'var(--surface)' }}>
            <h2 className="flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
              <HeartHandshake size={22} className="text-[var(--club-primary)]" /> Odaberite iznos
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {DONATION_AMOUNTS.map((a) => {
                const active = !custom && preset === a
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setPreset(a)
                      setCustom('')
                    }}
                    aria-pressed={active}
                    className={`tile-hover rounded-xl border px-5 py-2.5 font-display text-lg font-bold tabular-nums ${
                      active ? 'border-[var(--club-primary)] bg-[var(--club-primary)] text-white' : 'border-app'
                    }`}
                  >
                    {a} €
                  </button>
                )
              })}
              <label className="flex items-center gap-2 rounded-xl border border-app px-3 py-1.5">
                <span className="text-muted text-sm">Drugi iznos</span>
                <input
                  inputMode="decimal"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value.replace(/[^\d.,]/g, ''))}
                  placeholder="npr. 30"
                  className="w-20 bg-transparent font-display text-lg font-bold tabular-nums outline-none"
                  aria-label="Drugi iznos donacije u eurima"
                />
                <span className="font-display font-bold">€</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setPreset(null)
                  setCustom('')
                }}
                aria-pressed={!custom && preset === null}
                className={`tile-hover rounded-xl border px-4 py-2.5 text-sm font-semibold ${
                  !custom && preset === null ? 'border-[var(--club-primary)] text-[var(--club-primary)]' : 'border-app'
                }`}
              >
                Iznos upisujem u banci
              </button>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.05}>
          <section className="rounded-2xl border border-app p-5 sm:p-6" style={{ backgroundColor: 'var(--surface)' }}>
            <h2 className="mb-4 font-display text-2xl font-extrabold uppercase tracking-tight">Skenirajte i uplatite</h2>
            <Hub3Barcode
              data={{
                amount,
                recipientName: RECIPIENT.name,
                recipientStreet: RECIPIENT.street,
                recipientCity: RECIPIENT.city,
                iban: RECIPIENT.iban,
                model: DONATION_MODEL,
                reference: '',
                description: DONATION_DESCRIPTION,
              }}
            />
            <p className="text-muted mt-5 text-sm">
              Barkod otvara gotov nalog u vašoj mobilnoj banci; podatke platitelja i potvrdu upisujete tamo.
              Hvala vam na podršci — Ajmo zeleni!
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  )
}
