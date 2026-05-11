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
import ParallaxSection from './ui/ParallaxSection.jsx'
import { hiringPillars } from '../data/pillars.js'
import { scrollCardMotion, staggerContainer, staggerItem } from '../lib/scrollMotion.js'

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
    <ParallaxSection
      id="pillars"
      className="border-t border-white/5 bg-[#040814] px-4 py-20 sm:px-6 lg:px-8"
      strength={76}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={staggerItem}>
            <SectionHeading
              eyebrow="Core Capabilities"
              title="8 Pillars of Intelligent"
              highlight="Hiring"
            />
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="mt-4 text-sm text-slate-400 sm:text-base"
          >
            End-to-end autonomous recruitment powered by sovereign AI.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hiringPillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] || FileSearch
            return (
              <motion.article
                key={pillar.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg shadow-black/20 backdrop-blur-sm hover:border-[rgb(var(--accent-rgb))]/25 hover:shadow-xl"
                {...scrollCardMotion()}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--accent-rgb))]/20 text-[rgb(var(--accent-rgb))]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </div>
                <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {pillar.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </ParallaxSection>
  )
}
