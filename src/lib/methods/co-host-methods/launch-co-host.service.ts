import { Injectable } from '@angular/core';
export interface LaunchCoHostOptions {
  updateIsCoHostModalVisible: (isVisible: boolean) => void;
  isCoHostModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchCoHostType = (options: LaunchCoHostOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class launchCoHost {
  /**
   * Toggles the visibility of the co-host modal.
   *
   * @param updateIsCoHostModalVisible - Function to update the visibility state of the co-host modal.
   * @param isCoHostModalVisible - Current visibility state of the co-host modal.
   */

  launchCoHost({ updateIsCoHostModalVisible, isCoHostModalVisible }: LaunchCoHostOptions): void {
    updateIsCoHostModalVisible(!isCoHostModalVisible);
  }
}
