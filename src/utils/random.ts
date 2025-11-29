/**
 * Utility functions for random selection and number generation.
 */

/**
 * Picks a random item from an array.
 */
export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

