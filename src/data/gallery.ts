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
]

export const GALLERY_SOURCE = 'https://www.facebook.com/NKBIBINJE1950/'
