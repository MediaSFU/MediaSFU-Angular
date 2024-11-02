import { Injectable } from '@angular/core';
import { EventType, ShowAlert } from '../../@types/types';

export interface MeetingEndedOptions {
  showAlert?: ShowAlert;
  redirectURL?: string;
  onWeb: boolean;
  eventType: EventType;
  updateValidated?: (isValid: boolean) => void;
}

// Export the type definition for the function
export type MeetingEndedType = (options: MeetingEndedOptions) => Promise<void>;

/**
 * Service to handle the end of a meeting, including showing an alert and redirecting the user.
 *
 * @class
 * @name MeetingEnded
 * @description
 * This service provides a method to display a notification when a meeting ends and redirects the user to a specified URL or handles other post-meeting actions.
 *
 * @method
 * meetingEnded
 *
 * @param {MeetingEndedOptions} options - Options for handling the meeting end:
 *   - `showAlert` {Function}: Optional function to display an alert message.
 *   - `redirectURL` {string}: URL to redirect to after the meeting ends.
 *   - `onWeb` {boolean}: Specifies if the application is running on the web.
 *   - `eventType` {string}: Specifies the type of event ending the meeting.
 *
 * @returns {Promise<void>} Completes meeting end handling by displaying an alert and performing a redirect.
 *
 * @example
 * const options = {
 *   showAlert: (options) => console.log(options.message),
 *   redirectURL: 'https://example.com/home',
 *   onWeb: true,
 *   eventType: 'webinar',
 * };
 * meetingEndedService.meetingEnded(options);
 * // Displays alert and redirects to specified URL
 */


@Injectable({
  providedIn: 'root',
})
export class MeetingEnded {
  /**
   * Handles the end of a meeting by showing an alert and redirecting the user.
   *
   * @param {MeetingEndedOptions} options - The options for handling the meeting end.
   * @param {Function} options.showAlert - Function to show an alert message.
   * @param {string} options.redirectURL - URL to redirect to after the meeting ends.
   * @param {boolean} options.onWeb - Flag indicating if the application is running on the web.
   * @param {string} options.eventType - Type of the event that triggered the meeting end.
   *
   * @returns {Promise<void>} A promise that resolves when the meeting end handling is complete.
   */
  meetingEnded = async ({
    showAlert,
    redirectURL,
    onWeb,
    eventType,
  }: MeetingEndedOptions): Promise<void> => {
    // Show an alert that the meeting has ended and wait for 2 seconds before redirecting to the home page
    if (eventType !== 'chat') {
      showAlert?.({
        message: 'The event has ended. You will be redirected to the home page in 2 seconds.',
        type: 'danger',
        duration: 2000,
      });
    }

    if (onWeb && redirectURL) {
      setTimeout(() => {
        window.location.href = redirectURL;
      }, 2000);
    } else {
      // setTimeout(() => {
      //   updateValidated(false);
      // }, 2000);
    }
  };
}
