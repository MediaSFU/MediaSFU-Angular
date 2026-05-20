import type { LaunchBreakoutRoomsOptions } from 'mediasfu-shared';
import * as i0 from "@angular/core";
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
export declare class LaunchBreakoutRooms {
    /**
     * Launches the breakout rooms by toggling the visibility of the breakout rooms modal.
     *
     * @param updateIsBreakoutRoomsModalVisible - Function to update the visibility state of the breakout rooms modal.
     * @param isBreakoutRoomsModalVisible - Current visibility state of the breakout rooms modal.
     */
    launchBreakoutRooms({ updateIsBreakoutRoomsModalVisible, isBreakoutRoomsModalVisible, }: LaunchBreakoutRoomsOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchBreakoutRooms, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchBreakoutRooms>;
}
