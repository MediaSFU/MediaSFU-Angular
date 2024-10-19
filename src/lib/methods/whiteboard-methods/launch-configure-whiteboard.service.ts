// whiteboard.service.ts
import { Injectable } from '@angular/core';
export interface LaunchConfigureWhiteboardOptions {
  updateIsConfigureWhiteboardModalVisible: (visible: boolean) => void;
  isConfigureWhiteboardModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchConfigureWhiteboardType = (options: LaunchConfigureWhiteboardOptions) => void;

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
