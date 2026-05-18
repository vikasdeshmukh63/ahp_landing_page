import Button from './ui/Button.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import { motion } from 'motion/react'

export default function FinalCTA() {
  return (
    <ParallaxSection
      id="cta"
      className="border-t border-white/5 bg-[#040814] bg-dot-grid-dark bg-dot-size-dot px-4 py-20 sm:px-6 lg:px-8"
      strength={52}
    >
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.28, margin: '0px 0px -10% 0px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.16, delayChildren: 0.06 } },
        }}
      >
        <motion.h2
          className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Ready to launch your{' '}
          <span className="text-[rgb(var(--accent-rgb))]">Autonomous hiring workflow?</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-5 max-w-lg text-slate-400"
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Unify requisitions, sourcing, assessments, interviews, and onboarding in one ATS experience.
        </motion.p>
        <motion.div
          className="mt-10 flex justify-center"
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Button variant="lime" className="px-10 py-3.5 text-base">
              Request Platform Walkthrough
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </ParallaxSection>
  )
}
