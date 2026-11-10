import type { TeamKey } from './teams'

// =========================================================
// POSTAVKE ZA UPLATE — upisati podatke kluba (vidi supabase/README.md)
// Dok je IBAN prazan, barkodovi se ne prikazuju (da nitko ne uplati na krivi račun).
// =========================================================

// Za testiranje s vlastitim računom upiši podatke u .env.local (ne ide na GitHub):
//   VITE_PAYMENT_IBAN=HR...   VITE_PAYMENT_NAME=...   VITE_PAYMENT_STREET=...   VITE_PAYMENT_CITY=...
const env = import.meta.env

/** Primatelj točno kako piše na uplatnici (HUB-3 ograničenja duljine u zagradi). */
export const RECIPIENT = {
  name: env.VITE_PAYMENT_NAME || 'NK Bibinje', // naziv primatelja (najviše 25 znakova)
  street: env.VITE_PAYMENT_STREET || 'Jadranska cesta 152', // ulica i broj (najviše 25)
  city: env.VITE_PAYMENT_CITY || '23205 Bibinje', // poštanski broj i mjesto (najviše 27)
  iban: env.VITE_PAYMENT_IBAN || '', // IBAN kluba — UPISATI
}

// Samo za isprobavanje: VITE_TEST_MONTHLY_FEE=1 u .env.local postavlja isti probni iznos svim ekipama.
const testFee = Number(env.VITE_TEST_MONTHLY_FEE) > 0 ? Number(env.VITE_TEST_MONTHLY_FEE) : null

/** Mjesečna članarina u eurima po ekipi; null = još nije određeno (barkod se ne prikazuje). */
export const MONTHLY_FEE: Record<TeamKey, number | null> = {
  seniori: testFee,
  pioniri: testFee,
  'mladji-pioniri': testFee,
  tici: testFee,
  papaline: testFee,
}

/** Popust za drugo i svako sljedeće dijete iste obitelji (0.2 = 20 %); 0 = bez popusta. */
export const SIBLING_DISCOUNT = 0

/** Mjeseci za koje se plaća članarina (sezona); format 'GGGG-MM'. */
export const SEASON_MONTHS = [
  '2026-09', '2026-10', '2026-11', '2026-12', '2027-01',
  '2027-02', '2027-03', '2027-04', '2027-05', '2027-06',
]

/** Ponuđeni iznosi donacije u eurima (donator može upisati i svoj). */
export const DONATION_AMOUNTS = [10, 20, 50, 100]

/** Model i opis uplata. HR00 = poziv na broj bez kontrolnog broja. */
export const MEMBERSHIP_MODEL = 'HR00'
export const DONATION_MODEL = 'HR99'
export const DONATION_DESCRIPTION = 'Donacija NK Bibinje'
