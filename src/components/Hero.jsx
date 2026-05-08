import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Button from "./ui/Button.jsx";
import Pill from "./ui/Pill.jsx";
import heroPattern from "../assets/map.svg";
import heroVideo from "../assets/video.mp4";

const talentCards = [
  {
    name: "Aarav Mehta",
    role: "Frontend Engineer",
    meta: "React • 6 yrs • Available now",
    initials: "AM",
  },
  {
    name: "Sophia Lee",
    role: "Product Designer",
    meta: "Figma • UX Research • 4 yrs",
    initials: "SL",
  },
  {
    name: "Noah Carter",
    role: "Growth Marketer",
    meta: "B2B SaaS • Paid Ads • 5 yrs",
    initials: "NC",
  },
  {
    name: "Mia Johnson",
    role: "Full Stack Developer",
    meta: "Node.js • Next.js • Immediate",
    initials: "MJ",
  },
  {
    name: "Liam Walker",
    role: "DevOps Engineer",
    meta: "AWS • CI/CD • 7 yrs",
    initials: "LW",
  },
  {
    name: "Emma Davis",
    role: "UI Developer",
    meta: "Tailwind • React • 5 yrs",
    initials: "ED",
  },
  {
    name: "Ethan Brooks",
    role: "Data Analyst",
    meta: "SQL • Power BI • 4 yrs",
    initials: "EB",
  },
  {
    name: "Olivia Turner",
    role: "QA Engineer",
    meta: "Automation • Cypress • 6 yrs",
    initials: "OT",
  },
];

export default function Hero() {
  const marqueeCards = [...talentCards, ...talentCards];
  const heroVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  function enableSound() {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    setShowSoundPrompt(false);
  }

  return (
    <>
      <section id="top" className="relative h-screen overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 -top-16 sm:-top-20">
          <img
            src={heroPattern}
            alt=""
            aria-hidden="true"
            className="w-full object-contain object-top"
            style={{
              opacity: 0.3,
            }}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="mx-auto mt-8 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <motion.div
                className="mb-6 flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                <Pill>AI-powered workflow from requisition to onboarding</Pill>
              </motion.div>
              <motion.h1
                className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                Start hiring world&apos;s <span className="text-blue-500">top talent</span>
              </motion.h1>
              <motion.p
                className="mx-auto mt-6 max-w-2xl text-pretty text-base font-bold text-muted sm:text-lg lg:mx-0"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hire from our pool of 10,000+ vetted developers, designers, and marketers.
              </motion.p>
              <motion.div
                className="mt-8 flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.28 }}
              >
                <Button variant="primary" className="px-8 py-3.5 text-base">
                  Hire Talent
                </Button>
                <Button variant="ghost" className="ml-4 px-8 py-3.5 text-base">
                  Meet AI Panel
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="mx-auto w-full max-w-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              <motion.div
                className="overflow-hidden rounded-3xl border border-blue-100/90 bg-white/80 p-2 shadow-[0_24px_70px_-40px_rgba(30,64,175,0.55)] backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-zinc-950">
                  <video
                    ref={heroVideoRef}
                    src={heroVideo}
                    className="h-[300px] w-full object-cover sm:h-[380px] lg:h-[420px]"
                    muted
                    playsInline
                    preload="auto"
                  />

                  {/* Sound prompt — shown until the user clicks to enable audio */}
                  {showSoundPrompt && (
                    <motion.button
                      onClick={enableSound}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 backdrop-blur-[2px] transition hover:bg-black/40"
                      whileHover={{ scale: 1.01 }}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/60">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6">
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                          <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-white drop-shadow">Click to enable sound</span>
                    </motion.button>
                  )}

                  {/* Mute toggle — visible after sound has been enabled */}
                  {!showSoundPrompt && (
                    <motion.button
                      onClick={() => {
                        const video = heroVideoRef.current;
                        if (!video) return;
                        video.muted = !video.muted;
                        setIsMuted(video.muted);
                      }}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                      whileHover={{ scale: 1.08 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2.1, repeat: Infinity }}
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L19.5 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L19.5 10.94l-1.72-1.72Z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                          <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-blue-100 bg-blue-500/40 py-8">
        <div className="mx-auto mb-4 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">Available Talent This Week</h1>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-4 px-4 sm:px-6 lg:px-8">
            {marqueeCards.map((card, index) => (
              <motion.article
                key={`${card.name}-${index}`}
                className="min-w-[260px] rounded-2xl border border-blue-100 bg-white/95 p-3 shadow-md backdrop-blur"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    {card.initials}
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-sm font-semibold text-ink">{card.name}</p>
                    <p className="text-xs text-blue-700">{card.role}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted">{card.meta}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
