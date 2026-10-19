import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../../lib/asset'

/**
 * Standardno zaglavlje stranice (naslov + opcionalni podnaslov) s ulaznom animacijom.
 * Ako je zadan `bgImage`, prikazuje fotografiju kao pozadinu uz zeleni overlay.
 */
export default function PageHeader({
  title,
  subtitle,
  children,
  bgImage,
  imgPosition = 'center',
  tall = false,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
  bgImage?: string
  imgPosition?: string
  /** Više zaglavlje — za fotografije koje bi se u standardnoj visini previše izrezale. */
  tall?: boolean
}) {
  const hasImg = !!bgImage
  return (
    <div
      className="relative overflow-hidden border-b border-app"
      style={hasImg ? undefined : { backgroundColor: 'var(--surface)' }}
    >
      {hasImg && (
        <>
          <img
            src={asset(bgImage!)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: imgPosition }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(10,79,35,0.78), rgba(13,107,45,0.55) 55%, rgba(19,138,60,0.30))',
            }}
          />
        </>
      )}
      <div
        className={`relative mx-auto flex max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 ${
          hasImg ? `${tall ? 'min-h-[640px]' : 'min-h-[460px]'} text-white` : ''
        }`}
      >
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 72 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-1.5 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, var(--club-primary) 0 60%, var(--club-red) 60% 100%)',
          }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 font-display text-5xl font-extrabold uppercase tracking-tight sm:text-6xl ${
            hasImg ? 'text-white' : ''
          }`}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-3 max-w-2xl text-xl ${hasImg ? 'text-white/85' : 'text-muted'}`}
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}
