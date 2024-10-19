import * as i0 from "@angular/core";
export interface LaunchMenuModalOptions {
    updateIsMenuModalVisible: (isVisible: boolean) => void;
    isMenuModalVisible: boolean;
}
export type LaunchMenuModalType = (options: LaunchMenuModalOptions) => void;
export declare class LaunchMenuModal {
    /**
     * Toggles the visibility of the menu modal.
     *
     * @param updateIsMenuModalVisible - Function to update the visibility state of the menu modal.
     * @param isMenuModalVisible - Current visibility state of the menu modal.
     */
    launchMenuModal({ updateIsMenuModalVisible, isMenuModalVisible }: LaunchMenuModalOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchMenuModal, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchMenuModal>;
}
