// display-settings.service.ts
import { Injectable } from '@angular/core';

export interface LaunchDisplaySettingsOptions {
  updateIsDisplaySettingsModalVisible: (isVisible: boolean) => void;
  isDisplaySettingsModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchDisplaySettingsType = (options: LaunchDisplaySettingsOptions) => void;

/**
 * Toggles the visibility of the display settings modal.
 *
 * This method allows you to show or hide the display settings modal by updating its visibility state.
 *
 * @param {LaunchDisplaySettingsOptions} options - The options for launching the display settings.
 * @param {Function} options.updateIsDisplaySettingsModalVisible - Function to update the visibility state of the display settings modal.
 * @param {boolean} options.isDisplaySettingsModalVisible - Current visibility state of the display settings modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options: LaunchDisplaySettingsOptions = {
 *   updateIsDisplaySettingsModalVisible: (isVisible) => console.log('Display settings modal is now:', isVisible),
 *   isDisplaySettingsModalVisible: false,
 * };
 *
 * const launchDisplaySettingsService = new LaunchDisplaySettings();
 * launchDisplaySettingsService.launchDisplaySettings(options);
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class LaunchDisplaySettings {
  /**
   * Toggles the visibility of the display settings modal.
   *
   * @param updateIsDisplaySettingsModalVisible - Function to update the visibility state of the display settings modal.
   * @param isDisplaySettingsModalVisible - Current visibility state of the display settings modal.
   */

  launchDisplaySettings({
    updateIsDisplaySettingsModalVisible,
    isDisplaySettingsModalVisible,
  }: LaunchDisplaySettingsOptions): void {
    // Toggle the visibility of the display settings modal.
    updateIsDisplaySettingsModalVisible(!isDisplaySettingsModalVisible);
  }
}
