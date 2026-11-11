import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { CLUB } from '../data/club'

// Izjava o privatnosti — tekst provjeriti s klubom prije službene upotrebe.
const UPDATED = '11. 11. 2026.'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-app p-5 sm:p-6" style={{ backgroundColor: 'var(--surface)' }}>
      <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">{children}</div>
    </section>
  )
}

export default function Privacy() {
  return (
    <div>
      <PageHeader title="Privatnost" subtitle="Koje podatke klub čuva, zašto i tko ih vidi." />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-10 sm:px-6">
        <p className="text-muted text-sm">Zadnja izmjena: {UPDATED}</p>

        <Section title="Tko je odgovoran">
          <p>
            Za podatke na ovoj stranici i u aplikaciji odgovoran je {CLUB.fullName}, {CLUB.address}. Za sva pitanja o
            vašim podacima javite se klubu putem stranice <Link to="/kontakt" className="underline">Kontakt</Link>.
          </p>
        </Section>

        <Section title="Članarina">
          <p>Da bi roditelji mogli vidjeti i platiti članarinu, klub vodi evidenciju:</p>
          <ul>
            <li>ime, prezime, godište i ekipa djeteta te članski broj,</li>
            <li>e-mail adresa roditelja (s njom se roditelj prijavljuje),</li>
            <li>uplate članarine: mjesec, iznos, datum i način uplate (izvod iz banke ili gotovina).</li>
          </ul>
          <p>
            Podatke koristimo samo za vođenje članstva i članarina. Roditelj vidi isključivo svoje dijete, a cijelu
            evidenciju vide samo ovlaštene osobe kluba (tajnik i blagajnik). Podatke ne dajemo nikome drugome i ne
            koristimo ih za oglašavanje.
          </p>
          <p>
            Kad dijete prestane biti član, podatke brišemo, osim evidencije uplata koju klub mora čuvati onoliko koliko
            nalažu propisi o računovodstvu.
          </p>
        </Section>

        <Section title="Donacije">
          <p>
            Uz donaciju klub bilježi datum, iznos i, ako je naveden na uplati, ime donatora. Barkod za uplatu izrađuje
            se u vašem pregledniku, a sama uplata ide preko vaše banke.
          </p>
        </Section>

        <Section title="Kontakt obrazac">
          <p>
            Ime, e-mail, telefon i poruka iz obrasca šalju se e-poštom klubu (preko usluge Web3Forms) samo radi
            odgovora na vaš upit i ne spremaju se na ovoj stranici.
          </p>
        </Section>

        <Section title="Gdje se podaci čuvaju">
          <ul>
            <li>Evidencija članova i uplata: Supabase, poslužitelj u Frankfurtu (EU).</li>
            <li>E-mailovi za prijavu: Brevo (EU).</li>
          </ul>
          <p>
            Stranica ne koristi kolačiće za praćenje ni oglašavanje. U pregledniku se pamte samo odabrana ekipa i,
            nakon prijave, podatak da ste prijavljeni.
          </p>
        </Section>

        <Section title="Vaša prava">
          <p>
            Možete zatražiti uvid u podatke o sebi i svom djetetu, njihov ispravak ili brisanje. Zahtjev pošaljite
            klubu putem stranice <Link to="/kontakt" className="underline">Kontakt</Link>. Ako smatrate da se vašim
            podacima ne postupa ispravno, možete podnijeti prigovor Agenciji za zaštitu osobnih podataka (azop.hr).
          </p>
        </Section>
      </div>
    </div>
  )
}
