import { useEffect, useState } from 'react'

function diff(target: number) {
  const now = Date.now()
  const d = Math.max(0, target - now)
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
    done: d === 0,
  }
}

/** Odbrojavanje do početka utakmice (datum + vrijeme, lokalno). */
export default function Countdown({ date, time }: { date: string; time: string }) {
  const target = new Date(`${date}T${time}:00`).getTime()
  const [t, setT] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units: { v: number; l: string }[] = [
    { v: t.days, l: 'dana' },
    { v: t.hours, l: 'sati' },
    { v: t.minutes, l: 'min' },
    { v: t.seconds, l: 'sek' },
  ]

  if (t.done) {
    return (
      <div className="font-display text-lg font-bold uppercase text-[var(--club-accent)]">
        Utakmica je počela
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {units.map((u) => (
        <div
          key={u.l}
          className="min-w-[56px] rounded-lg border border-app px-2 py-2 text-center"
          style={{ backgroundColor: 'var(--surface-2)' }}
        >
          <div className="font-display text-2xl font-extrabold leading-none tabular-nums">
            {String(u.v).padStart(2, '0')}
          </div>
          <div className="text-muted mt-1 text-[10px] uppercase tracking-wide">{u.l}</div>
        </div>
      ))}
    </div>
  )
}
