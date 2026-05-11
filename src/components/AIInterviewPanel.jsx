import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import { motion } from 'motion/react'
import Button from './ui/Button.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import heroVideo from '../assets/video.mp4'
import { staggerContainer, staggerItem } from '../lib/scrollMotion.js'

export default function AIInterviewPanel() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function handleSpeakClick() {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
      return
    }

    video.pause()
    setIsPlaying(false)
  }

  return (
    <ParallaxSection
      id="ai-panel"
      className="border-t border-white/5 bg-[#040814] px-4 py-20 sm:px-6 lg:px-8"
      strength={56}
    >
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a1228] to-[#040814] p-8 text-white shadow-[0_24px_80px_-36px_rgba(0,0,0,0.75)] sm:p-12">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={staggerItem}>
            <p className="text-sm font-semibold uppercase tracking-wider text-[rgb(var(--accent-rgb))]">
              AI Interview Panel
            </p>
            <h2 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Meet Your AI Interviewers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-xl">
              Pixar-style AI avatars that conduct realistic, unbiased interviews with natural speech.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 text-slate-400 lg:flex"
            aria-label="Previous avatar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="mx-auto flex flex-col items-center">
            <div className="rounded-full border-8 border-white/10 bg-[#060d1f] p-4 shadow-[0_0_0_1px_rgba(200,242,58,0.15)]">
              <video
                ref={videoRef}
                src={heroVideo}
                className="h-64 w-64 rounded-full object-cover sm:h-72 sm:w-72"
                playsInline
                preload="metadata"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>

            <div className="-mt-6 rounded-full bg-[rgb(var(--accent-rgb))] px-5 py-1.5 text-sm font-semibold text-[rgb(var(--accent-contrast-rgb))]">
              Tech Lead
            </div>

            <h3 className="mt-6 text-4xl font-bold">Arjun</h3>
            <p className="mt-3 max-w-lg text-center text-slate-400">
              Hello! I&apos;m Arjun, your AI Tech Lead interviewer. I&apos;ll assess your technical skill...
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-2.5 w-8 rounded-full bg-[rgb(var(--accent-rgb))]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </div>

            <Button
              variant="lime"
              className="mt-7 flex items-center gap-2 px-8 py-3 text-base"
              onClick={handleSpeakClick}
            >
              <Volume2 className="h-4 w-4" />
              {isPlaying ? 'Pause Speaking' : 'Hear Me Speak'}
            </Button>
          </div>

          <button
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 text-slate-400 lg:flex"
            aria-label="Next avatar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
