import * as i0 from "@angular/core";
export interface LaunchWaitingOptions {
    updateIsWaitingModalVisible: (visible: boolean) => void;
    isWaitingModalVisible: boolean;
}
export type LaunchWaitingType = (options: LaunchWaitingOptions) => void;
export declare class LaunchWaiting {
    /**
     * Toggles the visibility of the waiting modal.
     *
     * @param updateIsWaitingModalVisible - Function to update the visibility state of the waiting modal.
     * @param isWaitingModalVisible - Current visibility state of the waiting modal.
     */
    launchWaiting({ updateIsWaitingModalVisible, isWaitingModalVisible, }: LaunchWaitingOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchWaiting, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchWaiting>;
}
