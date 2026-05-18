import { Quote } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import {
  testimonialFaces,
  testimonialQuotes,
} from '../data/testimonials.js'
import { motion } from 'motion/react'
import { scrollCardMotion, staggerContainer, staggerItem } from '../lib/scrollMotion.js'

export default function Testimonials() {
  return (
    <ParallaxSection
      id="stories"
      className="border-t border-white/5 bg-[#040814] px-4 py-20 sm:px-6 lg:px-8"
      strength={74}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={staggerItem} className="relative max-w-xl">
            <SectionHeading
              eyebrow="Social proof"
              title="Want to see real"
              highlight="Client stories?"
            />
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-0 lg:justify-end lg:pt-4"
          >
          </motion.div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonialQuotes.map((t) => (
            <motion.figure
              key={t.name}
              className={`flex flex-col rounded-2xl p-6 backdrop-blur-sm ${t.tint}`}
              {...scrollCardMotion()}
              whileHover={{ y: -4 }}
            >
              <Quote
                className="h-8 w-8 shrink-0 text-[rgb(var(--accent-rgb))]"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden
              />
              <blockquote className="mt-4 flex-1 text-sm font-medium leading-relaxed text-slate-200">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}
