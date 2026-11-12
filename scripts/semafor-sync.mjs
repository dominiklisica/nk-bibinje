// Preuzima podatke svih ekipa NK Bibinje s HNS Semafora (COMET) i prepisuje
// src/data/teams/<ekipa>.ts, fotografije igrača i grbove protivnika.
//
// Pokretanje:  npm run sync
//
// Nova sezona / nova ekipa: ažuriraj `cid` u popisu TEAMS ispod (vidi padajući
// izbornik "Natjecanje" na https://semafor.hns.family/klubovi/213/nk-bibinje/)
// i isti broj u semaforCid u src/data/teams/index.ts.
import { parse } from 'node-html-parser'
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://semafor.hns.family'
const CLUB_ID = 213
const BIB = 'NK Bibinje'
const TODAY = new Date().toISOString().slice(0, 10)

// key = naziv datoteke, prefix = početak id-a utakmica i igrača,
// comp = naziv natjecanja kako se prikazuje na stranici.
// Seniori zadržavaju stare id-jeve utakmica (m01, m02 ... kronološki) jer se
// na njih pozivaju vijesti (matchId).
const TEAMS = [
  { key: 'seniori', cid: 115235266, prefix: 'm', comp: '1. ŽNL Zadarska', photoDir: '/players' },
  { key: 'pioniri', cid: 116265214, prefix: 'pio', comp: 'MŽNL Pioniri A' },
  { key: 'mladji-pioniri', cid: 116553575, prefix: 'mpi', comp: 'MŽNL Mlađi pioniri C' },
  { key: 'tici', cid: 116554937, prefix: 'tic', comp: 'MŽNL Tići A' },
  { key: 'papaline', cid: 116555537, prefix: 'pap', comp: 'MŽNL Papaline A' },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const DIA = { č: 'c', ć: 'c', š: 's', ž: 'z', đ: 'd', Č: 'c', Ć: 'c', Š: 's', Ž: 'z', Đ: 'd' }
const slug = (s) =>
  s.split('').map((c) => DIA[c] ?? c).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const q = (s) => JSON.stringify(s)
const t = (el) => (el ? el.text.replace(/\s+/g, ' ').trim() : '')
const num = (s) => (s === '-' || s === '' ? null : Number(s))
const ext = (url) => (url.match(/\.(png|jpe?g|gif|webp)(?:$|\?)/i)?.[1] || 'jpg').toLowerCase().replace('jpeg', 'jpg')
const minuteNum = (m) => {
  const [a, b] = m.replace("'", '').split('+').map(Number)
  return a + (b || 0) / 100
}

async function get(url) {
  for (let i = 0; i < 3; i++) {
    const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 nk-bibinje-sync' } })
    if (r.ok) return parse(await r.text())
    await sleep(1500)
  }
  throw new Error(`Dohvat nije uspio: ${url}`)
}

async function download(url, file) {
  if (existsSync(file)) return true
  for (let i = 0; i < 3; i++) {
    const r = await fetch(url)
    if (r.ok) {
      writeFileSync(file, Buffer.from(await r.arrayBuffer()))
      return true
    }
    await sleep(1000)
  }
  console.warn('  slika nije preuzeta:', url)
  return false
}

/** Širina × visina iz zaglavlja PNG/JPEG datoteke (bez dodatnih paketa). */
function imageSize(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue }
      const m = buf[i + 1]
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]
      i += 2 + buf.readUInt16BE(i + 2)
    }
  }
  return [0, 0]
}
const area = ([w, h]) => w * h

/** Semafor u popisima koristi umanjene sličice (npr. 80×100); original je ista putanja bez "_resized". */
const originalPhotoUrl = (url) =>
  url.replace('/_resized/', '/').replace(/_\d+_\d+_cut_wg_top(\.\w+)$/, '$1')

/**
 * Sprema fotografiju u public<base>.<ext>. Postojeća datoteka (bilo kojeg formata) ostaje
 * ako je jednako velika ili veća; inače se zamjenjuje originalom sa Semafora.
 * Vraća putanju za stranicu ili undefined.
 */
async function savePhoto(url, base) {
  const existing = ['jpg', 'png', 'webp'].map((e) => `${base}.${e}`).find((f) => existsSync(join(ROOT, 'public', f)))
  if (!url) return existing
  let buf = null
  let used = url
  for (const candidate of [originalPhotoUrl(url), url]) {
    const r = await fetch(candidate).catch(() => null)
    if (r?.ok) {
      buf = Buffer.from(await r.arrayBuffer())
      used = candidate
      break
    }
  }
  if (!buf) {
    console.warn('  slika nije preuzeta:', url)
    return existing
  }
  if (existing && area(imageSize(readFileSync(join(ROOT, 'public', existing)))) >= area(imageSize(buf))) return existing
  const file = `${base}.${ext(used)}`
  if (existing && existing !== file) unlinkSync(join(ROOT, 'public', existing))
  writeFileSync(join(ROOT, 'public', file), buf)
  return file
}

// ---------------------------------------------------------------- dohvat

async function scrapeTeam(cid, cachedDetails = {}) {
  const d = await get(`${BASE}/klubovi/${CLUB_ID}/nk-bibinje/?cid=${cid}`)
  const matches = d.querySelectorAll('.matchlist li.row').map((li) => {
    const dm = t(li.querySelector('.date')).match(/(\d{2})\.(\d{2})\.(\d{4})\.\s*(\d{2}:\d{2})?/)
    return {
      semaforId: li.getAttribute('data-match'),
      round: Number(li.getAttribute('data-round')) || null,
      date: dm ? `${dm[3]}-${dm[2]}-${dm[1]}` : '',
      time: dm?.[4] || '',
      home: t(li.querySelector('.club1 a')),
      away: t(li.querySelector('.club2 a')),
      homeLogo: li.querySelector('.club1 img')?.getAttribute('src'),
      awayLogo: li.querySelector('.club2 img')?.getAttribute('src'),
      homeScore: num(t(li.querySelector('.res1'))),
      awayScore: num(t(li.querySelector('.res2'))),
      // npr. "BB" (bez borbe) uz službeni rezultat
      resultNote: t(li.querySelector('.result')).replace(/^[\d-]+\s*:\s*[\d-]+/, '').trim(),
      url: li.querySelector('.result a')?.getAttribute('href') || null,
    }
  })
  const standings = d.querySelectorAll('.competition_table li.row').map((li) => {
    // Oduzeti bodovi dolaze uz naziv kluba, npr. "NK Bibinje (-1)".
    const raw = t(li.querySelector('.club a'))
    const ded = raw.match(/\s*\((-\d+)\)$/)
    return {
    position: Number(t(li.querySelector('.position'))),
    club: ded ? raw.slice(0, ded.index).trim() : raw,
    deduction: ded ? -Number(ded[1]) : 0,
    logo: li.querySelector('.club img')?.getAttribute('src'),
    played: Number(t(li.querySelector('.played'))),
    won: Number(t(li.querySelector('.wins'))),
    drawn: Number(t(li.querySelector('.draws'))),
    lost: Number(t(li.querySelector('.losses'))),
    goalsFor: Number(t(li.querySelector('.gplus'))),
    goalsAgainst: Number(t(li.querySelector('.gminus'))),
    goalDiff: Number(t(li.querySelector('.gdiff')).replace('+', '')),
    points: Number(t(li.querySelector('.points'))),
    }
  })
  const players = d.querySelectorAll('.playerslist.statsFull li.row').map((li) => {
    const name = t(li.querySelector('.playerName h3'))
    const [y, r] = t(li.querySelector('.cards')).split('/').map((x) => Number(x.trim()) || 0)
    const img = li.querySelector('.photo img')
    return {
      number: Number(t(li.querySelector('.shirtNumber'))) || 0,
      name,
      role: t(li.querySelector('.playerName')).replace(name, '').trim(),
      apps: Number(t(li.querySelector('.apps'))) || 0,
      minutes: Number(t(li.querySelector('.minutes'))) || 0,
      goals: Number(t(li.querySelector('.goals'))) || 0,
      yellow: y,
      red: r,
      photo: img?.getAttribute('data-url') || img?.getAttribute('src') || null,
    }
  })

  const details = {}
  for (const m of matches.filter((x) => x.url)) {
    // Zapisnik odigrane utakmice se ne mijenja — koristi spremljeni.
    if (cachedDetails[m.semaforId] && m.homeScore !== null) {
      details[m.semaforId] = cachedDetails[m.semaforId]
      continue
    }
    await sleep(300)
    const md = await get(m.url)
    const lines = md.querySelector('main').structuredText.split('\n').map((s) => s.trim()).filter(Boolean)
    const venueLine = lines.find((l) => /\d{2}\.\d{2}\.\d{4}\.\s*\d{2}:\d{2}/.test(l)) || ''
    const sudLine = lines.find((l) => l.startsWith('Suci:')) || ''
    const attendance = (lines.find((l) => /gledatelj/i.test(l)) || '').match(/\d+/)?.[0]
    const goals = md.querySelectorAll('.events_main ul.events').flatMap((ul, i) =>
      ul.querySelectorAll('li').map((li) => ({
        side: i ? 'away' : 'home',
        player: t(li.querySelector('.playerName')),
        minute: t(li.querySelector('.event')),
        kind: li.querySelector('.event')?.getAttribute('class') || '',
      })),
    )
    const sheets = ['homeTeam', 'awayTeam'].map((c) => {
      const ul = md.querySelector(`.${c}.playerslist ul`)
      const r = { team: '', starters: [], bench: [], coach: '', coachPhoto: null }
      if (!ul) return r
      let sec = 'starters'
      for (const li of ul.childNodes.filter((n) => n.tagName === 'LI')) {
        const cls = li.getAttribute('class') || ''
        if (cls.includes('clubName')) r.team = t(li)
        else if (cls.includes('separatorTitle')) sec = /Pri/.test(t(li)) ? 'bench' : 'coach'
        else if (cls.includes('match_lineup')) {
          const nm = t(li.querySelector('.playerName h3'))
          const events = li.querySelectorAll('.events li').map((e) => `${e.getAttribute('class')}:${t(e)}`)
          if (sec === 'coach') {
            r.coach = nm
            r.coachPhoto = li.querySelector('.photo img')?.getAttribute('src') || null
          } else r[sec].push({ number: t(li.querySelector('.shirtNumber')), name: nm, events })
        }
      }
      return r
    })
    details[m.semaforId] = {
      venueLine,
      referees: sudLine.replace('Suci:', '').replace(/\.$/, '').split(',').map((s) => s.trim()).filter(Boolean),
      attendance: attendance ? Number(attendance) : null,
      goals,
      home: sheets[0],
      away: sheets[1],
    }
  }
  return { matches, standings, players, details }
}

// ---------------------------------------------------------------- generiranje

const crestSrc = readFileSync(join(ROOT, 'src/data/crests.ts'), 'utf8')
const knownCrests = new Set([...crestSrc.matchAll(/^\s+(['"])(.+?)\1:/gm)].map((m) => m[2]))
const youthCrests = {}

const venueOf = (line) => {
  const v = line.replace(/,?\s*\d{2}\.\d{2}\.\d{4}\..*$/, '').trim()
  return v === 'Franka Lisice, Bibinje' ? 'Igralište Franka Lisice, Bibinje' : v
}

/**
 * Kartoni i izmjene jedne ekipe iz oznaka uz igrače u zapisniku.
 * Izmjena = igrač koji izlazi + igrač koji ulazi u istoj minuti (spareni redom).
 */
function sheetEvents(s, side) {
  const clean = (n) => n.replace(/\s*\(C\)$/, '')
  const all = [...s.starters, ...s.bench].flatMap((p) =>
    p.events.map((e) => {
      const i = e.indexOf(':')
      return { kind: e.slice(0, i), minute: e.slice(i + 1), player: clean(p.name) }
    }),
  )
  const out = []
  for (const e of all) {
    if (e.kind === 'yellow') out.push({ side, type: 'yellow', minute: e.minute, player: e.player })
    else if (e.kind === 'second_yellow') out.push({ side, type: 'second_yellow', minute: e.minute, player: e.player })
    else if (e.kind === 'red') out.push({ side, type: 'red', minute: e.minute, player: e.player })
  }
  const outs = all.filter((e) => e.kind === 'substitutionOut')
  const ins = all.filter((e) => e.kind === 'substitutionIn')
  for (const o of outs) {
    const i = ins.findIndex((x) => x.minute === o.minute)
    const inn = i >= 0 ? ins.splice(i, 1)[0] : null
    out.push({ side, type: 'sub', minute: o.minute, player: inn?.player ?? '', playerOut: o.player })
  }
  for (const inn of ins) out.push({ side, type: 'sub', minute: inn.minute, player: inn.player, playerOut: '' })
  return out
}

/** Primljeni golovi po vratarima: tko je bio na golu u minuti protivničkog gola. */
function concededBy(d, isHome, gkNames, acc) {
  const ours = isHome ? d.home : d.away
  const spells = []
  const clean = (n) => n.replace(/\s*\(C\)$/, '')
  for (const p of ours.starters) {
    if (!gkNames.has(clean(p.name))) continue
    const out = p.events.find((e) => e.startsWith('substitutionOut'))
    spells.push({ name: clean(p.name), from: 0, to: out ? minuteNum(out.split(':')[1]) : 999 })
  }
  for (const p of ours.bench) {
    const inn = p.events.find((e) => e.startsWith('substitutionIn'))
    if (!gkNames.has(clean(p.name)) || !inn) continue
    const out = p.events.find((e) => e.startsWith('substitutionOut'))
    spells.push({ name: clean(p.name), from: minuteNum(inn.split(':')[1]), to: out ? minuteNum(out.split(':')[1]) : 999 })
  }
  for (const g of d.goals.filter((g) => g.side === (isHome ? 'away' : 'home'))) {
    const min = minuteNum(g.minute)
    const gk = spells.find((s) => min >= s.from && min < s.to) || spells[0]
    if (gk) acc[gk.name] = (acc[gk.name] || 0) + 1
  }
  for (const s of spells) acc[s.name] ??= 0
}

async function generate(team, data) {
  const { key, prefix, comp } = team
  const photoDir = team.photoDir ?? `/players/${key}`
  const gkNames = new Set(data.players.filter((p) => p.role === 'Vratar').map((p) => p.name))

  // grbovi protivnika koji još nisu u src/data/crests.ts
  const logos = [
    ...data.standings.map((s) => [s.club, s.logo]),
    ...data.matches.flatMap((m) => [[m.home, m.homeLogo], [m.away, m.awayLogo]]),
  ]
  for (const [name, url] of logos) {
    if (!name || !url || name === BIB || knownCrests.has(name) || youthCrests[name]) continue
    const file = `/klubovi/${slug(name)}.${ext(url)}`
    if (await download(url, join(ROOT, 'public', file))) youthCrests[name] = file
  }

  const matches = [...data.matches].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  const idOf = (m) =>
    prefix === 'm' ? `m${String(matches.indexOf(m) + 1).padStart(2, '0')}` : `${prefix}-${String(m.round).padStart(2, '0')}`
  const conceded = {}
  const details = {}

  const matchLines = matches.map((m) => {
    const finished = !!m.url && m.homeScore !== null
    const status = finished ? 'finished' : m.date < TODAY ? 'postponed' : 'upcoming'
    const isHome = m.home === BIB
    const d = finished ? data.details[m.semaforId] : null
    const parts = [
      `id: ${q(idOf(m))}`,
      `date: ${q(m.date)}`,
      `time: ${q(m.time)}`,
      `home: ${q(m.home)}`,
      `away: ${q(m.away)}`,
      `homeScore: ${finished ? m.homeScore : null}`,
      `awayScore: ${finished ? m.awayScore : null}`,
      'competition: COMP',
      `round: ${m.round}`,
    ]
    if (d) parts.push(`venue: ${q(venueOf(d.venueLine))}`)
    else if (isHome) parts.push('venue: STADIUM')
    parts.push(`status: ${q(status)}`)

    if (d) {
      const sheet = (s) => ({
        team: s.team,
        starters: s.starters.map((p) => `${p.number} ${p.name}`),
        bench: s.bench.map((p) => `${p.number} ${p.name}`),
        coach: s.coach,
      })
      const goals = d.goals
        .map((g) => ({
          side: g.side,
          player: g.player + (g.kind.includes('own_goal') ? ' (autogol)' : g.kind.includes('penalty') ? ' (11 m)' : ''),
          minute: g.minute,
        }))
        .sort((a, b) => minuteNum(a.minute) - minuteNum(b.minute))
      const note = m.resultNote
        ? `Službeni rezultat ${m.homeScore}:${m.awayScore}${m.resultNote === 'BB' ? ' bez borbe (BB)' : ` (${m.resultNote})`}.`
        : undefined
      details[idOf(m)] = {
        id: idOf(m),
        round: m.round,
        venue: venueOf(d.venueLine),
        ...(d.attendance ? { attendance: d.attendance } : {}),
        referees: d.referees,
        ...(note ? { note } : {}),
        goals,
        events: [...sheetEvents(d.home, 'home'), ...sheetEvents(d.away, 'away')].sort(
          (a, b) => minuteNum(a.minute) - minuteNum(b.minute) || (a.side === 'home' ? -1 : 1),
        ),
        home: sheet(d.home),
        away: sheet(d.away),
      }
      concededBy(d, isHome, gkNames, conceded)
    }
    return `  { ${parts.join(', ')} },`
  })

  const standingLines = data.standings.map(
    (s) =>
      `  { position: ${s.position}, club: ${q(s.club)}, played: ${s.played}, won: ${s.won}, drawn: ${s.drawn}, lost: ${s.lost}, goalsFor: ${s.goalsFor}, goalsAgainst: ${s.goalsAgainst}, goalDiff: ${s.goalDiff}, points: ${s.points}${s.deduction ? `, deduction: ${s.deduction}` : ''} },`,
  )

  mkdirSync(join(ROOT, 'public', photoDir), { recursive: true })
  const players = []
  for (const p of data.players) {
    const gk = p.role === 'Vratar'
    const photo = await savePhoto(p.photo, `${photoDir}/${slug(p.name)}`)
    const parts = [
      `id: ${q(`${prefix === 'm' ? 'p' : prefix}-${slug(p.name)}`)}`,
      `number: ${p.number}`,
      `name: ${q(p.name)}`,
      `position: ${q(gk ? 'GK' : 'OUTFIELD')}`,
      `appearances: ${p.apps}`,
      `minutes: ${p.minutes}`,
      // Kod seniorskih vratara Semafor u stupcu "Pogotci" vodi primljene golove.
      `goals: ${gk && p.goals === conceded[p.name] ? 0 : p.goals}`,
    ]
    if (gk && conceded[p.name] !== undefined) parts.push(`goalsConceded: ${conceded[p.name]}`)
    parts.push(`yellowCards: ${p.yellow}`, `redCards: ${p.red}`)
    if (photo) parts.push(`photo: ${q(photo)}`)
    players.push({ gk, line: `  { ${parts.join(', ')} },` })
  }
  players.sort((a, b) => Number(b.gk) - Number(a.gk)) // vratari prvi

  // Treneri: iz zapisnika odigranih utakmica, najnoviji prvi, s brojem utakmica koje su vodili.
  const coaches = new Map()
  for (const m of [...matches].reverse()) {
    const d = data.details[m.semaforId]
    const sheet = d && (m.home === BIB ? d.home : d.away)
    if (!sheet?.coach) continue
    const c = coaches.get(sheet.coach) ?? { name: sheet.coach, matches: 0, photoUrl: sheet.coachPhoto }
    c.matches++
    coaches.set(sheet.coach, c)
  }
  const coachLines = []
  for (const c of coaches.values()) {
    const photo = await savePhoto(c.photoUrl, `${photoDir}/${slug(c.name)}`)
    coachLines.push(`  { name: ${q(c.name)}, matches: ${c.matches}${photo ? `, photo: ${q(photo)}` : ''} },`)
  }

  writeFileSync(
    join(ROOT, `src/data/teams/${key}.ts`),
    `// ${comp} 2026/27 — generirano skriptom scripts/semafor-sync.mjs (npm run sync)
// iz HNS Semafora (COMET), stanje ${TODAY}. Ne uređuj ručno: sljedeće pokretanje prepisuje datoteku.
import type { Coach, Match, MatchDetail, Player, StandingRow } from '../../types'

const STADIUM = 'Igralište Franka Lisice, Bibinje'
const COMP = ${q(comp)}

export const MATCHES: Match[] = [
${matchLines.join('\n')}
]

export const MATCH_DETAILS: Record<string, MatchDetail> = ${JSON.stringify(details, null, 2)}

export const STANDINGS: StandingRow[] = [
${standingLines.join('\n')}
]

export const SQUAD: Player[] = [
${players.map((p) => p.line).join('\n')}
]

export const COACHES: Coach[] = [
${coachLines.join('\n')}
]
`,
  )
  const bib = data.standings.find((s) => s.club === BIB)
  console.log(
    `${key.padEnd(15)} utakmica ${matches.length}, odigrano ${Object.keys(details).length}, igrača ${data.players.length}, trener: ${[...coaches.keys()].join(', ') || '—'}` +
      (bib ? `, ${bib.position}. mjesto (${bib.points} bod.)` : ''),
  )
}

// Sirovi podaci svake ekipe spremaju se u scripts/semafor-raw/<ekipa>.json.
//  - Zapisnici odigranih utakmica se ne mijenjaju, pa se sljedeći put ne dohvaćaju ponovo.
//  - `npm run sync -- --from-raw` ne dohvaća ništa, nego generira iz tih datoteka
//    (za kad Semafor blokira skriptu, a podaci se pročitaju u pregledniku — vidi semafor-browser.js).
const RAW_DIR = join(ROOT, 'scripts/semafor-raw')
const FROM_RAW = process.argv.includes('--from-raw')
const rawFile = (key) => join(RAW_DIR, `${key}.json`)
const readRaw = (key) => (existsSync(rawFile(key)) ? JSON.parse(readFileSync(rawFile(key), 'utf8')) : null)

// Grbovi koje su prijašnja pokretanja već preuzela ostaju (i kad se generira samo dio ekipa).
const prevCrests = join(ROOT, 'src/data/teams/crests.ts')
if (existsSync(prevCrests)) {
  for (const [, name, file] of readFileSync(prevCrests, 'utf8').matchAll(/^\s+"(.+?)":\s*"(.+?)"/gm)) {
    if (existsSync(join(ROOT, 'public', file))) youthCrests[name] = file
  }
}

mkdirSync(RAW_DIR, { recursive: true })
for (const team of TEAMS) {
  let data
  if (FROM_RAW) {
    data = readRaw(team.key)
    if (!data) {
      console.log(`${team.key.padEnd(15)} preskočeno (nema ${team.key}.json)`)
      continue
    }
  } else {
    data = await scrapeTeam(team.cid, readRaw(team.key)?.details ?? {})
    writeFileSync(rawFile(team.key), JSON.stringify(data, null, 1))
  }
  await generate(team, data)
}

writeFileSync(
  join(ROOT, 'src/data/teams/crests.ts'),
  `// Grbovi protivnika koji nisu u src/data/crests.ts — generirano skriptom scripts/semafor-sync.mjs.
export const YOUTH_CREST: Record<string, string> = ${JSON.stringify(youthCrests, null, 2)}
`,
)

// datum "ažurirano" na stranici
const clubFile = join(ROOT, 'src/data/club.ts')
writeFileSync(clubFile, readFileSync(clubFile, 'utf8').replace(/lastUpdated: '[\d-]+'/, `lastUpdated: '${TODAY}'`))
console.log(`Gotovo. Datum ažuriranja: ${TODAY}`)
