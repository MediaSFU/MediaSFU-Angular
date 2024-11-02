export interface SleepOptions {
  ms: number;
}

// Export the type definition for the function
export type SleepType = (options: SleepOptions) => Promise<void>;

/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @param {SleepOptions} options - Contains the duration to pause.
 * @param {number} options.ms - Number of milliseconds to delay.
 * @returns {Promise<void>} Resolves after the specified duration.
 *
 * @example
 * ```typescript
 * await sleep({ ms: 2000 });
 * // Pauses execution for 2 seconds
 * ```
 */


export function sleep({ ms }: SleepOptions): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
