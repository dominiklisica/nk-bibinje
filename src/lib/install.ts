// Instalacija aplikacije (PWA). Chrome/Edge/Samsung na Androidu (i računalu) šalju
// događaj `beforeinstallprompt` vrlo rano, pa ga hvatamo pri pokretanju (main.tsx)
// i čuvamo dok korisnik ne klikne "Instaliraj aplikaciju".

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: InstallPromptEvent | null = null
let installed = false
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

export function captureInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault() // ne prikazuj odmah traku preglednika — nudimo vlastiti gumb
    deferred = e as InstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    installed = true
    deferred = null
    notify()
  })
}

export function subscribeInstall(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

/** Aplikacija je već otvorena kao instalirana (s početnog zaslona). */
export const isStandalone = () =>
  installed ||
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true

export const canPromptInstall = () => deferred !== null

export const isIos = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) // iPad s "desktop" načinom

export type IosBrowser = 'safari' | 'chrome' | 'firefox' | 'edge' | 'inapp' | 'other'

/** Koji je preglednik na iPhoneu/iPadu (svi koriste Safarijev motor, ali imaju različite izbornike). */
export function iosBrowser(): IosBrowser {
  const ua = navigator.userAgent
  if (/FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|WhatsApp|GSA\//i.test(ua)) return 'inapp'
  if (/CriOS/i.test(ua)) return 'chrome'
  if (/FxiOS/i.test(ua)) return 'firefox'
  if (/EdgiOS/i.test(ua)) return 'edge'
  if (/Safari/i.test(ua) && /Version\//i.test(ua)) return 'safari'
  return 'other'
}

/** Od iOS-a 16.4 i Chrome, Firefox i Edge na iPhoneu mogu dodati stranicu na početni zaslon. */
export function iosSupportsOtherBrowsers(): boolean {
  const m = navigator.userAgent.match(/OS (\d+)_(\d+)/)
  if (!m) return true // iPad u "desktop" načinu ne javlja verziju — novi iPadOS
  const [major, minor] = [Number(m[1]), Number(m[2])]
  return major > 16 || (major === 16 && minor >= 4)
}

/** Otvara sistemski prozor za instalaciju; vraća je li korisnik prihvatio. */
export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false
  const e = deferred
  deferred = null
  notify()
  await e.prompt()
  const { outcome } = await e.userChoice
  return outcome === 'accepted'
}
