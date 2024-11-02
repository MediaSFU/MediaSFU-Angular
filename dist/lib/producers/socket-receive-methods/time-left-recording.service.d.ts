import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface TimeLeftRecordingOptions {
    timeLeft: number;
    showAlert?: ShowAlert;
}
export type TimeLeftRecordingType = (options: TimeLeftRecordingOptions) => void;
/**
 * Service to display an alert indicating the remaining recording time.
 *
 * @class
 * @name TimeLeftRecording
 * @description Provides a method to show an alert when the recording is close to its end.
 *
 * @method
 * timeLeftRecording
 *
 * @param {TimeLeftRecordingOptions} options - Options for the remaining time alert:
 *   - `timeLeft` {number}: The time left in seconds before the recording stops.
 *   - `showAlert` {Function}: Optional function to display the alert message.
 *
 * @example
 * const options = {
 *   timeLeft: 30,
 *   showAlert: ({ message, duration, type }) => console.log(message)
 * };
 * timeLeftRecordingService.timeLeftRecording(options);
 */
export declare class TimeLeftRecording {
    /**
     * Displays an alert message indicating the remaining time left for recording.
     *
     * @param {TimeLeftRecordingOptions} options - The options for the time left recording.
     * @param {number} options.timeLeft - The amount of time left in seconds.
     * @param {Function} options.showAlert - The function to display the alert message.
     *
     * @throws {Error} If there is an issue displaying the alert message.
     */
    timeLeftRecording: ({ timeLeft, showAlert }: TimeLeftRecordingOptions) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeLeftRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TimeLeftRecording>;
}
