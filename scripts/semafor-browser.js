// Kad HNS Semafor (Cloudflare) blokira `npm run sync`, podaci se mogu pročitati u običnom
// pregledniku: otvori stranicu, u konzoli (F12) pokreni odgovarajuću funkciju i rezultat
// spremi u scripts/semafor-raw/<ekipa>.json, pa pokreni `npm run sync -- --from-raw`.
// Funkcije čitaju samo već otvorenu stranicu (isti selektori kao semafor-sync.mjs) i ništa ne dohvaćaju.

/** Stranica kluba za jedno natjecanje: https://semafor.hns.family/klubovi/213/nk-bibinje/?cid=<cid> */
// eslint-disable-next-line no-unused-vars
function semaforClubPage() {
  const t = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '')
  const num = (s) => (s === '-' || s === '' ? null : Number(s))
  const matches = [...document.querySelectorAll('.matchlist li.row')].map((li) => {
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
      resultNote: t(li.querySelector('.result')).replace(/^[\d-]+\s*:\s*[\d-]+/, '').trim(),
      url: li.querySelector('.result a')?.getAttribute('href') || null,
    }
  })
  const standings = [...document.querySelectorAll('.competition_table li.row')].map((li) => {
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
  const players = [...document.querySelectorAll('.playerslist.statsFull li.row')].map((li) => {
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
  return { matches, standings, players, details: {} }
}

/** Zapisnik jedne utakmice (poveznica „ZAPISNIK”); rezultat ide u details[semaforId]. */
// eslint-disable-next-line no-unused-vars
function semaforMatchPage() {
  const t = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '')
  const lines = document.querySelector('main').innerText.split('\n').map((s) => s.trim()).filter(Boolean)
  const venueLine = lines.find((l) => /\d{2}\.\d{2}\.\d{4}\.\s*\d{2}:\d{2}/.test(l)) || ''
  const sudLine = lines.find((l) => l.startsWith('Suci:')) || ''
  const attendance = (lines.find((l) => /gledatelj/i.test(l)) || '').match(/\d+/)?.[0]
  const goals = [...document.querySelectorAll('.events_main ul.events')].flatMap((ul, i) =>
    [...ul.querySelectorAll('li')].map((li) => ({
      side: i ? 'away' : 'home',
      player: t(li.querySelector('.playerName')),
      minute: t(li.querySelector('.event')),
      kind: li.querySelector('.event')?.getAttribute('class') || '',
    })),
  )
  const sheets = ['homeTeam', 'awayTeam'].map((c) => {
    const ul = document.querySelector(`.${c}.playerslist ul`)
    const r = { team: '', starters: [], bench: [], coach: '', coachPhoto: null }
    if (!ul) return r
    let sec = 'starters'
    for (const li of [...ul.children].filter((n) => n.tagName === 'LI')) {
      const cls = li.getAttribute('class') || ''
      if (cls.includes('clubName')) r.team = t(li)
      else if (cls.includes('separatorTitle')) sec = /Pri/.test(t(li)) ? 'bench' : 'coach'
      else if (cls.includes('match_lineup')) {
        const nm = t(li.querySelector('.playerName h3'))
        const events = [...li.querySelectorAll('.events li')].map((e) => `${e.getAttribute('class')}:${t(e)}`)
        if (sec === 'coach') {
          r.coach = nm
          r.coachPhoto = li.querySelector('.photo img')?.getAttribute('src') || null
        } else r[sec].push({ number: t(li.querySelector('.shirtNumber')), name: nm, events })
      }
    }
    return r
  })
  return {
    venueLine,
    referees: sudLine.replace('Suci:', '').replace(/\.$/, '').split(',').map((s) => s.trim()).filter(Boolean),
    attendance: attendance ? Number(attendance) : null,
    goals,
    home: sheets[0],
    away: sheets[1],
  }
}
