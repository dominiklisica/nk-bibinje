import type { RenderOptions } from '@bwip-js/browser'

// HUB-3 2D barkod (PDF417) za hrvatske uplatnice — skenira ga svaka mobilna banka.
// Sadržaj je 14 redaka teksta u kodnoj stranici ISO 8859-2 (specifikacija HUB-a).

export interface Hub3Data {
  amount: number | null // u eurima; null = platitelj upisuje sam
  payerName?: string
  payerStreet?: string
  payerCity?: string
  recipientName: string
  recipientStreet: string
  recipientCity: string
  iban: string
  model: string // npr. 'HR00'
  reference: string // poziv na broj, npr. '245-202611'
  purpose?: string // šifra namjene, npr. 'OTHR'
  description: string
}

const LIMITS = {
  payerName: 30,
  payerStreet: 27,
  payerCity: 27,
  recipientName: 25,
  recipientStreet: 25,
  recipientCity: 27,
  reference: 22,
  description: 35,
}

const cut = (s: string | undefined, n: number) => (s ?? '').replace(/\s+/g, ' ').trim().slice(0, n)

export const normalizeIban = (iban: string) => iban.replace(/\s+/g, '').toUpperCase()

/** Provjera IBAN-a (mod 97) — sprječava uplatu na pogrešno upisan račun. */
export function isValidIban(raw: string): boolean {
  const iban = normalizeIban(raw)
  if (!/^HR\d{19}$/.test(iban)) return false
  const moved = iban.slice(4) + iban.slice(0, 4)
  const digits = moved.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55))
  let rem = 0
  for (const d of digits) rem = (rem * 10 + Number(d)) % 97
  return rem === 1
}

/** Iznos u centima, 15 znamenki s vodećim nulama (prazno ako iznos nije zadan). */
const amountField = (eur: number | null) =>
  eur == null ? '' : String(Math.round(eur * 100)).padStart(15, '0')

export function hub3Text(d: Hub3Data): string {
  return [
    'HRVHUB30',
    'EUR',
    amountField(d.amount),
    cut(d.payerName, LIMITS.payerName),
    cut(d.payerStreet, LIMITS.payerStreet),
    cut(d.payerCity, LIMITS.payerCity),
    cut(d.recipientName, LIMITS.recipientName),
    cut(d.recipientStreet, LIMITS.recipientStreet),
    cut(d.recipientCity, LIMITS.recipientCity),
    normalizeIban(d.iban),
    d.model,
    cut(d.reference, LIMITS.reference),
    d.purpose ?? 'OTHR',
    cut(d.description, LIMITS.description),
  ].join('\n')
}

// Hrvatska slova u ISO 8859-2; ostalo do 0xFF je isto kao Latin-1.
const ISO_8859_2: Record<string, number> = {
  Č: 0xc8, č: 0xe8, Ć: 0xc6, ć: 0xe6, Đ: 0xd0, đ: 0xf0, Š: 0xa9, š: 0xb9, Ž: 0xae, ž: 0xbe,
}

/** Tekst kao niz bajtova ISO 8859-2 (svaki znak stringa = jedan bajt) za bwip-js `binarytext`. */
export function toIso88592Binary(text: string): string {
  let out = ''
  for (const ch of text) {
    const code = ISO_8859_2[ch] ?? ch.charCodeAt(0)
    out += String.fromCharCode(code <= 0xff ? code : 0x3f) // nepoznat znak -> '?'
  }
  return out
}

/** SVG barkoda; biblioteka se učitava tek kad zatreba, da ne usporava ostatak stranice. */
export async function hub3Svg(d: Hub3Data): Promise<string> {
  const { pdf417, drawingSVG } = await import('@bwip-js/browser')
  // columns/eclevel su PDF417 opcije koje tipovi biblioteke ne navode (HUB-3: 9 stupaca, korekcija 4).
  const opts = {
    bcid: 'pdf417',
    text: toIso88592Binary(hub3Text(d)),
    binarytext: true,
    columns: 9,
    eclevel: 4,
    rowmult: 5, // viši retci — kamera mobitela ih lakše čita sa zaslona
    scale: 2,
    padding: 4,
    backgroundcolor: 'FFFFFF',
  } as unknown as RenderOptions
  return pdf417(opts, drawingSVG())
}

export const formatEur = (eur: number) =>
  eur.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })
