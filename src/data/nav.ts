import { MEMBERSHIP_ENABLED } from '../lib/features'

export interface NavItem {
  to: string
  label: string
}

const ALL_ITEMS: NavItem[] = [
  { to: '/', label: 'Početna' },
  { to: '/utakmice', label: 'Utakmice' },
  { to: '/momcad', label: 'Momčad' },
  { to: '/tablica', label: 'Tablica' },
  { to: '/statistika', label: 'Statistika' },
  { to: '/o-klubu', label: 'O klubu' },
  { to: '/vijesti', label: 'Vijesti' },
  { to: '/galerija', label: 'Galerija' },
  { to: '/clanarina', label: 'Članarina' },
  { to: '/donacije', label: 'Donacije' },
  { to: '/kontakt', label: 'Kontakt' },
]

export const NAV_ITEMS = ALL_ITEMS.filter((i) => MEMBERSHIP_ENABLED || i.to !== '/clanarina')
