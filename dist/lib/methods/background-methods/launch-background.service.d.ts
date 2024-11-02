import * as i0 from "@angular/core";
export interface LaunchBackgroundOptions {
    updateIsBackgroundModalVisible: (isVisible: boolean) => void;
    isBackgroundModalVisible: boolean;
}
export type LaunchBackgroundType = (options: LaunchBackgroundOptions) => void;
/**
 * Toggles the visibility of the background modal.
 *
 * This method updates the visibility state of the background modal by calling
 * the provided update function with the negation of the current visibility state.
 *
 * @param {LaunchBackgroundOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsBackgroundModalVisible - Function to update the visibility state of the background modal.
 * @param {boolean} options.isBackgroundModalVisible - Current visibility state of the background modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options = {
 *   updateIsBackgroundModalVisible: (isVisible) => {
 *     console.log(`Background modal is now ${isVisible ? 'visible' : 'hidden'}.`);
 *   },
 *   isBackgroundModalVisible: false,
 * };
 *
 * const launchBackgroundService = new LaunchBackground();
 * launchBackgroundService.launchBackground(options);
 * ```
 */
export declare class LaunchBackground {
    /**
     * Toggles the visibility of the background modal.
     * @function
     * @param {Object} options - The options object containing necessary variables and functions.
     * @param {Function} options.updateIsBackgroundModalVisible - Function to update the visibility state of the background modal.
     * @param {boolean} options.isBackgroundModalVisible - Current visibility state of the background modal.
     */
    launchBackground({ updateIsBackgroundModalVisible, isBackgroundModalVisible, }: LaunchBackgroundOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchBackground, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchBackground>;
}
