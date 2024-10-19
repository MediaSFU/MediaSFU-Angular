import { Injectable } from '@angular/core';
export interface LaunchConfirmExitOptions {
  updateIsConfirmExitModalVisible: (isVisible: boolean) => void;
  isConfirmExitModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchConfirmExitType = (options: LaunchConfirmExitOptions) => void;

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
