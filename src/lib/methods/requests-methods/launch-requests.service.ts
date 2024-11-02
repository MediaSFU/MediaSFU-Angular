// requests.service.ts
import { Injectable } from '@angular/core';
export interface LaunchRequestsOptions {
  updateIsRequestsModalVisible: (isVisible: boolean) => void;
  isRequestsModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchRequestsType = (options: LaunchRequestsOptions) => void;

/**
 * Toggles the visibility state of the requests modal.
 *
 * @param {LaunchRequestsOptions} options - The options for launching requests.
 * @param {Function} options.updateIsRequestsModalVisible - Function to update the visibility state of the requests modal.
 * @param {boolean} options.isRequestsModalVisible - Current visibility state of the requests modal.
 * @returns {void}
 *
 * @remarks
 * This method is used to open or close the requests modal by toggling its visibility state.
 * It takes the current visibility state as input and updates it accordingly.
 *
 * @example
 * ```typescript
 * const options: LaunchRequestsOptions = {
 *   updateIsRequestsModalVisible: (isVisible) => {
 *     console.log('Requests modal visibility:', isVisible);
 *   },
 *   isRequestsModalVisible: false,
 * };
 *
 * const launchRequestsService = new LaunchRequests();
 * launchRequestsService.launchRequests(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class LaunchRequests {
  /**
   * Toggles the visibility state of the requests modal.
   *
   * @param {LaunchRequestsOptions} options - The options for launching requests.
   * @param {Function} options.updateIsRequestsModalVisible - Function to update the visibility state of the requests modal.
   * @param {boolean} options.isRequestsModalVisible - Current visibility state of the requests modal.
   * @returns {void}
   */

  launchRequests({
    updateIsRequestsModalVisible,
    isRequestsModalVisible,
  }: LaunchRequestsOptions): void {
    // Toggle the visibility of the display settings modal.
    updateIsRequestsModalVisible(!isRequestsModalVisible);
  }
}
