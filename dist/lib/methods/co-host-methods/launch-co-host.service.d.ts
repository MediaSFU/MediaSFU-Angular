import * as i0 from "@angular/core";
export interface LaunchCoHostOptions {
    updateIsCoHostModalVisible: (isVisible: boolean) => void;
    isCoHostModalVisible: boolean;
}
export type LaunchCoHostType = (options: LaunchCoHostOptions) => void;
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
