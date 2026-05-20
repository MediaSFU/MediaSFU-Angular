import { Injectable } from '@angular/core';
import { launchBreakoutRooms as sharedLaunchBreakoutRooms } from 'mediasfu-shared';
import type { LaunchBreakoutRoomsOptions } from 'mediasfu-shared';
export type { LaunchBreakoutRoomsOptions, LaunchBreakoutRoomsType } from 'mediasfu-shared';


/**
 * Launches the breakout rooms by toggling the visibility of the breakout rooms modal.
 *
 * This method is used to show or hide the breakout rooms modal based on the current visibility state.
 *
 * @param {LaunchBreakoutRoomsOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsBreakoutRoomsModalVisible - Function to update the visibility state of the breakout rooms modal.
 * @param {boolean} options.isBreakoutRoomsModalVisible - Current visibility state of the breakout rooms modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options: LaunchBreakoutRoomsOptions = {
 *   updateIsBreakoutRoomsModalVisible: (isVisible) => {
 *     console.log('Breakout Rooms Modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isBreakoutRoomsModalVisible: false,
 * };
 *
 * const launchBreakoutRoomsService = new LaunchBreakoutRooms();
 * launchBreakoutRoomsService.launchBreakoutRooms(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class LaunchBreakoutRooms {
  /**
   * Launches the breakout rooms by toggling the visibility of the breakout rooms modal.
   *
   * @param updateIsBreakoutRoomsModalVisible - Function to update the visibility state of the breakout rooms modal.
   * @param isBreakoutRoomsModalVisible - Current visibility state of the breakout rooms modal.
   */

  launchBreakoutRooms({
    updateIsBreakoutRoomsModalVisible,
    isBreakoutRoomsModalVisible,
  }: LaunchBreakoutRoomsOptions): void {
    sharedLaunchBreakoutRooms({ updateIsBreakoutRoomsModalVisible, isBreakoutRoomsModalVisible });
  }
}
