import { Calendar, MapPin, Trophy, Shield, Star, Flag } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import Crest from '../components/Crest'
import { CLUB } from '../data/club'

// Provjereni podaci (izvori: Općina Bibinje, Hrvatska Wikipedija, HNS Semafor).
const TIMELINE: { year: string; title: string; text: string; highlight?: boolean }[] = [
  {
    year: '1950.',
    title: 'Osnutak kluba',
    text: 'Službeni datum osnivanja je 10. rujna 1950. Nogometni korijeni u Bibinju sežu i ranije — sekcija FA Zadrugar djelovala je od 1948., a 1952. prerasla u NK Goran.',
  },
  {
    year: '1991.',
    title: 'Današnje ime',
    text: 'Klub mijenja ime u Nogometni klub Bibinje.',
  },
  {
    year: '1998./99.',
    title: '4. mjesto u 1. ŽNL',
    text: 'Zapažen plasman u Prvoj županijskoj nogometnoj ligi Zadarske županije.',
  },
  {
    year: '2007.',
    title: 'Finale Županijskog kupa',
    text: 'Nastup u finalu Kupa Nogometnog saveza Zadarske županije.',
  },
  {
    year: '2012./13.',
    title: 'Prvak 2. ŽNL Zadarske',
    text: 'Osvajanje naslova i plasman u viši rang natjecanja.',
  },
  {
    year: '2022./23.',
    title: 'Prvaci 1. ŽNL Zadarske',
    text: 'Prva prvenstvena titula u 1. ŽNL i jedan od najvećih uspjeha u povijesti kluba. Momčad trenera Vlade Mandića naslov je osigurala pobjedom 2:0 kod Sabunjara, uz čak devet bodova prednosti dva kola prije kraja.',
    highlight: true,
  },
  {
    year: '2026./27.',
    title: 'Natječe se u 1. ŽNL Zadarskoj',
    text: 'Klub i dalje nastupa u Prvoj županijskoj nogometnoj ligi Zadarske županije.',
  },
]

const HONOURS = [
  { icon: Trophy, title: 'Prvak 1. ŽNL Zadarske', year: '2022./23.' },
  { icon: Star, title: 'Prvak 2. ŽNL Zadarske', year: '2012./13.' },
  { icon: Flag, title: 'Finale Županijskog kupa', year: '2007.' },
]

const INFO = [
  { icon: Calendar, label: 'Osnovan', value: CLUB.founded },
  { icon: Shield, label: 'Stadion', value: CLUB.stadium },
  { icon: Trophy, label: 'Liga', value: CLUB.league },
  { icon: MapPin, label: 'Adresa', value: CLUB.address },
]

export default function About() {
  return (
    <div>
      <PageHeader
        title="O klubu"
        subtitle="Povijest, identitet i najveći uspjesi Nogometnog kluba Bibinje."
        bgImage="/slike/o-klubu.jpg?v=2"
        imgPosition="center 40%"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Uvod s grbom */}
        <Reveal className="mb-14 grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div
            className="grid place-items-center rounded-3xl p-8"
            style={{ background: 'linear-gradient(135deg, var(--club-primary-700), var(--club-primary))' }}
          >
            <Crest size={140} />
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase">
              {CLUB.fullName}
            </h2>
            <p className="text-muted mt-4 text-lg leading-relaxed">
              NK Bibinje nogometni je klub iz Bibinja kraj Zadra, osnovan{' '}
              {CLUB.founded} Klub okuplja igrače iz mjesta i okolice te se natječe
              u {CLUB.league}. Domaće utakmice igra na igralištu Franka Lisice,
              poznatom kao „Kobiljak". Najveći uspjeh ostvaren je u sezoni
              2022./23. osvajanjem prve prvenstvene titule.
            </p>
          </div>
        </Reveal>

        {/* Najveći uspjesi */}
        <Reveal className="mb-16">
          <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-extrabold uppercase">
            <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
            Najveći uspjesi
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {HONOURS.map((h) => (
              <div
                key={h.title}
                className="card-hover rounded-2xl border border-app p-6"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl text-white"
                  style={{ background: 'var(--club-primary)' }}
                >
                  <h.icon size={24} />
                </span>
                <div className="font-display mt-4 text-lg font-bold">{h.title}</div>
                <div className="text-muted mt-1 text-sm">{h.year}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-extrabold uppercase">
          <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
          Kroz povijest
        </h2>
        <div className="relative">
          <div
            className="absolute bottom-0 left-[7px] top-2 w-0.5 sm:left-[calc(7rem+7px)]"
            style={{ background: 'var(--border)' }}
          />
          <div className="space-y-6">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={Math.min(i * 0.05, 0.25)}>
                <div className="relative flex gap-5 sm:gap-6">
                  <div className="hidden w-28 shrink-0 pt-0.5 text-right sm:block">
                    <span className="font-display text-lg font-extrabold">{t.year}</span>
                  </div>
                  <div className="relative shrink-0">
                    <span
                      className="relative z-10 block h-4 w-4 rounded-full ring-4 ring-[color:var(--bg)]"
                      style={{
                        background: t.highlight ? 'var(--club-accent)' : 'var(--club-primary)',
                      }}
                    />
                  </div>
                  <div
                    className="flex-1 rounded-2xl border border-app p-5"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: t.highlight ? 'var(--club-primary)' : 'var(--border)',
                    }}
                  >
                    <div className="font-display text-lg font-bold sm:hidden">{t.year}</div>
                    <div className="font-display text-lg font-bold">{t.title}</div>
                    <p className="text-muted mt-1.5">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Informacije */}
        <Reveal className="mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INFO.map((it) => (
              <div
                key={it.label}
                className="rounded-2xl border border-app p-5"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-lg text-white"
                  style={{ background: 'var(--club-primary)' }}
                >
                  <it.icon size={20} />
                </span>
                <div className="text-muted mt-3 text-xs uppercase tracking-wider">{it.label}</div>
                <div className="font-display mt-1 font-bold">{it.value}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
