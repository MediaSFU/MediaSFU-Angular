import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
export interface UserWaitingOptions {
  name: string;
  showAlert?: ShowAlert;
  totalReqWait: number;
  updateTotalReqWait: (total: number) => void;
}

// Export the type definition for the function
export type UserWaitingType = (options: UserWaitingOptions) => Promise<void>;

/**
 * Service for handling user waiting room actions, including notifications and updating request counts.
 *
 * @class
 * @name UserWaiting
 * @description Manages the logic when a user joins the waiting room by displaying alerts and incrementing the total request count.
 *
 * @method
 * userWaiting
 * @async
 *
 * @param {UserWaitingOptions} options - The options for handling user waiting actions:
 *   - `name` {string}: Name of the user joining the waiting room.
 *   - `showAlert` {ShowAlert}: Optional function for showing an alert with a customizable message, type, and duration.
 *   - `totalReqWait` {number}: Current count of waiting requests.
 *   - `updateTotalReqWait` {Function}: Updates the total waiting request count.
 *
 * @returns {Promise<void>} Resolves after alert is shown and request count is updated.
 *
 * @example
 * const options = {
 *   name: 'Alice',
 *   showAlert: ({ message, type, duration }) => console.log(message),
 *   totalReqWait: 3,
 *   updateTotalReqWait: (newTotal) => console.log(`Updated count: ${newTotal}`)
 * };
 * await userWaitingService.userWaiting(options);
 */

@Injectable({
  providedIn: 'root',
})
export class UserWaiting {
  userWaiting = async ({
    name,
    showAlert,
    totalReqWait,
    updateTotalReqWait,
  }: UserWaitingOptions): Promise<void> => {
    // Display an alert/notification about the user joining the waiting room
    showAlert?.({
      message: `${name} joined the waiting room.`,
      type: 'success',
      duration: 3000,
    });

    // Update the total number of requests waiting in the waiting room
    const totalReqs = totalReqWait + 1;
    updateTotalReqWait(totalReqs);
  };
}
