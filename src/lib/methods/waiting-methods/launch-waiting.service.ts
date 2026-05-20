import { Injectable } from '@angular/core';
import { launchWaiting as sharedLaunchWaiting } from 'mediasfu-shared';
import type { LaunchWaitingOptions } from 'mediasfu-shared';
export type { LaunchWaitingOptions, LaunchWaitingType } from 'mediasfu-shared';

/**
 * Service to toggle the visibility of a waiting modal.
 *
 * @param {LaunchWaitingOptions} options - The options to control the waiting modal visibility.
 * @param {Function} options.updateIsWaitingModalVisible - Function to update the visibility of the waiting modal.
 * @param {boolean} options.isWaitingModalVisible - Current visibility state of the waiting modal.
 *
 * @example
 * ```typescript
 * const launchWaitingService = new LaunchWaiting();
 * launchWaitingService.launchWaiting({
 *   updateIsWaitingModalVisible: (isVisible) => console.log(`Modal is now ${isVisible ? 'visible' : 'hidden'}`),
 *   isWaitingModalVisible: false,
 * });
 * ```
 *
 * This example toggles the modal's visibility state, making it visible if it was hidden and vice versa.
 */


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
    sharedLaunchWaiting({
      updateIsWaitingModalVisible,
      isWaitingModalVisible,
    });
  }
}
