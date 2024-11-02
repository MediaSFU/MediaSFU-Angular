import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';

export interface TimeLeftRecordingOptions {
  timeLeft: number;
  showAlert?: ShowAlert;
}

// Export the type definition for the function
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


@Injectable({
  providedIn: 'root',
})
export class TimeLeftRecording {
  /**
   * Displays an alert message indicating the remaining time left for recording.
   *
   * @param {TimeLeftRecordingOptions} options - The options for the time left recording.
   * @param {number} options.timeLeft - The amount of time left in seconds.
   * @param {Function} options.showAlert - The function to display the alert message.
   *
   * @throws {Error} If there is an issue displaying the alert message.
   */
  timeLeftRecording = ({ timeLeft, showAlert }: TimeLeftRecordingOptions): void => {
    try {
      // Display alert message

      showAlert?.({
        message: `The recording will stop in less than ${timeLeft} seconds.`,
        duration: 3000,
        type: 'danger',
      });
    } catch (error) {
      console.log('Error in timeLeftRecording: ', error);
      // throw new Error("Failed to display the time left alert message.");
    }
  };
}
