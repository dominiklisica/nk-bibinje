import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { GALLERY, GALLERY_SOURCE } from '../data/gallery'

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const photo = GALLERY[index]

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Zatvori"
      >
        <X size={22} />
      </button>
      <button
        className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Prethodna"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Sljedeća"
      >
        <ChevronRight size={26} />
      </button>

      <motion.img
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-5 left-0 right-0 text-center text-sm text-white/80">
        {photo.alt} · {index + 1} / {GALLERY.length}
      </div>
    </motion.div>,
    document.body,
  )
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    [],
  )
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    [],
  )

  return (
    <div>
      <PageHeader
        title="Galerija"
        subtitle="Fotografije utakmica, slavlja i atmosfere NK Bibinje."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {GALLERY.map((photo, i) => (
            <Reveal key={photo.src} delay={Math.min((i % 3) * 0.06, 0.18)}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-app"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
                  <ZoomIn size={30} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="text-muted mt-6 text-sm">
          Izvor fotografija: službena Facebook stranica NK Bibinje. Dodatne
          fotografije mogu se dodati kroz administratorsko sučelje.{' '}
          <a
            href={GALLERY_SOURCE}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--club-primary)] hover:underline"
          >
            Posjeti stranicu
          </a>
          .
        </p>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onClose={() => setOpen(null)} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </div>
  )
}
