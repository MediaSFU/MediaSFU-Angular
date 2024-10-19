import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';

export interface DisconnectOptions {
  showAlert?: ShowAlert;
  redirectURL?: string;
  onWeb: boolean;
  updateValidated?: (isValidated: boolean) => void;
}

// Export the type definition for the function
export type DisconnectType = (options: DisconnectOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class Disconnect {
  /**
   * Handles the disconnection logic by either redirecting to a specified URL or showing an alert.
   *
   * @param {DisconnectOptions} options - The options for handling disconnection.
   * @param {Function} options.showAlert - Function to display an alert message.
   * @param {string} options.redirectURL - URL to redirect to if on the web.
   * @param {boolean} options.onWeb - Flag indicating if the operation is on the web.
   * @returns {Promise<void>} A promise that resolves when the disconnection handling is complete.
   */
  disconnect = async ({ showAlert, redirectURL, onWeb }: DisconnectOptions): Promise<void> => {
    // Redirect to the specified URL on the web
    if (onWeb && redirectURL) {
      window.location.href = redirectURL;
    } else {
      // Display an alert and update the validated state
      if (showAlert) {
        showAlert({
          message: 'You have been disconnected from the session.',
          type: 'danger',
          duration: 2000,
        });
      }
    }
  };
}
