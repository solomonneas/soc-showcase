import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Returns framer-motion animation props that respect prefers-reduced-motion.
 * When reduced motion is preferred:
 *  - Infinite repeats are disabled
 *  - Transition durations are minimized
 *  - Entrance animations are skipped
 */
export function useReducedMotion() {
  return useFramerReducedMotion();
}

/**
 * Returns a safe `repeat` value: `Infinity` when motion is OK, `0` when reduced.
 */
export function safeRepeat(prefersReduced: boolean | null): number {
  return prefersReduced ? 0 : Infinity;
}

/**
 * Returns a safe transition duration: original when motion is OK, near-zero when reduced.
 */
export function safeDuration(prefersReduced: boolean | null, duration: number): number {
  return prefersReduced ? 0 : duration;
}
