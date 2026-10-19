import { useState } from 'react'
import type { Player } from '../../types'
import { playerPhotoSrc } from '../../lib/players'

/**
 * Fotografija igrača koja se automatski učita ako datoteka postoji
 * (/players/<ime-prezime>.jpg). Ako ne postoji, ništa se ne prikazuje
 * pa ostaje placeholder ispod — bez slomljene slike.
 */
export default function PlayerPhoto({ player }: { player: Player }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <>
      <img
        src={playerPhotoSrc(player)}
        alt={player.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </>
  )
}
