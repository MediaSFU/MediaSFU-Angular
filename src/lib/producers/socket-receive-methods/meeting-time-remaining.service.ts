import { Injectable } from '@angular/core';
import { EventType, ShowAlert } from '../../@types/types';

export interface MeetingTimeRemainingOptions {
  timeRemaining: number;
  showAlert?: ShowAlert;
  eventType: EventType;
}

// Export the type definition for the function
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


@Injectable({
  providedIn: 'root',
})
export class MeetingTimeRemaining {
  /**
   * Handles the remaining time for a meeting and shows an alert if the event type is not 'chat'.
   *
   * @param {Object} options - The options for the meeting time remaining.
   * @param {number} options.timeRemaining - The remaining time in milliseconds.
   * @param {Function} options.showAlert - The function to show an alert message.
   * @param {string} options.eventType - The type of the event.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  meetingTimeRemaining = async ({
    timeRemaining,
    showAlert,
    eventType,
  }: MeetingTimeRemainingOptions): Promise<void> => {
    // Convert time from milliseconds to readable format of minutes and seconds
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    const timeRemainingString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Show alert with time remaining if eventType is not 'chat'
    if (eventType !== 'chat') {
      showAlert?.({
        message: `The event will end in ${timeRemainingString} minutes.`,
        type: 'success',
        duration: 3000,
      });
    }
  };
}
