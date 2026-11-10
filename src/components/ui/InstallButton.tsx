import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Download, EllipsisVertical, Share, SquarePlus, X } from 'lucide-react'
import {
  canPromptInstall,
  iosBrowser,
  iosSupportsOtherBrowsers,
  isIos,
  isStandalone,
  promptInstall,
  subscribeInstall,
} from '../../lib/install'
import { asset } from '../../lib/asset'

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--club-primary)] font-display text-sm font-bold text-white">
        {n}
      </span>
      <span className="pt-0.5">{children}</span>
    </li>
  )
}

const ShareIcon = () => <Share size={16} className="inline -mt-1 text-[#0a84ff]" aria-label="ikona za dijeljenje" />
const AddHome = () => (
  <>
    <b>„Dodaj na početni zaslon”</b> <SquarePlus size={16} className="inline -mt-1" />
  </>
)

/** Kopira adresu stranice (za otvaranje iz Facebooka, Instagrama i sl. u pravom pregledniku). */
function CopyLink() {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard?.writeText(window.location.origin + import.meta.env.BASE_URL).then(() => {
          setDone(true)
          setTimeout(() => setDone(false), 2000)
        })
      }
      className="mt-1 rounded-lg border border-app px-3 py-1.5 text-xs font-semibold"
    >
      {done ? 'Poveznica kopirana ✓' : 'Kopiraj poveznicu stranice'}
    </button>
  )
}

/**
 * iPhone/iPad: Apple ne dopušta da stranica sama pokrene instalaciju, pa pokazujemo korake
 * za preglednik u kojem je stranica otvorena. Od iOS-a 16.4 radi u Safariju, Chromeu, Firefoxu i Edgeu.
 */
function IosSteps() {
  const browser = iosBrowser()
  const modern = iosSupportsOtherBrowsers()

  if (browser === 'inapp') {
    return (
      <ol className="mt-5 space-y-3 text-sm">
        <Step n={1}>
          Stranica je otvorena unutar druge aplikacije (npr. Facebook ili Instagram), odakle se ne može instalirati. Dodirni{' '}
          <b>⋯</b> ili <ShareIcon /> i odaberi <b>„Otvori u Safariju”</b> / „Otvori u pregledniku”.
          <br />
          <CopyLink />
        </Step>
        <Step n={2}>
          U pregledniku dodirni <ShareIcon /> i odaberi <AddHome />.
        </Step>
        <Step n={3}>
          Dodirni <b>„Dodaj”</b>.
        </Step>
      </ol>
    )
  }

  if (browser !== 'safari' && !modern) {
    return (
      <ol className="mt-5 space-y-3 text-sm">
        <Step n={1}>
          Na ovoj verziji iOS-a aplikaciju može dodati samo <b>Safari</b>. Kopiraj poveznicu i otvori je u Safariju.
          <br />
          <CopyLink />
        </Step>
        <Step n={2}>
          U Safariju dodirni <ShareIcon /> (dolje na sredini) i odaberi <AddHome />.
        </Step>
        <Step n={3}>
          Dodirni <b>„Dodaj”</b>. (Nakon ažuriranja na iOS 16.4 ili noviji radi i u Chromeu.)
        </Step>
      </ol>
    )
  }

  const shareStep: Record<Exclude<typeof browser, 'inapp'>, React.ReactNode> = {
    safari: (
      <>
        Dodirni gumb za dijeljenje <ShareIcon /> — dolje na sredini zaslona (na iPadu gore desno).
      </>
    ),
    chrome: (
      <>
        Dodirni gumb za dijeljenje <ShareIcon /> u adresnoj traci gore desno (ili izbornik <b>⋯</b> dolje desno → <b>„Dijeli”</b>).
      </>
    ),
    firefox: (
      <>
        Dodirni izbornik <b>≡</b> dolje desno, pa <b>„Dijeli”</b> <ShareIcon />.
      </>
    ),
    edge: (
      <>
        Dodirni izbornik <b>⋯</b> dolje na sredini, pa <b>„Dijeli”</b> <ShareIcon />.
      </>
    ),
    other: (
      <>
        Otvori izbornik preglednika i odaberi <b>„Dijeli”</b> <ShareIcon />.
      </>
    ),
  }

  return (
    <ol className="mt-5 space-y-3 text-sm">
      <Step n={1}>{shareStep[browser]}</Step>
      <Step n={2}>
        Pomakni se dolje i odaberi <AddHome />. Ako ga nema, dodirni „Uredi radnje” na dnu popisa i uključi ga.
      </Step>
      <Step n={3}>
        Dodirni <b>„Dodaj”</b> gore desno — ikona NK Bibinje pojavit će se na početnom zaslonu.
      </Step>
    </ol>
  )
}

/** Upute kad preglednik ne nudi izravnu instalaciju (iPhone/iPad, Firefox, aplikacije poput Facebooka). */
function InstallHelp({ onClose }: { onClose: () => void }) {
  const ios = isIos()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl border border-app p-6 shadow-2xl" style={{ backgroundColor: 'var(--surface)' }}>
        <button type="button" onClick={onClose} aria-label="Zatvori" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-app">
          <X size={16} />
        </button>
        <div className="flex items-center gap-3 pr-10">
          <img src={asset('/icons/icon-192.png')} alt="" className="h-12 w-12 rounded-xl" />
          <div>
            <h2 id="install-title" className="font-display text-xl font-extrabold uppercase">Instaliraj aplikaciju</h2>
            <p className="text-muted text-sm">NK Bibinje na početnom zaslonu mobitela</p>
          </div>
        </div>

        {ios ? (
          <IosSteps />
        ) : (
          <ol className="mt-5 space-y-3 text-sm">
            <Step n={1}>
              Stranicu otvori u <b>Chromeu</b> (ako si došao iz Facebooka ili poruke, prvo odaberi „Otvori u pregledniku”).
            </Step>
            <Step n={2}>
              Dodirni tri točkice <EllipsisVertical size={16} className="inline -mt-1" /> gore desno.
            </Step>
            <Step n={3}>
              Odaberi <b>„Instaliraj aplikaciju”</b> ili <b>„Dodaj na početni zaslon”</b> i potvrdi.
            </Step>
            <Step n={4}>
              Na <b>Samsung Internetu</b>: izbornik ≡ dolje desno → „Dodaj stranicu u” → „Početni zaslon”.
            </Step>
          </ol>
        )}
      </div>
    </div>,
    document.body,
  )
}

/**
 * Gumb "Instaliraj aplikaciju". Gdje preglednik dopušta (Android, računalo) otvara
 * sistemsku instalaciju; inače prikazuje upute. Skriven ako je aplikacija već instalirana.
 */
export default function InstallButton({ variant = 'nav' }: { variant?: 'nav' | 'hero' }) {
  const canPrompt = useSyncExternalStore(subscribeInstall, canPromptInstall, () => false)
  const standalone = useSyncExternalStore(subscribeInstall, isStandalone, () => false)
  const [help, setHelp] = useState(false)

  if (standalone) return null

  const onClick = async () => {
    if (canPrompt) await promptInstall()
    else setHelp(true)
  }

  return (
    <>
      {variant === 'hero' ? (
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--club-red)] px-6 py-3 font-display font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
        >
          <Download size={18} /> Instaliraj aplikaciju
        </button>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label="Instaliraj aplikaciju"
          className="tile-hover inline-flex h-10 items-center gap-1.5 rounded-lg border border-app px-3 font-display text-sm font-bold uppercase tracking-wide hover:text-[var(--club-primary)]"
        >
          <Download size={17} />
          {/* Samo ikona na najužim mobitelima i na širokom ekranu (da stane uz cijeli izbornik). */}
          <span className="hidden min-[400px]:inline xl:hidden">Aplikacija</span>
        </button>
      )}
      {help && <InstallHelp onClose={() => setHelp(false)} />}
    </>
  )
}
