import SectionHeading from './ui/SectionHeading.jsx'
import { autonomousModules } from '../data/autonomousFlow.js'
import { motion } from 'motion/react'

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="border-t border-ink/5 bg-cream px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Platform Architecture"
            title="Complete autonomous ATS flow"
            highlight="in 10 connected modules"
            className="max-w-4xl"
          />
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {autonomousModules.map((module, index) => (
            <motion.article
              key={module.title}
              className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm hover:shadow-md"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: index * 0.01 }}
              whileHover={{ y: -4 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                Module {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug text-ink">
                {module.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{module.summary}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
