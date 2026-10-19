import { useState } from 'react'
import { clubCrest, clubInitials } from '../../data/crests'

/**
 * Grb kluba (iz /public/klubovi/ ili /grb.jpg za Bibinje).
 * Ako grb nedostaje ili se ne učita, prikazuje krug s inicijalima.
 */
export default function ClubCrest({
  name,
  size = 28,
  className = '',
}: {
  name: string
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const src = clubCrest(name)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`shrink-0 rounded-full bg-white object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border border-app text-muted ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      aria-label={name}
    >
      {clubInitials(name)}
    </span>
  )
}
