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

/**
 * Service to handle disconnection logic, providing options to redirect or display an alert message.
 *
 * @class
 * @name Disconnect
 * @description This service manages user disconnection by either redirecting the user to a specified URL (for web platforms) or showing a custom alert message.
 *
 * @method
 * disconnect
 * @async
 * @param {DisconnectOptions} options - The options for handling disconnection.
 * @param {Function} options.showAlert - Function to display an alert message if a redirect is not needed.
 * @param {string} options.redirectURL - The URL to redirect to upon disconnection, if applicable.
 * @param {boolean} options.onWeb - Flag indicating if the application is running on the web.
 * @param {Function} [options.updateValidated] - Optional function to update validation state, primarily for native applications.
 * @returns {Promise<void>} A promise that resolves when the disconnection process completes.
 *
 * @example
 * const disconnectOptions = {
 *   showAlert: (alert) => console.log(alert.message),
 *   redirectURL: 'https://example.com/home',
 *   onWeb: true,
 *   updateValidated: (isValid) => console.log(`Validation updated: ${isValid}`)
 * };
 * disconnectService.disconnect(disconnectOptions);
 */

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
