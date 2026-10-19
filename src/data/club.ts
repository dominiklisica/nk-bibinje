import type { ClubInfo, SourceMeta } from '../types'

// Službeni podaci o klubu — izvor: HNS Semafor (COMET)
export const CLUB: ClubInfo = {
  name: 'NK Bibinje',
  fullName: 'Nogometni klub Bibinje',
  founded: '10. rujna 1950.',
  foundedYear: 1950,
  town: 'Bibinje',
  address: 'Jadranska cesta 152, 23205 Bibinje',
  stadium: 'Igralište Franka Lisice („Kobiljak")',
  league: '1. ŽNL Zadarska',
  season: '2026/27',
}

// Jedan izvor istine za metapodatke — koristi se uz svaki prikaz podataka.
export const HNS_SOURCE: SourceMeta = {
  source: 'HNS Semafor (COMET)',
  url: 'https://semafor.hns.family/klubovi/213/nk-bibinje/',
  lastUpdated: '2026-10-16',
}
