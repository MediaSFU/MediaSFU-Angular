// settings.service.ts

import { Injectable } from '@angular/core';
import { launchSettings as sharedLaunchSettings } from 'mediasfu-shared';
import type { LaunchSettingsOptions } from 'mediasfu-shared';
export type { LaunchSettingsOptions, LaunchSettingsType } from 'mediasfu-shared';

/**
 * Toggles the visibility state of the settings modal.
 *
 * @param {LaunchSettingsOptions} options - The options for launching settings.
 * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility state of the settings modal.
 * @param {boolean} options.isSettingsModalVisible - Current visibility state of the settings modal.
 * @returns {void}
 *
 * @remarks
 * This method toggles the current visibility state of the settings modal.
 * If the modal is currently visible, it will be hidden, and vice versa.
 *
 * @example
 * ```typescript
 * const options: LaunchSettingsOptions = {
 *   updateIsSettingsModalVisible: (isVisible) => {
 *     console.log('Settings modal visibility:', isVisible);
 *   },
 *   isSettingsModalVisible: false,
 * };
 *
 * const launchSettingsService = new LaunchSettings();
 * launchSettingsService.launchSettings(options);
 * ```
 */


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
    sharedLaunchSettings({ updateIsSettingsModalVisible, isSettingsModalVisible });
  }
}
