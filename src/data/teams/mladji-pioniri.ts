// MŽNL Mlađi pioniri C 2026/27 — generirano skriptom scripts/semafor-sync.mjs (npm run sync)
// iz HNS Semafora (COMET), stanje 2026-11-09. Ne uređuj ručno: sljedeće pokretanje prepisuje datoteku.
import type { Coach, Match, MatchDetail, Player, StandingRow } from '../../types'

const STADIUM = 'Igralište Franka Lisice, Bibinje'
const COMP = "MŽNL Mlađi pioniri C"

export const MATCHES: Match[] = [
  { id: "mpi-01", date: "2026-09-26", time: "10:00", home: "NK Bibinje", away: "NŠK Debeljak", homeScore: 2, awayScore: 3, competition: COMP, round: 1, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "mpi-02", date: "2026-10-07", time: "19:00", home: "NK Polača", away: "NK Bibinje", homeScore: 2, awayScore: 5, competition: COMP, round: 2, venue: "Bićine, Polača", status: "finished" },
  { id: "mpi-03", date: "2026-10-15", time: "17:30", home: "NK Bibinje", away: "NŠK Vrčevo", homeScore: 16, awayScore: 1, competition: COMP, round: 3, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "mpi-04", date: "2026-10-19", time: "16:00", home: "NK Škabrnja '91", away: "NK Bibinje", homeScore: 4, awayScore: 1, competition: COMP, round: 4, venue: "Vlačine, Škabrnja", status: "finished" },
  { id: "mpi-05", date: "2026-10-24", time: "10:00", home: "NK Bibinje", away: "GNK ŠIBENIK 2", homeScore: null, awayScore: null, competition: COMP, round: 5, venue: STADIUM, status: "postponed" },
  { id: "mpi-06", date: "2026-11-07", time: "10:00", home: "NK Croatia (S)", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 6, status: "postponed" },
  { id: "mpi-07", date: "2026-11-14", time: "10:00", home: "NK Bibinje", away: "NK Pakoštane", homeScore: null, awayScore: null, competition: COMP, round: 7, venue: STADIUM, status: "upcoming" },
  { id: "mpi-08", date: "2026-11-21", time: "10:00", home: "NŠK Nova zora", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 8, status: "upcoming" },
  { id: "mpi-09", date: "2026-11-28", time: "10:00", home: "NK Bibinje", away: "NŠK Zemunik", homeScore: null, awayScore: null, competition: COMP, round: 9, venue: STADIUM, status: "upcoming" },
]

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  "mpi-01": {
    "id": "mpi-01",
    "round": 1,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Antonio Birkić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Niko Šindija",
        "minute": "8'"
      },
      {
        "side": "away",
        "player": "Ivan Strenja",
        "minute": "17'"
      },
      {
        "side": "home",
        "player": "Zvone Kandić",
        "minute": "35'"
      },
      {
        "side": "away",
        "player": "Filip Trošelj",
        "minute": "36'"
      },
      {
        "side": "away",
        "player": "Filip Trošelj",
        "minute": "58'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Zvone Kandić",
        "3 Mihael Sikirić",
        "8 Ivan Dragaš",
        "9 Krševan Kalapač (C)",
        "10 Niko Šindija",
        "11 Ante Karaban",
        "13 Frane Sikirić",
        "16 Rafael Lukić",
        "20 Antonio Režan"
      ],
      "bench": [
        "12 Josip Kunce",
        "7 Marin Bugarija",
        "17 Ante Ostrogonac",
        "21 Matej Kandić",
        "25 Karlo Lukić"
      ],
      "coach": "Mate Bugarija"
    },
    "away": {
      "team": "NŠK Debeljak",
      "starters": [
        "23 Ivan Smolić",
        "3 Dino Smolić",
        "16 Josip Bračić",
        "18 Mate Šoša (C)",
        "20 Jakov Katuša",
        "21 Ivan Strenja",
        "25 David Dražić",
        "26 Filip Trošelj",
        "30 Mateo Strenja"
      ],
      "bench": [
        "4 Marko Bračić",
        "17 Karlo Smolić",
        "22 Matteo Pavić",
        "29 Franka Strenja"
      ],
      "coach": "Vladimir Lalić"
    }
  },
  "mpi-02": {
    "id": "mpi-02",
    "round": 2,
    "venue": "Bićine, Polača",
    "referees": [
      "Adin Skopljaković"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Marin Bugarija",
        "minute": "24'"
      },
      {
        "side": "away",
        "player": "Marin Bugarija",
        "minute": "28'"
      },
      {
        "side": "home",
        "player": "Noa Brajković",
        "minute": "38'"
      },
      {
        "side": "away",
        "player": "Ante Karaban",
        "minute": "39'"
      },
      {
        "side": "away",
        "player": "Marin Bugarija",
        "minute": "50'"
      },
      {
        "side": "away",
        "player": "Ante Karaban",
        "minute": "55'"
      },
      {
        "side": "home",
        "player": "Antonio Bobanović",
        "minute": "58'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Polača",
      "starters": [
        "1 David Erlić",
        "7 Noa Brajković",
        "8 Lovre Bašić (C)",
        "9 Matej Prtenjača",
        "22 Antonio Bobanović",
        "25 Ivan Bobanović",
        "27 Šimun Prtenjača",
        "31 David Ražnjević",
        "33 Ivano Brajković"
      ],
      "bench": [
        "16 Cvita Čirjak",
        "24 Luka Jurjević",
        "36 Mateo Bobanović"
      ],
      "coach": "Zoran Peraić"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "4 Zvone Kandić",
        "3 Mihael Sikirić",
        "7 Marin Bugarija",
        "8 Ivan Dragaš",
        "9 Krševan Kalapač (C)",
        "11 Ante Karaban",
        "13 Frane Sikirić",
        "16 Rafael Lukić",
        "21 Matej Kandić"
      ],
      "bench": [
        "17 Ante Ostrogonac",
        "20 Antonio Režan",
        "77 Josip Kunce"
      ],
      "coach": "Antonio Kunce"
    }
  },
  "mpi-03": {
    "id": "mpi-03",
    "round": 3,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Antonio Birkić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Ante Karaban",
        "minute": "12'"
      },
      {
        "side": "home",
        "player": "Ante Karaban",
        "minute": "21'"
      },
      {
        "side": "home",
        "player": "Marin Bugarija",
        "minute": "23'"
      },
      {
        "side": "home",
        "player": "Ante Karaban",
        "minute": "25'"
      },
      {
        "side": "home",
        "player": "Krševan Kalapač",
        "minute": "28'"
      },
      {
        "side": "home",
        "player": "Mihael Sikirić",
        "minute": "29'"
      },
      {
        "side": "home",
        "player": "Noa Sekula",
        "minute": "31'"
      },
      {
        "side": "home",
        "player": "Krševan Kalapač",
        "minute": "32'"
      },
      {
        "side": "home",
        "player": "Ante Ostrogonac",
        "minute": "33'"
      },
      {
        "side": "home",
        "player": "Ivan Dragaš",
        "minute": "37'"
      },
      {
        "side": "home",
        "player": "Noa Sekula",
        "minute": "38'"
      },
      {
        "side": "away",
        "player": "Matej Galešić",
        "minute": "41'"
      },
      {
        "side": "home",
        "player": "Krševan Kalapač",
        "minute": "42'"
      },
      {
        "side": "home",
        "player": "Frane Sikirić",
        "minute": "43'"
      },
      {
        "side": "home",
        "player": "Krševan Kalapač",
        "minute": "44'"
      },
      {
        "side": "home",
        "player": "Ante Ostrogonac",
        "minute": "44'"
      },
      {
        "side": "home",
        "player": "Ante Karaban",
        "minute": "49'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "4 Zvone Kandić",
        "3 Mihael Sikirić",
        "7 Marin Bugarija",
        "8 Ivan Dragaš",
        "9 Krševan Kalapač (C)",
        "11 Ante Karaban",
        "13 Frane Sikirić",
        "16 Rafael Lukić",
        "17 Ante Ostrogonac"
      ],
      "bench": [
        "19 Noa Sekula",
        "20 Antonio Režan",
        "77 Josip Kunce"
      ],
      "coach": "Mate Bugarija"
    },
    "away": {
      "team": "NŠK Vrčevo",
      "starters": [
        "1 David Strmota",
        "2 Ivan Erstić",
        "3 Cvita Števanja (C)",
        "7 Toni Dević",
        "10 Leo Rogić",
        "11 Dominik Rogić",
        "13 Nina Dević",
        "14 Matej Galešić",
        "19 Domagoj Burćul"
      ],
      "bench": [],
      "coach": "Željkomir Živković"
    }
  },
  "mpi-04": {
    "id": "mpi-04",
    "round": 4,
    "venue": "Vlačine, Škabrnja",
    "referees": [
      "Matej Zubčić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Dominik Jurić",
        "minute": "12'"
      },
      {
        "side": "home",
        "player": "David Petričević",
        "minute": "28'"
      },
      {
        "side": "home",
        "player": "Dominik Jurić",
        "minute": "36'"
      },
      {
        "side": "away",
        "player": "Zvone Kandić",
        "minute": "39'"
      },
      {
        "side": "home",
        "player": "David Petričević",
        "minute": "57'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Škabrnja '91",
      "starters": [
        "98 Šimun Bilaver",
        "0 Luka Jurjević",
        "9 Duje Vrsaljko",
        "14 Dominik Jurić (C)",
        "20 Ivan Ražov",
        "34 David Petričević",
        "42 Karla Bilaver",
        "44 Noa Vrsaljko",
        "52 Jakov Bilaver"
      ],
      "bench": [
        "10 Luka Bilaver",
        "24 Teo Ivković",
        "25 Gabriel Vrsaljko",
        "30 Emanuel Perović",
        "51 Petar Bilaver",
        "54 Josip Ivković",
        "58 Mia Bilaver",
        "97 Matias Ražov",
        "99 Niko Ćoso"
      ],
      "coach": "Kristijan Jurić"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "4 Zvone Kandić",
        "3 Mihael Sikirić",
        "7 Marin Bugarija",
        "8 Ivan Dragaš",
        "9 Krševan Kalapač (C)",
        "11 Ante Karaban",
        "13 Frane Sikirić",
        "16 Rafael Lukić",
        "17 Ante Ostrogonac"
      ],
      "bench": [
        "19 Noa Sekula",
        "20 Antonio Režan",
        "77 Josip Kunce"
      ],
      "coach": "Antonio Kunce"
    }
  }
}

export const STANDINGS: StandingRow[] = [
  { position: 1, club: "GNK ŠIBENIK 2", played: 5, won: 5, drawn: 0, lost: 0, goalsFor: 22, goalsAgainst: 4, goalDiff: 18, points: 15 },
  { position: 2, club: "NŠK Debeljak", played: 5, won: 4, drawn: 0, lost: 1, goalsFor: 26, goalsAgainst: 5, goalDiff: 21, points: 12 },
  { position: 3, club: "NK Pakoštane", played: 6, won: 3, drawn: 1, lost: 2, goalsFor: 16, goalsAgainst: 7, goalDiff: 9, points: 10 },
  { position: 4, club: "NŠK Zemunik", played: 4, won: 3, drawn: 0, lost: 1, goalsFor: 18, goalsAgainst: 4, goalDiff: 14, points: 9 },
  { position: 5, club: "NK Bibinje", played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 24, goalsAgainst: 10, goalDiff: 14, points: 6 },
  { position: 6, club: "NK Škabrnja '91", played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 7, goalsAgainst: 11, goalDiff: -4, points: 6 },
  { position: 7, club: "NK Croatia (S)", played: 4, won: 1, drawn: 2, lost: 1, goalsFor: 9, goalsAgainst: 8, goalDiff: 1, points: 5 },
  { position: 8, club: "NŠK Nova zora", played: 6, won: 1, drawn: 2, lost: 3, goalsFor: 14, goalsAgainst: 14, goalDiff: 0, points: 5 },
  { position: 9, club: "NK Polača", played: 5, won: 1, drawn: 1, lost: 3, goalsFor: 7, goalsAgainst: 11, goalDiff: -4, points: 4 },
  { position: 10, club: "NŠK Vrčevo", played: 6, won: 0, drawn: 0, lost: 6, goalsFor: 1, goalsAgainst: 70, goalDiff: -69, points: -1, deduction: 1 },
]

export const SQUAD: Player[] = [
  { id: "mpi-zvone-kandic", number: 4, name: "Zvone Kandić", position: "GK", appearances: 4, minutes: 0, goals: 2, goalsConceded: 10, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/zvone-kandic.jpg" },
  { id: "mpi-josip-kunce", number: 77, name: "Josip Kunce", position: "GK", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/josip-kunce.jpg" },
  { id: "mpi-marin-bugarija", number: 7, name: "Marin Bugarija", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 4, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/marin-bugarija.png" },
  { id: "mpi-ivan-dragas", number: 8, name: "Ivan Dragaš", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/ivan-dragas.jpg" },
  { id: "mpi-krsevan-kalapac", number: 9, name: "Krševan Kalapač", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 4, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/krsevan-kalapac.jpg" },
  { id: "mpi-matej-kandic", number: 21, name: "Matej Kandić", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/matej-kandic.jpg" },
  { id: "mpi-ante-karaban", number: 11, name: "Ante Karaban", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 6, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/ante-karaban.jpg" },
  { id: "mpi-karlo-lukic", number: 25, name: "Karlo Lukić", position: "OUTFIELD", appearances: 1, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/karlo-lukic.png" },
  { id: "mpi-rafael-lukic", number: 16, name: "Rafael Lukić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/rafael-lukic.png" },
  { id: "mpi-ante-ostrogonac", number: 17, name: "Ante Ostrogonac", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 2, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/ante-ostrogonac.png" },
  { id: "mpi-antonio-rezan", number: 20, name: "Antonio Režan", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/antonio-rezan.png" },
  { id: "mpi-noa-sekula", number: 19, name: "Noa Sekula", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 2, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/noa-sekula.png" },
  { id: "mpi-frane-sikiric", number: 13, name: "Frane Sikirić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/frane-sikiric.png" },
  { id: "mpi-mihael-sikiric", number: 3, name: "Mihael Sikirić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/mihael-sikiric.png" },
  { id: "mpi-niko-sindija", number: 10, name: "Niko Šindija", position: "OUTFIELD", appearances: 1, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/mladji-pioniri/niko-sindija.png" },
]

export const COACHES: Coach[] = [
  { name: "Antonio Kunce", matches: 2, photo: "/players/mladji-pioniri/antonio-kunce.png" },
  { name: "Mate Bugarija", matches: 2, photo: "/players/mladji-pioniri/mate-bugarija.png" },
]
