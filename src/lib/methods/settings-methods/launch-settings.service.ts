// settings.service.ts

import { Injectable } from '@angular/core';
export interface LaunchSettingsOptions {
  updateIsSettingsModalVisible: (isVisible: boolean) => void;
  isSettingsModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchSettingsType = (options: LaunchSettingsOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class LaunchSettings {
  /**
   * Toggles the visibility state of the settings modal.
   *
   * @param {LaunchSettingsOptions} options - The options for launching settings.
   * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility state of the settings modal.
   * @param {boolean} options.isSettingsModalVisible - Current visibility state of the settings modal.
   * @returns {void}
   */

  launchSettings({
    updateIsSettingsModalVisible,
    isSettingsModalVisible,
  }: LaunchSettingsOptions): void {
    // Toggle the visibility of the display settings modal.
    updateIsSettingsModalVisible(!isSettingsModalVisible);
  }
}
