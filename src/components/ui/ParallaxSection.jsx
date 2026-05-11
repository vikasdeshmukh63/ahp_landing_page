import { motion } from "motion/react";
import { useSectionParallax } from "../../hooks/useSectionParallax.js";

/**
 * Shared gradient layers (use with `useSectionParallax` on any root).
 */
export function SectionParallaxLayers({ layerY, blobY }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 scale-[1.08]"
        style={{ y: layerY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--accent-rgb))]/[0.07] via-transparent to-blue-600/[0.09]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-[12%] z-0 h-[min(52vw,420px)] w-[min(52vw,420px)] rounded-full bg-[rgb(var(--accent-rgb))]/12 blur-3xl"
        style={{ y: blobY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-10%] z-0 h-[min(45vw,360px)] w-[min(45vw,360px)] rounded-full bg-blue-600/10 blur-3xl"
        style={{ y: blobY }}
      />
    </>
  );
}

/**
 * @param {object} props
 * @param {string} [props.id]
 * @param {string} props.className
 * @param {import('react').ReactNode} props.children
 * @param {number} [props.strength]
 */
export default function ParallaxSection({
  id,
  className = "",
  children,
  strength = 68,
}) {
  const { ref, layerY, blobY, reduceMotion } = useSectionParallax(strength);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      {!reduceMotion ? (
        <SectionParallaxLayers layerY={layerY} blobY={blobY} />
      ) : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
