import { useState } from 'react'
import { asset } from '../lib/asset'

interface CrestProps {
  size?: number
  className?: string
}

/**
 * Prikazuje službeni grb NK Bibinje iz /public/grb.png.
 * Ako datoteka još nije dodana, prikazuje elegantan monogram kao zamjenu
 * (nema slomljene slike).
 */
export default function Crest({ size = 40, className = '' }: CrestProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`inline-grid place-items-center rounded-full font-display font-extrabold text-white ${className}`}
        style={{
          width: size,
          height: size,
          background: 'var(--club-primary)',
          fontSize: size * 0.42,
          lineHeight: 1,
        }}
        aria-label="NK Bibinje"
      >
        NKB
      </span>
    )
  }

  return (
    <img
      src={asset('/grb.jpg')}
      alt="Grb NK Bibinje"
      width={size}
      height={size}
      className={`rounded-lg bg-white object-contain ${className}`}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  )
}
