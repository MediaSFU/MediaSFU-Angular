import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';

export interface PersonJoinedOptions {
  showAlert?: ShowAlert;
  name: string;
}

// Export the type definition for the function
export type PersonJoinedType = (options: PersonJoinedOptions) => Promise<void>;

/**
 * Service to handle actions when a person joins an event.
 *
 * @class
 * @name PersonJoined
 * @description
 * Displays a notification when a person joins the event, using the `showAlert` function if provided.
 *
 * @method
 * personJoined
 *
 * @param {PersonJoinedOptions} options - Contains information about the person and alert display function:
 *   - `name` {string}: The name of the person who joined.
 *   - `showAlert` {Function} (optional): Function to display a notification when the person joins.
 *
 * @returns {void} Executes alert display through `showAlert` if defined.
 *
 * @example
 * const options = {
 *   name: 'Alice',
 *   showAlert: ({ message, type, duration }) => console.log(message)
 * };
 * personJoinedService.personJoined(options);
 * // Logs: "Alice joined the event."
 */

@Injectable({
  providedIn: 'root',
})
export class PersonJoined {
  /**
   * Handles the event when a person joins.
   *
   * @param {PersonJoinedOptions} options - The options for the person joined event.
   * @param {string} options.name - The name of the person who joined.
   * @param {Function} options.showAlert - A function to display an alert/notification.
   * @returns {Promise<void>} A promise that resolves when the alert has been shown.
   */
  personJoined = ({ name, showAlert }: PersonJoinedOptions): void => {
    // Display an alert/notification about the person joining the event
    showAlert?.({
      message: `${name} joined the event.`,
      type: 'success',
      duration: 3000,
    });
  };
}
