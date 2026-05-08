import Button from './ui/Button.jsx'
import { footerColumns, socialLinks } from '../data/footer.js'
import { motion } from 'motion/react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-cream px-4 pb-12 pt-16 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {footerColumns.map((col) => (
            <motion.div
              key={col.title}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-sm font-bold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col gap-8 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-sm font-bold text-white">
              P
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">
              Pixel
            </span>
          </div>

          <p className="text-center text-sm text-muted md:flex-1">
            © {new Date().getFullYear()} Pixel. All rights reserved.
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="mt-2 flex flex-wrap justify-center gap-4 sm:mt-0 sm:inline-flex">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </span>
          </p>

          <motion.form
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
              className="w-full rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none ring-0 placeholder:text-muted focus:border-ink/30"
            />
            <Button type="submit" variant="primary" className="shrink-0 px-5">
              Subscribe
            </Button>
          </motion.form>
        </motion.div>
      </div>

      <p
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 select-none text-[clamp(4rem,18vw,14rem)] font-black leading-none tracking-tighter text-ink/[0.06]"
        aria-hidden
      >
        PIXEL
      </p>
    </footer>
  )
}
