import { useEffect, useState } from 'react'
import { AccentThemeProvider } from './context/AccentThemeContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import AIInterviewPanel from './components/AIInterviewPanel.jsx'
import AdaptiveAssessments from './components/AdaptiveAssessments.jsx'
import Features from './components/Features.jsx'
import Pillars from './components/Pillars.jsx'
import Lifecycle from './components/Lifecycle.jsx'
import Process from './components/Process.jsx'
import Architecture from './components/Architecture.jsx'
import Testimonials from './components/Testimonials.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import MockChatbot from './components/MockChatbot.jsx'

const accentThemes = [
  { accent: 'blue', label: 'Blue' },
  { accent: 'lime', label: 'Lime' },
]

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0)

  const activeTheme = accentThemes[themeIndex]

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    root.setAttribute('data-accent', activeTheme.accent)
  }, [activeTheme])

  function handleThemeToggle() {
    setThemeIndex((prev) => (prev + 1) % accentThemes.length)
  }

  return (
    <AccentThemeProvider accent={activeTheme.accent}>
      <div className="min-h-screen overflow-x-clip bg-[var(--app-bg)] text-[var(--app-fg)]">
        <Navbar activeThemeLabel={activeTheme.label} onThemeToggle={handleThemeToggle} />
        <main className="pt-14 sm:pt-16">
          <Hero />
          <AIInterviewPanel />
          <AdaptiveAssessments />
          <Features />
          <Pillars />
          <Lifecycle />
          <Process />
          <Architecture />
          <Testimonials />
          <FinalCTA />
        </main>
        <Footer />
        <MockChatbot />
      </div>
    </AccentThemeProvider>
  )
}
