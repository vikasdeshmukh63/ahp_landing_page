import SectionHeading from './ui/SectionHeading.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import { motion } from 'motion/react'
import { staggerContainer, staggerItem } from '../lib/scrollMotion.js'

function RunnerAccent({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="78" cy="28" r="18" fill="rgb(var(--accent-rgb))" opacity="0.25" />
      <path
        d="M28 112 C44 72 52 52 72 44 C88 38 96 48 102 58 L108 72"
        stroke="#94a3b8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="62" cy="34" r="10" fill="#e2e8f0" />
      <path
        d="M54 52 L68 58 L82 44"
        stroke="#040814"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 68 L58 96 L44 118"
        stroke="#94a3b8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M62 68 L78 88 L96 118"
        stroke="#94a3b8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M102 58 L118 44"
        stroke="rgb(var(--accent-rgb))"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function FounderNote() {
  return (
    <ParallaxSection
      id="founder"
      className="border-t border-white/5 bg-[#050a18] px-4 py-20 sm:px-6 lg:px-8"
      strength={62}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="overflow-hidden rounded-3xl border border-white/10 bg-[#040814] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-0 lg:grid-cols-2">
            <motion.div
              className="relative min-h-[280px] bg-gradient-to-br from-[#0c1426] via-[#111f3a] to-[#040814] lg:min-h-[420px]"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Crect fill=%22%23ffffff08%22 width=%2240%22 height=%2240%22/%3E%3C/svg%3E')]" />
              <div className="relative flex h-full flex-col justify-end p-8 lg:p-12">
                <motion.div
                  className="max-w-sm rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-xs text-slate-400 shadow-lg backdrop-blur-md"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                >
                  <p className="font-semibold text-white">Pixel HQ</p>
                  <p>Remote-first · Talent operations</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative p-8 lg:p-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <RunnerAccent className="pointer-events-none absolute -right-2 top-6 hidden h-32 w-28 lg:block" />
              <motion.div variants={staggerItem}>
                <SectionHeading
                  size="sm"
                  eyebrow="Leadership"
                  title="A note from"
                  highlight="our founder"
                  className="relative"
                />
              </motion.div>
              <motion.blockquote
                variants={staggerItem}
                className="relative mt-8 text-lg font-medium italic leading-relaxed text-slate-200 md:text-xl"
              >
                &ldquo;We built Pixel because hiring great people shouldn&apos;t
                feel like guesswork. Our job is to earn your trust with signal,
                speed, and support—every single hire.&rdquo;
              </motion.blockquote>
              <motion.div variants={staggerItem} className="mt-10 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb))] text-sm font-bold text-[rgb(var(--accent-contrast-rgb))]">
                  JD
                </div>
                <div>
                  <p className="font-bold text-white">John Doe</p>
                  <p className="text-sm text-slate-400">Founder &amp; CEO</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
