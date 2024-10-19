import * as i0 from "@angular/core";
export interface LaunchBreakoutRoomsOptions {
    updateIsBreakoutRoomsModalVisible: (isVisible: boolean) => void;
    isBreakoutRoomsModalVisible: boolean;
}
export type LaunchBreakoutRoomsType = (options: LaunchBreakoutRoomsOptions) => void;
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
