// Vijesti NK Bibinje. Svaka vijest je zasebna JSON datoteka u src/content/vijesti/
// i uređuje se kroz CMS na /admin (Sveltia CMS) — spremanje radi commit na GitHub.
// Objave s oznakom `facebook` su stvarne objave sa službene Facebook stranice
// kluba (NKBIBINJE1950); ostale su napisane iz provjerenih podataka HNS Semafora.
export const NEWS_SOURCE = 'https://www.facebook.com/NKBIBINJE1950/'

export type NewsCategory = 'Najava' | 'Obavijest' | 'Izvještaj'

export interface NewsItem {
  id: string
  date: string // ISO
  category: NewsCategory
  title: string
  excerpt?: string
  /** Odlomci teksta (u JSON-u jedan tekst, odlomci odvojeni praznim retkom). */
  body: string[]
  /** Stvarna objava sa službene Facebook stranice — prikazuje poveznicu na nju. */
  facebook?: boolean
  /** Odigrana utakmica na koju se vijest odnosi — prikazuje poveznicu na detalje. */
  matchId?: string
  /** Fotografija vijesti (CMS: /slike/vijesti/...). Bez nje se koristi klupska fotografija. */
  image?: string
}

// Klupske fotografije za vijesti bez vlastite slike (ukrasne, nisu s tog događaja).
const FALLBACK_IMAGES: Record<NewsCategory, string[]> = {
  Najava: ['/slike/galerija/momcad.jpg?v=1', '/slike/galerija/navijaci-tribina.jpg?v=1', '/slike/galerija/momcad-prugasti-dresovi.jpg?v=1'],
  Izvještaj: ['/slike/galerija/utakmica-duel.jpg?v=1', '/slike/galerija/slavlje-3.jpg?v=1', '/slike/galerija/slavlje-svlacionica-mladi.jpg?v=1'],
  Obavijest: ['/slike/galerija/navijaci.jpg?v=1', '/slike/galerija/druzenje-uz-svlacionicu.webp?v=1'],
}

/** Slika vijesti: vlastita, ili uvijek ista klupska fotografija za tu vijest. */
export function newsImage(item: NewsItem): string {
  if (item.image) return item.image
  const list = FALLBACK_IMAGES[item.category]
  const hash = [...item.id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
  return list[hash % list.length]
}

type NewsFile = Omit<NewsItem, 'id' | 'body'> & { body: string }

const files = import.meta.glob<NewsFile>('../content/vijesti/*.json', {
  eager: true,
  import: 'default',
})

// Najnovije prve; vijesti istog datuma po id-u (silazno) da redoslijed bude stabilan.
// id vijesti je naziv datoteke bez .json.
export const NEWS: NewsItem[] = Object.entries(files)
  .map(([path, n]) => ({
    ...n,
    id: path.split('/').pop()!.replace(/\.json$/, ''),
    matchId: n.matchId || undefined,
    image: n.image || undefined,
    body: n.body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  }))
  .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
