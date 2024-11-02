import { EventType, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface MeetingTimeRemainingOptions {
    timeRemaining: number;
    showAlert?: ShowAlert;
    eventType: EventType;
}
export type MeetingTimeRemainingType = (options: MeetingTimeRemainingOptions) => Promise<void>;
/**
 * Service to handle the remaining time for a meeting and display an alert if necessary.
 *
 * @class
 * @name MeetingTimeRemaining
 * @description
 * Manages the display of a time remaining alert for meetings, except when the event type is 'chat'.
 *
 * @method
 * meetingTimeRemaining
 *
 * @param {MeetingTimeRemainingOptions} options - Options for managing meeting time:
 *   - `timeRemaining` {number}: The remaining time in milliseconds.
 *   - `showAlert` {Function}: Optional function to display an alert message.
 *   - `eventType` {EventType}: The type of the event (e.g., "meeting", "broadcast", "chat").
 *
 * @returns {Promise<void>} Displays an alert with the remaining time for the meeting.
 *
 * @example
 * const options = {
 *   timeRemaining: 180000, // 3 minutes in milliseconds
 *   showAlert: (options) => console.log(options.message),
 *   eventType: 'meeting'
 * };
 * await meetingTimeRemainingService.meetingTimeRemaining(options);
 * // Output: Displays "The event will end in 3:00 minutes."
 */
export declare class MeetingTimeRemaining {
    /**
     * Handles the remaining time for a meeting and shows an alert if the event type is not 'chat'.
     *
     * @param {Object} options - The options for the meeting time remaining.
     * @param {number} options.timeRemaining - The remaining time in milliseconds.
     * @param {Function} options.showAlert - The function to show an alert message.
     * @param {string} options.eventType - The type of the event.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    meetingTimeRemaining: ({ timeRemaining, showAlert, eventType, }: MeetingTimeRemainingOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeetingTimeRemaining, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MeetingTimeRemaining>;
}
