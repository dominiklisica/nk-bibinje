// 1. ŽNL Zadarska 2026/27 — generirano skriptom scripts/semafor-sync.mjs (npm run sync)
// iz HNS Semafora (COMET), stanje 2026-11-09. Ne uređuj ručno: sljedeće pokretanje prepisuje datoteku.
import type { Coach, Match, MatchDetail, Player, StandingRow } from '../../types'

const STADIUM = 'Igralište Franka Lisice, Bibinje'
const COMP = "1. ŽNL Zadarska"

export const MATCHES: Match[] = [
  { id: "m01", date: "2026-09-19", time: "17:00", home: "NK Bibinje", away: "NK Polača", homeScore: 3, awayScore: 1, competition: COMP, round: 1, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "m02", date: "2026-09-27", time: "16:30", home: "NK Škabrnja '91", away: "NK Bibinje", homeScore: 3, awayScore: 0, competition: COMP, round: 2, venue: "Vlačine, Škabrnja", status: "finished" },
  { id: "m03", date: "2026-10-03", time: "16:30", home: "NK Bibinje", away: "NŠK Zlatna luka", homeScore: 0, awayScore: 2, competition: COMP, round: 3, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "m04", date: "2026-10-07", time: "16:30", home: "NŠK Zemunik", away: "NK Bibinje", homeScore: 2, awayScore: 7, competition: COMP, round: 4, venue: "Lužine, Zemunik", status: "finished" },
  { id: "m05", date: "2026-10-17", time: "18:00", home: "NK Sabunjar", away: "NK Bibinje", homeScore: 3, awayScore: 2, competition: COMP, round: 6, venue: "Sabunike, Privlaka", status: "finished" },
  { id: "m06", date: "2026-10-21", time: "16:00", home: "NK Bibinje", away: "NŠK Raštane", homeScore: 4, awayScore: 1, competition: COMP, round: 5, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "m07", date: "2026-10-24", time: "15:30", home: "NK Bibinje", away: "NK Dragovoljac", homeScore: 6, awayScore: 1, competition: COMP, round: 7, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "m08", date: "2026-11-01", time: "14:30", home: "NŠK Debeljak", away: "NK Bibinje", homeScore: 3, awayScore: 0, competition: COMP, round: 8, venue: "Na Šaraju, Debeljak", status: "finished" },
  { id: "m09", date: "2026-11-07", time: "14:30", home: "NK Bibinje", away: "HNK Velebit (B)", homeScore: 2, awayScore: 5, competition: COMP, round: 9, venue: "Igralište Franka Lisice, Bibinje", status: "finished" },
  { id: "m10", date: "2026-11-14", time: "14:00", home: "NK Pakoštane", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 10, status: "upcoming" },
  { id: "m11", date: "2026-11-21", time: "14:00", home: "NK Bibinje", away: "NŠK Nova zora", homeScore: null, awayScore: null, competition: COMP, round: 11, venue: STADIUM, status: "upcoming" },
  { id: "m12", date: "2026-11-28", time: "13:30", home: "NK Bibinje", away: "NK Abeceda sporta", homeScore: null, awayScore: null, competition: COMP, round: 12, venue: STADIUM, status: "upcoming" },
  { id: "m13", date: "2026-12-06", time: "13:30", home: "NK Hajduk (P)", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 13, status: "upcoming" },
  { id: "m14", date: "2027-03-07", time: "15:30", home: "NK Polača", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 14, status: "upcoming" },
  { id: "m15", date: "2027-03-14", time: "15:30", home: "NK Bibinje", away: "NK Škabrnja '91", homeScore: null, awayScore: null, competition: COMP, round: 15, venue: STADIUM, status: "upcoming" },
  { id: "m16", date: "2027-03-21", time: "15:30", home: "NŠK Zlatna luka", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 16, status: "upcoming" },
  { id: "m17", date: "2027-03-28", time: "17:00", home: "NK Bibinje", away: "NŠK Zemunik", homeScore: null, awayScore: null, competition: COMP, round: 17, venue: STADIUM, status: "upcoming" },
  { id: "m18", date: "2027-04-04", time: "17:00", home: "NŠK Raštane", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 18, status: "upcoming" },
  { id: "m19", date: "2027-04-11", time: "17:00", home: "NK Bibinje", away: "NK Sabunjar", homeScore: null, awayScore: null, competition: COMP, round: 19, venue: STADIUM, status: "upcoming" },
  { id: "m20", date: "2027-04-18", time: "17:00", home: "NK Dragovoljac", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 20, status: "upcoming" },
  { id: "m21", date: "2027-04-25", time: "17:00", home: "NK Bibinje", away: "NŠK Debeljak", homeScore: null, awayScore: null, competition: COMP, round: 21, venue: STADIUM, status: "upcoming" },
  { id: "m22", date: "2027-05-02", time: "17:30", home: "HNK Velebit (B)", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 22, status: "upcoming" },
  { id: "m23", date: "2027-05-09", time: "17:30", home: "NK Bibinje", away: "NK Pakoštane", homeScore: null, awayScore: null, competition: COMP, round: 23, venue: STADIUM, status: "upcoming" },
  { id: "m24", date: "2027-05-16", time: "17:30", home: "NŠK Nova zora", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 24, status: "upcoming" },
  { id: "m25", date: "2027-05-23", time: "17:30", home: "NK Abeceda sporta", away: "NK Bibinje", homeScore: null, awayScore: null, competition: COMP, round: 25, status: "upcoming" },
  { id: "m26", date: "2027-05-30", time: "17:30", home: "NK Bibinje", away: "NK Hajduk (P)", homeScore: null, awayScore: null, competition: COMP, round: 26, venue: STADIUM, status: "upcoming" },
]

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  "m01": {
    "id": "m01",
    "round": 1,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Tadija Babić",
      "Luka Župan",
      "Luka Dujela"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Stipe Silov",
        "minute": "7'"
      },
      {
        "side": "away",
        "player": "Josip Čirjak",
        "minute": "26'"
      },
      {
        "side": "home",
        "player": "Stipe Silov",
        "minute": "63'"
      },
      {
        "side": "home",
        "player": "Stipe Gambiraža",
        "minute": "88'"
      }
    ],
    "events": [
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Jakov Delija",
        "playerOut": "Dominik Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "David Katuša",
        "playerOut": "Enzo Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Mate Lukić",
        "playerOut": "Tomislav Frleta"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Roko Delija",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Toni Baždarić",
        "playerOut": "Josip Čirjak"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "51'",
        "player": "Luka Prtenjača"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "58'",
        "player": "Luka Erlić",
        "playerOut": "Stipan Vedrić"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "65'",
        "player": "Mate Bašić"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "65'",
        "player": "Luka Erlić"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "68'",
        "player": "Matija Osmančević"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "75'",
        "player": "Francesco Antonio Brunetti",
        "playerOut": "Marko Kožul"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "82'",
        "player": "Filip Batur"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "87'",
        "player": "Karlo Bobanović",
        "playerOut": "Lovre Milanko"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "90+1'",
        "player": "Lucijan Sekula",
        "playerOut": "Stipe Silov"
      }
    ],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "12 Ivan Cindrić",
        "4 Matej Novoselić",
        "5 Ante Lisica",
        "6 Tomislav Frleta",
        "10 Marko Kožul",
        "13 Stipe Silov",
        "15 Enzo Lisica",
        "16 Blaž Katuša",
        "18 Stipe Gambiraža (C)",
        "19 Matija Osmančević",
        "20 Dominik Lisica"
      ],
      "bench": [
        "2 Roko Delija",
        "7 Francesco Antonio Brunetti",
        "8 Lucijan Sekula",
        "9 Mate Lukić",
        "11 David Katuša",
        "14 Jakov Delija",
        "17 Ante Lonić"
      ],
      "coach": "Jurica Lonić"
    },
    "away": {
      "team": "NK Polača",
      "starters": [
        "1 Mate Bašić",
        "2 Antonio Knežević",
        "3 Stipan Vedrić",
        "6 Filip Batur",
        "7 Lovre Milanko",
        "8 Luka Prtenjača (C)",
        "10 Stipe Bašić",
        "11 Luka Bobanović",
        "17 Luka Erlić",
        "19 Josip Čirjak",
        "22 Ivan Prtenjača"
      ],
      "bench": [
        "9 Luka Erlić",
        "20 Karlo Bobanović",
        "21 Toni Baždarić"
      ],
      "coach": "Alen Vedrić"
    }
  },
  "m02": {
    "id": "m02",
    "round": 2,
    "venue": "Vlačine, Škabrnja",
    "attendance": 80,
    "referees": [
      "Josip Barić",
      "Tomislav Čulina",
      "Luka Župan"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Josip Brkić",
        "minute": "22'"
      },
      {
        "side": "home",
        "player": "Petar Jurić",
        "minute": "55'"
      },
      {
        "side": "home",
        "player": "Ivano Bilaver",
        "minute": "88'"
      }
    ],
    "events": [
      {
        "side": "away",
        "type": "yellow",
        "minute": "15'",
        "player": "Blaž Katuša"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "21'",
        "player": "Stipe Gambiraža"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "38'",
        "player": "Karlo Bilaver"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Roko Delija",
        "playerOut": "Dominik Lisica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "David Katuša",
        "playerOut": "Lucijan Sekula"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Mate Lukić",
        "playerOut": "Marko Kožul"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Mateo Bralić",
        "playerOut": "Enzo Lisica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Davorin Milanović",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "55'",
        "player": "Ivan Mandić",
        "playerOut": "Dino-Borna Jurjević"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "76'",
        "player": "Đani Škara",
        "playerOut": "Ivan Kardum"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "76'",
        "player": "Stipe Gospić",
        "playerOut": "Petar Jurić"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "80'",
        "player": "Đani Škara"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "82'",
        "player": "Domagoj Lonić",
        "playerOut": "Stipe Silov"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "90'",
        "player": "Gabriel Niko Kardum",
        "playerOut": "Ivano Bilaver"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "90'",
        "player": "David Jurić",
        "playerOut": "Josip Brkić"
      }
    ],
    "home": {
      "team": "NK Škabrnja '91",
      "starters": [
        "1 Šime Žilić",
        "3 Jakov Šarić",
        "4 Bruno Crnjak (C)",
        "7 Josip Brkić",
        "8 Mateo Šušak",
        "9 Petar Jurić",
        "10 Ivano Bilaver",
        "14 Ante Josić-Jurjević",
        "15 Ivan Kardum",
        "16 Dino-Borna Jurjević",
        "18 Karlo Bilaver"
      ],
      "bench": [
        "32 Josip Škara",
        "2 Stipe Gospić",
        "5 Ivan Mandić",
        "6 David Jurić",
        "11 Josip Vuković",
        "12 Đani Škara",
        "19 Gabriel Niko Kardum"
      ],
      "coach": "Matej Vukoje"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "12 Ivan Cindrić",
        "3 Dominik Lisica",
        "4 Matej Novoselić",
        "5 Blaž Katuša",
        "7 Lucijan Sekula",
        "10 Marko Kožul",
        "14 Enzo Lisica",
        "16 Matija Osmančević",
        "19 Ante Lisica",
        "20 Stipe Gambiraža (C)",
        "21 Stipe Silov"
      ],
      "bench": [
        "2 Roko Delija",
        "9 David Katuša",
        "11 Mate Lukić",
        "13 Mateo Bralić",
        "17 Davorin Milanović",
        "18 Domagoj Lonić",
        "22 Ante Lonić"
      ],
      "coach": "Jurica Lonić"
    }
  },
  "m03": {
    "id": "m03",
    "round": 3,
    "venue": "Igralište Franka Lisice, Bibinje",
    "attendance": 500,
    "referees": [
      "Lovre Katalinić",
      "Petar Mijić",
      "Adin Skopljaković"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Boris Labus (11 m)",
        "minute": "47'"
      },
      {
        "side": "away",
        "player": "Vlatko Blažević",
        "minute": "73'"
      }
    ],
    "events": [
      {
        "side": "away",
        "type": "sub",
        "minute": "36'",
        "player": "Ante Drobnak",
        "playerOut": "Tomislav Čanković"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "David Katuša",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Roko Delija",
        "playerOut": "Tomislav Frleta"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Luka Ročak",
        "playerOut": "Paulo Colić"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "47'",
        "player": "Mateo Lisica"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "52'",
        "player": "Stipe Gambiraža"
      },
      {
        "side": "home",
        "type": "second_yellow",
        "minute": "60'",
        "player": "Stipe Gambiraža"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "63'",
        "player": "Dominik Lisica",
        "playerOut": "Marko Kožul"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "70'",
        "player": "Mate Bugarija",
        "playerOut": "Mateo Bralić"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "72'",
        "player": "Stipe Silov"
      }
    ],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Mateo Lisica",
        "4 Tomislav Frleta",
        "9 Ante Lisica",
        "10 Marko Kožul",
        "11 Mate Lukić",
        "13 Mateo Bralić (C)",
        "14 Enzo Lisica",
        "16 Matija Osmančević",
        "17 Davorin Milanović",
        "20 Stipe Gambiraža",
        "21 Stipe Silov"
      ],
      "bench": [
        "2 Roko Delija",
        "3 Dominik Lisica",
        "7 David Katuša",
        "15 Dino Režan",
        "18 Domagoj Lonić",
        "19 Mate Bugarija",
        "22 Ante Lonić"
      ],
      "coach": "Jurica Lonić"
    },
    "away": {
      "team": "NŠK Zlatna luka",
      "starters": [
        "1 Josip Vrkić",
        "3 Lucijan-Martin Labus (C)",
        "4 Ivan Martinović",
        "5 Paulo Colić",
        "8 Roko Dević",
        "10 Ivan Sudinja",
        "11 Vlatko Blažević",
        "15 Stipe Liović-Raspović",
        "16 Teo Torbarina",
        "19 Tomislav Čanković",
        "23 Boris Labus"
      ],
      "bench": [
        "2 Šime Raspović",
        "6 Ante Drobnak",
        "13 Jakov Jukić",
        "17 Juraj Pavić",
        "20 Luka Ročak",
        "21 Matija Oljica",
        "25 Stjepan Drobnak"
      ],
      "coach": "Robert Dijan"
    }
  },
  "m04": {
    "id": "m04",
    "round": 4,
    "venue": "Lužine, Zemunik",
    "referees": [
      "Josip Barić",
      "Dominik Pedić",
      "Fabio Dadić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Dino Ledenko",
        "minute": "3'"
      },
      {
        "side": "home",
        "player": "Leonardo Lučić",
        "minute": "5'"
      },
      {
        "side": "away",
        "player": "David Katuša",
        "minute": "7'"
      },
      {
        "side": "away",
        "player": "Davorin Milanović",
        "minute": "45'"
      },
      {
        "side": "away",
        "player": "Stipe Silov",
        "minute": "51'"
      },
      {
        "side": "away",
        "player": "Stipe Silov",
        "minute": "60'"
      },
      {
        "side": "away",
        "player": "Matej Novoselić",
        "minute": "66'"
      },
      {
        "side": "away",
        "player": "Luka Erstić",
        "minute": "83'"
      },
      {
        "side": "away",
        "player": "Marko Kožul",
        "minute": "88'"
      }
    ],
    "events": [
      {
        "side": "away",
        "type": "sub",
        "minute": "5'",
        "player": "Luka Erstić",
        "playerOut": "Ante Lonić"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "18'",
        "player": "Ivan Buljat"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "26'",
        "player": "Ante Lonić"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "26'",
        "player": "Francesco Antonio Brunetti",
        "playerOut": "David Katuša"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "38'",
        "player": "Dino Ledenko"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "43'",
        "player": "Ante Lisica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Matej Novoselić",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Mateo Bralić",
        "playerOut": "Domagoj Lonić"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "63'",
        "player": "Mate Kasap",
        "playerOut": "Leon Marojević"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "63'",
        "player": "Lukas Lukić",
        "playerOut": "Matija Lučić"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "72'",
        "player": "Matija Šestan",
        "playerOut": "Marko Desnica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "80'",
        "player": "Lucijan Sekula",
        "playerOut": "Davorin Milanović"
      }
    ],
    "home": {
      "team": "NŠK Zemunik",
      "starters": [
        "1 Pavle Jurjević",
        "4 Ivano Žilić",
        "5 Marko Desnica",
        "7 Šime Fabijan",
        "8 Tomislav Pandža",
        "10 Matija Lučić",
        "20 Leonardo Lučić",
        "22 Dino Ledenko",
        "23 Leon Marojević",
        "24 Lucijano-Patrik Pinčić",
        "25 Ivan Buljat (C)"
      ],
      "bench": [
        "2 Lukas Lukić",
        "9 Josip Dragaš",
        "11 Luka Marušić",
        "14 Mate Kasap",
        "21 Matija Šestan",
        "26 Luka Brkić"
      ],
      "coach": "Franko Ćurković"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "12 Ivan Cindrić",
        "2 Roko Delija",
        "9 Ante Lisica",
        "10 Marko Kožul",
        "11 Mate Lukić",
        "14 Enzo Lisica",
        "17 Davorin Milanović (C)",
        "18 Domagoj Lonić",
        "20 David Katuša",
        "21 Stipe Silov",
        "22 Ante Lonić"
      ],
      "bench": [
        "1 Mateo Lisica",
        "4 Matej Novoselić",
        "5 Luka Erstić",
        "7 Francesco Antonio Brunetti",
        "13 Mateo Bralić",
        "16 Lucijan Sekula",
        "19 Mate Bugarija"
      ],
      "coach": "Jurica Lonić"
    }
  },
  "m05": {
    "id": "m05",
    "round": 6,
    "venue": "Sabunike, Privlaka",
    "referees": [
      "Josip Barić",
      "Lovre Katalinić",
      "Josip Štrkalj"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Roko Kovač",
        "minute": "10'"
      },
      {
        "side": "home",
        "player": "Luka Miletić",
        "minute": "14'"
      },
      {
        "side": "home",
        "player": "Luka Miletić",
        "minute": "34'"
      },
      {
        "side": "away",
        "player": "Ante Lisica",
        "minute": "40'"
      },
      {
        "side": "away",
        "player": "Frane Bašić (autogol)",
        "minute": "55'"
      }
    ],
    "events": [
      {
        "side": "away",
        "type": "yellow",
        "minute": "",
        "player": "Ivan Cindrić"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "22'",
        "player": "Mateo Bralić",
        "playerOut": "Enzo Lisica"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "32'",
        "player": "Mateo Bralić"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "36'",
        "player": "Mate Lukić"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Roko Delija",
        "playerOut": "Ivano Konestabo"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Francesco Antonio Brunetti",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "52'",
        "player": "Domagoj Lonić",
        "playerOut": "Marko Kožul"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "61'",
        "player": "Matko Miletić",
        "playerOut": "Roko Kovač"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "61'",
        "player": "Domagoj Lonić"
      },
      {
        "side": "away",
        "type": "yellow",
        "minute": "65'",
        "player": "Stipe Silov"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "79'",
        "player": "Šime Fantov"
      },
      {
        "side": "away",
        "type": "second_yellow",
        "minute": "83'",
        "player": "Mate Lukić"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "85'",
        "player": "Branimir Lipotica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "89'",
        "player": "Marko Begonja",
        "playerOut": "Luka Miletić"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "89'",
        "player": "Luka Erstić",
        "playerOut": "Matija Osmančević"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "90+3'",
        "player": "Zvonimir Glavan"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "90+4'",
        "player": "Kristijan Čvrljević",
        "playerOut": "Roko Jurac"
      }
    ],
    "home": {
      "team": "NK Sabunjar",
      "starters": [
        "1 Duje Predovan",
        "2 Branimir Lipotica",
        "3 Jure Karlović",
        "4 Šime Fantov",
        "5 Mihael Viduka",
        "7 Luka Miletić",
        "9 Roko Kovač",
        "10 Zvonimir Glavan (C)",
        "11 Roko Jurac",
        "14 Jakov-Jure Vedrić",
        "17 Frane Bašić"
      ],
      "bench": [
        "8 Matko Miletić",
        "13 Filip Petrović",
        "15 Željko Jukić",
        "16 Marko Begonja",
        "18 Marin Grbić",
        "19 Kristijan Čvrljević"
      ],
      "coach": "Frane Potočnjak"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [
        "12 Ivan Cindrić",
        "4 Ivano Konestabo",
        "9 Ante Lisica",
        "10 Marko Kožul",
        "11 Mate Lukić",
        "14 Enzo Lisica",
        "16 Matija Osmančević",
        "17 Davorin Milanović (C)",
        "20 Stipe Gambiraža",
        "21 Stipe Silov",
        "23 David Katuša"
      ],
      "bench": [
        "2 Roko Delija",
        "3 Mateo Bralić",
        "5 Dominik Lisica",
        "6 Jakov Delija",
        "7 Francesco Antonio Brunetti",
        "18 Domagoj Lonić",
        "19 Luka Erstić"
      ],
      "coach": "Jurica Lonić"
    }
  },
  "m06": {
    "id": "m06",
    "round": 5,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Josip Štrkalj",
      "Damir Lerga",
      "Lovre Katalinić"
    ],
    "goals": [
      {
        "side": "home",
        "player": "David Katuša",
        "minute": "25'"
      },
      {
        "side": "away",
        "player": "Nikola Katuša",
        "minute": "29'"
      },
      {
        "side": "home",
        "player": "Stipe Silov",
        "minute": "61'"
      },
      {
        "side": "home",
        "player": "Mateo Bralić",
        "minute": "71'"
      },
      {
        "side": "home",
        "player": "Domagoj Lonić",
        "minute": "72'"
      }
    ],
    "events": [
      {
        "side": "away",
        "type": "yellow",
        "minute": "39'",
        "player": "Luka Ninčević"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Domagoj Lonić",
        "playerOut": "Enzo Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Mateo Bralić",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Matej Novoselić",
        "playerOut": "Ivano Konestabo"
      },
      {
        "side": "home",
        "type": "yellow",
        "minute": "57'",
        "player": "Francesco Antonio Brunetti"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "74'",
        "player": "Mirko Milaković",
        "playerOut": "Domagoj Katuša"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "77'",
        "player": "Dominik Lisica",
        "playerOut": "Roko Delija"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "79'",
        "player": "Marko Kožul",
        "playerOut": "David Katuša"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "81'",
        "player": "Nediljko-Marsel Katuša",
        "playerOut": "Klaudijo Šare"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "81'",
        "player": "Antonio Elez",
        "playerOut": "Šime Colić"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "85'",
        "player": "Luka Erstić",
        "playerOut": "Francesco Antonio Brunetti"
      }
    ],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Mateo Lisica",
        "2 Roko Delija",
        "3 Ivano Konestabo",
        "9 Ante Lisica",
        "11 Francesco Antonio Brunetti",
        "14 Enzo Lisica",
        "16 Matija Osmančević",
        "17 Davorin Milanović (C)",
        "20 Stipe Gambiraža",
        "21 Stipe Silov",
        "23 David Katuša"
      ],
      "bench": [
        "4 Matej Novoselić",
        "5 Dominik Lisica",
        "8 Mate Bugarija",
        "10 Marko Kožul",
        "13 Mateo Bralić",
        "18 Domagoj Lonić",
        "19 Luka Erstić"
      ],
      "coach": "Jurica Lonić"
    },
    "away": {
      "team": "NŠK Raštane",
      "starters": [
        "12 Robert Milaković",
        "3 Mateo Colić",
        "7 Klaudijo Šare",
        "8 Jakov Josip Karić",
        "11 Domagoj Katuša",
        "15 Ante Jukić",
        "19 Nikola Katuša (C)",
        "20 Vice Birkić",
        "23 Ante Mikulić",
        "24 Luka Ninčević",
        "25 Šime Colić"
      ],
      "bench": [
        "1 Toma Momirović",
        "2 Nediljko-Marsel Katuša",
        "6 Domagoj Galac",
        "14 Krešimir Novoselović",
        "21 Antonio Elez",
        "22 Toni Banić",
        "26 Mirko Milaković"
      ],
      "coach": "Vjeran Simunić"
    }
  },
  "m07": {
    "id": "m07",
    "round": 7,
    "venue": "Igralište Franka Lisice, Bibinje",
    "referees": [
      "Slaven Čirjak",
      "Tomislav Čulina",
      "Ivan Budan"
    ],
    "goals": [
      {
        "side": "home",
        "player": "Stipe Gambiraža",
        "minute": "12'"
      },
      {
        "side": "home",
        "player": "Stipe Silov",
        "minute": "23'"
      },
      {
        "side": "home",
        "player": "David Katuša",
        "minute": "35'"
      },
      {
        "side": "home",
        "player": "Marko Kožul",
        "minute": "60'"
      },
      {
        "side": "away",
        "player": "Ivan Modrić",
        "minute": "73'"
      },
      {
        "side": "home",
        "player": "Luka Erstić",
        "minute": "77'"
      },
      {
        "side": "home",
        "player": "Stipe Gambiraža",
        "minute": "80'"
      }
    ],
    "events": [
      {
        "side": "home",
        "type": "yellow",
        "minute": "29'",
        "player": "David Katuša"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "45+1'",
        "player": "Mateo Bralić",
        "playerOut": "Stipe Silov"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Domagoj Lonić",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Marko Kožul",
        "playerOut": "Tomislav Frleta"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "46'",
        "player": "Mate Šušić",
        "playerOut": "Niko Kovačević"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "62'",
        "player": "Ante Klanac",
        "playerOut": "Renato Rončević"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "68'",
        "player": "Luka Erstić",
        "playerOut": "David Katuša"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "75'",
        "player": "Matej Novoselić",
        "playerOut": "Enzo Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "80'",
        "player": "Ante Lonić",
        "playerOut": "Roko Delija"
      }
    ],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Mateo Lisica",
        "2 Roko Delija",
        "6 Tomislav Frleta",
        "7 Francesco Antonio Brunetti",
        "9 Ante Lisica",
        "14 Enzo Lisica",
        "16 Matija Osmančević",
        "17 Davorin Milanović (C)",
        "20 Stipe Gambiraža",
        "21 Stipe Silov",
        "23 David Katuša"
      ],
      "bench": [
        "3 Mateo Bralić",
        "4 Matej Novoselić",
        "10 Marko Kožul",
        "11 Mate Lukić",
        "18 Domagoj Lonić",
        "19 Luka Erstić",
        "22 Ante Lonić"
      ],
      "coach": "Jurica Lonić"
    },
    "away": {
      "team": "NK Dragovoljac",
      "starters": [
        "12 Duje Brala",
        "4 Šime Škara",
        "5 Ivan Modrić (C)",
        "7 David Šušić Vulić",
        "8 Luka Prtenjača",
        "9 Toni Letina",
        "10 Stjepan Vukančić",
        "16 Niko Kovačević",
        "17 Renato Rončević",
        "19 Domagoj Zubčić",
        "20 Šime Alić"
      ],
      "bench": [
        "1 Filip Dujić",
        "40 Vice Zdrilić",
        "11 Ante Klanac",
        "18 Mate Šušić"
      ],
      "coach": "Marijan Lamešić"
    }
  },
  "m08": {
    "id": "m08",
    "round": 8,
    "venue": "Na Šaraju, Debeljak",
    "referees": [
      "Slaven Čirjak",
      "Marko Narančić",
      "Marin Juko"
    ],
    "note": "Službeni rezultat 3:0 bez borbe (BB).",
    "goals": [],
    "events": [],
    "home": {
      "team": "NŠK Debeljak",
      "starters": [
        "1 Roko Mitrović",
        "3 Josip Babić",
        "5 Antonio Perković",
        "6 Domagoj Torbarina (C)",
        "7 Josip Župan",
        "8 Matej Ročak",
        "9 Leon Cukar",
        "10 Marko Gambiraža",
        "11 Vedran Smokrović",
        "14 Martin Surać",
        "16 Vito Peričić"
      ],
      "bench": [
        "23 Filip Torbarina",
        "2 Tomislav Torbarina",
        "4 Ante Gambiraža",
        "17 Toni Torbarina",
        "19 Antonio Marušić"
      ],
      "coach": "Josip Butić"
    },
    "away": {
      "team": "NK Bibinje",
      "starters": [],
      "bench": [],
      "coach": ""
    }
  },
  "m09": {
    "id": "m09",
    "round": 9,
    "venue": "Igralište Franka Lisice, Bibinje",
    "attendance": 40,
    "referees": [
      "Ivan Zdrilić",
      "Luka Župan",
      "Josip Štrkalj"
    ],
    "goals": [
      {
        "side": "away",
        "player": "Krešimir Nakić",
        "minute": "10'"
      },
      {
        "side": "home",
        "player": "David Katuša",
        "minute": "12'"
      },
      {
        "side": "home",
        "player": "Stipe Gambiraža",
        "minute": "16'"
      },
      {
        "side": "away",
        "player": "Krešimir Nakić",
        "minute": "22'"
      },
      {
        "side": "away",
        "player": "Mladen Jarmanović",
        "minute": "30'"
      },
      {
        "side": "away",
        "player": "Anton Rašić",
        "minute": "35'"
      },
      {
        "side": "away",
        "player": "Anton Rašić",
        "minute": "40'"
      }
    ],
    "events": [
      {
        "side": "away",
        "type": "yellow",
        "minute": "",
        "player": "David Kolić"
      },
      {
        "side": "home",
        "type": "red",
        "minute": "9'",
        "player": "Davorin Milanović"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Domagoj Lonić",
        "playerOut": "Ante Lonić"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Dominik Lisica",
        "playerOut": "Enzo Lisica"
      },
      {
        "side": "home",
        "type": "sub",
        "minute": "46'",
        "player": "Matej Novoselić",
        "playerOut": "Ante Lisica"
      },
      {
        "side": "away",
        "type": "sub",
        "minute": "57'",
        "player": "Lucijano Čumurdžić",
        "playerOut": "Branimir Bilić"
      }
    ],
    "home": {
      "team": "NK Bibinje",
      "starters": [
        "1 Mateo Lisica",
        "3 Mateo Bralić (C)",
        "7 Francesco Antonio Brunetti",
        "8 Ante Lisica",
        "11 David Katuša",
        "14 Enzo Lisica",
        "16 Matija Osmančević",
        "17 Davorin Milanović",
        "20 Stipe Gambiraža",
        "21 Stipe Silov",
        "22 Ante Lonić"
      ],
      "bench": [
        "4 Matej Novoselić",
        "5 Dominik Lisica",
        "6 Tomislav Frleta",
        "9 Mate Lukić",
        "18 Domagoj Lonić",
        "19 Luka Erstić"
      ],
      "coach": "Jurica Lonić"
    },
    "away": {
      "team": "HNK Velebit (B)",
      "starters": [
        "1 Mate Viduka",
        "3 Marin Guzić",
        "5 Ivano Šimunac",
        "8 Mladen Jarmanović",
        "10 Anton Rašić (C)",
        "11 Krešimir Nakić",
        "14 Eldin Hasanović",
        "15 Luka Mikulić",
        "18 Toni Radaš",
        "19 Branimir Bilić",
        "20 David Kolić"
      ],
      "bench": [
        "17 Lucijano Čumurdžić"
      ],
      "coach": "Josip Lončar"
    }
  }
}

export const STANDINGS: StandingRow[] = [
  { position: 1, club: "NŠK Raštane", played: 9, won: 7, drawn: 0, lost: 2, goalsFor: 22, goalsAgainst: 12, goalDiff: 10, points: 21 },
  { position: 2, club: "NK Abeceda sporta", played: 9, won: 6, drawn: 1, lost: 2, goalsFor: 22, goalsAgainst: 12, goalDiff: 10, points: 19 },
  { position: 3, club: "NK Škabrnja '91", played: 9, won: 5, drawn: 3, lost: 1, goalsFor: 18, goalsAgainst: 12, goalDiff: 6, points: 18 },
  { position: 4, club: "NŠK Zlatna luka", played: 9, won: 5, drawn: 1, lost: 3, goalsFor: 25, goalsAgainst: 12, goalDiff: 13, points: 16 },
  { position: 5, club: "NŠK Nova zora", played: 9, won: 4, drawn: 4, lost: 1, goalsFor: 20, goalsAgainst: 8, goalDiff: 12, points: 16 },
  { position: 6, club: "HNK Velebit (B)", played: 9, won: 5, drawn: 1, lost: 3, goalsFor: 23, goalsAgainst: 16, goalDiff: 7, points: 16 },
  { position: 7, club: "NŠK Debeljak", played: 9, won: 4, drawn: 2, lost: 3, goalsFor: 15, goalsAgainst: 11, goalDiff: 4, points: 14 },
  { position: 8, club: "NK Sabunjar", played: 9, won: 3, drawn: 3, lost: 3, goalsFor: 14, goalsAgainst: 15, goalDiff: -1, points: 12 },
  { position: 9, club: "NK Bibinje", played: 9, won: 4, drawn: 0, lost: 5, goalsFor: 24, goalsAgainst: 21, goalDiff: 3, points: 11, deduction: 1 },
  { position: 10, club: "NK Pakoštane", played: 9, won: 3, drawn: 2, lost: 4, goalsFor: 18, goalsAgainst: 20, goalDiff: -2, points: 11 },
  { position: 11, club: "NK Hajduk (P)", played: 9, won: 3, drawn: 2, lost: 4, goalsFor: 13, goalsAgainst: 19, goalDiff: -6, points: 11 },
  { position: 12, club: "NK Polača", played: 9, won: 1, drawn: 1, lost: 7, goalsFor: 11, goalsAgainst: 28, goalDiff: -17, points: 4 },
  { position: 13, club: "NŠK Zemunik", played: 9, won: 1, drawn: 1, lost: 7, goalsFor: 12, goalsAgainst: 31, goalDiff: -19, points: 4 },
  { position: 14, club: "NK Dragovoljac", played: 9, won: 1, drawn: 1, lost: 7, goalsFor: 10, goalsAgainst: 30, goalDiff: -20, points: 4 },
]

export const SQUAD: Player[] = [
  { id: "p-ivan-cindric", number: 12, name: "Ivan Cindrić", position: "GK", appearances: 4, minutes: 360, goals: 0, goalsConceded: 9, yellowCards: 1, redCards: 0, photo: "/players/ivan-cindric.jpg" },
  { id: "p-mateo-lisica", number: 1, name: "Mateo Lisica", position: "GK", appearances: 4, minutes: 360, goals: 0, goalsConceded: 9, yellowCards: 1, redCards: 0, photo: "/players/mateo-lisica.jpg" },
  { id: "p-mateo-bralic", number: 3, name: "Mateo Bralić", position: "OUTFIELD", appearances: 7, minutes: 409, goals: 1, yellowCards: 1, redCards: 0, photo: "/players/mateo-bralic.jpg" },
  { id: "p-francesco-antonio-brunetti", number: 7, name: "Francesco Antonio Brunetti", position: "OUTFIELD", appearances: 6, minutes: 390, goals: 0, yellowCards: 1, redCards: 0, photo: "/players/francesco-antonio-brunetti.jpg" },
  { id: "p-mate-bugarija", number: 8, name: "Mate Bugarija", position: "OUTFIELD", appearances: 1, minutes: 21, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/mate-bugarija.jpg" },
  { id: "p-jakov-delija", number: 6, name: "Jakov Delija", position: "OUTFIELD", appearances: 1, minutes: 45, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/jakov-delija.jpg" },
  { id: "p-roko-delija", number: 2, name: "Roko Delija", position: "OUTFIELD", appearances: 7, minutes: 425, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/roko-delija.jpg" },
  { id: "p-luka-erstic", number: 19, name: "Luka Erstić", position: "OUTFIELD", appearances: 4, minutes: 117, goals: 2, yellowCards: 0, redCards: 0, photo: "/players/luka-erstic.jpg" },
  { id: "p-tomislav-frleta", number: 6, name: "Tomislav Frleta", position: "OUTFIELD", appearances: 3, minutes: 135, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/tomislav-frleta.jpg" },
  { id: "p-stipe-gambiraza", number: 20, name: "Stipe Gambiraža", position: "OUTFIELD", appearances: 7, minutes: 599, goals: 4, yellowCards: 1, redCards: 1, photo: "/players/stipe-gambiraza.jpg" },
  { id: "p-blaz-katusa", number: 5, name: "Blaž Katuša", position: "OUTFIELD", appearances: 2, minutes: 180, goals: 0, yellowCards: 1, redCards: 0, photo: "/players/blaz-katusa.jpg" },
  { id: "p-david-katusa", number: 11, name: "David Katuša", position: "OUTFIELD", appearances: 8, minutes: 485, goals: 4, yellowCards: 1, redCards: 0, photo: "/players/david-katusa.jpg" },
  { id: "p-ivano-konestabo", number: 3, name: "Ivano Konestabo", position: "OUTFIELD", appearances: 2, minutes: 90, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/ivano-konestabo.png" },
  { id: "p-marko-kozul", number: 10, name: "Marko Kožul", position: "OUTFIELD", appearances: 7, minutes: 379, goals: 2, yellowCards: 0, redCards: 0, photo: "/players/marko-kozul.jpg" },
  { id: "p-ante-lisica", number: 8, name: "Ante Lisica", position: "OUTFIELD", appearances: 8, minutes: 360, goals: 1, yellowCards: 1, redCards: 0, photo: "/players/ante-lisica.jpg" },
  { id: "p-dominik-lisica", number: 5, name: "Dominik Lisica", position: "OUTFIELD", appearances: 5, minutes: 177, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/dominik-lisica.jpg" },
  { id: "p-enzo-lisica", number: 14, name: "Enzo Lisica", position: "OUTFIELD", appearances: 8, minutes: 455, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/enzo-lisica.jpg" },
  { id: "p-ante-lonic", number: 22, name: "Ante Lonić", position: "OUTFIELD", appearances: 3, minutes: 60, goals: 0, yellowCards: 1, redCards: 0, photo: "/players/ante-lonic.jpg" },
  { id: "p-domagoj-lonic", number: 18, name: "Domagoj Lonić", position: "OUTFIELD", appearances: 6, minutes: 228, goals: 1, yellowCards: 1, redCards: 0, photo: "/players/domagoj-lonic.jpg" },
  { id: "p-mate-lukic", number: 9, name: "Mate Lukić", position: "OUTFIELD", appearances: 5, minutes: 352, goals: 0, yellowCards: 0, redCards: 1, photo: "/players/mate-lukic.jpg" },
  { id: "p-davorin-milanovic", number: 17, name: "Davorin Milanović", position: "OUTFIELD", appearances: 7, minutes: 492, goals: 1, yellowCards: 0, redCards: 1, photo: "/players/davorin-milanovic.jpg" },
  { id: "p-matej-novoselic", number: 4, name: "Matej Novoselić", position: "OUTFIELD", appearances: 6, minutes: 331, goals: 1, yellowCards: 0, redCards: 0, photo: "/players/matej-novoselic.jpg" },
  { id: "p-matija-osmancevic", number: 16, name: "Matija Osmančević", position: "OUTFIELD", appearances: 7, minutes: 628, goals: 0, yellowCards: 1, redCards: 0, photo: "/players/matija-osmancevic.jpg" },
  { id: "p-dino-rezan", number: 15, name: "Dino Režan", position: "OUTFIELD", appearances: 0, minutes: 0, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/dino-rezan.jpg" },
  { id: "p-lucijan-sekula", number: 16, name: "Lucijan Sekula", position: "OUTFIELD", appearances: 3, minutes: 57, goals: 0, yellowCards: 0, redCards: 0, photo: "/players/lucijan-sekula.jpg" },
  { id: "p-stipe-silov", number: 21, name: "Stipe Silov", position: "OUTFIELD", appearances: 8, minutes: 664, goals: 6, yellowCards: 2, redCards: 0, photo: "/players/stipe-silov.jpg" },
]

export const COACHES: Coach[] = [
  { name: "Jurica Lonić", matches: 8, photo: "/players/jurica-lonic.jpg" },
]
