import { useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { motion } from 'motion/react'
import Button from './ui/Button.jsx'
import ParallaxSection from './ui/ParallaxSection.jsx'
import heroVideo from '../assets/video.mp4'
import { aiInterviewFeatures } from '../data/aiInterviewFeatures.js'
import { staggerContainer, staggerItem } from '../lib/scrollMotion.js'

function FeatureCard({ feature, align = 'left' }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 shadow-sm backdrop-blur-sm sm:px-5 sm:py-4 ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <h4 className="text-sm font-bold text-white sm:text-base">{feature.title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
        {feature.description}
      </p>
    </div>
  )
}

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

  const allFeatures = [...aiInterviewFeatures.left, ...aiInterviewFeatures.right]

  return (
    <ParallaxSection
      id="ai-panel"
      className="border-t border-white/5 bg-[#040814] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      strength={56}
    >
      <motion.div
        className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a1228] to-[#040814] p-5 text-white shadow-[0_24px_80px_-36px_rgba(0,0,0,0.75)] sm:rounded-3xl sm:p-8 md:p-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="text-center" variants={staggerItem}>
          <p className="text-sm font-semibold uppercase tracking-wider text-[rgb(var(--accent-rgb))]">
            AI Interview Panel
          </p>
          <h2 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            AI Avatar — Your Autonomous Recruiter
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-xl">
            AI avatars that conduct realistic, unbiased interviews with natural speech.
          </p>
        </motion.div>

        <motion.div
          className="relative mt-12 lg:mt-14"
          variants={staggerItem}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto max-w-5xl px-1 sm:px-2">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:grid-rows-3 lg:items-center lg:gap-x-8 lg:gap-y-12 xl:gap-x-12">
              <div className="flex flex-col items-center lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:px-4">
                <div className="rounded-full border-8 border-white/10 bg-[#060d1f] p-3 shadow-[0_0_0_1px_rgba(200,242,58,0.15)] sm:p-4">
                  <video
                    ref={videoRef}
                    src={heroVideo}
                    className="h-48 w-48 rounded-full object-cover sm:h-56 sm:w-56 lg:h-64 lg:w-64"
                    playsInline
                    preload="metadata"
                    controls={false}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>

                <div className="-mt-5 rounded-full bg-[rgb(var(--accent-rgb))] px-4 py-1 text-xs font-semibold text-[rgb(var(--accent-contrast-rgb))] sm:text-sm">
                  Tech Lead
                </div>

                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Arjun</h3>
                <p className="mt-2 max-w-xs text-center text-sm text-slate-400 sm:max-w-sm">
                  Your AI Tech Lead interviewer — assessing technical depth with structured,
                  unbiased dialogue.
                </p>

                <Button
                  variant="lime"
                  className="mt-5 flex items-center gap-2 px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base"
                  onClick={handleSpeakClick}
                >
                  <Volume2 className="h-4 w-4" />
                  {isPlaying ? 'Pause Speaking' : 'Hear Me Speak'}
                </Button>
              </div>

              {aiInterviewFeatures.left.map((feature, i) => (
                <div
                  key={feature.id}
                  className="hidden max-w-sm lg:block lg:justify-self-end"
                  style={{ gridColumn: 1, gridRow: i + 1 }}
                >
                  <FeatureCard feature={feature} align="right" />
                </div>
              ))}

              {aiInterviewFeatures.right.map((feature, i) => (
                <div
                  key={feature.id}
                  className="hidden max-w-sm lg:block lg:justify-self-start"
                  style={{ gridColumn: 3, gridRow: i + 1 }}
                >
                  <FeatureCard feature={feature} align="left" />
                </div>
              ))}

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
                {allFeatures.map((feature) => (
                  <li key={feature.id}>
                    <FeatureCard feature={feature} align="left" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </ParallaxSection>
  )
}
