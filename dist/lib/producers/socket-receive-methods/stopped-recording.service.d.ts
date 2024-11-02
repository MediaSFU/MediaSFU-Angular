import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface StoppedRecordingOptions {
    state: string;
    reason: string;
    showAlert?: ShowAlert;
}
export type StoppedRecordingType = (options: StoppedRecordingOptions) => Promise<void>;
/**
 * Service to display an alert message when recording has stopped.
 *
 * @class
 * @name StoppedRecording
 * @description Provides a method to show an alert indicating that the recording has stopped.
 *
 * @method
 * stoppedRecording
 *
 * @param {StoppedRecordingOptions} options - Options for displaying the alert:
 *   - `state` {string}: The state of the recording, typically 'stop'.
 *   - `reason` {string}: The reason for stopping the recording.
 *   - `showAlert` {Function}: Optional function to show alert messages.
 *
 * @returns {Promise<void>} Resolves when the alert message has been displayed.
 *
 * @example
 * const options = {
 *   state: 'stop',
 *   reason: 'User ended recording',
 *   showAlert: ({ message, duration, type }) => console.log(message)
 * };
 * stoppedRecordingService.stoppedRecording(options);
 */
export declare class StoppedRecording {
    /**
     * Displays an alert message when the recording has stopped.
     *
     * @param {Object} options - The options for displaying the alert message.
     * @param {string} options.state - The state of the recording.
     * @param {string} options.reason - The reason for stopping the recording.
     * @param {Function} options.showAlert - Function to show alerts.
     * @returns {Promise<void>} A promise that resolves when the alert message is displayed.
     */
    stoppedRecording: ({ state, reason, showAlert, }: StoppedRecordingOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoppedRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StoppedRecording>;
}
