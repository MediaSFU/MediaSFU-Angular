import * as i0 from "@angular/core";
export interface LaunchMediaSettingsOptions {
    updateIsMediaSettingsModalVisible: (isVisible: boolean) => void;
    isMediaSettingsModalVisible: boolean;
    audioInputs: MediaDeviceInfo[];
    videoInputs: MediaDeviceInfo[];
    updateAudioInputs: (inputs: MediaDeviceInfo[]) => void;
    updateVideoInputs: (inputs: MediaDeviceInfo[]) => void;
}
export type LaunchMediaSettingsType = (options: LaunchMediaSettingsOptions) => Promise<void>;
/**
 * Launches the media settings modal and updates the available audio and video input devices.
 *
 * This method checks the current visibility of the media settings modal and, if it is not visible,
 * retrieves the list of available audio and video input devices. It then updates the state with
 * these devices and opens the modal. If the modal is already visible, it closes the modal.
 *
 * @param {LaunchMediaSettingsOptions} options - The options for launching media settings.
 * @param {Function} options.updateIsMediaSettingsModalVisible - Function to update the visibility state of the media settings modal.
 * @param {boolean} options.isMediaSettingsModalVisible - Current visibility state of the media settings modal.
 * @param {MediaDeviceInfo[]} options.audioInputs - Array to store available audio input devices.
 * @param {MediaDeviceInfo[]} options.videoInputs - Array to store available video input devices.
 * @param {Function} options.updateAudioInputs - Function to update the available audio input devices.
 * @param {Function} options.updateVideoInputs - Function to update the available video input devices.
 * @returns {Promise<void>} A promise that resolves when the media settings have been updated.
 *
 * @example
 * ```typescript
 * const launchMediaSettingsService = new LaunchMediaSettings();
 * launchMediaSettingsService.launchMediaSettings({
 *   updateIsMediaSettingsModalVisible: (isVisible) => {
 *     console.log('Media settings modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isMediaSettingsModalVisible: false, // Initially not visible
 *   audioInputs: [],
 *   videoInputs: [],
 *   updateAudioInputs: (inputs) => {
 *     console.log('Available audio inputs:', inputs);
 *   },
 *   updateVideoInputs: (inputs) => {
 *     console.log('Available video inputs:', inputs);
 *   },
 * });
 * ```
 */
export declare class LaunchMediaSettings {
    /**
     * Launches the media settings modal and updates the available audio and video input devices.
     *
     * @param {Object} options - The options for launching media settings.
     * @param {Function} options.updateIsMediaSettingsModalVisible - Function to update the visibility state of the media settings modal.
     * @param {boolean} options.isMediaSettingsModalVisible - Current visibility state of the media settings modal.
     * @param {MediaDeviceInfo[]} options.audioInputs - Array to store available audio input devices.
     * @param {MediaDeviceInfo[]} options.videoInputs - Array to store available video input devices.
     * @param {Function} options.updateAudioInputs - Function to update the available audio input devices.
     * @param {Function} options.updateVideoInputs - Function to update the available video input devices.
     * @returns {Promise<void>} A promise that resolves when the media settings have been updated.
     */
    launchMediaSettings({ updateIsMediaSettingsModalVisible, isMediaSettingsModalVisible, audioInputs, videoInputs, updateAudioInputs, updateVideoInputs, }: LaunchMediaSettingsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchMediaSettings, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchMediaSettings>;
}
