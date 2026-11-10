// MŽNL Tići A 2026/27 — generirano skriptom scripts/semafor-sync.mjs (npm run sync)
// iz HNS Semafora (COMET), stanje 2026-11-09. Ne uređuj ručno: sljedeće pokretanje prepisuje datoteku.
import type { Coach, Match, MatchDetail, Player, StandingRow } from '../../types'

const STADIUM = 'Igralište Franka Lisice, Bibinje'
const COMP = "MŽNL Tići A"

export const MATCHES: Match[] = [
  { id: "tic-01", date: "2026-09-27", time: "09:00", home: "NK Bibinje", away: "NK Zara", homeScore: 0, awayScore: 2, competition: COMP, round: 1, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "tic-02", date: "2026-10-08", time: "18:15", home: "NŠK Debeljak", away: "NK Bibinje", homeScore: 2, awayScore: 1, competition: COMP, round: 2, venue: "Na Šaraju, Debeljak", status: "finished" },
  { id: "tic-03", date: "2026-10-15", time: "18:30", home: "NK Bibinje", away: "NŠK Zlatna luka", homeScore: 2, awayScore: 1, competition: COMP, round: 3, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "tic-04", date: "2026-10-18", time: "08:15", home: "HNK Dalmatinac (C)", away: "NK Bibinje", homeScore: 3, awayScore: 1, competition: COMP, round: 4, venue: "Stanko Baričević-Šole, Crno", status: "finished" },
  { id: "tic-05", date: "2026-10-20", time: "19:15", home: "NK Bibinje", away: "NK Zadarnova", homeScore: 0, awayScore: 12, competition: COMP, round: 5, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "tic-06", date: "2026-11-08", time: "09:00", home: "NŠK Sveti Mihovil", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 6, status: "postponed" },
  { id: "tic-07", date: "2026-11-15", time: "09:00", home: "NK Bibinje", away: "HNK Zadar", homeScore: null, awayScore: null, competition: COMP, round: 7, venue: STADIUM, status: "upcoming" },
  { id: "tic-08", date: "2026-11-22", time: "09:00", home: "NK Sabunjar", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 8, status: "upcoming" },
  { id: "tic-09", date: "2026-11-29", time: "09:00", home: "NK Bibinje", away: "NŠK Pag", homeScore: null, awayScore: null, competition: COMP, round: 9, venue: STADIUM, status: "upcoming" },
]

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  "tic-01": {
    "id": "tic-01",
    "round": 1,
    "venue": "Igralište Franka Lisice, Bibinje",
    "attendance": 56,
    "referees": [
      "Dominik Pedić"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Tonči Pirc",
        "minute": "27'"
      },
      {
        "side": "away",
        "player": "Ivan Peranić",
        "minute": "30'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Matej Bralić",
        "4 Šimun Sekula",
        "6 Ivan Bugarija",
        "7 Šime Sikirić",
        "8 Enea Laloshi",
        "9 Andrija Frleta",
        "10 Matej Kandić (C)",
        "11 Gabriel Erceg"
      ],
      "bench": [
        "13 Andrej Mirkov",
        "14 Mijat Lisica",
        "18 Jakov Mikulić",
        "19 Ivano Lukić"
      ],
      "coach": "Davorin Milanović"
    },
    "away": {
      "team": "NK Zara",
      "starters": [
        "1 Maro Lisica",
        "2 Tin Grgas",
        "3 Jakov Nemarić",
        "7 Lucas Đuraković",
        "8 Leon Kobetić",
        "9 Sebastijan Rogulj",
        "11 Ivan Peranić (C)",
        "14 Lukas Margetić"
      ],
      "bench": [
        "5 Daris Hodžić",
        "6 Tonči Pirc",
        "10 Mateo Brkić",
        "16 Robin Benjamin Bacon",
        "17 Adrian Perinović",
        "18 Luka Ćurčija"
      ],
      "coach": "Ana Petrović"
    }
  },
  "tic-02": {
    "id": "tic-02",
    "round": 2,
    "venue": "Na Šaraju, Debeljak",
    "referees": [
      "Dominik Pedić"
    ],
    "goals": [
      {
        "side": "away",
        "player": "David Mikulić",
        "minute": "13'"
      },
      {
        "side": "home",
        "player": "Niko Županović",
        "minute": "22'"
      },
      {
        "side": "home",
        "player": "Manuel Batur",
        "minute": "34'"
      }
    ],
    "events": [],
    "home": {
      "team": "NŠK Debeljak",
      "starters": [
        "12 Roko Smolić",
        "7 Luka Strenja",
        "20 Jure Števanja",
        "21 Toma Ambroš",
        "26 Noa Smolić",
        "29 Niko Županović",
        "30 Roko Peljušić (C)",
        "32 Manuel Batur"
      ],
      "bench": [
        "1 Marino Pavić",
        "5 Lukas Gambiraža",
        "11 Matija Torbarina",
        "24 Antonijo Jerak",
        "28 Lovre Pavić",
        "33 Šime Dražić",
        "99 David Crnjak"
      ],
      "coach": "Vladimir Lalić"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "1 Matej Bralić",
        "3 David Mikulić (C)",
        "5 Donat Lisica",
        "7 Šime Sikirić",
        "8 Enea Laloshi",
        "9 Andrija Frleta",
        "10 Matej Kandić",
        "13 Andrej Mirkov"
      ],
      "bench": [
        "6 Ivan Bugarija",
        "11 Gabriel Erceg",
        "14 Mijat Lisica",
        "17 Frane Kunce",
        "19 Ivano Lukić",
        "20 David Sorić"
      ],
      "coach": "Davorin Milanović"
    }
  },
  "tic-03": {
    "id": "tic-03",
    "round": 3,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Antonio Birkić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Enea Laloshi",
        "minute": "18'"
      },
      {
        "side": "away",
        "player": "Dominik Velčić",
        "minute": "34'"
      },
      {
        "side": "home",
        "player": "Andrija Frleta",
        "minute": "41'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Matej Bralić",
        "3 David Mikulić (C)",
        "4 Šimun Sekula",
        "7 Šime Sikirić",
        "9 Andrija Frleta",
        "10 Matej Kandić",
        "13 Andrej Mirkov",
        "19 Ivano Lukić"
      ],
      "bench": [
        "8 Enea Laloshi",
        "11 Gabriel Erceg",
        "15 Karlo Lukić",
        "17 Frane Kunce",
        "20 David Sorić",
        "21 Jakov Šimunić"
      ],
      "coach": "Mate Bugarija"
    },
    "away": {
      "team": "NŠK Zlatna luka",
      "starters": [
        "1 Petar Vanjak",
        "9 Šime Pavić",
        "10 David Pavić",
        "11 Duje Cukrov",
        "13 Leon Takač",
        "15 Dorian Baćica-Korolija",
        "17 Gabriel Keran (C)",
        "18 David Strmota"
      ],
      "bench": [
        "7 Stjepan Marko Jusup",
        "8 Niko Takač",
        "19 Dominik Velčić"
      ],
      "coach": "Ante Drobnak"
    }
  },
  "tic-04": {
    "id": "tic-04",
    "round": 4,
    "venue": "Stanko Baričević-Šole, Crno",
    "referees": [
      "Josip Štrkalj"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Toni Letina",
        "minute": "10'"
      },
      {
        "side": "home",
        "player": "Toni Letina",
        "minute": "19'"
      },
      {
        "side": "home",
        "player": "David Batur",
        "minute": "31'"
      },
      {
        "side": "away",
        "player": "Andrija Frleta (11 m)",
        "minute": "38'"
      }
    ],
    "events": [],
    "home": {
      "team": "HNK Dalmatinac (C)",
      "starters": [
        "12 Josip Stjepan Birkić",
        "4 Karlo Vukoša",
        "5 Toni Kvesić",
        "7 Toni Letina",
        "8 Ivano Vukoša",
        "9 Marko Subašić",
        "10 Duje Pijaca (C)",
        "17 Vito Vukoša"
      ],
      "bench": [
        "1 Mihael Marnika",
        "2 Duje Begonja",
        "3 Niki Šestan",
        "6 Jakov Grgurović",
        "11 David Batur"
      ],
      "coach": "Marko Kožul"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "1 Matej Bralić",
        "4 Šimun Sekula",
        "7 Šime Sikirić (C)",
        "8 Enea Laloshi",
        "9 Andrija Frleta",
        "13 Andrej Mirkov",
        "17 Frane Kunce",
        "19 Ivano Lukić"
      ],
      "bench": [
        "6 Ivan Bugarija",
        "11 Gabriel Erceg",
        "18 Jakov Mikulić",
        "20 David Sorić"
      ],
      "coach": "Davorin Milanović"
    }
  },
  "tic-05": {
    "id": "tic-05",
    "round": 5,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Ante Fain"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Goran Jurlina",
        "minute": "7'"
      },
      {
        "side": "away",
        "player": "Marin Ač",
        "minute": "9'"
      },
      {
        "side": "away",
        "player": "Marin Ač",
        "minute": "12'"
      },
      {
        "side": "away",
        "player": "Tonći Jurlina",
        "minute": "22'"
      },
      {
        "side": "away",
        "player": "Tonći Jurlina",
        "minute": "24'"
      },
      {
        "side": "away",
        "player": "Lovre Karlović",
        "minute": "25+1'"
      },
      {
        "side": "away",
        "player": "Tonći Jurlina",
        "minute": "35'"
      },
      {
        "side": "away",
        "player": "Marin Ač",
        "minute": "39'"
      },
      {
        "side": "away",
        "player": "Noa Dražović",
        "minute": "43'"
      },
      {
        "side": "away",
        "player": "Noa Dražović",
        "minute": "48'"
      },
      {
        "side": "away",
        "player": "Noa Dražović",
        "minute": "49'"
      },
      {
        "side": "away",
        "player": "Marin Ač",
        "minute": "49'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Matej Bralić",
        "3 David Mikulić (C)",
        "8 Enea Laloshi",
        "9 Andrija Frleta",
        "10 Matej Kandić",
        "13 Andrej Mirkov",
        "17 Frane Kunce",
        "19 Ivano Lukić"
      ],
      "bench": [
        "6 Ivan Bugarija",
        "15 Karlo Lukić",
        "18 Jakov Mikulić"
      ],
      "coach": ""
    },
    "away": {
      "team": "NK Zadarnova",
      "starters": [
        "12 Noa Deković",
        "4 Ante Kljaić",
        "8 Bartol Surić (C)",
        "9 Marin Ač",
        "16 Noa Dražović",
        "24 Goran Jurlina",
        "26 Pave Cimera",
        "38 Mihovil Čulina"
      ],
      "bench": [
        "7 Petar-Dominik Vulić",
        "11 Marko Matoš",
        "17 Marin Tuta",
        "30 Lovre Karlović",
        "40 Tonći Jurlina"
      ],
      "coach": "Matej Čulina"
    }
  }
}

export const STANDINGS: StandingRow[] = [
  { position: 1, club: "NK Zadarnova", played: 6, won: 6, drawn: 0, lost: 0, goalsFor: 51, goalsAgainst: 1, goalDiff: 50, points: 18 },
  { position: 2, club: "NŠK Debeljak", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 11, goalsAgainst: 10, goalDiff: 1, points: 11 },
  { position: 3, club: "HNK Zadar", played: 4, won: 3, drawn: 0, lost: 1, goalsFor: 21, goalsAgainst: 5, goalDiff: 16, points: 9 },
  { position: 4, club: "NK Sabunjar", played: 6, won: 3, drawn: 0, lost: 3, goalsFor: 17, goalsAgainst: 14, goalDiff: 3, points: 9 },
  { position: 5, club: "NK Zara", played: 5, won: 2, drawn: 1, lost: 2, goalsFor: 13, goalsAgainst: 11, goalDiff: 2, points: 7 },
  { position: 6, club: "HNK Dalmatinac (C)", played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 8, goalsAgainst: 9, goalDiff: -1, points: 7 },
  { position: 7, club: "NŠK Zlatna luka", played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 11, goalsAgainst: 17, goalDiff: -6, points: 6 },
  { position: 8, club: "NŠK Sveti Mihovil", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 7, goalsAgainst: 23, goalDiff: -16, points: 3 },
  { position: 9, club: "NK Bibinje", played: 5, won: 1, drawn: 0, lost: 4, goalsFor: 4, goalsAgainst: 20, goalDiff: -16, points: 3 },
  { position: 10, club: "NŠK Pag", played: 5, won: 0, drawn: 0, lost: 5, goalsFor: 6, goalsAgainst: 39, goalDiff: -33, points: 0 },
]

export const SQUAD: Player[] = [
  { id: "tic-matej-bralic", number: 1, name: "Matej Bralić", position: "GK", appearances: 5, minutes: 0, goals: 0, goalsConceded: 20, yellowCards: 0, redCards: 0, photo: "/players/tici/matej-bralic.png" },
  { id: "tic-ivan-bugarija", number: 6, name: "Ivan Bugarija", position: "OUTFIELD", appearances: 3, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/ivan-bugarija.jpg" },
  { id: "tic-gabriel-erceg", number: 11, name: "Gabriel Erceg", position: "OUTFIELD", appearances: 3, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/gabriel-erceg.png" },
  { id: "tic-andrija-frleta", number: 9, name: "Andrija Frleta", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 2, yellowCards: 0, redCards: 0, photo: "/players/tici/andrija-frleta.png" },
  { id: "tic-matej-kandic", number: 10, name: "Matej Kandić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/matej-kandic.jpg" },
  { id: "tic-frane-kunce", number: 17, name: "Frane Kunce", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/frane-kunce.jpg" },
  { id: "tic-enea-laloshi", number: 8, name: "Enea Laloshi", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/tici/enea-laloshi.png" },
  { id: "tic-donat-lisica", number: 5, name: "Donat Lisica", position: "OUTFIELD", appearances: 1, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/donat-lisica.png" },
  { id: "tic-mijat-lisica", number: 14, name: "Mijat Lisica", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/mijat-lisica.jpg" },
  { id: "tic-ivano-lukic", number: 19, name: "Ivano Lukić", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/ivano-lukic.jpg" },
  { id: "tic-karlo-lukic", number: 15, name: "Karlo Lukić", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/karlo-lukic.png" },
  { id: "tic-david-mikulic", number: 3, name: "David Mikulić", position: "OUTFIELD", appearances: 3, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/tici/david-mikulic.png" },
  { id: "tic-jakov-mikulic", number: 18, name: "Jakov Mikulić", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/jakov-mikulic.jpg" },
  { id: "tic-andrej-mirkov", number: 13, name: "Andrej Mirkov", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/andrej-mirkov.png" },
  { id: "tic-simun-sekula", number: 4, name: "Šimun Sekula", position: "OUTFIELD", appearances: 3, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/simun-sekula.jpg" },
  { id: "tic-sime-sikiric", number: 7, name: "Šime Sikirić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/sime-sikiric.jpg" },
  { id: "tic-david-soric", number: 20, name: "David Sorić", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/david-soric.jpg" },
  { id: "tic-jakov-simunic", number: 21, name: "Jakov Šimunić", position: "OUTFIELD", appearances: 1, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tici/jakov-simunic.png" },
]

export const COACHES: Coach[] = [
  { name: "Davorin Milanović", matches: 3, photo: "/players/tici/davorin-milanovic.png" },
  { name: "Mate Bugarija", matches: 1, photo: "/players/tici/mate-bugarija.png" },
]
