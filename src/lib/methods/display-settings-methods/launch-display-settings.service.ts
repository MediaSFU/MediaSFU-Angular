// display-settings.service.ts
import { Injectable } from '@angular/core';
import { launchDisplaySettings as sharedLaunchDisplaySettings } from 'mediasfu-shared';
import type { LaunchDisplaySettingsOptions } from 'mediasfu-shared';
export type { LaunchDisplaySettingsOptions, LaunchDisplaySettingsType } from 'mediasfu-shared';

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
    sharedLaunchDisplaySettings({
      updateIsDisplaySettingsModalVisible,
      isDisplaySettingsModalVisible,
    });
  }
}
