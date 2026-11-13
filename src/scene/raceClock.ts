/** Shared slow-mo race phase (0..∞). Cars use (offset + t * speed) % 1. */
export const raceClock = {
  t: 0,
  speed: 0.012,
}
