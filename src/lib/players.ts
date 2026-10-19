import type { Player } from '../types'

const DIACRITICS: Record<string, string> = {
  č: 'c', ć: 'c', š: 's', ž: 'z', đ: 'd',
  Č: 'c', Ć: 'c', Š: 's', Ž: 'z', Đ: 'd',
}

/** Pretvara ime igrača u naziv datoteke, npr. "Stipe Silov" -> "stipe-silov". */
export function photoSlug(name: string): string {
  return name
    .split('')
    .map((c) => DIACRITICS[c] ?? c)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Putanja do fotografije igrača. Ako je zadano `photo`, koristi se ono;
 * inače se traži /players/<ime-prezime>.jpg. Ako datoteka ne postoji,
 * kartica pokazuje placeholder (greška učitavanja se elegantno hvata).
 */
// Povećaj kad zamijeniš fotografije — tjera preglednik da učita svježe
// datoteke umjesto starih iz cachea.
const PHOTO_VERSION = 2

export function playerPhotoSrc(player: Player): string {
  const base = player.photo ?? `/players/${photoSlug(player.name)}.jpg`
  return `${base}?v=${PHOTO_VERSION}`
}
