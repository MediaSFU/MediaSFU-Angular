import * as i0 from "@angular/core";
export interface LaunchConfirmExitOptions {
    updateIsConfirmExitModalVisible: (isVisible: boolean) => void;
    isConfirmExitModalVisible: boolean;
}
export type LaunchConfirmExitType = (options: LaunchConfirmExitOptions) => void;
export declare class LaunchConfirmExit {
    /**
     * Toggles the visibility of the confirmation exit modal.
     *
     * @param updateIsConfirmExitModalVisible - Function to update the visibility state of the confirmation exit modal.
     * @param isConfirmExitModalVisible - Current visibility state of the confirmation exit modal.
     */
    launchConfirmExit({ updateIsConfirmExitModalVisible, isConfirmExitModalVisible, }: LaunchConfirmExitOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchConfirmExit, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchConfirmExit>;
}