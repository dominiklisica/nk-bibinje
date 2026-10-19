import type { FormResult } from '../../types'

const STYLE: Record<FormResult, { bg: string; label: string }> = {
  W: { bg: '#2e7d34', label: 'P' }, // Pobjeda
  D: { bg: '#9a8a2e', label: 'N' }, // Neriješeno
  L: { bg: '#c0392b', label: 'I' }, // Izgubljeno
}

/** Niz W/D/L oznaka (hrvatski: P/N/I) za posljednjih nekoliko utakmica. */
export default function FormBadges({
  form,
  size = 26,
}: {
  form: FormResult[]
  size?: number
}) {
  if (form.length === 0) {
    return <span className="text-muted text-sm">Nema podataka</span>
  }
  return (
    <div className="flex gap-1.5">
      {form.map((r, i) => (
        <span
          key={i}
          className="inline-grid place-items-center rounded-md font-display font-bold text-white"
          style={{ width: size, height: size, background: STYLE[r].bg, fontSize: size * 0.5 }}
          title={r === 'W' ? 'Pobjeda' : r === 'D' ? 'Neriješeno' : 'Poraz'}
        >
          {STYLE[r].label}
        </span>
      ))}
    </div>
  )
}
