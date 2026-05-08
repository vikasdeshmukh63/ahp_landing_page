import SectionHeading from './ui/SectionHeading.jsx'
import { motion } from 'motion/react'

function RunnerAccent({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="78" cy="28" r="18" fill="#3B82F6" opacity="0.35" />
      <path
        d="M28 112 C44 72 52 52 72 44 C88 38 96 48 102 58 L108 72"
        stroke="#0E0E0E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="62" cy="34" r="10" fill="#0E0E0E" />
      <path
        d="M54 52 L68 58 L82 44"
        stroke="#0E0E0E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 68 L58 96 L44 118"
        stroke="#0E0E0E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M62 68 L78 88 L96 118"
        stroke="#0E0E0E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M102 58 L118 44"
        stroke="#C8F23A"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function FounderNote() {
  return (
    <section
      id="founder"
      className="border-t border-ink/5 bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="overflow-hidden rounded-3xl border border-ink/5 bg-card shadow-sm ring-1 ring-black/5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-0 lg:grid-cols-2">
            <motion.div
              className="relative min-h-[280px] bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 lg:min-h-[420px]"
              initial={{ scale: 1.04 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Crect fill=%22%23ffffff22%22 width=%2240%22 height=%2240%22/%3E%3C/svg%3E')]" />
              <div className="relative flex h-full flex-col justify-end p-8 lg:p-12">
                <div className="max-w-sm rounded-2xl bg-white/90 p-4 text-xs text-muted shadow-lg backdrop-blur">
                  <p className="font-semibold text-ink">Pixel HQ</p>
                  <p>Remote-first · Talent operations</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative p-8 lg:p-12"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <RunnerAccent className="pointer-events-none absolute -right-2 top-6 hidden h-32 w-28 lg:block" />
              <SectionHeading
                size="sm"
                eyebrow="Leadership"
                title="A note from"
                highlight="our founder"
                className="relative"
              />
              <blockquote className="relative mt-8 text-lg font-medium italic leading-relaxed text-ink md:text-xl">
                &ldquo;We built Pixel because hiring great people shouldn&apos;t
                feel like guesswork. Our job is to earn your trust with signal,
                speed, and support—every single hire.&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  JD
                </div>
                <div>
                  <p className="font-bold text-ink">John Doe</p>
                  <p className="text-sm text-muted">Founder &amp; CEO</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
