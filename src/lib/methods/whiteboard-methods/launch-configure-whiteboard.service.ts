// whiteboard.service.ts
import { Injectable } from '@angular/core';
export interface LaunchConfigureWhiteboardOptions {
  updateIsConfigureWhiteboardModalVisible: (visible: boolean) => void;
  isConfigureWhiteboardModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchConfigureWhiteboardType = (options: LaunchConfigureWhiteboardOptions) => void;

/**
 * Toggles the visibility of the configure whiteboard modal.
 *
 * @param {LaunchConfigureWhiteboardOptions} options - Options to control whiteboard configuration modal.
 * @param {Function} options.updateIsConfigureWhiteboardModalVisible - Function to update the modal's visibility state.
 * @param {boolean} options.isConfigureWhiteboardModalVisible - Current visibility state of the configure whiteboard modal.
 *
 * This function uses the current visibility state to toggle the whiteboard configuration modal on or off.
 *
 * @example
 * ```typescript
 * const launchService = new LaunchConfigureWhiteboard();
 * launchService.launchConfigureWhiteboard({
 *   updateIsConfigureWhiteboardModalVisible: (visible) => console.log('Modal Visible:', visible),
 *   isConfigureWhiteboardModalVisible: false
 * });
 * ```
 *
 * In this example, the modal visibility state is toggled, and the updated visibility state is logged.
 */


@Injectable({
  providedIn: 'root',
})
export class LaunchConfigureWhiteboard {
  /**
   * Toggles the visibility of the configure whiteboard modal.
   *
   * @param updateIsConfigureWhiteboardModalVisible - Function to update the visibility state of the configure whiteboard modal.
   * @param isConfigureWhiteboardModalVisible - Current visibility state of the configure whiteboard modal.
   */

  launchConfigureWhiteboard({
    updateIsConfigureWhiteboardModalVisible,
    isConfigureWhiteboardModalVisible,
  }: LaunchConfigureWhiteboardOptions): void {
    // Open or close the menu modal
    updateIsConfigureWhiteboardModalVisible(!isConfigureWhiteboardModalVisible);
  }
}
