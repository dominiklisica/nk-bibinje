// Vijesti preuzete sa službene Facebook stranice NK Bibinje (NKBIBINJE1950).
// Tekstovi su stvarne objave kluba; nisu izmišljeni.
export const NEWS_SOURCE = 'https://www.facebook.com/NKBIBINJE1950/'

export type NewsCategory = 'Najava' | 'Obavijest' | 'Izvještaj'

export interface NewsItem {
  id: string
  date: string // ISO
  category: NewsCategory
  title: string
  excerpt: string
  body: string[]
}

export const NEWS: NewsItem[] = [
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
  },
]
