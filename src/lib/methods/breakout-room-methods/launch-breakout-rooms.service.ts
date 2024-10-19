import { Injectable } from '@angular/core';
export interface LaunchBreakoutRoomsOptions {
  updateIsBreakoutRoomsModalVisible: (isVisible: boolean) => void;
  isBreakoutRoomsModalVisible: boolean;
}

// Export the type definition for the function
export type LaunchBreakoutRoomsType = (options: LaunchBreakoutRoomsOptions) => void;

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
    updateIsBreakoutRoomsModalVisible(!isBreakoutRoomsModalVisible);
  }
}
