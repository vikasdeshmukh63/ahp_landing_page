import { Check } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import { processSteps } from '../data/process.js'
import { useAccentTheme } from '../context/AccentThemeContext.jsx'
import { autonomousStages } from '../data/autonomousFlow.js'
import { motion } from 'motion/react'
import { scrollCardMotion, staggerContainer, staggerItem } from '../lib/scrollMotion.js'

export default function Process() {
  const accent = useAccentTheme()

  return (
    <ParallaxSection
      id="process"
      className="border-t border-white/5 bg-[#040814] px-4 py-20 sm:px-6 lg:px-8"
      strength={80}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={staggerItem}>
            <SectionHeading
              eyebrow="How it works"
              title="From requisition to onboarding in a"
              highlight="single autonomous flow"
            />
          </motion.div>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {autonomousStages.map((stage, index) => (
            <motion.article
              key={stage.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
              {...scrollCardMotion()}
              whileHover={{ y: -4 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--accent-rgb))]">
                Stage {index + 1}
              </p>
              <h3 className="mt-1 text-sm font-bold text-white">{stage.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{stage.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="relative mt-16 space-y-16 lg:space-y-20">
          <div
            className="pointer-events-none absolute left-[15px] top-6 hidden h-[calc(100%-2rem)] w-px bg-white/10 md:block lg:left-[19px]"
            aria-hidden
          />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center lg:gap-16"
              {...scrollCardMotion()}
            >
              <div className="relative flex gap-6 md:gap-8">
                <div className="relative z-10 flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb))] text-sm font-bold text-[rgb(var(--accent-contrast-rgb))] shadow-sm ring-4 ring-[#040814]">
                    {step.id}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <span
                      className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0c1426] text-[rgb(var(--accent-rgb))] md:hidden"
                      aria-hidden
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  ) : null}
                </div>
                <div className="pb-2 pt-0.5">
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>

              <motion.div
                className="mx-auto w-full max-w-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={step.illustration[accent]}
                  alt={step.title}
                  className="h-full w-full rounded-2xl border border-[rgb(var(--accent-rgb))]/35 object-cover shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.12),0_20px_50px_-20px_rgba(0,0,0,0.5),0_0_40px_-12px_rgba(var(--accent-rgb),0.15)]"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}
