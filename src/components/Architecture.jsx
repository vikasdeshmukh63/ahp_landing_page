import SectionHeading from './ui/SectionHeading.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import { autonomousModules } from '../data/autonomousFlow.js'
import { motion } from 'motion/react'
import { scrollCardMotion, staggerContainer, staggerItem } from '../lib/scrollMotion.js'

export default function Architecture() {
  return (
    <ParallaxSection
      id="architecture"
      className="border-t border-white/5 bg-[#050a18] px-4 py-20 sm:px-6 lg:px-8"
      strength={64}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={staggerItem}>
            <SectionHeading
              eyebrow="Platform Architecture"
              title="Complete autonomous ATS flow"
              highlight="in 10 connected modules"
              className="max-w-4xl"
            />
          </motion.div>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {autonomousModules.map((module, index) => (
            <motion.article
              key={module.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg shadow-black/20 backdrop-blur-sm hover:border-[rgb(var(--accent-rgb))]/25 hover:shadow-xl"
              {...scrollCardMotion()}
              whileHover={{ y: -4 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--accent-rgb))]">
                Module {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug text-white">
                {module.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{module.summary}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}
