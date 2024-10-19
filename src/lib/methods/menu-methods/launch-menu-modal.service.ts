import { Injectable } from '@angular/core';
export interface LaunchMenuModalOptions {
  updateIsMenuModalVisible: (isVisible: boolean) => void;
  isMenuModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchMenuModalType = (options: LaunchMenuModalOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class LaunchMenuModal {
  /**
   * Toggles the visibility of the menu modal.
   *
   * @param updateIsMenuModalVisible - Function to update the visibility state of the menu modal.
   * @param isMenuModalVisible - Current visibility state of the menu modal.
   */

  launchMenuModal({ updateIsMenuModalVisible, isMenuModalVisible }: LaunchMenuModalOptions): void {
    updateIsMenuModalVisible(!isMenuModalVisible);
  }
}
