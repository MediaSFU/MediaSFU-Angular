// display-settings.service.ts
import { Injectable } from '@angular/core';

export interface LaunchDisplaySettingsOptions {
  updateIsDisplaySettingsModalVisible: (isVisible: boolean) => void;
  isDisplaySettingsModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchDisplaySettingsType = (options: LaunchDisplaySettingsOptions) => void;

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
