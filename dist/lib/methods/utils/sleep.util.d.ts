export interface SleepOptions {
    ms: number;
}
export type SleepType = (options: SleepOptions) => Promise<void>;
/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @param {SleepOptions} options - An object containing the sleep duration.
 * @param {number} options.ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
export declare function sleep({ ms }: SleepOptions): Promise<void>;
