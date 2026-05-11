/** Easing for scroll-reveal cards */
export const easeScroll = [0.22, 1, 0.36, 1];

/** Viewport: card animates when it crosses into view (one-by-one while scrolling) */
export const scrollCardViewport = {
  once: true,
  amount: 0.32,
  margin: "0px 0px -10% 0px",
};

/** Props spread onto motion.article / motion.figure for per-card scroll reveal */
export function scrollCardMotion() {
  return {
    initial: { opacity: 0, y: 48, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: scrollCardViewport,
    transition: { duration: 0.55, ease: easeScroll },
  };
}

/** Staggered children (heading + row) when you prefer batch stagger */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, ease: easeScroll },
  },
};
