// Galerija — fotografije sa službene Facebook stranice NK Bibinje.
export interface GalleryPhoto {
  src: string
  alt: string
}

// ?v služi za osvježavanje predmemorije preglednika kad se fotografije zamijene.
export const GALLERY: GalleryPhoto[] = [
  { src: '/slike/galerija/prvaci.jpg?v=1', alt: 'Slavlje momčadi s medaljama' },
  { src: '/slike/galerija/slavlje-1.jpg?v=1', alt: 'Slavlje s navijačima i bakljama na Kobiljku' },
  { src: '/slike/galerija/slavlje-3.jpg?v=1', alt: 'Radost momčadi nakon pobjede' },
  { src: '/slike/galerija/navijaci.jpg?v=1', alt: 'Navijači NK Bibinje' },
  { src: '/slike/galerija/trofej.jpg?v=1', alt: 'Osvajanje trofeja — slavlje s medaljama' },
  { src: '/slike/galerija/momcad.jpg?v=1', alt: 'Momčad NK Bibinje' },
  { src: '/slike/galerija/slavlje-kup-2024.jpg?v=1', alt: 'Slavlje u svlačionici nakon kupa u Biogradu 2024.' },
  { src: '/slike/galerija/slavlje-baklje-pehar.jpg?v=1', alt: 'Igrači s peharom uz baklje i navijače' },
  { src: '/slike/galerija/momcad-prugasti-dresovi.jpg?v=1', alt: 'Momčad u zeleno-bijelim prugastim dresovima' },
  { src: '/slike/galerija/bibinje-dalmatinac-2012.jpg?v=1', alt: 'Slavlje gola protiv NK Dalmatinac, 2012.' },
  { src: '/slike/galerija/utakmica-duel.jpg?v=1', alt: 'Duel u skoku pred golom' },
  { src: '/slike/galerija/druzenje-uz-svlacionicu.webp?v=1', alt: 'Igrači, navijači i djeca u druženju uz svlačionicu' },
  { src: '/slike/galerija/navijaci-tribina.jpg?v=1', alt: 'Navijači podržavaju momčad s tribine' },
  { src: '/slike/galerija/navijaci-transparenti.jpg?v=1', alt: 'Navijači s transparentima Green Boys, Patrioti i Mlada garda' },
  { src: '/slike/galerija/slavlje-svlacionica-mladi.jpg?v=1', alt: 'Slavlje mladih igrača u svlačionici' },
]

export const GALLERY_SOURCE = 'https://www.facebook.com/NKBIBINJE1950/'
