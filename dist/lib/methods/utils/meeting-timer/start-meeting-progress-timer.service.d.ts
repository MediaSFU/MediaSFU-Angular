import * as i0 from "@angular/core";
export interface StartMeetingProgressTimerParameters {
    updateMeetingProgressTime: (formattedTime: string) => void;
    validated: boolean;
    roomName: string;
    getUpdatedAllParams: () => StartMeetingProgressTimerParameters;
    [key: string]: any;
}
export interface StartMeetingProgressTimerOptions {
    startTime: number;
    parameters: StartMeetingProgressTimerParameters;
}
export type StartMeetingProgressTimerType = (options: StartMeetingProgressTimerOptions) => void;
/**
 * Starts a timer to track the progress of a meeting.
 *
 * @param {StartMeetingProgressTimerOptions} options - The options for starting the meeting progress timer.
 * @param {number} options.startTime - The custom start time for the meeting progress timer in seconds since epoch.
 * @param {StartMeetingProgressTimerParameters} options.parameters - The parameters required for updating the meeting progress.
 * @param {Function} options.parameters.updateMeetingProgressTime - Function to update the formatted meeting progress time.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 *
 * @returns {void}
 *
 * @remarks
 * This function calculates the elapsed time since the meeting started and updates the meeting progress every second.
 * The timer will stop if the validated flag is set to false or if the room name is not valid.
 *
 * The time is formatted in HH:MM:SS format, and the update function is called with the formatted time.
 *
 * @example
 * ```typescript
 * const options: StartMeetingProgressTimerOptions = {
 *   startTime: Math.floor(Date.now() / 1000), // Current time in seconds
 *   parameters: {
 *     updateMeetingProgressTime: (formattedTime) => console.log(`Meeting Progress: ${formattedTime}`),
 *     validated: true,
 *     roomName: 'Room123',
 *     getUpdatedAllParams: () => ({
 *       validated: true,
 *       roomName: 'Room123',
 *       updateMeetingProgressTime: options.parameters.updateMeetingProgressTime,
 *     }),
 *   },
 * };
 *
 * const timerService = new StartMeetingProgressTimer();
 * timerService.startMeetingProgressTimer(options);
 * ```
 */
export declare class StartMeetingProgressTimer {
    private timeProgress;
    /**
     * Starts a timer to track the progress of a meeting.
     *
     * @param {Object} options - The options for starting the meeting progress timer.
     * @param {number} options.startTime - The custom start time for the meeting progress timer.
     * @param {Object} options.parameters - The parameters required for updating the meeting progress.
     * @param {Function} options.parameters.updateMeetingProgressTime - Function to update the meeting progress time.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     *
     * @returns {void}
     */
    startMeetingProgressTimer: ({ startTime, parameters, }: StartMeetingProgressTimerOptions) => void;
    stopMeetingProgressTimer: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StartMeetingProgressTimer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StartMeetingProgressTimer>;
}
