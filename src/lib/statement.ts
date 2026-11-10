// Učitavanje izvoda iz banke: ISO 20022 camt.053 (XML) ili CSV iz internet bankarstva.
// Iz svake uplate (priljeva) uzimamo datum, iznos, platitelja, poziv na broj i opis.

import { DONATION_DESCRIPTION } from '../data/payments'
import type { Member } from './backend/types'
import { parseReference } from './membership'

export interface StatementLine {
  date: string // 'GGGG-MM-DD'
  amount: number
  payer: string
  reference: string
  description: string
  /** Jedinstveni ključ retka izvoda — sprječava dvostruki uvoz istog izvoda. */
  key: string
}

export type MatchedLine =
  | { kind: 'membership'; line: StatementLine; member: Member; period: string }
  | { kind: 'donation'; line: StatementLine }
  | { kind: 'unknown'; line: StatementLine; reason: string }

const text = (el: Element | null | undefined) => el?.textContent?.trim() ?? ''
const first = (root: Element, ...sel: string[]) => {
  for (const s of sel) {
    const el = root.getElementsByTagName(s)[0]
    if (el) return text(el)
  }
  return ''
}

function lineKey(l: Omit<StatementLine, 'key'>, extra = '') {
  return [l.date, l.amount.toFixed(2), l.payer, l.reference, l.description, extra].join('|').slice(0, 300)
}

/** camt.053: samo priljevi (CdtDbtInd = CRDT). */
export function parseCamt053(xml: string): StatementLine[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml')
  if (doc.getElementsByTagName('parsererror').length) throw new Error('Datoteka nije ispravan XML izvod.')
  const out: StatementLine[] = []
  for (const ntry of Array.from(doc.getElementsByTagName('Ntry'))) {
    if (first(ntry, 'CdtDbtInd') !== 'CRDT') continue
    const amount = Number(first(ntry, 'Amt').replace(',', '.'))
    const date = (first(ntry, 'BookgDt') || first(ntry, 'ValDt')).slice(0, 10)
    const txs = Array.from(ntry.getElementsByTagName('TxDtls'))
    const parts = txs.length ? txs : [ntry]
    parts.forEach((tx, i) => {
      const txAmt = txs.length > 1 ? Number(first(tx, 'Amt').replace(',', '.')) || amount : amount
      const dbtr = tx.getElementsByTagName('Dbtr')[0]
      const base = {
        date,
        amount: txAmt,
        payer: dbtr ? first(dbtr, 'Nm') : '',
        reference: first(tx, 'Ref', 'CdtrRef'),
        description: Array.from(tx.getElementsByTagName('Ustrd')).map(text).join(' '),
      }
      out.push({ ...base, key: lineKey(base, first(ntry, 'AcctSvcrRef', 'NtryRef') + `#${i}`) })
    })
  }
  return out
}

/** CSV: razdjelnik ; ili , ; stupci se prepoznaju po nazivu u zaglavlju. */
export function parseCsv(csv: string): StatementLine[] {
  const rows = csv.replace(/^﻿/, '').split(/\r?\n/).filter((r) => r.trim())
  if (rows.length < 2) throw new Error('CSV nema redaka s uplatama.')
  const delim = (rows[0].match(/;/g) ?? []).length >= (rows[0].match(/,/g) ?? []).length ? ';' : ','
  const split = (r: string) => {
    const cells: string[] = []
    let cur = ''
    let q = false
    for (const ch of r) {
      if (ch === '"') q = !q
      else if (ch === delim && !q) {
        cells.push(cur)
        cur = ''
      } else cur += ch
    }
    cells.push(cur)
    return cells.map((c) => c.trim())
  }
  const head = split(rows[0]).map((h) => h.toLowerCase())
  const col = (...names: string[]) => head.findIndex((h) => names.some((n) => h.includes(n)))
  const iDate = col('datum', 'date', 'valuta')
  const iCredit = col('priljev', 'uplata', 'potražuje', 'potrazuje', 'credit', 'odobrenje')
  const iAmount = iCredit >= 0 ? iCredit : col('iznos', 'amount')
  const iPayer = col('platitelj', 'naziv', 'nalogodavatelj', 'payer', 'name')
  const iRef = col('poziv', 'referenc', 'reference')
  const iDesc = col('opis', 'svrha', 'description', 'detalji')
  if (iDate < 0 || iAmount < 0) throw new Error('U CSV-u nisu pronađeni stupci za datum i iznos.')

  const toNum = (s: string) => {
    const t = s.replace(/[^\d,.-]/g, '')
    const norm = t.includes(',') && t.lastIndexOf(',') > t.lastIndexOf('.') ? t.replace(/\./g, '').replace(',', '.') : t.replace(/,/g, '')
    return Number(norm)
  }
  const toDate = (s: string) => {
    const m = s.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
    if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
    return s.slice(0, 10)
  }

  const out: StatementLine[] = []
  rows.slice(1).forEach((r, n) => {
    const c = split(r)
    const amount = toNum(c[iAmount] ?? '')
    if (!(amount > 0)) return // samo priljevi
    const base = {
      date: toDate(c[iDate] ?? ''),
      amount,
      payer: iPayer >= 0 ? c[iPayer] ?? '' : '',
      reference: iRef >= 0 ? c[iRef] ?? '' : '',
      description: iDesc >= 0 ? c[iDesc] ?? '' : '',
    }
    out.push({ ...base, key: lineKey(base, `r${n}`) })
  })
  return out
}

export function parseStatement(fileName: string, content: string): StatementLine[] {
  return /\.xml$/i.test(fileName) || content.trimStart().startsWith('<') ? parseCamt053(content) : parseCsv(content)
}

/** Uparivanje: poziv na broj → član i mjesec; opis s "donacij" → donacija; ostalo ručno. */
export function matchLines(lines: StatementLine[], members: Member[]): MatchedLine[] {
  const byNo = new Map(members.map((m) => [m.member_no, m]))
  const donationWord = DONATION_DESCRIPTION.toLowerCase().split(' ')[0].slice(0, 6) // "donaci"
  return lines.map((line) => {
    const ref = parseReference(`${line.reference} ${line.description}`)
    if (ref) {
      const member = byNo.get(ref.memberNo)
      if (member) return { kind: 'membership', line, member, period: ref.period }
      return { kind: 'unknown', line, reason: `Nepoznat broj člana ${ref.memberNo}` }
    }
    if (`${line.description} ${line.reference}`.toLowerCase().includes(donationWord)) return { kind: 'donation', line }
    return { kind: 'unknown', line, reason: 'Nema poziva na broj članarine' }
  })
}
