import * as i0 from "@angular/core";
export interface RecordUpdateTimerOptions {
    recordElapsedTime: number;
    recordStartTime: number;
    updateRecordElapsedTime: (elapsedTime: number) => void;
    updateRecordingProgressTime: (formattedTime: string) => void;
}
export type RecordUpdateTimerType = (options: RecordUpdateTimerOptions) => void;
/**
 * Updates the recording timer and progress time.
 * @function
 * @param {RecordUpdateTimerOptions} options - The options object containing necessary variables and functions.
 */
/**
 * Updates the recording timer by calculating the elapsed time since the recording started
 * and formatting it in HH:MM:SS format.
 *
 * @param {Object} options - The options object.
 * @param {number} options.recordElapsedTime - The elapsed recording time in seconds.
 * @param {number} options.recordStartTime - The timestamp when the recording started.
 * @param {Function} options.updateRecordElapsedTime - Callback to update the elapsed recording time.
 * @param {Function} options.updateRecordingProgressTime - Callback to update the formatted recording time.
 * @returns {void}
 *
 * @remarks
 * This function calculates the elapsed time since the recording started and formats it into
 * a string in HH:MM:SS format. It updates both the elapsed time in seconds and the formatted
 * time via the provided callback functions.
 *
 * @example
 * ```typescript
 * const options: RecordUpdateTimerOptions = {
 *   recordElapsedTime: 0,
 *   recordStartTime: Date.now(),
 *   updateRecordElapsedTime: (elapsedTime) => { console.log(`Elapsed Time: ${elapsedTime} seconds`); },
 *   updateRecordingProgressTime: (formattedTime) => { console.log(`Formatted Time: ${formattedTime}`); },
 * };
 * recordUpdateTimer(options);
 * ```
 */
export declare class RecordUpdateTimer {
    /**
     * Updates the recording timer and progress time.
     * @function
     * @param {RecordUpdateTimerOptions} options - The options object containing necessary variables and functions.
     */
    /**
     * Updates the recording timer by calculating the elapsed time since the recording started
     * and formatting it in HH:MM:SS format.
     *
     * @param {Object} options - The options object.
     * @param {number} options.recordElapsedTime - The elapsed recording time in seconds.
     * @param {number} options.recordStartTime - The timestamp when the recording started.
     * @param {Function} options.updateRecordElapsedTime - Callback to update the elapsed recording time.
     * @param {Function} options.updateRecordingProgressTime - Callback to update the formatted recording time.
     * @returns {void}
     */
    recordUpdateTimer({ recordElapsedTime, recordStartTime, updateRecordElapsedTime, updateRecordingProgressTime, }: RecordUpdateTimerOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordUpdateTimer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RecordUpdateTimer>;
}
