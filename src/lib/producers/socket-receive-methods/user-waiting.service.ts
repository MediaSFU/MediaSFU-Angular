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
 * @fileoverview Service to handle user waiting functionality.
 *
 * @description
 * This service provides methods to handle the logic when a user joins the waiting room.
 * It displays an alert/notification and updates the total number of requests waiting.
 */

/**
 * Options for the userWaiting method.
 *
 * @interface UserWaitingOptions
 * @property {string} name - The name of the user joining the waiting room.
 * @property {(options: { message: string; type: string; duration: number }) => void} [showAlert] - Optional function to display an alert/notification.
 * @property {number} totalReqWait - The current total number of requests waiting.
 * @property {(total: number) => void} updateTotalReqWait - Function to update the total number of requests waiting.
 */

/**
 * Service to handle user waiting functionality.
 *
 * @class
 * @name UserWaiting
 * @description
 * This service provides methods to handle the logic when a user joins the waiting room.
 * It displays an alert/notification and updates the total number of requests waiting.
 *
 * @example
 * const userWaitingService = new UserWaiting();
 * userWaitingService.userWaiting({
 *   name: 'John Doe',
 *   showAlert: (options) => console.log(options.message),
 *   totalReqWait: 5,
 *   updateTotalReqWait: (total) => console.log(`Total requests: ${total}`),
 * });
 */

/**
 * Handles the logic when a user joins the waiting room.
 *
 * @method
 * @name userWaiting
 * @memberof UserWaiting
 * @async
 *
 * @param {UserWaitingOptions} options - The options for the user waiting method.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @example
 * const options = {
 *   name: 'John Doe',
 *   showAlert: (options) => console.log(options.message),
 *   totalReqWait: 5,
 *   updateTotalReqWait: (total) => console.log(`Total requests: ${total}`),
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
