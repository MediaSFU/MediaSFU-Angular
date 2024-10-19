import * as i0 from "@angular/core";
export interface LaunchSettingsOptions {
    updateIsSettingsModalVisible: (isVisible: boolean) => void;
    isSettingsModalVisible: boolean;
}
export type LaunchSettingsType = (options: LaunchSettingsOptions) => void;
export declare class LaunchSettings {
    /**
     * Toggles the visibility state of the settings modal.
     *
     * @param {LaunchSettingsOptions} options - The options for launching settings.
     * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility state of the settings modal.
     * @param {boolean} options.isSettingsModalVisible - Current visibility state of the settings modal.
     * @returns {void}
     */
    launchSettings({ updateIsSettingsModalVisible, isSettingsModalVisible, }: LaunchSettingsOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchSettings, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchSettings>;
}
