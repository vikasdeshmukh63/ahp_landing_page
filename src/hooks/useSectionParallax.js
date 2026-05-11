import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Scroll-driven parallax for section backgrounds (slow layer + blob).
 * @param {number} [strength=70] pixels-ish travel at full scroll through section
 */
export function useSectionParallax(strength = 70) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const layerY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [strength * 0.5, -strength * 0.5],
  );
  const blobY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [strength * 0.9, -strength * 0.9],
  );

  return { ref, layerY, blobY, reduceMotion };
}
