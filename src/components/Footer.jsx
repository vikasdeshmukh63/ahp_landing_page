import Button from './ui/Button.jsx'
import { footerColumns, socialLinks } from '../data/footer.js'
import { motion } from 'motion/react'
import { SectionParallaxLayers } from './ui/ParallaxSection.jsx'
import { useSectionParallax } from '../hooks/useSectionParallax.js'
import { scrollCardMotion, staggerContainer, staggerItem } from '../lib/scrollMotion.js'

export default function Footer() {
  const parallax = useSectionParallax(44)

  return (
    <footer
      ref={parallax.ref}
      className="relative overflow-hidden border-t border-white/10 bg-[#030510] px-4 pb-12 pt-16 sm:px-6 lg:px-8"
    >
      {!parallax.reduceMotion ? (
        <SectionParallaxLayers layerY={parallax.layerY} blobY={parallax.blobY} />
      ) : null}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <motion.div key={col.title} {...scrollCardMotion()}>
              <p className="text-sm font-bold text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-[rgb(var(--accent-rgb))]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div variants={staggerItem} className="flex items-center gap-2.5">
            <span className="text-lg font-bold tracking-tight text-white">
              ETIP
            </span>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-center text-sm text-slate-400 md:flex-1"
          >
            © {new Date().getFullYear()} Pixel. All rights reserved.
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="mt-2 flex flex-wrap justify-center gap-4 sm:mt-0 sm:inline-flex">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-slate-300 underline-offset-4 hover:text-[rgb(var(--accent-rgb))] hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </span>
          </motion.p>

          <motion.form
            variants={staggerItem}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center"
            onSubmit={(e) => e.preventDefault()}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Work email"
              className="w-full rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-[rgb(var(--accent-rgb))]/40"
            />
            <Button type="submit" variant="lime" className="shrink-0 px-5">
              Subscribe
            </Button>
          </motion.form>
        </motion.div>
      </div>

      <p
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 select-none text-[clamp(4rem,18vw,14rem)] font-black leading-none tracking-tighter text-white/[0.04]"
        aria-hidden
      >
        ETIP
      </p>
    </footer>
  )
}
