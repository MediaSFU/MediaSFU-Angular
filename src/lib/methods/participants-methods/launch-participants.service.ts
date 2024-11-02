import { Injectable } from '@angular/core';
export interface LaunchParticipantsOptions {
  updateIsParticipantsModalVisible: (isVisible: boolean) => void;
  isParticipantsModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchParticipantsType = (options: LaunchParticipantsOptions) => void;

/**
 * Toggles the visibility of the participants modal.
 *
 * This method checks the current visibility state of the participants modal
 * and updates it accordingly. If the modal is currently visible, it will be hidden.
 * If it is hidden, it will be displayed.
 *
 * @param {LaunchParticipantsOptions} options - The options for toggling the participants modal.
 * @param {Function} options.updateIsParticipantsModalVisible - Function to update the visibility state of the participants modal.
 * @param {boolean} options.isParticipantsModalVisible - Current visibility state of the participants modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const launchParticipantsService = new LaunchParticipants();
 * launchParticipantsService.launchParticipants({
 *   updateIsParticipantsModalVisible: (isVisible) => {
 *     console.log(`Participants modal is now ${isVisible ? 'visible' : 'hidden'}`);
 *   },
 *   isParticipantsModalVisible: false,
 * });
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class LaunchParticipants {
  /**
   * Toggles the visibility of the participants modal.
   * @function
   * @param {Object} options - The options object containing necessary variables and functions.
   * @param {Function} options.updateIsParticipantsModalVisible - Function to update the visibility state of the participants modal.
   * @param {boolean} options.isParticipantsModalVisible - Current visibility state of the participants modal.
   */

  launchParticipants({
    updateIsParticipantsModalVisible,
    isParticipantsModalVisible,
  }: LaunchParticipantsOptions): void {
    updateIsParticipantsModalVisible(!isParticipantsModalVisible);
  }
}
