import type { Match } from '../types'

const STADIUM = 'Igralište Franka Lisice, Bibinje'
const COMP = '1. ŽNL Zadarska'

// Svi susreti NK Bibinje u sezoni 2026/27.
// Izvor: HNS Semafor (COMET). Rezultati su stvarni; prazni rezultati = još neodigrano.
// (Broj kola izostavljen dok se pouzdano ne potvrdi iz HNS-a.)
export const MATCHES: Match[] = [
  { id: 'm01', date: '2026-09-19', time: '17:00', home: 'NK Bibinje', away: 'NK Polača', homeScore: 3, awayScore: 1, competition: COMP, venue: STADIUM, status: 'finished' },
  { id: 'm02', date: '2026-09-27', time: '16:30', home: "NK Škabrnja '91", away: 'NK Bibinje', homeScore: 3, awayScore: 0, competition: COMP, status: 'finished' },
  { id: 'm03', date: '2026-10-03', time: '16:30', home: 'NK Bibinje', away: 'NŠK Zlatna Luka', homeScore: 0, awayScore: 2, competition: COMP, venue: STADIUM, status: 'finished' },
  { id: 'm04', date: '2026-10-07', time: '16:30', home: 'NŠK Zemunik', away: 'NK Bibinje', homeScore: 2, awayScore: 7, competition: COMP, status: 'finished' },
  { id: 'm05', date: '2026-10-17', time: '18:00', home: 'NK Sabunjar', away: 'NK Bibinje', homeScore: 3, awayScore: 2, competition: COMP, status: 'finished' },
  { id: 'm06', date: '2026-10-21', time: '16:00', home: 'NK Bibinje', away: 'NŠK Raštane', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm07', date: '2026-10-24', time: '15:30', home: 'NK Bibinje', away: 'NK Dragovoljac', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm08', date: '2026-11-01', time: '14:30', home: 'NŠK Debeljak', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm09', date: '2026-11-07', time: '14:30', home: 'NK Bibinje', away: 'HNK Velebit (B)', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm10', date: '2026-11-14', time: '14:00', home: 'NK Pakoštane', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm11', date: '2026-11-21', time: '14:00', home: 'NK Bibinje', away: 'NŠK Nova Zora', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm12', date: '2026-11-28', time: '13:30', home: 'NK Bibinje', away: 'NK Abeceda sporta', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm13', date: '2026-12-06', time: '13:30', home: 'NK Hajduk (P)', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm14', date: '2027-03-07', time: '15:30', home: 'NK Polača', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm15', date: '2027-03-14', time: '15:30', home: 'NK Bibinje', away: "NK Škabrnja '91", homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm16', date: '2027-03-21', time: '15:30', home: 'NŠK Zlatna Luka', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm17', date: '2027-03-28', time: '17:00', home: 'NK Bibinje', away: 'NŠK Zemunik', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm18', date: '2027-04-04', time: '17:00', home: 'NŠK Raštane', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm19', date: '2027-04-11', time: '17:00', home: 'NK Bibinje', away: 'NK Sabunjar', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm20', date: '2027-04-18', time: '17:00', home: 'NK Dragovoljac', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm21', date: '2027-04-25', time: '17:00', home: 'NK Bibinje', away: 'NŠK Debeljak', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm22', date: '2027-05-02', time: '17:30', home: 'HNK Velebit (B)', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm23', date: '2027-05-09', time: '17:30', home: 'NK Bibinje', away: 'NK Pakoštane', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
  { id: 'm24', date: '2027-05-16', time: '17:30', home: 'NŠK Nova Zora', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm25', date: '2027-05-23', time: '17:30', home: 'NK Abeceda sporta', away: 'NK Bibinje', homeScore: null, awayScore: null, competition: COMP, status: 'upcoming' },
  { id: 'm26', date: '2027-05-30', time: '17:30', home: 'NK Bibinje', away: 'NK Hajduk (P)', homeScore: null, awayScore: null, competition: COMP, venue: STADIUM, status: 'upcoming' },
]
