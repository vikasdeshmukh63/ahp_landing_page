import Button from './ui/Button.jsx'
import { motion } from 'motion/react'

function RunnerFlag({ className = '' }) {
  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M32 96 C48 64 56 40 72 32 C88 24 96 36 104 48"
        stroke="#0E0E0E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="56" cy="28" r="9" fill="#0E0E0E" />
      <path
        d="M56 40 L56 96"
        stroke="#0E0E0E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M56 44 L96 36 L96 60 L56 68 Z"
        fill="#3B82F6"
        stroke="#0E0E0E"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function FinalCTA() {
  return (
    <section className="border-t border-ink/5 bg-dot-grid bg-dot-size-dot px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.div
          className="mb-6 flex justify-center"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45 }}
        >
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}>
            <RunnerFlag className="h-24 w-40" />
          </motion.div>
        </motion.div>
        <motion.h2
          className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45 }}
        >
          Ready to launch your{' '}
          <span className="text-blue-500">autonomous hiring workflow?</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-5 max-w-lg text-muted"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45 }}
        >
          Unify requisitions, sourcing, assessments, interviews, and onboarding in one ATS experience.
        </motion.p>
        <motion.div
          className="mt-10 flex justify-center"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45 }}
        >
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Button
            variant="primary"
            className="bg-blue-500 px-10 py-3.5 text-base hover:bg-blue-600"
          >
            Request Platform Walkthrough
          </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
