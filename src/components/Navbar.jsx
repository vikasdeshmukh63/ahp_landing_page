import Button from './ui/Button.jsx'
import { motion } from 'motion/react'

const navLinks = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Features', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Stories', href: '#stories' },
  { label: 'Founder', href: '#founder' },
]

export default function Navbar() {
  return (
    <motion.header
      className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <motion.div
        className="mx-auto w-full max-w-5xl rounded-full border border-ink/10 bg-white/90 p-2 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.45)] backdrop-blur-md"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25 }}
      >
        <nav className="flex items-center justify-between gap-4">
          <motion.a href="#top" className="flex h-12 items-center rounded-full px-4 text-lg font-bold tracking-tight text-ink" whileHover={{ scale: 1.04 }}>
            ETIP
          </motion.a>
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink hover:bg-blue-50 hover:text-blue-600"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
          <a href="#founder">
            <Button variant="primary" className="h-12 px-6 text-base">
              Book Now
            </Button>
          </a>
        </nav>
      </motion.div>
    </motion.header>
  )
}
