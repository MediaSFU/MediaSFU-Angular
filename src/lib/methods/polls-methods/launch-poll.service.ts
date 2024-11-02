import { Injectable } from '@angular/core';
export interface LaunchPollOptions {
  updateIsPollModalVisible: (isVisible: boolean) => void;
  isPollModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchPollType = (options: LaunchPollOptions) => void;

/**
 * Toggles the visibility of the poll modal.
 *
 * @param {LaunchPollOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility state of the poll modal.
 * @param {boolean} options.isPollModalVisible - Current visibility state of the poll modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const launchPollService = new LaunchPoll();
 * launchPollService.launchPoll({
 *   updateIsPollModalVisible: (isVisible) => {
 *     console.log('Poll modal visibility:', isVisible);
 *   },
 *   isPollModalVisible: false,
 * });
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class LaunchPoll {
  /**
   * Toggles the visibility of the poll modal.
   * @function
   * @param {Object} options - The options object containing necessary variables and functions.
   * @param {Function} options.updateIsPollModalVisible - Function to update the visibility state of the poll modal.
   * @param {boolean} options.isPollModalVisible - Current visibility state of the poll modal.
   */

  launchPoll({ updateIsPollModalVisible, isPollModalVisible }: LaunchPollOptions): void {
    updateIsPollModalVisible(!isPollModalVisible);
  }
}
