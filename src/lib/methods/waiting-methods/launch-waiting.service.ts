import { Injectable } from '@angular/core';
export interface LaunchWaitingOptions {
  updateIsWaitingModalVisible: (visible: boolean) => void;
  isWaitingModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchWaitingType = (options: LaunchWaitingOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class LaunchWaiting {
  /**
   * Toggles the visibility of the waiting modal.
   *
   * @param updateIsWaitingModalVisible - Function to update the visibility state of the waiting modal.
   * @param isWaitingModalVisible - Current visibility state of the waiting modal.
   */

  launchWaiting({
    updateIsWaitingModalVisible,
    isWaitingModalVisible,
  }: LaunchWaitingOptions): void {
    // Open or close the menu modal
    updateIsWaitingModalVisible(!isWaitingModalVisible);
  }
}
