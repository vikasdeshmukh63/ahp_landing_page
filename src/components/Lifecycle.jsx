import {
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  Mic,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from './ui/SectionHeading.jsx'
import { candidateLifecycleSteps } from '../data/lifecycle.js'

const iconMap = {
  Upload,
  ShieldCheck,
  ClipboardCheck,
  Mic,
  BarChart3,
  Users,
  BadgeCheck,
}

export default function Lifecycle() {
  return (
    <section
      id="lifecycle"
      className="border-t border-ink/5 bg-cream px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Complete Visibility"
            title="7-Step Candidate"
            highlight="Lifecycle"
          />
          <p className="mt-4 text-sm text-muted sm:text-base">
            Track every candidate from application to onboarding, visible to all stakeholders.
          </p>
        </motion.div>

        <motion.div
          className="relative mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-8 hidden md:block" aria-hidden>
            <svg viewBox="0 0 1200 2" className="h-[2px] w-full overflow-visible" preserveAspectRatio="none">
              <line
                x1="20"
                y1="1"
                x2="1180"
                y2="1"
                stroke="#bfdbfe"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.line
                x1="20"
                y1="1"
                x2="1180"
                y2="1"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="12 14"
                initial={{ strokeDashoffset: 26 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
              />
            </svg>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {candidateLifecycleSteps.map((step) => {
              const Icon = iconMap[step.icon] || Upload

              return (
                <motion.article
                  key={step.title}
                  className="relative z-10 text-center"
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-500 shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 text-xs text-muted">{step.subtitle}</p>
                </motion.article>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
