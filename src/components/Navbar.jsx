import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Button from './ui/Button.jsx'

/** Order matches section order in App.jsx (top → bottom). */
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Stories', href: '#stories' },
]

export default function Navbar({ activeThemeLabel, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#060d1f]/95 backdrop-blur-md"
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-2 sm:gap-4">
          <motion.a
            href="#top"
            className="flex h-10 shrink-0 items-center rounded-full px-2 sm:h-12 sm:px-4"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            onClick={closeMenu}
          >
            <img
              src="/logo.png"
              alt="ETIP"
              width={52}
              height={52}
              className="h-[80px] w-auto"
            />
          </motion.a>

          <motion.div className="hidden items-center gap-1 md:flex lg:gap-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-[rgb(var(--accent-rgb))] lg:px-4"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={onThemeToggle}
              className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5 text-[10px] font-semibold text-slate-200 transition hover:border-[rgb(var(--accent-rgb))]/50 hover:text-[rgb(var(--accent-rgb))] sm:px-4 sm:py-2 sm:text-xs"
              aria-label="Switch accent color (blue or lime)"
            >
              {activeThemeLabel}
            </button>
            <a href="#cta" className="hidden sm:inline">
              <Button variant="lime" className="h-10 px-4 text-sm sm:h-12 sm:px-6 sm:text-base">
                Book Now
              </Button>
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-nav"
              className="border-t border-white/10 px-2 pb-2 pt-2 md:hidden"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-[rgb(var(--accent-rgb))]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-1">
                  <a href="#cta" onClick={closeMenu} className="block">
                    <Button variant="lime" className="w-full py-3 text-base">
                      Book Now
                    </Button>
                  </a>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
