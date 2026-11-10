import { useEffect, useState } from 'react'
import { Check, Copy, ScanLine } from 'lucide-react'
import { formatEur, hub3Svg, isValidIban, normalizeIban, type Hub3Data } from '../../lib/hub3'

function CopyRow({ label, value }: { label: string; value: string }) {
  const [done, setDone] = useState(false)
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <div className="text-muted text-[11px] uppercase tracking-wide">{label}</div>
        <div className="truncate font-medium tabular-nums">{value || '—'}</div>
      </div>
      {value && (
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(value).then(() => {
              setDone(true)
              setTimeout(() => setDone(false), 1500)
            })
          }}
          className="tile-hover grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-app"
          aria-label={`Kopiraj: ${label}`}
        >
          {done ? <Check size={15} className="text-[var(--club-primary)]" /> : <Copy size={15} />}
        </button>
      )}
    </div>
  )
}

/**
 * HUB-3 barkod za mobilno bankarstvo s podacima uplatnice ispod (za ručno plaćanje).
 * Ako IBAN kluba nije upisan ili nije ispravan, barkod se ne prikazuje.
 */
export default function Hub3Barcode({ data, compact = false }: { data: Hub3Data; compact?: boolean }) {
  const valid = isValidIban(data.iban)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const text = JSON.stringify(data)

  useEffect(() => {
    if (!valid) return
    let alive = true
    hub3Svg(data)
      .then((s) => alive && (setSvg(s), setError(false)))
      .catch(() => alive && setError(true))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `text` je sažetak cijelog `data`
  }, [text, valid])

  if (!valid) {
    return (
      <div className="rounded-2xl border border-dashed border-app p-5 text-sm">
        <div className="font-display text-base font-bold uppercase">Uplate uskoro</div>
        <p className="text-muted mt-1">
          Podaci računa kluba još nisu upisani, pa se barkod za plaćanje ne prikazuje.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid gap-5 ${compact ? '' : 'md:grid-cols-[auto_1fr] md:items-start'}`}>
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          {svg ? (
            <div
              className="w-[320px] max-w-full [&>svg]:h-auto [&>svg]:w-full"
              role="img"
              aria-label="HUB-3 barkod za plaćanje"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="grid h-[150px] w-[320px] max-w-full place-items-center text-sm text-neutral-500">
              {error ? 'Barkod se nije mogao izraditi.' : 'Izrađujem barkod…'}
            </div>
          )}
        </div>
        <div className="text-muted inline-flex items-center gap-1.5 text-xs">
          <ScanLine size={14} /> m-banking → „Skeniraj uplatnicu” / „Plati barkodom”
        </div>
      </div>

      <div className="divide-y divide-[color:var(--border)] text-sm">
        <CopyRow label="Iznos" value={data.amount != null ? formatEur(data.amount) : 'po želji'} />
        <CopyRow label="Primatelj" value={`${data.recipientName}, ${data.recipientCity}`} />
        <CopyRow label="IBAN" value={normalizeIban(data.iban)} />
        <CopyRow label="Model i poziv na broj" value={`${data.model} ${data.reference}`.trim()} />
        <CopyRow label="Opis plaćanja" value={data.description} />
      </div>
    </div>
  )
}
