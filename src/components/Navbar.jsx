import Button from './ui/Button.jsx'
import { motion } from 'motion/react'

const navLinks = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Features', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Stories', href: '#stories' },
]

export default function Navbar({ activeThemeLabel, onThemeToggle }) {
  return (
    <motion.header
      className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <motion.div
        className="mx-auto w-full max-w-5xl rounded-full border border-white/10 bg-[#060d1f]/85 p-2 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.65)] backdrop-blur-md"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25 }}
      >
        <nav className="flex items-center justify-between gap-4">
          <motion.a href="#top" className="flex h-12 items-center rounded-full px-4 text-lg font-bold tracking-tight text-white" whileHover={{ scale: 1.04 }}>
            ETIP
          </motion.a>
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-[rgb(var(--accent-rgb))]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onThemeToggle}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-[rgb(var(--accent-rgb))]/50 hover:text-[rgb(var(--accent-rgb))]"
              aria-label="Switch accent color (blue or lime)"
            >
              {activeThemeLabel}
            </button>
            <a href="#cta">
              <Button variant="lime" className="h-12 px-6 text-base">
                Book Now
              </Button>
            </a>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  )
}
