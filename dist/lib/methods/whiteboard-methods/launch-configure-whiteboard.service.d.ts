import * as i0 from "@angular/core";
export interface LaunchConfigureWhiteboardOptions {
    updateIsConfigureWhiteboardModalVisible: (visible: boolean) => void;
    isConfigureWhiteboardModalVisible: boolean;
}
export type LaunchConfigureWhiteboardType = (options: LaunchConfigureWhiteboardOptions) => void;
/**
 * Toggles the visibility of the configure whiteboard modal.
 *
 * @param {LaunchConfigureWhiteboardOptions} options - Options to control whiteboard configuration modal.
 * @param {Function} options.updateIsConfigureWhiteboardModalVisible - Function to update the modal's visibility state.
 * @param {boolean} options.isConfigureWhiteboardModalVisible - Current visibility state of the configure whiteboard modal.
 *
 * This function uses the current visibility state to toggle the whiteboard configuration modal on or off.
 *
 * @example
 * ```typescript
 * const launchService = new LaunchConfigureWhiteboard();
 * launchService.launchConfigureWhiteboard({
 *   updateIsConfigureWhiteboardModalVisible: (visible) => console.log('Modal Visible:', visible),
 *   isConfigureWhiteboardModalVisible: false
 * });
 * ```
 *
 * In this example, the modal visibility state is toggled, and the updated visibility state is logged.
 */
export declare class LaunchConfigureWhiteboard {
    /**
     * Toggles the visibility of the configure whiteboard modal.
     *
     * @param updateIsConfigureWhiteboardModalVisible - Function to update the visibility state of the configure whiteboard modal.
     * @param isConfigureWhiteboardModalVisible - Current visibility state of the configure whiteboard modal.
     */
    launchConfigureWhiteboard({ updateIsConfigureWhiteboardModalVisible, isConfigureWhiteboardModalVisible, }: LaunchConfigureWhiteboardOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchConfigureWhiteboard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchConfigureWhiteboard>;
}
