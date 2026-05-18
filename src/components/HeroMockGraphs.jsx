import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

function useAnimatedKpis() {
  const base = [
    { key: "reqs", label: "Open reqs", display: (n) => `${Math.round(n)}` },
    { key: "pipeline", label: "In pipeline", display: (n) => `${Math.round(n)}` },
    { key: "fills", label: "Offers out", display: (n) => `${Math.round(n)}` },
    { key: "ttl", label: "Avg. days to slate", display: (n) => `${n.toFixed(1)}d` },
  ];
  const [values, setValues] = useState([24, 156, 18, 6.2]);
  const tRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let id = 0;
    const tick = () => {
      tRef.current += 0.038;
      const t = tRef.current;
      setValues([
        clamp(22 + Math.sin(t * 0.9) * 4, 16, 30),
        clamp(148 + Math.cos(t * 0.55) * 18, 120, 185),
        clamp(16 + Math.sin(t * 1.1) * 3, 11, 23),
        clamp(5.8 + Math.cos(t * 0.7) * 0.85, 4.5, 8.2),
      ]);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  return base.map((b, i) => ({ ...b, value: values[i], format: b.display }));
}

const TEAM_LABELS = ["Engineering", "Product", "GTM", "Design", "Operations"];
const TEAM_CAPS = [42, 28, 36, 14, 22];

function useAnimatedTeamRows() {
  const [currents, setCurrents] = useState([31, 19, 24, 9, 16]);
  const tRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let id = 0;
    const tick = () => {
      tRef.current += 0.028;
      const t = tRef.current;
      setCurrents(
        TEAM_CAPS.map((cap, i) => {
          const wave = Math.sin(t * (0.65 + i * 0.08)) * 2.5;
          const center = cap * (0.55 + (i % 3) * 0.06);
          return clamp(Math.round(center + wave), 4, Math.max(4, cap - 1));
        }),
      );
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  return TEAM_LABELS.map((label, i) => ({
    label,
    current: currents[i],
    total: TEAM_CAPS[i],
  }));
}

export default function HeroMockGraphs() {
  const reduceMotion = useReducedMotion();
  const kpis = useAnimatedKpis();
  const teamRows = useAnimatedTeamRows();

  return (
    <motion.div
      className="pointer-events-none relative mx-auto mt-12 w-full max-w-[min(100%,456px)] sm:max-w-[480px] lg:mt-0 lg:max-w-[508px] lg:justify-self-center"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? false : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#060d1f]/92 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.75)] backdrop-blur-md ring-1 ring-[rgb(var(--accent-rgb))]/15">
        {/* Header */}
        <header className="flex items-center gap-2 border-b border-white/10 px-3.5 py-3 sm:px-4">
          <div className="min-w-[2.75rem] flex-1" aria-hidden />
          <p className="min-w-0 flex-[2] truncate text-center text-[11px] font-semibold text-white sm:text-xs">
            Hiring plan · Q1 rollout
          </p>
          <div className="flex min-w-[2.75rem] flex-1 justify-end">
            <span className="rounded-full border border-[rgb(var(--accent-rgb))]/45 bg-[rgb(var(--accent-rgb))]/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[rgb(var(--accent-rgb))]">
              Live
            </span>
          </div>
        </header>

        {/* KPI row — Graph 1 */}
        <div className="grid grid-cols-2 gap-2.5 p-3.5 sm:grid-cols-4 sm:gap-3 sm:p-4">
          {kpis.map((k) => (
            <div
              key={k.key}
              className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 sm:px-3.5"
            >
              <p className="text-xl font-bold tabular-nums leading-tight text-white">
                {k.format(k.value)}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-[11px]">
                {k.label}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal bars — Graph 2 */}
        <div className="border-t border-white/10 px-3.5 pb-4 pt-3 sm:px-4 sm:pb-5">
          <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Headcount by team
          </p>
          <div className="flex flex-col gap-3">
            {teamRows.map((row) => {
              const pct = clamp(row.current / row.total, 0, 1) * 100;
              return (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(0,32%)_1fr_auto] items-center gap-x-2 text-[11px] sm:gap-x-3 sm:text-xs"
                >
                  <span className="truncate text-left font-medium text-slate-400">
                    {row.label}
                  </span>
                  <div className="min-w-0">
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.08] sm:h-3">
                      <div
                        className="h-full rounded-full bg-[rgb(var(--accent-rgb))] shadow-[0_0_12px_-2px_rgba(var(--accent-rgb),0.65)] transition-[width] duration-300 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 tabular-nums text-right font-semibold text-slate-300">
                    {row.current}/{row.total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
