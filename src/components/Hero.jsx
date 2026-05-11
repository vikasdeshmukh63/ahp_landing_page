import { motion } from "motion/react";
import Button from "./ui/Button.jsx";
import Pill from "./ui/Pill.jsx";
import heroPattern from "../assets/map.svg";

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
          <div className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-start">
            <div className="w-full max-w-3xl text-left">
              <motion.div
                className="mb-6 flex justify-start"
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
                className="mt-6 max-w-2xl text-pretty text-base font-bold text-muted sm:text-lg"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hire from our pool of 10,000+ vetted developers, designers, and marketers.
              </motion.p>
              <motion.div
                className="mt-8 flex justify-start"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.28 }}
              >
                <Button variant="primary" className="px-8 py-3.5 text-base">
                  Hire Talent
                </Button>
                <a href="#ai-panel" className="ml-4">
                  <Button variant="ghost" className="px-8 py-3.5 text-base">
                    Meet AI Panel
                  </Button>
                </a>
              </motion.div>
            </div>
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
