import { Check } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import { processSteps } from '../data/process.js'
import { autonomousStages } from '../data/autonomousFlow.js'
import { motion } from 'motion/react'

function StepIllustration({ accent }) {
  const stroke = 'currentColor'
  const accentColor = '#3B82F6'
  const common = 'h-full w-full text-ink/80'

  if (accent === 'define') {
    return (
      <svg viewBox="0 0 320 220" className={common} aria-hidden>
        <rect
          x="40"
          y="36"
          width="240"
          height="150"
          rx="16"
          fill="#FBF8F0"
          stroke={stroke}
          strokeWidth="1.5"
        />
        <rect x="64" y="64" width="120" height="10" rx="4" fill="#E7E5E4" />
        <rect x="64" y="88" width="180" height="8" rx="3" fill="#E7E5E4" />
        <rect x="64" y="108" width="160" height="8" rx="3" fill="#E7E5E4" />
        <circle cx="248" cy="118" r="28" fill={accentColor} opacity="0.35" />
        <path
          d="M236 118 L244 126 L262 108"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
        />
      </svg>
    )
  }

  if (accent === 'vet') {
    return (
      <svg viewBox="0 0 320 220" className={common} aria-hidden>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${72 + i * 72}, 56)`}>
            <circle r="28" fill="#F5F1E8" stroke={stroke} strokeWidth="1.5" />
            <circle r="12" fill="#D6D3D1" />
            <rect x="-18" y="36" width="36" height="8" rx="3" fill="#E7E5E4" />
          </g>
        ))}
        <rect
          x="48"
          y="140"
          width="224"
          height="44"
          rx="12"
          fill={accentColor}
          opacity="0.25"
        />
        <path
          d="M88 162 L96 170 L114 152"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
        />
      </svg>
    )
  }

  if (accent === 'hire') {
    return (
      <svg viewBox="0 0 320 220" className={common} aria-hidden>
        <circle cx="112" cy="110" r="36" fill="#F5F1E8" stroke={stroke} />
        <circle cx="208" cy="110" r="36" fill="#F5F1E8" stroke={stroke} />
        <path
          d="M148 110 L172 110"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="160" cy="96" r="6" fill={accentColor} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 320 220" className={common} aria-hidden>
      <rect
        x="48"
        y="140"
        width="224"
        height="56"
        rx="12"
        fill="#FBF8F0"
        stroke={stroke}
      />
      <circle cx="96" cy="84" r="22" fill="#E7E5E4" />
      <circle cx="160" cy="72" r="26" fill="#E7E5E4" />
      <circle cx="224" cy="84" r="22" fill="#E7E5E4" />
      <rect x="120" y="44" width="80" height="12" rx="4" fill={accentColor} opacity="0.5" />
    </svg>
  )
}

export default function Process() {
  return (
    <section
      id="process"
      className="border-t border-ink/5 bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="How it works"
            title="From requisition to onboarding in a"
            highlight="single autonomous flow"
          />
        </motion.div>

        <motion.div
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {autonomousStages.map((stage, index) => (
            <motion.article
              key={stage.id}
              className="rounded-2xl border border-ink/10 bg-cream p-4"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.38, delay: index * 0.02 }}
              whileHover={{ y: -4 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                Stage {index + 1}
              </p>
              <h3 className="mt-1 text-sm font-bold text-ink">{stage.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{stage.description}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="relative mt-16 space-y-16 lg:space-y-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        >
          <div
            className="pointer-events-none absolute left-[15px] top-6 hidden h-[calc(100%-2rem)] w-px bg-ink/10 md:block lg:left-[19px]"
            aria-hidden
          />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center lg:gap-16"
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45 }}
            >
              <div className="relative flex gap-6 md:gap-8">
                <div className="relative z-10 flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white shadow-sm ring-4 ring-white">
                    {step.id}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <span
                      className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white text-lime md:hidden"
                      aria-hidden
                    >
                      <Check className="h-4 w-4 text-ink" strokeWidth={2.5} />
                    </span>
                  ) : null}
                </div>
                <div className="pb-2 pt-0.5">
                  <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>

            
                <motion.div className="w-full max-w-md mx-auto" whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}>
                 <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                </motion.div>
             
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
