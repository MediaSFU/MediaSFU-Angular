import { Injectable } from '@angular/core';
export interface LaunchConfirmExitOptions {
  updateIsConfirmExitModalVisible: (isVisible: boolean) => void;
  isConfirmExitModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchConfirmExitType = (options: LaunchConfirmExitOptions) => void;

/**
 * Toggles the visibility of the confirmation exit modal.
 *
 * This method updates the state of the confirmation exit modal by inverting its current visibility status.
 *
 * @param {LaunchConfirmExitOptions} options - The options for toggling the confirmation exit modal visibility.
 * @param {Function} options.updateIsConfirmExitModalVisible - Function to update the visibility state of the confirmation exit modal.
 * @param {boolean} options.isConfirmExitModalVisible - Current visibility state of the confirmation exit modal.
 *
 * @example
 * ```typescript
 * const launchConfirmExitService = new LaunchConfirmExit();
 * launchConfirmExitService.launchConfirmExit({
 *   updateIsConfirmExitModalVisible: (isVisible) => {
 *     console.log('Confirm exit modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isConfirmExitModalVisible: false, // Initially not visible
 * });
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class LaunchConfirmExit {
  /**
   * Toggles the visibility of the confirmation exit modal.
   *
   * @param updateIsConfirmExitModalVisible - Function to update the visibility state of the confirmation exit modal.
   * @param isConfirmExitModalVisible - Current visibility state of the confirmation exit modal.
   */

  launchConfirmExit({
    updateIsConfirmExitModalVisible,
    isConfirmExitModalVisible,
  }: LaunchConfirmExitOptions): void {
    updateIsConfirmExitModalVisible(!isConfirmExitModalVisible);
  }
}
