export interface SleepOptions {
    ms: number;
}
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
export declare function sleep({ ms }: SleepOptions): Promise<void>;
