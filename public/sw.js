// Service worker aplikacije NK Bibinje.
// - stranice (navigacija): prvo mreža, a bez interneta zadnja spremljena verzija
// - skripte/stilovi s hashom u nazivu (assets/): iz predmemorije, jer se nikad ne mijenjaju
// - slike (igrači, grbovi, fotografije): odmah iz predmemorije, a u pozadini se osvježe
// Povećaj VERSION kad se promijeni ovaj način spremanja.
const VERSION = 'v1'
const PAGES = `nkb-pages-${VERSION}`
const ASSETS = `nkb-assets-${VERSION}`
const IMAGES = `nkb-images-${VERSION}`
const SCOPE = new URL(self.registration.scope).pathname // npr. "/" ili "/lisica/nk_bibinje/"

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(PAGES).then((c) => c.add(SCOPE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  const keep = new Set([PAGES, ASSETS, IMAGES])
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('nkb-') && !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return
  const path = url.pathname.slice(SCOPE.length)
  if (path.startsWith('admin')) return // CMS ide uvijek na mrežu

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(PAGES).then((c) => c.put(SCOPE, copy))
          return res
        })
        .catch(() => caches.match(SCOPE)),
    )
    return
  }

  if (path.startsWith('assets/')) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone()
              caches.open(ASSETS).then((c) => c.put(req, copy))
            }
            return res
          }),
      ),
    )
    return
  }

  if (/\.(png|jpe?g|webp|svg)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGES).then((cache) =>
        cache.match(req).then((hit) => {
          const fresh = fetch(req)
            .then((res) => {
              if (res.ok) cache.put(req, res.clone())
              return res
            })
            .catch(() => hit)
          return hit || fresh
        }),
      ),
    )
  }
})
