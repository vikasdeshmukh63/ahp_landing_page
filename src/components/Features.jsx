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
import { features } from '../data/features.js'
import { motion } from 'motion/react'

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
    <section
      id="features"
      className="border-t border-ink/5 bg-cream px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Platform"
            title="Everything you need, all in"
            highlight="one place"
            className="max-w-3xl"
          />
          <Button
            variant="primary"
            className="shrink-0 bg-blue-500 px-6 py-2.5 hover:bg-blue-600"
          >
            Get Started
          </Button>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {features.map((f, index) => {
            const Icon = iconMap[f.icon] || Users
            return (
              <motion.article
                key={f.title}
                className="rounded-2xl border border-ink/5 bg-card p-6 shadow-sm hover:border-ink/10 hover:shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, delay: index * 0.02 }}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
