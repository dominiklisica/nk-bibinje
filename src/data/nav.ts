export interface NavItem {
  to: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Početna' },
  { to: '/utakmice', label: 'Utakmice' },
  { to: '/momcad', label: 'Momčad' },
  { to: '/tablica', label: 'Tablica' },
  { to: '/statistika', label: 'Statistika' },
  { to: '/o-klubu', label: 'O klubu' },
  { to: '/vijesti', label: 'Vijesti' },
  { to: '/galerija', label: 'Galerija' },
]
