import * as i0 from "@angular/core";
export interface LaunchRequestsOptions {
    updateIsRequestsModalVisible: (isVisible: boolean) => void;
    isRequestsModalVisible: boolean;
}
export type LaunchRequestsType = (options: LaunchRequestsOptions) => void;
/**
 * Toggles the visibility state of the requests modal.
 *
 * @param {LaunchRequestsOptions} options - The options for launching requests.
 * @param {Function} options.updateIsRequestsModalVisible - Function to update the visibility state of the requests modal.
 * @param {boolean} options.isRequestsModalVisible - Current visibility state of the requests modal.
 * @returns {void}
 *
 * @remarks
 * This method is used to open or close the requests modal by toggling its visibility state.
 * It takes the current visibility state as input and updates it accordingly.
 *
 * @example
 * ```typescript
 * const options: LaunchRequestsOptions = {
 *   updateIsRequestsModalVisible: (isVisible) => {
 *     console.log('Requests modal visibility:', isVisible);
 *   },
 *   isRequestsModalVisible: false,
 * };
 *
 * const launchRequestsService = new LaunchRequests();
 * launchRequestsService.launchRequests(options);
 * ```
 */
export declare class LaunchRequests {
    /**
     * Toggles the visibility state of the requests modal.
     *
     * @param {LaunchRequestsOptions} options - The options for launching requests.
     * @param {Function} options.updateIsRequestsModalVisible - Function to update the visibility state of the requests modal.
     * @param {boolean} options.isRequestsModalVisible - Current visibility state of the requests modal.
     * @returns {void}
     */
    launchRequests({ updateIsRequestsModalVisible, isRequestsModalVisible, }: LaunchRequestsOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchRequests, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchRequests>;
}
