import * as i0 from "@angular/core";
export interface LaunchMessagesOptions {
    updateIsMessagesModalVisible: (visible: boolean) => void;
    isMessagesModalVisible: boolean;
}
export type LaunchMessagesType = (options: LaunchMessagesOptions) => void;
/**
 * Toggles the visibility state of the messages modal.
 *
 * This method updates the visibility state of the messages modal by calling the provided
 * function with the negated current visibility state. If the modal is currently visible,
 * it will be closed; if it's hidden, it will be opened.
 *
 * @param {LaunchMessagesOptions} options - The options for launching the messages modal.
 * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
 * @param {boolean} options.isMessagesModalVisible - Current visibility state of the messages modal.
 *
 * @example
 * ```typescript
 * const launchMessagesService = new LaunchMessages();
 * launchMessagesService.launchMessages({
 *   updateIsMessagesModalVisible: (visible) => {
 *     console.log('Messages modal is now:', visible ? 'Visible' : 'Hidden');
 *   },
 *   isMessagesModalVisible: false, // Initially not visible
 * });
 * ```
 */
export declare class LaunchMessages {
    /**
     * Toggles the visibility state of the messages modal.
     * If the modal is currently visible, it will be closed. If it's hidden, it will be opened.
     *
     * @param updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
     * @param isMessagesModalVisible - Current visibility state of the messages modal.
     */
    launchMessages({ updateIsMessagesModalVisible, isMessagesModalVisible, }: LaunchMessagesOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchMessages, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchMessages>;
}
