import {
  ShieldCheck,
  Zap,
  Users,
  Sparkles,
  Globe,
  Clock,
} from 'lucide-react'
import Button from './ui/Button.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import { features } from '../data/features.js'
import { motion } from 'motion/react'
import { scrollCardMotion, staggerContainer, staggerItem } from '../lib/scrollMotion.js'

const iconMap = {
  ShieldCheck,
  Zap,
  Users,
  Sparkles,
  Globe,
  Clock,
}

export default function Features() {
  return (
    <ParallaxSection
      id="features"
      className="border-t border-white/5 bg-[#050a18] px-4 py-20 sm:px-6 lg:px-8"
      strength={72}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={staggerItem} className="max-w-3xl">
            <SectionHeading
              eyebrow="Platform"
              title="Everything you need, all in"
              highlight="One place"
              className="max-w-3xl"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <Button variant="lime" className="shrink-0 px-6 py-2.5">
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = iconMap[f.icon] || Users
            return (
              <motion.article
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/20 backdrop-blur-sm hover:border-[rgb(var(--accent-rgb))] hover:shadow-xl"
                {...scrollCardMotion()}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb))]/20 text-[rgb(var(--accent-rgb))]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {f.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </ParallaxSection>
  )
}
