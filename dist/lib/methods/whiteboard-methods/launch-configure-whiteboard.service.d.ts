import * as i0 from "@angular/core";
export interface LaunchConfigureWhiteboardOptions {
    updateIsConfigureWhiteboardModalVisible: (visible: boolean) => void;
    isConfigureWhiteboardModalVisible: boolean;
}
export type LaunchConfigureWhiteboardType = (options: LaunchConfigureWhiteboardOptions) => void;
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
