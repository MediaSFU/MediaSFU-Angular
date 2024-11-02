import * as i0 from "@angular/core";
export interface LaunchWaitingOptions {
    updateIsWaitingModalVisible: (visible: boolean) => void;
    isWaitingModalVisible: boolean;
}
export type LaunchWaitingType = (options: LaunchWaitingOptions) => void;
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
