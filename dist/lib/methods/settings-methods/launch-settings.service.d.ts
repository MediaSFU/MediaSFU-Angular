import * as i0 from "@angular/core";
export interface LaunchSettingsOptions {
    updateIsSettingsModalVisible: (isVisible: boolean) => void;
    isSettingsModalVisible: boolean;
}
export type LaunchSettingsType = (options: LaunchSettingsOptions) => void;
/**
 * Toggles the visibility state of the settings modal.
 *
 * @param {LaunchSettingsOptions} options - The options for launching settings.
 * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility state of the settings modal.
 * @param {boolean} options.isSettingsModalVisible - Current visibility state of the settings modal.
 * @returns {void}
 *
 * @remarks
 * This method toggles the current visibility state of the settings modal.
 * If the modal is currently visible, it will be hidden, and vice versa.
 *
 * @example
 * ```typescript
 * const options: LaunchSettingsOptions = {
 *   updateIsSettingsModalVisible: (isVisible) => {
 *     console.log('Settings modal visibility:', isVisible);
 *   },
 *   isSettingsModalVisible: false,
 * };
 *
 * const launchSettingsService = new LaunchSettings();
 * launchSettingsService.launchSettings(options);
 * ```
 */
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
