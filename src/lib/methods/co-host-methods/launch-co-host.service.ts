import { Injectable } from '@angular/core';
export interface LaunchCoHostOptions {
  updateIsCoHostModalVisible: (isVisible: boolean) => void;
  isCoHostModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchCoHostType = (options: LaunchCoHostOptions) => void;

/**
 * Toggles the visibility of the co-host modal.
 *
 * This method is used to show or hide the co-host modal based on the current visibility state.
 *
 * @param {LaunchCoHostOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsCoHostModalVisible - Function to update the visibility state of the co-host modal.
 * @param {boolean} options.isCoHostModalVisible - Current visibility state of the co-host modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options: LaunchCoHostOptions = {
 *   updateIsCoHostModalVisible: (isVisible) => {
 *     console.log('Co-Host Modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isCoHostModalVisible: false,
 * };
 *
 * const launchCoHostService = new launchCoHost();
 * launchCoHostService.launchCoHost(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class launchCoHost {
  /**
   * Toggles the visibility of the co-host modal.
   *
   * @param updateIsCoHostModalVisible - Function to update the visibility state of the co-host modal.
   * @param isCoHostModalVisible - Current visibility state of the co-host modal.
   */

  launchCoHost({ updateIsCoHostModalVisible, isCoHostModalVisible }: LaunchCoHostOptions): void {
    updateIsCoHostModalVisible(!isCoHostModalVisible);
  }
}
