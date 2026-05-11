import {
  Brain,
  CalendarCheck2,
  Database,
  FileSearch,
  MessageSquare,
  Mic,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from './ui/SectionHeading.jsx'
import { hiringPillars } from '../data/pillars.js'

const iconMap = {
  FileSearch,
  ShieldCheck,
  Brain,
  Mic,
  MessageSquare,
  Users,
  CalendarCheck2,
  Database,
}

export default function Pillars() {
  return (
    <section
      id="pillars"
      className="border-t border-ink/5 bg-white px-4 py-20 sm:px-6 lg:px-8"
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
            eyebrow="Core Capabilities"
            title="8 Pillars of Intelligent"
            highlight="Hiring"
          />
          <p className="mt-4 text-sm text-muted sm:text-base">
            End-to-end autonomous recruitment powered by sovereign AI.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {hiringPillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] || FileSearch
            return (
              <motion.article
                key={pillar.title}
                className="rounded-2xl border border-blue-100 bg-cream p-5 shadow-sm hover:shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.42 }}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </div>
                <h3 className="text-base font-bold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
