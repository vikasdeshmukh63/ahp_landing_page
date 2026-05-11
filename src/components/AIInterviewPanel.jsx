import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import { motion } from 'motion/react'
import Button from './ui/Button.jsx'
import heroVideo from '../assets/video.mp4'

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
    <section id="ai-panel" className="border-t border-ink/5 bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-blue-100 bg-ink p-8 text-white shadow-[0_24px_70px_-40px_rgba(30,64,175,0.45)] sm:p-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            AI Interview Panel
          </p>
          <h2 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            Meet Your AI Interviewers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100/80 sm:text-xl">
            Pixar-style AI avatars that conduct realistic, unbiased interviews with natural speech.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <button
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-blue-400/25 text-blue-100/70 lg:flex"
            aria-label="Previous avatar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="mx-auto flex flex-col items-center">
            <div className="rounded-full border-8 border-blue-900/60 bg-blue-900/40 p-4 shadow-[0_0_0_1px_rgba(59,130,246,0.2)]">
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

            <div className="-mt-6 rounded-full bg-blue-500 px-5 py-1.5 text-sm font-semibold text-ink">
              Tech Lead
            </div>

            <h3 className="mt-6 text-4xl font-bold">Arjun</h3>
            <p className="mt-3 max-w-lg text-center text-blue-100/80">
              Hello! I&apos;m Arjun, your AI Tech Lead interviewer. I&apos;ll assess your technical skill...
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-2.5 w-8 rounded-full bg-blue-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-blue-200/40" />
            </div>

            <Button
              variant="primary"
              className="mt-7 flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3 text-base font-semibold text-ink hover:bg-blue-400"
              onClick={handleSpeakClick}
            >
              <Volume2 className="h-4 w-4" />
              {isPlaying ? 'Pause Speaking' : 'Hear Me Speak'}
            </Button>
          </div>

          <button
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-blue-400/25 text-blue-100/70 lg:flex"
            aria-label="Next avatar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
