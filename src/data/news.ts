// Vijesti NK Bibinje. Objave s oznakom `facebook` su stvarne objave sa službene
// Facebook stranice kluba (NKBIBINJE1950); ostale su napisane isključivo iz
// provjerenih podataka HNS Semafora (rezultati, strijelci, raspored) — bez izmišljanja.
export const NEWS_SOURCE = 'https://www.facebook.com/NKBIBINJE1950/'

export type NewsCategory = 'Najava' | 'Obavijest' | 'Izvještaj'

export interface NewsItem {
  id: string
  date: string // ISO
  category: NewsCategory
  title: string
  excerpt: string
  body: string[]
  /** Stvarna objava sa službene Facebook stranice — prikazuje poveznicu na nju. */
  facebook?: boolean
  /** Odigrana utakmica na koju se vijest odnosi — prikazuje poveznicu na detalje. */
  matchId?: string
}

export const NEWS: NewsItem[] = [
  {
    id: 'n-raspored-dvije-domace',
    date: '2026-10-19',
    category: 'Obavijest',
    title: 'Dvije domaće utakmice u četiri dana',
    excerpt:
      'Kobiljak ovaj tjedan ugošćuje Raštane u srijedu i Dragovoljac u subotu.',
    body: [
      'Pred našim zelenima je naporan tjedan s dvije utakmice na Igralištu Franka Lisice u Kobiljku.',
      'U srijedu, 21. listopada, u 16:00 sati igra se odgođena utakmica 5. kola protiv NŠK Raštane. Već u subotu, 24. listopada, u 15:30 sati u Kobiljak stiže NK Dragovoljac.',
      'NK Bibinje trenutačno je deveti na tablici 1. ŽNL Zadarske sa 6 bodova iz 5 utakmica. Dvije domaće utakmice prilika su za uspon na tablici. Ajmo zeleni!',
    ],
  },
  {
    id: 'n-najava-rastane-novi-termin',
    date: '2026-10-19',
    category: 'Najava',
    title: 'Raštane u srijedu u Kobiljku',
    excerpt:
      'Odgođena utakmica 5. kola protiv Raštana igra se u srijedu, 21. listopada, u 16:00 sati.',
    body: [
      'Utakmica 5. kola protiv NŠK Raštane, odgođena 10. listopada zbog vremenskih neprilika, dobila je novi termin.',
      'Susret se igra u srijedu, 21. listopada 2026., s početkom u 16:00 sati na Igralištu Franka Lisice u Kobiljku.',
      'Raštane su trenutačno druge na tablici s 12 bodova, pa nas čeka težak ispit. Pozivamo sve navijače da nas podrže u što većem broju!',
    ],
  },
  {
    id: 'n-izvjestaj-sabunjar',
    date: '2026-10-18',
    category: 'Izvještaj',
    title: 'Poraz u Privlaci: Sabunjar – Bibinje 3:2',
    excerpt:
      'Unatoč borbi u nastavku, naši zeleni poraženi su na gostovanju kod Sabunjara.',
    body: [
      'U 6. kolu 1. ŽNL Zadarske NK Bibinje je u subotu, 17. listopada, poražen na gostovanju kod NK Sabunjar u Privlaci rezultatom 3:2.',
      'Domaćini su poveli već u 10. minuti golom Roka Kovača, a Luka Miletić je u 14. i 34. minuti povisio na 3:0. Ante Lisica smanjio je na 3:1 u 40. minuti, a u 55. minuti autogol Frane Bašića donio je konačnih 3:2.',
      'Mate Lukić isključen je u 83. minuti nakon drugog žutog kartona. Bibinje nakon ove utakmice ima 6 bodova i deveto mjesto na tablici.',
    ],
    matchId: 'm05',
  },
  {
    id: 'n-odgoda-rastane',
    date: '2026-10-10',
    category: 'Obavijest',
    title: 'Utakmica s Raštanama odgođena',
    excerpt:
      'Utakmica koja se trebala igrati u Kobiljku s Raštanama odgođena je zbog vremenskih neprilika.',
    body: [
      'Utakmica koja se trebala danas igrati u Kobiljku sa Raštanama odgođena je zbog vremenskih neprilika.',
      'Novi termin utakmice bit će naknadno objavljen.',
    ],
    facebook: true,
  },
  {
    id: 'n-najava-rastane',
    date: '2026-10-09',
    category: 'Najava',
    title: 'Ove subote u Bibinje stiže Raštane!',
    excerpt:
      'Nakon pobjede u Zemuniku okrećemo se nastavku prvenstva — u Kobiljak stižu Raštane.',
    body: [
      'Nakon povratka na pobjedničke staze i sedmice u Zemuniku okrećemo se nastavku prvenstva. Ove subote u Kobiljak stižu zakuhtale Raštane. Vremena za odmor nema i stoga budite uz nas ove subote.',
      'Unatoč tome što će ovo biti naša 3. utakmica u 7 dana spremni smo pružiti otpor uigranim Raštanama i pružiti dobru utakmicu. Uspjeli smo se okupiti na treningu i pripremiti za novi prvenstveni izazov.',
      'Pozivam sve naše navijače da nas podrže u velikom broju ove subote s početkom u 16h. Ajmo zeleni!',
      'NŠK Raštane · 1. ŽNL Zadarska · 5. kolo · Igralište Franka Lisice Kobiljak · 10.10.2026. · 16:00h',
    ],
    facebook: true,
  },
  {
    id: 'n-najava-zemunik',
    date: '2026-10-07',
    category: 'Najava',
    title: 'Gostovanje kod Zemunika',
    excerpt: 'Danas od 16:30h gostujemo na Lužinama kod Zemunika.',
    body: [
      'Danas od 16:30h gostujemo na Lužinama kod Zemunika.',
      'Ne treba ništa previše najavljivati. Vidimo se na Lužinama. Ajmo zeleni!',
    ],
    facebook: true,
  },
  {
    id: 'n-hvala-patrioti',
    date: '2026-10-04',
    category: 'Izvještaj',
    title: 'Hvala Patrioti',
    excerpt:
      'Zahvala navijačima nakon teškog poraza — vraćamo se jači nego ikad.',
    body: [
      'Hvala vam na ogromnoj podršci. Jučer jednostavno nije išlo. Još jednu utakmicu u nizu lopta nije htjela u gol. Ali najbitnije je da na kraju možemo reći da smo dali sve od sebe i ostavili sve na terenu.',
      'U inat svima, ne damo na Bibinje! Vratit ćemo se jači nego ikad!',
    ],
    facebook: true,
  },
  {
    id: 'n-najava-zlatna-luka',
    date: '2026-10-03',
    category: 'Najava',
    title: 'El clásico protiv Zlatne Luke',
    excerpt:
      'Naši zeleni dočekuju Zlatnu Luku iz Sukošana — Kobiljak u 16:30h.',
    body: [
      'Danas naši zeleni dočekuju ekipu Zlatne Luke iz Sukošana u sklopu velikog rivalskog el clásica. Kobiljak će danas biti prepun navijačima.',
      'Napravimo zajedno atmosferu za pamćenje jer zajedno smo nepobjedivi. Danas ćemo ostaviti zadnji atom snage na terenu za sveti dres.',
      'Svih 11, svih 90, svim srcem. Svi u Kobiljak! Ajmo zeleni!',
    ],
    facebook: true,
  },
]
