import * as i0 from "@angular/core";
export interface LaunchMenuModalOptions {
    updateIsMenuModalVisible: (isVisible: boolean) => void;
    isMenuModalVisible: boolean;
}
export type LaunchMenuModalType = (options: LaunchMenuModalOptions) => void;
/**
 * Toggles the visibility of the menu modal.
 *
 * This method updates the visibility state of the menu modal by calling the provided
 * function with the negated current visibility state. If the modal is currently visible,
 * it will be hidden, and vice versa.
 *
 * @param {LaunchMenuModalOptions} options - The options for launching the menu modal.
 * @param {Function} options.updateIsMenuModalVisible - Function to update the visibility state of the menu modal.
 * @param {boolean} options.isMenuModalVisible - Current visibility state of the menu modal.
 *
 * @example
 * ```typescript
 * const launchMenuModalService = new LaunchMenuModal();
 * launchMenuModalService.launchMenuModal({
 *   updateIsMenuModalVisible: (isVisible) => {
 *     console.log('Menu modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isMenuModalVisible: false, // Initially not visible
 * });
 * ```
 */
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
