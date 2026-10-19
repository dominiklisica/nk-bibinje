// Detalji odigranih utakmica — izvor: HNS Semafor (COMET).
// Postave: prvi igrač je vratar; "(C)" označava kapetana.

export interface MatchGoal {
  side: 'home' | 'away'
  player: string
  minute: string
}

export interface TeamSheet {
  team: string
  starters: string[] // "12 Ivan Cindrić" (prvi je vratar, "(C)" = kapetan)
  bench: string[]
  coach: string
}

export interface MatchDetail {
  id: string
  round: number
  venue: string
  attendance?: number
  referees: string[]
  goals: MatchGoal[]
  home: TeamSheet
  away: TeamSheet
}

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  m01: {
    id: 'm01',
    round: 1,
    venue: 'Igralište Franka Lisice, Bibinje',
    referees: ['Tadija Babić', 'Luka Župan', 'Luka Dujela'],
    goals: [
      { side: 'home', player: 'Stipe Silov', minute: "7'" },
      { side: 'away', player: 'Josip Čirjak', minute: "26'" },
      { side: 'home', player: 'Stipe Silov', minute: "63'" },
      { side: 'home', player: 'Stipe Gambiraža', minute: "88'" },
    ],
    home: {
      team: 'NK Bibinje',
      starters: [
        '12 Ivan Cindrić',
        '4 Matej Novoselić',
        '5 Ante Lisica',
        '6 Tomislav Frleta',
        '10 Marko Kožul',
        '13 Stipe Silov',
        '15 Enzo Lisica',
        '16 Blaž Katuša',
        '18 Stipe Gambiraža (C)',
        '19 Matija Osmančević',
        '20 Dominik Lisica',
      ],
      bench: [
        '2 Roko Delija',
        '7 Francesco Antonio Brunetti',
        '8 Lucijan Sekula',
        '9 Mate Lukić',
        '11 David Katuša',
        '14 Jakov Delija',
        '17 Ante Lonić',
      ],
      coach: 'Jurica Lonić',
    },
    away: {
      team: 'NK Polača',
      starters: [
        '1 Mate Bašić',
        '2 Antonio Knežević',
        '3 Stipan Vedrić',
        '6 Filip Batur',
        '7 Lovre Milanko',
        '8 Luka Prtenjača (C)',
        '10 Stipe Bašić',
        '11 Luka Bobanović',
        '17 Luka Erlić',
        '19 Josip Čirjak',
        '22 Ivan Prtenjača',
      ],
      bench: ['9 Luka Erlić', '20 Karlo Bobanović', '21 Toni Baždarić'],
      coach: 'Alen Vedrić',
    },
  },

  m02: {
    id: 'm02',
    round: 2,
    venue: 'Igralište Vlačine, Škabrnja',
    attendance: 80,
    referees: ['Josip Barić', 'Tomislav Čulina', 'Luka Župan'],
    goals: [
      { side: 'home', player: 'Josip Brkić', minute: "22'" },
      { side: 'home', player: 'Petar Jurić', minute: "55'" },
      { side: 'home', player: 'Ivano Bilaver', minute: "88'" },
    ],
    home: {
      team: "NK Škabrnja '91",
      starters: [
        '1 Šime Žilić',
        '3 Jakov Šarić',
        '4 Bruno Crnjak (C)',
        '7 Josip Brkić',
        '8 Mateo Šušak',
        '9 Petar Jurić',
        '10 Ivano Bilaver',
        '14 Ante Josić-Jurjević',
        '15 Ivan Kardum',
        '16 Dino-Borna Jurjević',
        '18 Karlo Bilaver',
      ],
      bench: [
        '32 Josip Škara',
        '2 Stipe Gospić',
        '5 Ivan Mandić',
        '6 David Jurić',
        '11 Josip Vuković',
        '12 Đani Škara',
        '19 Gabriel Niko Kardum',
      ],
      coach: 'Matej Vukoje',
    },
    away: {
      team: 'NK Bibinje',
      starters: [
        '12 Ivan Cindrić',
        '3 Dominik Lisica',
        '4 Matej Novoselić',
        '5 Blaž Katuša',
        '7 Lucijan Sekula',
        '10 Marko Kožul',
        '14 Enzo Lisica',
        '16 Matija Osmančević',
        '19 Ante Lisica',
        '20 Stipe Gambiraža (C)',
        '21 Stipe Silov',
      ],
      bench: [
        '2 Roko Delija',
        '9 David Katuša',
        '11 Mate Lukić',
        '13 Mateo Bralić',
        '17 Davorin Milanović',
        '18 Domagoj Lonić',
        '22 Ante Lonić',
      ],
      coach: 'Jurica Lonić',
    },
  },

  m03: {
    id: 'm03',
    round: 3,
    venue: 'Igralište Franka Lisice, Bibinje',
    attendance: 500,
    referees: ['Lovre Katalinić', 'Petar Mijić', 'Adin Skopljaković'],
    goals: [
      { side: 'away', player: 'Boris Labus', minute: "47'" },
      { side: 'away', player: 'Vlatko Blažević', minute: "73'" },
    ],
    home: {
      team: 'NK Bibinje',
      starters: [
        '1 Mateo Lisica',
        '4 Tomislav Frleta',
        '9 Ante Lisica',
        '10 Marko Kožul',
        '11 Mate Lukić',
        '13 Mateo Bralić (C)',
        '14 Enzo Lisica',
        '16 Matija Osmančević',
        '17 Davorin Milanović',
        '20 Stipe Gambiraža',
        '21 Stipe Silov',
      ],
      bench: [
        '2 Roko Delija',
        '3 Dominik Lisica',
        '7 David Katuša',
        '15 Dino Režan',
        '18 Domagoj Lonić',
        '19 Mate Bugarija',
        '22 Ante Lonić',
      ],
      coach: 'Jurica Lonić',
    },
    away: {
      team: 'NŠK Zlatna Luka',
      starters: [
        '1 Josip Vrkić',
        '3 Lucijan-Martin Labus (C)',
        '4 Ivan Martinović',
        '5 Paulo Colić',
        '8 Roko Dević',
        '10 Ivan Sudinja',
        '11 Vlatko Blažević',
        '15 Stipe Liović-Raspović',
        '16 Teo Torbarina',
        '19 Tomislav Čanković',
        '23 Boris Labus',
      ],
      bench: [
        '2 Šime Raspović',
        '6 Ante Drobnak',
        '13 Jakov Jukić',
        '17 Juraj Pavić',
        '20 Luka Ročak',
        '21 Matija Oljica',
        '25 Stjepan Drobnak',
      ],
      coach: 'Robert Dijan',
    },
  },

  m04: {
    id: 'm04',
    round: 4,
    venue: 'Igralište Lužine, Zemunik',
    referees: ['Josip Barić', 'Dominik Pedić', 'Fabio Dadić'],
    goals: [
      { side: 'home', player: 'Dino Ledenko', minute: "3'" },
      { side: 'home', player: 'Leonardo Lučić', minute: "5'" },
      { side: 'away', player: 'David Katuša', minute: "7'" },
      { side: 'away', player: 'Davorin Milanović', minute: "45'" },
      { side: 'away', player: 'Stipe Silov', minute: "51'" },
      { side: 'away', player: 'Stipe Silov', minute: "60'" },
      { side: 'away', player: 'Matej Novoselić', minute: "66'" },
      { side: 'away', player: 'Luka Erstić', minute: "83'" },
      { side: 'away', player: 'Marko Kožul', minute: "88'" },
    ],
    home: {
      team: 'NŠK Zemunik',
      starters: [
        '1 Pavle Jurjević',
        '4 Ivano Žilić',
        '5 Marko Desnica',
        '7 Šime Fabijan',
        '8 Tomislav Pandža',
        '10 Matija Lučić',
        '20 Leonardo Lučić',
        '22 Dino Ledenko',
        '23 Leon Marojević',
        '24 Lucijano-Patrik Pinčić',
        '25 Ivan Buljat (C)',
      ],
      bench: [
        '2 Lukas Lukić',
        '9 Josip Dragaš',
        '11 Luka Marušić',
        '14 Mate Kasap',
        '21 Matija Šestan',
        '26 Luka Brkić',
      ],
      coach: 'Franko Ćurković',
    },
    away: {
      team: 'NK Bibinje',
      starters: [
        '12 Ivan Cindrić',
        '2 Roko Delija',
        '9 Ante Lisica',
        '10 Marko Kožul',
        '11 Mate Lukić',
        '14 Enzo Lisica',
        '17 Davorin Milanović (C)',
        '18 Domagoj Lonić',
        '20 David Katuša',
        '21 Stipe Silov',
        '22 Ante Lonić',
      ],
      bench: [
        '1 Mateo Lisica',
        '4 Matej Novoselić',
        '5 Luka Erstić',
        '7 Francesco Antonio Brunetti',
        '13 Mateo Bralić',
        '16 Lucijan Sekula',
        '19 Mate Bugarija',
      ],
      coach: 'Jurica Lonić',
    },
  },
}
