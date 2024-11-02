import { ShowAlert, StreamSuccessAudioSwitchType, RequestPermissionAudioType, StreamSuccessAudioSwitchParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface SwitchUserAudioParameters extends StreamSuccessAudioSwitchParameters {
    userDefaultAudioInputDevice: string;
    prevAudioInputDevice: string;
    showAlert?: ShowAlert;
    hasAudioPermission: boolean;
    updateUserDefaultAudioInputDevice: (deviceId: string) => void;
    streamSuccessAudioSwitch: StreamSuccessAudioSwitchType;
    requestPermissionAudio: RequestPermissionAudioType;
    checkMediaPermission: boolean;
    [key: string]: any;
}
export interface SwitchUserAudioOptions {
    audioPreference: string;
    parameters: SwitchUserAudioParameters;
}
export type SwitchUserAudioType = (options: SwitchUserAudioOptions) => Promise<void>;
/**
 * Switches the user's audio input device based on the provided audio preference.
 *
 * This method checks for audio permissions, attempts to access the specified audio input device,
 * and updates the application's state accordingly. If the audio input device cannot be accessed,
 * it will revert to the previous audio input device.
 *
 * @param {SwitchUserAudioOptions} options - The options for switching the user's audio input device.
 * @param {string} options.audioPreference - The preferred audio input device ID.
 * @param {SwitchUserAudioParameters} options.parameters - Additional parameters required for switching the audio input device.
 * @param {string} options.parameters.prevAudioInputDevice - The previous audio input device ID.
 * @param {Function} options.parameters.showAlert - Function to show alert messages.
 * @param {boolean} options.parameters.hasAudioPermission - Flag indicating if the user has granted audio permission.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user's default audio input device.
 * @param {Function} options.parameters.streamSuccessAudioSwitch - Function to handle successful audio stream switch.
 * @param {Function} options.parameters.requestPermissionAudio - Function to request audio permission from the user.
 * @param {Function} options.parameters.checkMediaPermission - Function to check if media permission is granted.
 *
 * @returns {Promise<void>} A promise that resolves when the audio input device has been successfully switched.
 *
 * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
 *
 * @example
 * await switchUserAudio({
 *   audioPreference: 'new-audio-device-id',
 *   parameters: {
 *     prevAudioInputDevice: 'previous-device-id',
 *     hasAudioPermission: true,
 *     updateUserDefaultAudioInputDevice: updateDeviceFunction,
 *     // other parameters...
 *   },
 * });
 */
export declare class SwitchUserAudio {
    /**
     * Switches the user's audio input device based on the provided audio preference.
     *
     * @param {SwitchUserAudioOptions} options - The options for switching the user's audio input device.
     * @param {string} options.audioPreference - The preferred audio input device ID.
     * @param {Object} options.parameters - Additional parameters required for switching the audio input device.
     * @param {string} options.parameters.prevAudioInputDevice - The previous audio input device ID.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {boolean} options.parameters.hasAudioPermission - Flag indicating if the user has granted audio permission.
     * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user's default audio input device.
     * @param {Function} options.parameters.streamSuccessAudioSwitch - Function to handle successful audio stream switch.
     * @param {Function} options.parameters.requestPermissionAudio - Function to request audio permission from the user.
     * @param {Function} options.parameters.checkMediaPermission - Function to check if media permission is granted.
     *
     * @returns {Promise<void>} A promise that resolves when the audio input device has been successfully switched.
     *
     * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
     */
    switchUserAudio({ audioPreference, parameters }: SwitchUserAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchUserAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SwitchUserAudio>;
}
