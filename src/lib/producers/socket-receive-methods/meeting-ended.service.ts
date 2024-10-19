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
