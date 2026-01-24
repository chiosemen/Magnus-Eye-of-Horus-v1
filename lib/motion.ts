import { Transition, Variants } from "framer-motion";

/**
 * EYE OF HORUS MOTION DOCTRINE
 * ----------------------------
 * • No springs, no bounce.
 * • Decisive, authoritative easing.
 * • Motion signals system state, not decoration.
 */

export const easing = {
  command: [0.22, 1, 0.36, 1],      // Decisive authority
  reveal: [0.33, 1, 0.68, 1],        // Neutral disclosure
  idle: [0.45, 0, 0.55, 1],          // Background stability
  immediate: "linear"                // Risk surfaces
};

export const duration = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  deliberate: 0.6,
  slow: 0.8,
  ambient: 10,
  deepAmbient: 14
};

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.normal }
  },
  exit: { opacity: 0, transition: { duration: duration.fast } }
};

export const heroEnter: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.command
    }
  }
};

export const sectionReveal: Variants = {
  initial: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.deliberate,
      ease: easing.reveal
    }
  }
};

export const statusPulse: Variants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: duration.ambient,
      repeat: Infinity,
      ease: easing.idle
    }
  }
};

export const meshIdle: Variants = {
  animate: {
    opacity: [0.12, 0.22, 0.12],
    transition: {
      duration: duration.deepAmbient,
      repeat: Infinity,
      ease: easing.idle
    }
  }
};

export const toggleTransition: Transition = {
  duration: duration.fast,
  ease: easing.reveal
};

// Add the missing featureHover export for use in Card components
export const featureHover: Transition = {
  duration: duration.fast,
  ease: easing.reveal
};
