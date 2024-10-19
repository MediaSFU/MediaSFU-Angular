import * as i0 from "@angular/core";
export interface LaunchRequestsOptions {
    updateIsRequestsModalVisible: (isVisible: boolean) => void;
    isRequestsModalVisible: boolean;
}
export type LaunchRequestsType = (options: LaunchRequestsOptions) => void;
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
