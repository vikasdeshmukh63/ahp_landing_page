import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Process from './components/Process.jsx'
import Architecture from './components/Architecture.jsx'
import Testimonials from './components/Testimonials.jsx'
import FounderNote from './components/FounderNote.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Process />
        <Architecture />
        <Testimonials />
        <FounderNote />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
