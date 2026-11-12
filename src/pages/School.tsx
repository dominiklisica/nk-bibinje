import { Link } from 'react-router-dom'
import { CalendarDays, ClipboardCheck, Clock, Mail, MapPin, QrCode, ShieldCheck, Trophy, UserPlus, Users } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import PlayerPhoto from '../components/ui/PlayerPhoto'
import { TEAMS, type Team } from '../data/teams'
import { SCHOOL_GROUPS, SCHOOL_NOTES, TRAINING_VENUE } from '../data/school'
import { MONTHLY_FEE } from '../data/payments'
import { CLUB } from '../data/club'
import { MEMBERSHIP_ENABLED } from '../lib/features'
import { formatEur } from '../lib/hub3'

const YOUTH = TEAMS.filter((t) => SCHOOL_GROUPS[t.key])
const uniqueCoaches = new Set(YOUTH.flatMap((t) => t.coaches.map((c) => c.name)))
const youthPlayers = YOUTH.reduce((n, t) => n + t.squad.length, 0)
const joinLink = MEMBERSHIP_ENABLED ? '/clanarina' : '/kontakt'

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border border-app p-5 text-center" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="font-display text-4xl font-extrabold text-[var(--club-primary)]">{value}</div>
      <div className="text-muted mt-1 text-sm">{label}</div>
    </div>
  )
}

function GroupCard({ team }: { team: Team }) {
  const g = SCHOOL_GROUPS[team.key]!
  const fee = MONTHLY_FEE[team.key]
  return (
    <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-app" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="px-5 py-4 text-white" style={{ background: 'linear-gradient(135deg, var(--club-primary-700), var(--club-primary))' }}>
        <h3 className="font-display text-2xl font-extrabold uppercase leading-tight">{team.label}</h3>
        <p className="text-sm text-white/80">{team.league}</p>
      </div>
      <dl className="flex-1 space-y-3 p-5 text-sm">
        <div className="flex gap-3">
          <CalendarDays size={18} className="mt-0.5 shrink-0 text-[var(--club-primary)]" />
          <div>
            <dt className="text-muted text-xs uppercase tracking-wide">Godišta</dt>
            <dd className="font-semibold">{g.birthYears ?? 'Javite se klubu'}</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock size={18} className="mt-0.5 shrink-0 text-[var(--club-primary)]" />
          <div>
            <dt className="text-muted text-xs uppercase tracking-wide">Treninzi</dt>
            {g.training.length ? (
              g.training.map((t) => (
                <dd key={t} className="font-semibold">
                  {t}
                </dd>
              ))
            ) : (
              <dd className="font-semibold">Termine doznajte od trenera</dd>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <Users size={18} className="mt-0.5 shrink-0 text-[var(--club-primary)]" />
          <div>
            <dt className="text-muted text-xs uppercase tracking-wide">Igrača u sezoni</dt>
            <dd className="font-semibold">{team.squad.length}</dd>
          </div>
        </div>
        {fee != null && (
          <div className="flex gap-3">
            <QrCode size={18} className="mt-0.5 shrink-0 text-[var(--club-primary)]" />
            <div>
              <dt className="text-muted text-xs uppercase tracking-wide">Članarina</dt>
              <dd className="font-semibold">{formatEur(fee)} mjesečno</dd>
            </div>
          </div>
        )}
        {team.coaches.length > 0 && (
          <div>
            <dt className="text-muted mb-2 text-xs uppercase tracking-wide">{team.coaches.length > 1 ? 'Treneri' : 'Trener'}</dt>
            <dd className="flex flex-wrap gap-3">
              {team.coaches.map((c) => (
                <span key={c.name} className="flex items-center gap-2">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[var(--club-primary)] text-xs font-bold text-white">
                    {c.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                    <PlayerPhoto player={c} />
                  </span>
                  <span className="font-semibold">{c.name}</span>
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
      <div className="flex border-t border-app text-sm font-semibold">
        <Link to={`/utakmice?ekipa=${team.key}`} className="row-hover flex-1 px-4 py-3 text-center">
          Utakmice
        </Link>
        <Link to={`/momcad?ekipa=${team.key}`} className="row-hover flex-1 border-l border-app px-4 py-3 text-center">
          Momčad
        </Link>
        <Link to={`/tablica?ekipa=${team.key}`} className="row-hover flex-1 border-l border-app px-4 py-3 text-center">
          Tablica
        </Link>
      </div>
    </article>
  )
}

const STEPS = MEMBERSHIP_ENABLED
  ? [
      { icon: UserPlus, title: 'Prijavite dijete', text: 'Na stranici Članarina upišite ime i prezime djeteta, svoje ime i e-mail. Na e-mail stiže poveznica za prijavu.' },
      { icon: ClipboardCheck, title: 'Klub potvrđuje upis', text: 'Tajnik kluba potvrdi prijavu i svrsta dijete u odgovarajući uzrast. Trener vam javlja termin prvog treninga.' },
      { icon: QrCode, title: 'Članarina barkodom', text: 'U aplikaciji vidite plaćene i neplaćene mjesece, a članarinu plaćate skeniranjem barkoda u mobilnoj banci.' },
    ]
  : [
      { icon: Mail, title: 'Javite se klubu', text: 'Pošaljite upit preko stranice Kontakt s imenom i godištem djeteta.' },
      { icon: ClipboardCheck, title: 'Klub vam se javlja', text: 'Dogovorit ćemo uzrast i termin prvog treninga.' },
    ]

export default function School() {
  return (
    <div>
      <PageHeader
        title="Škola nogometa"
        subtitle="Mlađi uzrasti NK Bibinje — od prvih koraka s loptom do pionirskih liga."
        bgImage="/slike/galerija/druzenje-uz-svlacionicu.webp?v=1"
        imgPosition="center 45%"
      />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6">
        <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase">Igraj za svoje mjesto</h2>
            <p className="text-muted mt-3 text-lg leading-relaxed">
              {CLUB.fullName} od {CLUB.foundedYear}. okuplja djecu iz Bibinja i okolice. Mlađi uzrasti natječu se u
              međužupanijskim ligama (MŽNL), a svaka utakmica, strijelac i rezultat vidljivi su ovdje na
              stranici i u aplikaciji.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={joinLink}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--club-primary)] px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-white"
              >
                <UserPlus size={20} /> Upiši dijete
              </Link>
              <Link to="/kontakt" className="tile-hover inline-flex items-center gap-2 rounded-xl border border-app px-6 py-3 font-semibold">
                <Mail size={18} /> Pitajte klub
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Stat value={YOUTH.length} label="uzrasta" />
            <Stat value={youthPlayers} label="mladih igrača" />
            <Stat value={uniqueCoaches.size} label={uniqueCoaches.size === 1 ? 'trener' : 'trenera'} />
          </div>
        </Reveal>

        <section>
          <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
            <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
            Uzrasti
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {YOUTH.map((t, i) => (
              <Reveal key={t.key} delay={Math.min(i * 0.06, 0.24)} className="h-full">
                <GroupCard team={t} />
              </Reveal>
            ))}
          </div>
          <p className="text-muted mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Trophy size={15} /> Natjecanja i treneri prema službenim zapisnicima HNS-a
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {TRAINING_VENUE ? `Treninzi: ${TRAINING_VENUE}` : `Domaće utakmice: ${CLUB.stadium}`}
            </span>
          </p>
        </section>

        <section>
          <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight">
            <span className="h-1 w-8 rounded-full" style={{ background: 'var(--club-primary)' }} />
            Kako upisati dijete
          </h2>
          <ol className={`grid gap-5 ${STEPS.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <li className="relative h-full rounded-2xl border border-app p-6" style={{ backgroundColor: 'var(--surface)' }}>
                  <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-[var(--club-primary)] opacity-15">
                    {i + 1}
                  </span>
                  <s.icon size={26} className="text-[var(--club-primary)]" />
                  <h3 className="mt-3 font-display text-xl font-bold uppercase">{s.title}</h3>
                  <p className="text-muted mt-2 leading-relaxed">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          {SCHOOL_NOTES.length > 0 && (
            <ul className="mt-5 space-y-1.5">
              {SCHOOL_NOTES.map((n) => (
                <li key={n} className="flex gap-2">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--club-primary)]" /> {n}
                </li>
              ))}
            </ul>
          )}
        </section>

        <Reveal>
          <section
            className="flex flex-col items-start gap-5 rounded-3xl p-8 text-white sm:flex-row sm:items-center sm:justify-between"
            style={{ background: 'linear-gradient(135deg, var(--club-primary-700), var(--club-primary))' }}
          >
            <div>
              <h2 className="font-display text-3xl font-extrabold uppercase">Postani dio zeleno-bijele obitelji</h2>
              <p className="mt-1 text-white/85">Prijava traje minutu, a klub vam se javlja s terminom prvog treninga.</p>
            </div>
            <Link
              to={joinLink}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-[var(--club-primary-700)]"
            >
              <UserPlus size={20} /> Upiši dijete
            </Link>
          </section>
        </Reveal>
      </div>
    </div>
  )
}
