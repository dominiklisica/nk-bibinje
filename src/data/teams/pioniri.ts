// MŽNL Pioniri A 2026/27 — generirano skriptom scripts/semafor-sync.mjs (npm run sync)
// iz HNS Semafora (COMET), stanje 2026-11-09. Ne uređuj ručno: sljedeće pokretanje prepisuje datoteku.
import type { Coach, Match, MatchDetail, Player, StandingRow } from '../../types'

const STADIUM = 'Igralište Franka Lisice, Bibinje'
const COMP = "MŽNL Pioniri A"

export const MATCHES: Match[] = [
  { id: "pio-01", date: "2026-09-20", time: "10:30", home: "NK Arbanasi 2", away: "NK Bibinje", homeScore: 4, awayScore: 2, competition: COMP, round: 1, venue: "Stanovi pomoćno, Zadar", status: "finished" },
  { id: "pio-02", date: "2026-09-28", time: "19:00", home: "NK Bibinje", away: "NK Zadarnova", homeScore: 5, awayScore: 1, competition: COMP, round: 2, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "pio-03", date: "2026-10-04", time: "10:00", home: "NK Gospić 91 2", away: "NK Bibinje", homeScore: 0, awayScore: 6, competition: COMP, round: 3, venue: "BALINOVAC, Gospić", status: "finished" },
  { id: "pio-05", date: "2026-10-14", time: "19:00", home: "NŠK Sveti Mihovil", away: "NK Bibinje", homeScore: 6, awayScore: 1, competition: COMP, round: 5, venue: "Na Foši, Sutomišćica", status: "finished" },
  { id: "pio-06", date: "2026-10-29", time: "19:30", home: "NK Bibinje", away: "NK Hajduk (P)", homeScore: 5, awayScore: 0, competition: COMP, round: 6, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "pio-07", date: "2026-11-08", time: "10:00", home: "NK Hrvatski vitez", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 7, status: "postponed" },
  { id: "pio-04", date: "2026-11-09", time: "18:00", home: "NK Bibinje", away: "NK Novalja 2", homeScore: null, awayScore: null, competition: COMP, round: 4, venue: STADIUM, status: "upcoming" },
  { id: "pio-08", date: "2026-11-15", time: "10:00", home: "NK Bibinje", away: "NK Zara", homeScore: null, awayScore: null, competition: COMP, round: 8, venue: STADIUM, status: "upcoming" },
  { id: "pio-09", date: "2026-11-22", time: "10:00", home: "NŠK Pag", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 9, status: "upcoming" },
  { id: "pio-10", date: "2026-11-29", time: "10:00", home: "NK Škabrnja '91", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 10, status: "upcoming" },
  { id: "pio-11", date: "2026-12-06", time: "10:00", home: "NK Bibinje", away: "NK Abeceda sporta 2", homeScore: null, awayScore: null, competition: COMP, round: 11, venue: STADIUM, status: "upcoming" },
]

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  "pio-01": {
    "id": "pio-01",
    "round": 1,
    "venue": "Stanovi pomoćno, Zadar",
    "referees": [
      "Damir Dukić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Domagoj Prtenjača",
        "minute": "13'"
      },
      {
        "side": "home",
        "player": "Šime Stipčević",
        "minute": "18'"
      },
      {
        "side": "away",
        "player": "Karlo Petković",
        "minute": "24'"
      },
      {
        "side": "away",
        "player": "Daniel Lalić",
        "minute": "39'"
      },
      {
        "side": "home",
        "player": "Niko Rumora",
        "minute": "41'"
      },
      {
        "side": "home",
        "player": "Vito Zubčić",
        "minute": "63'"
      }
    ],
    "events": [
      {
        "side": "home",
        "type": "yellow",
        "minute": "60'",
        "player": "Teo Jovanović"
      }
    ],
    "home": {
      "team": "NK Arbanasi 2",
      "starters": [
        "1 Toni Šarić",
        "2 Ivan Kačavenda",
        "3 Vito Marušić",
        "4 Bruno Zubčić",
        "5 Toni Sutlović",
        "6 Teo Jovanović",
        "7 Vito Zubčić",
        "8 Petar Kurjak",
        "9 Niko Rumora",
        "10 Šime Stipčević (C)",
        "11 Domagoj Prtenjača"
      ],
      "bench": [
        "12 Lovre Krmpotić",
        "13 Niko Miočić",
        "14 Nikica Punoš",
        "15 Vito Boban",
        "16 Roko Čulina"
      ],
      "coach": "Nino Novaković"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "12 Robert Sikirić",
        "2 Antoni Delija",
        "4 Dominik Ćuković",
        "6 Mihael Režan",
        "7 Mateo Šindija (C)",
        "8 Toni Erceg",
        "9 Emanuel Šindija",
        "10 Karlo Petković",
        "11 Daniel Lalić",
        "20 Rafael Kero",
        "21 Emanuel Lisica"
      ],
      "bench": [
        "1 Šime Kero",
        "23 Jakov Delija",
        "3 Križo Kinda",
        "5 Reno Sikirić",
        "13 Ante Lonić",
        "15 Nediljko Lisica",
        "22 Marko Sikirić"
      ],
      "coach": "Antonio Kunce"
    }
  },
  "pio-02": {
    "id": "pio-02",
    "round": 2,
    "venue": "Igralište Franka Lisice, Bibinje",
    "attendance": 75,
    "referees": [
      "Zvonimir Sinovčić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Karlo Petković",
        "minute": "5'"
      },
      {
        "side": "home",
        "player": "Mihael Režan",
        "minute": "27'"
      },
      {
        "side": "away",
        "player": "Vice Jurlina",
        "minute": "38'"
      },
      {
        "side": "home",
        "player": "Rafael Kero",
        "minute": "45'"
      },
      {
        "side": "home",
        "player": "Karlo Petković",
        "minute": "59'"
      },
      {
        "side": "home",
        "player": "Karlo Petković",
        "minute": "67'"
      }
    ],
    "events": [
      {
        "side": "home",
        "type": "yellow",
        "minute": "30'",
        "player": "Mateo Šindija"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "54'",
        "player": "Karlo Petković"
      }
    ],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "12 Robert Sikirić",
        "2 Antoni Delija",
        "4 Dominik Ćuković",
        "6 Mihael Režan",
        "7 Mateo Šindija (C)",
        "8 Toni Erceg",
        "9 Emanuel Šindija",
        "10 Karlo Petković",
        "11 Daniel Lalić",
        "20 Rafael Kero",
        "21 Emanuel Lisica"
      ],
      "bench": [
        "1 Šime Kero",
        "23 Jakov Delija",
        "3 Križo Kinda",
        "13 Ante Lonić",
        "17 Nediljko Lisica",
        "19 Ante-Toni Šimunić",
        "22 Marko Sikirić"
      ],
      "coach": "Antonio Kunce"
    },
    "away": {
      "team": "NK Zadarnova",
      "starters": [
        "33 Lovre Markulin",
        "3 Granit Mamqaj",
        "6 Niko Rončević",
        "7 Marin Maračić",
        "8 Niko Galov",
        "10 Niko Nimčević (C)",
        "11 Mateo Perica",
        "14 Jakov Miloloža",
        "28 Vice Jurlina",
        "30 Toma Antić",
        "35 Mauro Paša"
      ],
      "bench": [
        "31 Mateo Paša",
        "36 Dante Ciketić",
        "82 Jakob Bukvić"
      ],
      "coach": "Marko Jurlina"
    }
  },
  "pio-03": {
    "id": "pio-03",
    "round": 3,
    "venue": "BALINOVAC, Gospić",
    "attendance": 20,
    "referees": [
      "Mile Rukavina"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Karlo Petković",
        "minute": "9'"
      },
      {
        "side": "away",
        "player": "Daniel Lalić",
        "minute": "17'"
      },
      {
        "side": "away",
        "player": "Toni Erceg",
        "minute": "19'"
      },
      {
        "side": "away",
        "player": "Karlo Petković",
        "minute": "53'"
      },
      {
        "side": "away",
        "player": "Križo Kinda",
        "minute": "59'"
      },
      {
        "side": "away",
        "player": "Marko Režan",
        "minute": "63'"
      }
    ],
    "events": [
      {
        "side": "home",
        "type": "yellow",
        "minute": "11'",
        "player": "Ivan Balenović"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "57'",
        "player": "Emanuel Lisica"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "57'",
        "player": "Rafael Kero"
      }
    ],
    "home": {
      "team": "NK Gospić 91 2",
      "starters": [
        "1 Franko Matijević",
        "2 Leon Vukelić",
        "3 Ivan Prša",
        "4 Franko Pezelj",
        "5 Ivan Balenović (C)",
        "6 Leo Butorac",
        "7 Lovro Kreković",
        "8 Mate Božić",
        "9 Matija Golić",
        "10 David Krišto",
        "11 Petar Krešimir Prpić"
      ],
      "bench": [
        "13 Ivan Čanić",
        "14 Marin Popović",
        "15 Renato Mataija"
      ],
      "coach": ""
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "12 Robert Sikirić",
        "3 Križo Kinda",
        "4 Dominik Ćuković",
        "6 Mihael Režan",
        "7 Mateo Šindija (C)",
        "8 Toni Erceg",
        "10 Karlo Petković",
        "11 Daniel Lalić",
        "13 Ante Lonić",
        "19 Ante-Toni Šimunić",
        "21 Emanuel Lisica"
      ],
      "bench": [
        "23 Jakov Delija",
        "14 Marko Režan",
        "20 Rafael Kero",
        "22 Marko Sikirić"
      ],
      "coach": "Antonio Kunce"
    }
  },
  "pio-05": {
    "id": "pio-05",
    "round": 5,
    "venue": "Na Foši, Sutomišćica",
    "referees": [
      "Josip Štrkalj"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Gabrijel Šimičev",
        "minute": "4'"
      },
      {
        "side": "away",
        "player": "Daniel Lalić",
        "minute": "5'"
      },
      {
        "side": "home",
        "player": "Gabrijel Šimičev",
        "minute": "6'"
      },
      {
        "side": "home",
        "player": "Luka Zupan",
        "minute": "45'"
      },
      {
        "side": "home",
        "player": "Gabrijel Šimičev (11 m)",
        "minute": "60'"
      },
      {
        "side": "home",
        "player": "Jakov Jerolimov",
        "minute": "64'"
      },
      {
        "side": "home",
        "player": "Jakov Jerolimov",
        "minute": "68'"
      }
    ],
    "events": [
      {
        "side": "away",
        "type": "yellow",
        "minute": "59'",
        "player": "Mihael Režan"
      }
    ],
    "home": {
      "team": "NŠK Sveti Mihovil",
      "starters": [
        "12 Martin Tanjić",
        "5 Tadej Kolega (C)",
        "6 Teo Kurtin",
        "9 Gabrijel Šimičev",
        "11 Šime Kombura",
        "18 Luka Zupan",
        "20 Rino Mikela",
        "21 Ante Masar",
        "24 Jure Jakovljev",
        "66 Dino Bačinić",
        "77 Jakov Jerolimov"
      ],
      "bench": [
        "7 Toni Vitlov",
        "8 Mateo Tomasov",
        "16 Toma Bačić",
        "22 Vice Rančić",
        "23 Josip Vitlov"
      ],
      "coach": "Domagoj Muić"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "1 Jakov Delija",
        "4 Dominik Ćuković",
        "6 Mihael Režan",
        "7 Mateo Šindija (C)",
        "8 Toni Erceg",
        "10 Karlo Petković",
        "11 Daniel Lalić",
        "13 Ante Lonić",
        "20 Rafael Kero",
        "21 Emanuel Lisica",
        "22 Marko Sikirić"
      ],
      "bench": [
        "12 Robert Sikirić",
        "99 Šime Kero",
        "3 Križo Kinda",
        "5 Ivano Sorić",
        "14 Marko Režan",
        "17 Nediljko Lisica",
        "19 Ante-Toni Šimunić"
      ],
      "coach": "Antonio Kunce"
    }
  },
  "pio-06": {
    "id": "pio-06",
    "round": 6,
    "venue": "Igralište Franka Lisice, Bibinje",
    "attendance": 56,
    "referees": [
      "Tadija Babić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Ante Lonić",
        "minute": "16'"
      },
      {
        "side": "home",
        "player": "Toni Erceg",
        "minute": "34'"
      },
      {
        "side": "home",
        "player": "Ante Lonić",
        "minute": "39'"
      },
      {
        "side": "home",
        "player": "Mateo Šindija",
        "minute": "43'"
      },
      {
        "side": "home",
        "player": "Ante Lonić",
        "minute": "55'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "12 Robert Sikirić",
        "4 Dominik Ćuković",
        "5 Ivano Sorić",
        "6 Mihael Režan",
        "7 Mateo Šindija (C)",
        "8 Toni Erceg",
        "11 Daniel Lalić",
        "13 Ante Lonić",
        "20 Rafael Kero",
        "21 Emanuel Lisica",
        "22 Marko Sikirić"
      ],
      "bench": [
        "99 Šime Kero",
        "9 Emanuel Šindija",
        "17 Jakov Delija",
        "19 Ante-Toni Šimunić",
        "77 Šime Vuica"
      ],
      "coach": "Antonio Kunce"
    },
    "away": {
      "team": "NK Hajduk (P)",
      "starters": [
        "12 Karlo Husta",
        "2 Matej Buterin",
        "4 David Greganić",
        "5 Marko Batur",
        "6 Ivan Viduka",
        "7 Niko Klapan",
        "9 Mateo Janković",
        "10 Luka Čulina",
        "14 Gabriel Ljutić",
        "18 Ivan Čulina",
        "19 Niko Čulina (C)"
      ],
      "bench": [
        "3 Antonio Kokić",
        "8 Josip Batur",
        "13 Maks Buljat",
        "15 Marijan Duši"
      ],
      "coach": "Ante Jergan"
    }
  }
}

export const STANDINGS: StandingRow[] = [
  { position: 1, club: "NK Arbanasi 2", played: 5, won: 5, drawn: 0, lost: 0, goalsFor: 17, goalsAgainst: 3, goalDiff: 14, points: 15 },
  { position: 2, club: "NK Abeceda sporta 2", played: 7, won: 4, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 7, goalDiff: 15, points: 14 },
  { position: 3, club: "NK Zara", played: 5, won: 4, drawn: 0, lost: 1, goalsFor: 22, goalsAgainst: 7, goalDiff: 15, points: 12 },
  { position: 4, club: "NK Škabrnja '91", played: 5, won: 4, drawn: 0, lost: 1, goalsFor: 10, goalsAgainst: 9, goalDiff: 1, points: 12 },
  { position: 5, club: "NK Hajduk (P)", played: 6, won: 3, drawn: 1, lost: 2, goalsFor: 10, goalsAgainst: 9, goalDiff: 1, points: 10 },
  { position: 6, club: "NK Bibinje", played: 5, won: 3, drawn: 0, lost: 2, goalsFor: 19, goalsAgainst: 11, goalDiff: 8, points: 9 },
  { position: 7, club: "NK Novalja 2", played: 5, won: 2, drawn: 1, lost: 2, goalsFor: 22, goalsAgainst: 9, goalDiff: 13, points: 7 },
  { position: 8, club: "NŠK Sveti Mihovil", played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 14, goalsAgainst: 15, goalDiff: -1, points: 6 },
  { position: 9, club: "NK Zadarnova", played: 7, won: 1, drawn: 0, lost: 6, goalsFor: 12, goalsAgainst: 25, goalDiff: -13, points: 3 },
  { position: 10, club: "NK Gospić 91 2", played: 5, won: 1, drawn: 0, lost: 4, goalsFor: 7, goalsAgainst: 22, goalDiff: -15, points: 3 },
  { position: 11, club: "NK Hrvatski vitez", played: 5, won: 1, drawn: 0, lost: 4, goalsFor: 10, goalsAgainst: 27, goalDiff: -17, points: 3 },
  { position: 12, club: "NŠK Pag", played: 4, won: 0, drawn: 0, lost: 4, goalsFor: 6, goalsAgainst: 27, goalDiff: -21, points: -1, deduction: 1 },
]

export const SQUAD: Player[] = [
  { id: "pio-jakov-delija", number: 17, name: "Jakov Delija", position: "GK", appearances: 5, minutes: 0, goals: 0, goalsConceded: 6, yellowCards: 0, redCards: 0, photo: "/players/pioniri/jakov-delija.png" },
  { id: "pio-sime-kero", number: 99, name: "Šime Kero", position: "GK", appearances: 3, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/sime-kero.png" },
  { id: "pio-robert-sikiric", number: 12, name: "Robert Sikirić", position: "GK", appearances: 5, minutes: 0, goals: 0, goalsConceded: 5, yellowCards: 0, redCards: 0, photo: "/players/pioniri/robert-sikiric.jpg" },
  { id: "pio-dominik-cukovic", number: 4, name: "Dominik Ćuković", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/dominik-cukovic.jpg" },
  { id: "pio-antoni-delija", number: 2, name: "Antoni Delija", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/antoni-delija.png" },
  { id: "pio-toni-erceg", number: 8, name: "Toni Erceg", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 2, yellowCards: 0, redCards: 0, photo: "/players/pioniri/toni-erceg.jpg" },
  { id: "pio-rafael-kero", number: 20, name: "Rafael Kero", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 1, yellowCards: 1, redCards: 0, photo: "/players/pioniri/rafael-kero.jpg" },
  { id: "pio-krizo-kinda", number: 3, name: "Križo Kinda", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/pioniri/krizo-kinda.jpg" },
  { id: "pio-daniel-lalic", number: 11, name: "Daniel Lalić", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 3, yellowCards: 0, redCards: 0, photo: "/players/pioniri/daniel-lalic.jpg" },
  { id: "pio-emanuel-lisica", number: 21, name: "Emanuel Lisica", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 0, yellowCards: 1, redCards: 0, photo: "/players/pioniri/emanuel-lisica.jpg" },
  { id: "pio-nediljko-lisica", number: 17, name: "Nediljko Lisica", position: "OUTFIELD", appearances: 3, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/nediljko-lisica.png" },
  { id: "pio-ante-lonic", number: 13, name: "Ante Lonić", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 3, yellowCards: 0, redCards: 0, photo: "/players/pioniri/ante-lonic.jpg" },
  { id: "pio-karlo-petkovic", number: 10, name: "Karlo Petković", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 6, yellowCards: 1, redCards: 0, photo: "/players/pioniri/karlo-petkovic.png" },
  { id: "pio-marko-rezan", number: 14, name: "Marko Režan", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/pioniri/marko-rezan.png" },
  { id: "pio-mihael-rezan", number: 6, name: "Mihael Režan", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 1, yellowCards: 1, redCards: 0, photo: "/players/pioniri/mihael-rezan.jpg" },
  { id: "pio-marko-sikiric", number: 22, name: "Marko Sikirić", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/marko-sikiric.png" },
  { id: "pio-reno-sikiric", number: 5, name: "Reno Sikirić", position: "OUTFIELD", appearances: 1, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/reno-sikiric.png" },
  { id: "pio-ivano-soric", number: 5, name: "Ivano Sorić", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/ivano-soric.png" },
  { id: "pio-ante-toni-simunic", number: 19, name: "Ante-Toni Šimunić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/ante-toni-simunic.png" },
  { id: "pio-emanuel-sindija", number: 9, name: "Emanuel Šindija", position: "OUTFIELD", appearances: 3, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/emanuel-sindija.png" },
  { id: "pio-mateo-sindija", number: 7, name: "Mateo Šindija", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 1, yellowCards: 1, redCards: 0, photo: "/players/pioniri/mateo-sindija.png" },
  { id: "pio-sime-vuica", number: 77, name: "Šime Vuica", position: "OUTFIELD", appearances: 1, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/pioniri/sime-vuica.jpg" },
]

export const COACHES: Coach[] = [
  { name: "Antonio Kunce", matches: 5, photo: "/players/pioniri/antonio-kunce.png" },
]
