// MŽNL Papaline A 2026/27 — generirano skriptom scripts/semafor-sync.mjs (npm run sync)
// iz HNS Semafora (COMET), stanje 2026-11-09. Ne uređuj ručno: sljedeće pokretanje prepisuje datoteku.
import type { Coach, Match, MatchDetail, Player, StandingRow } from '../../types'

const STADIUM = 'Igralište Franka Lisice, Bibinje'
const COMP = "MŽNL Papaline A"

export const MATCHES: Match[] = [
  { id: "pap-01", date: "2026-09-26", time: "10:00", home: "NK Novalja", away: "NK Bibinje", homeScore: 1, awayScore: 9, competition: COMP, round: 1, venue: "Cissa Straško, Novalja", status: "finished" },
  { id: "pap-04", date: "2026-10-17", time: "09:40", home: "NK Sabunjar", away: "NK Bibinje", homeScore: 9, awayScore: 1, competition: COMP, round: 4, venue: "Sabunike, Privlaka", status: "finished" },
  { id: "pap-03", date: "2026-10-22", time: "17:30", home: "NK Bibinje", away: "NK Zara", homeScore: 1, awayScore: 3, competition: COMP, round: 3, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "pap-05", date: "2026-10-27", time: "17:00", home: "NK Bibinje", away: "NŠK Sveti Mihovil", homeScore: 0, awayScore: 3, competition: COMP, round: 5, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "pap-06", date: "2026-10-31", time: "09:00", home: "NK Abeceda sporta", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 6, status: "postponed" },
  { id: "pap-07", date: "2026-11-03", time: "19:00", home: "NK Bibinje", away: "NK Arbanasi", homeScore: 0, awayScore: 10, competition: COMP, round: 7, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "pap-08", date: "2026-11-10", time: "18:30", home: "NŠK Zlatna luka", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 8, status: "upcoming" },
  { id: "pap-09", date: "2026-11-21", time: "09:00", home: "NK Bibinje", away: "NŠK Debeljak", homeScore: null, awayScore: null, competition: COMP, round: 9, venue: STADIUM, status: "upcoming" },
]

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  "pap-01": {
    "id": "pap-01",
    "round": 1,
    "venue": "Cissa Straško, Novalja",
    "referees": [
      "Damir Lerga"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Jakov Škara",
        "minute": "5'"
      },
      {
        "side": "away",
        "player": "Toni Frleta",
        "minute": "10'"
      },
      {
        "side": "away",
        "player": "Toni Frleta",
        "minute": "11'"
      },
      {
        "side": "away",
        "player": "Danijel Lonić",
        "minute": "16'"
      },
      {
        "side": "away",
        "player": "Toni Frleta",
        "minute": "18'"
      },
      {
        "side": "away",
        "player": "Venci Sikirić Vučković",
        "minute": "25'"
      },
      {
        "side": "away",
        "player": "Danijel Lonić",
        "minute": "31'"
      },
      {
        "side": "away",
        "player": "Danijel Lonić",
        "minute": "33'"
      },
      {
        "side": "away",
        "player": "Toni Frleta",
        "minute": "35'"
      },
      {
        "side": "home",
        "player": "Pavle Kurilić",
        "minute": "39'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Novalja",
      "starters": [
        "1 Ivano Janjić (C)",
        "2 Marin Peranić",
        "3 Gabrijel Hajnal",
        "8 Toni Matak",
        "9 Pavle Kurilić",
        "11 Jan Bačić",
        "15 Emanuel Lončarić"
      ],
      "bench": [],
      "coach": "Marin Datković"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "1 Toma Fuzul",
        "9 Toni Frleta",
        "10 Danijel Lonić (C)",
        "12 Roko Frleta",
        "15 Toni Lukić",
        "17 Venci Sikirić Vučković",
        "18 Jakov Škara"
      ],
      "bench": [
        "3 Ivan Šimunić"
      ],
      "coach": "Roko Delija"
    }
  },
  "pap-04": {
    "id": "pap-04",
    "round": 4,
    "venue": "Sabunike, Privlaka",
    "referees": [
      "Zvonimir Sinovčić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "David Mitrović",
        "minute": "2'"
      },
      {
        "side": "home",
        "player": "Leon Mrdelja",
        "minute": "3'"
      },
      {
        "side": "home",
        "player": "Leon Mrdelja",
        "minute": "4'"
      },
      {
        "side": "away",
        "player": "Toni Frleta",
        "minute": "8'"
      },
      {
        "side": "home",
        "player": "Leon Mrdelja",
        "minute": "11'"
      },
      {
        "side": "home",
        "player": "Paulo Orlić",
        "minute": "13'"
      },
      {
        "side": "home",
        "player": "Duje Zanki",
        "minute": "22'"
      },
      {
        "side": "home",
        "player": "Paulo Orlić",
        "minute": "29'"
      },
      {
        "side": "home",
        "player": "Paulo Orlić",
        "minute": "30'"
      },
      {
        "side": "home",
        "player": "David Mitrović",
        "minute": "33'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Sabunjar",
      "starters": [
        "1 Bruno Glavan",
        "5 Duje Zanki (C)",
        "6 Roko Glavan",
        "7 David Mitrović",
        "9 Leon Mrdelja",
        "10 Paulo Orlić",
        "11 Luka Milutin"
      ],
      "bench": [
        "13 Filip Božić"
      ],
      "coach": "Luka Vukšević"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "1 Jerolim Zuanović",
        "3 Ivan Šimunić",
        "9 Toni Frleta",
        "10 Danijel Lonić (C)",
        "15 Toni Lukić",
        "17 Venci Sikirić Vučković",
        "19 Tonči Šimunić"
      ],
      "bench": [
        "8 Jakov Škara"
      ],
      "coach": "Roko Delija"
    }
  },
  "pap-03": {
    "id": "pap-03",
    "round": 3,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Tadija Babić"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Leon Kobetić",
        "minute": "19'"
      },
      {
        "side": "away",
        "player": "Daris Hodžić",
        "minute": "19'"
      },
      {
        "side": "home",
        "player": "Toni Frleta",
        "minute": "25'"
      },
      {
        "side": "away",
        "player": "Daris Hodžić",
        "minute": "38'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Toma Fuzul",
        "3 Ivan Šimunić",
        "9 Toni Frleta",
        "10 Danijel Lonić (C)",
        "15 Toni Lukić",
        "17 Venci Sikirić Vučković",
        "19 Tonči Šimunić"
      ],
      "bench": [
        "8 Jakov Škara"
      ],
      "coach": "Roko Delija"
    },
    "away": {
      "team": "NK Zara",
      "starters": [
        "1 Adrian Buljat",
        "2 Leon Kobetić",
        "5 Daris Hodžić",
        "8 Roko Baraba",
        "9 Bartul Nemarić",
        "14 Vito Radovančić (C)",
        "17 Luka Ujaković"
      ],
      "bench": [
        "6 Toni Dražić",
        "15 Lukas Margetić",
        "18 Šimun Nemarić"
      ],
      "coach": "Ana Petrović"
    }
  },
  "pap-05": {
    "id": "pap-05",
    "round": 5,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Josip Štrkalj"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Toni Školjarev",
        "minute": "6'"
      },
      {
        "side": "away",
        "player": "Duje Mišlov",
        "minute": "12'"
      },
      {
        "side": "away",
        "player": "Duje Mišlov",
        "minute": "23'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Jerolim Zuanović",
        "3 Ivan Šimunić",
        "9 Toni Frleta",
        "10 Danijel Lonić (C)",
        "15 Toni Lukić",
        "17 Venci Sikirić Vučković",
        "19 Tonči Šimunić"
      ],
      "bench": [
        "8 Jakov Škara"
      ],
      "coach": "Roko Delija"
    },
    "away": {
      "team": "NŠK Sveti Mihovil",
      "starters": [
        "1 Teo Bašić (C)",
        "6 Paulo Valčić",
        "9 Toni Školjarev",
        "10 Ive Itković",
        "11 Duje Mišlov",
        "21 Duje Kapović",
        "22 Jakov Lovre Livljanić"
      ],
      "bench": [
        "8 Nino Kapović",
        "14 Moreno Jurin"
      ],
      "coach": "Marko Ivančić"
    }
  },
  "pap-07": {
    "id": "pap-07",
    "round": 7,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Lovre Katalinić"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Toma Kruneš",
        "minute": "4'"
      },
      {
        "side": "away",
        "player": "Niko Galović",
        "minute": "5'"
      },
      {
        "side": "away",
        "player": "Vito Mika Kociper",
        "minute": "6'"
      },
      {
        "side": "away",
        "player": "Mauro Matešić",
        "minute": "10'"
      },
      {
        "side": "away",
        "player": "Vito Mika Kociper",
        "minute": "12'"
      },
      {
        "side": "away",
        "player": "Mihael Klarin",
        "minute": "14'"
      },
      {
        "side": "away",
        "player": "Mihael Klarin",
        "minute": "21'"
      },
      {
        "side": "away",
        "player": "Maroje Pulja",
        "minute": "26'"
      },
      {
        "side": "away",
        "player": "Mauro Matešić",
        "minute": "30'"
      },
      {
        "side": "away",
        "player": "Vito Mika Kociper",
        "minute": "36'"
      }
    ],
    "events": [],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Jerolim Zuanović",
        "3 Ivan Šimunić",
        "8 Jakov Škara",
        "9 Toni Frleta",
        "10 Danijel Lonić (C)",
        "17 Venci Sikirić Vučković",
        "19 Tonči Šimunić"
      ],
      "bench": [
        "12 Roko Frleta"
      ],
      "coach": "Roko Delija"
    },
    "away": {
      "team": "NK Arbanasi",
      "starters": [
        "1 Dante Gospić",
        "4 Luka Veršić",
        "8 Maroje Pulja (C)",
        "9 Toma Kruneš",
        "10 Niko Paleka",
        "11 Niko Galović",
        "18 Mauro Matešić"
      ],
      "bench": [
        "12 Toma Maruna",
        "5 Vito Mika Kociper",
        "7 Mihael Klarin",
        "16 Lovre Veršić"
      ],
      "coach": "Josip Petani"
    }
  }
}

export const STANDINGS: StandingRow[] = [
  { position: 1, club: "NK Sabunjar", played: 5, won: 5, drawn: 0, lost: 0, goalsFor: 36, goalsAgainst: 5, goalDiff: 31, points: 15 },
  { position: 2, club: "NK Abeceda sporta", played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 55, goalsAgainst: 4, goalDiff: 51, points: 12 },
  { position: 3, club: "NŠK Sveti Mihovil", played: 7, won: 4, drawn: 0, lost: 3, goalsFor: 14, goalsAgainst: 15, goalDiff: -1, points: 12 },
  { position: 4, club: "NK Arbanasi", played: 4, won: 3, drawn: 0, lost: 1, goalsFor: 29, goalsAgainst: 6, goalDiff: 23, points: 9 },
  { position: 5, club: "NK Zara", played: 5, won: 3, drawn: 0, lost: 2, goalsFor: 15, goalsAgainst: 20, goalDiff: -5, points: 9 },
  { position: 6, club: "NŠK Zlatna luka", played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 14, goalsAgainst: 23, goalDiff: -9, points: 6 },
  { position: 7, club: "NK Bibinje", played: 5, won: 1, drawn: 0, lost: 4, goalsFor: 11, goalsAgainst: 26, goalDiff: -15, points: 3 },
  { position: 8, club: "NŠK Debeljak", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 17, goalDiff: -15, points: 0 },
  { position: 9, club: "NK Novalja", played: 7, won: 0, drawn: 0, lost: 7, goalsFor: 6, goalsAgainst: 66, goalDiff: -60, points: 0 },
]

export const SQUAD: Player[] = [
  { id: "pap-toma-fuzul", number: 1, name: "Toma Fuzul", position: "GK", appearances: 2, minutes: 0, goals: 0, goalsConceded: 4, yellowCards: 0, redCards: 0, photo: "/players/papaline/toma-fuzul.png" },
  { id: "pap-jerolim-zuanovic", number: 1, name: "Jerolim Zuanović", position: "GK", appearances: 3, minutes: 0, goals: 0, goalsConceded: 22, yellowCards: 0, redCards: 0, photo: "/players/papaline/jerolim-zuanovic.png" },
  { id: "pap-roko-frleta", number: 12, name: "Roko Frleta", position: "OUTFIELD", appearances: 2, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/papaline/roko-frleta.png" },
  { id: "pap-toni-frleta", number: 9, name: "Toni Frleta", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 6, yellowCards: 0, redCards: 0, photo: "/players/papaline/toni-frleta.png" },
  { id: "pap-danijel-lonic", number: 10, name: "Danijel Lonić", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 3, yellowCards: 0, redCards: 0, photo: "/players/papaline/danijel-lonic.jpg" },
  { id: "pap-toni-lukic", number: 15, name: "Toni Lukić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/papaline/toni-lukic.png" },
  { id: "pap-venci-sikiric-vuckovic", number: 17, name: "Venci Sikirić Vučković", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/papaline/venci-sikiric-vuckovic.jpg" },
  { id: "pap-ivan-simunic", number: 3, name: "Ivan Šimunić", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/papaline/ivan-simunic.jpg" },
  { id: "pap-tonci-simunic", number: 19, name: "Tonči Šimunić", position: "OUTFIELD", appearances: 4, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/papaline/tonci-simunic.jpg" },
  { id: "pap-jakov-skara", number: 8, name: "Jakov Škara", position: "OUTFIELD", appearances: 5, minutes: 0, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/papaline/jakov-skara.jpg" },
]

export const COACHES: Coach[] = [
  { name: "Roko Delija", matches: 5, photo: "/players/papaline/roko-delija.jpg" },
]
