import * as i0 from "@angular/core";
export interface LaunchCoHostOptions {
    updateIsCoHostModalVisible: (isVisible: boolean) => void;
    isCoHostModalVisible: boolean;
}
export type LaunchCoHostType = (options: LaunchCoHostOptions) => void;
/**
 * Toggles the visibility of the co-host modal.
 *
 * This method is used to show or hide the co-host modal based on the current visibility state.
 *
 * @param {LaunchCoHostOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsCoHostModalVisible - Function to update the visibility state of the co-host modal.
 * @param {boolean} options.isCoHostModalVisible - Current visibility state of the co-host modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options: LaunchCoHostOptions = {
 *   updateIsCoHostModalVisible: (isVisible) => {
 *     console.log('Co-Host Modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isCoHostModalVisible: false,
 * };
 *
 * const launchCoHostService = new launchCoHost();
 * launchCoHostService.launchCoHost(options);
 * ```
 */
export declare class launchCoHost {
    /**
     * Toggles the visibility of the co-host modal.
     *
     * @param updateIsCoHostModalVisible - Function to update the visibility state of the co-host modal.
     * @param isCoHostModalVisible - Current visibility state of the co-host modal.
     */
    launchCoHost({ updateIsCoHostModalVisible, isCoHostModalVisible }: LaunchCoHostOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<launchCoHost, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<launchCoHost>;
}
