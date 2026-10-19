import type { Player } from '../types'

// Sastav NK Bibinje — sezona 2026/27. Izvor: HNS Semafor (COMET).
// Napomena: službeni izvor razlikuje samo vratare ("Vratar") i ostale ("Igrač"),
// pa detaljnije pozicije (branič/vezni/napadač) nisu ovdje izmišljene.
// Kod vratara je "goalsConceded" (primljeni), a postignuti golovi su 0.
//
// FOTOGRAFIJE: kad budu dostupne (uz prava korištenja), spremi ih u
// /public/players/ i dodaj igraču polje npr. photo: '/players/silov.jpg'.
// Dok ne postoje, kartica prikazuje uredan placeholder s brojem.
export const SQUAD: Player[] = [
  { id: 'p-cindric', number: 12, name: 'Ivan Cindrić', position: 'GK', appearances: 4, minutes: 360, goals: 0, goalsConceded: 9, yellowCards: 1, redCards: 0 },
  { id: 'p-mlisica', number: 1, name: 'Mateo Lisica', position: 'GK', appearances: 1, minutes: 90, goals: 0, goalsConceded: 2, yellowCards: 1, redCards: 0 },

  { id: 'p-bralic', number: 3, name: 'Mateo Bralić', position: 'OUTFIELD', appearances: 4, minutes: 228, goals: 0, yellowCards: 1, redCards: 0 },
  { id: 'p-brunetti', number: 7, name: 'Francesco Antonio Brunetti', position: 'OUTFIELD', appearances: 3, minutes: 126, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-bugarija', number: 19, name: 'Mate Bugarija', position: 'OUTFIELD', appearances: 1, minutes: 21, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-jdelija', number: 6, name: 'Jakov Delija', position: 'OUTFIELD', appearances: 1, minutes: 45, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-rdelija', number: 2, name: 'Roko Delija', position: 'OUTFIELD', appearances: 5, minutes: 270, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-erstic', number: 19, name: 'Luka Erstić', position: 'OUTFIELD', appearances: 2, minutes: 88, goals: 1, yellowCards: 0, redCards: 0 },
  { id: 'p-frleta', number: 4, name: 'Tomislav Frleta', position: 'OUTFIELD', appearances: 2, minutes: 90, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-gambiraza', number: 20, name: 'Stipe Gambiraža', position: 'OUTFIELD', appearances: 4, minutes: 329, goals: 1, yellowCards: 1, redCards: 1 },
  { id: 'p-bkatusa', number: 5, name: 'Blaž Katuša', position: 'OUTFIELD', appearances: 2, minutes: 180, goals: 0, yellowCards: 1, redCards: 0 },
  { id: 'p-dkatusa', number: 23, name: 'David Katuša', position: 'OUTFIELD', appearances: 5, minutes: 250, goals: 1, yellowCards: 0, redCards: 0 },
  { id: 'p-konestabo', number: 4, name: 'Ivano Konestabo', position: 'OUTFIELD', appearances: 1, minutes: 45, goals: 0, yellowCards: 0, redCards: 0, photo: '/players/ivano-konestabo.png' },
  { id: 'p-kozul', number: 10, name: 'Marko Kožul', position: 'OUTFIELD', appearances: 5, minutes: 322, goals: 1, yellowCards: 0, redCards: 0 },
  { id: 'p-alisica', number: 9, name: 'Ante Lisica', position: 'OUTFIELD', appearances: 5, minutes: 225, goals: 1, yellowCards: 1, redCards: 0 },
  { id: 'p-dlisica', number: 5, name: 'Dominik Lisica', position: 'OUTFIELD', appearances: 3, minutes: 118, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-elisica', number: 14, name: 'Enzo Lisica', position: 'OUTFIELD', appearances: 5, minutes: 291, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-alonic', number: 22, name: 'Ante Lonić', position: 'OUTFIELD', appearances: 1, minutes: 4, goals: 0, yellowCards: 1, redCards: 0 },
  { id: 'p-dlonic', number: 18, name: 'Domagoj Lonić', position: 'OUTFIELD', appearances: 3, minutes: 93, goals: 0, yellowCards: 1, redCards: 0 },
  { id: 'p-lukic', number: 11, name: 'Mate Lukić', position: 'OUTFIELD', appearances: 5, minutes: 352, goals: 0, yellowCards: 0, redCards: 1 },
  { id: 'p-milanovic', number: 17, name: 'Davorin Milanović', position: 'OUTFIELD', appearances: 4, minutes: 304, goals: 1, yellowCards: 0, redCards: 0 },
  { id: 'p-novoselic', number: 4, name: 'Matej Novoselić', position: 'OUTFIELD', appearances: 3, minutes: 225, goals: 1, yellowCards: 0, redCards: 0 },
  { id: 'p-osmancevic', number: 16, name: 'Matija Osmančević', position: 'OUTFIELD', appearances: 4, minutes: 358, goals: 0, yellowCards: 1, redCards: 0 },
  { id: 'p-rezan', number: 15, name: 'Dino Režan', position: 'OUTFIELD', appearances: 0, minutes: 0, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-sekula', number: 16, name: 'Lucijan Sekula', position: 'OUTFIELD', appearances: 3, minutes: 57, goals: 0, yellowCards: 0, redCards: 0 },
  { id: 'p-silov', number: 21, name: 'Stipe Silov', position: 'OUTFIELD', appearances: 5, minutes: 440, goals: 4, yellowCards: 2, redCards: 0 },
]
