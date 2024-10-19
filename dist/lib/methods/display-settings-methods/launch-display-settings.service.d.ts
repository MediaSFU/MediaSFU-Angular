import * as i0 from "@angular/core";
export interface LaunchDisplaySettingsOptions {
    updateIsDisplaySettingsModalVisible: (isVisible: boolean) => void;
    isDisplaySettingsModalVisible: boolean;
}
export type LaunchDisplaySettingsType = (options: LaunchDisplaySettingsOptions) => void;
export declare class LaunchDisplaySettings {
    /**
     * Toggles the visibility of the display settings modal.
     *
     * @param updateIsDisplaySettingsModalVisible - Function to update the visibility state of the display settings modal.
     * @param isDisplaySettingsModalVisible - Current visibility state of the display settings modal.
     */
    launchDisplaySettings({ updateIsDisplaySettingsModalVisible, isDisplaySettingsModalVisible, }: LaunchDisplaySettingsOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchDisplaySettings, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchDisplaySettings>;
}
