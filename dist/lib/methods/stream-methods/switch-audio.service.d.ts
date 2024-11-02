import { SwitchUserAudioType, SwitchUserAudioParameters } from '../../@types/types';
import * as i0 from "@angular/core";
export interface SwitchAudioParameters extends SwitchUserAudioParameters {
    defAudioID: string;
    userDefaultAudioInputDevice: string;
    prevAudioInputDevice: string;
    updateUserDefaultAudioInputDevice: (deviceId: string) => void;
    updatePrevAudioInputDevice: (deviceId: string) => void;
    switchUserAudio: SwitchUserAudioType;
    getUpdatedAllParams: () => SwitchAudioParameters;
    [key: string]: any;
}
export interface SwitchAudioOptions {
    audioPreference: string;
    parameters: SwitchAudioParameters;
}
export type SwitchAudioType = (options: SwitchAudioOptions) => Promise<void>;
/**
 * Switches the audio input device based on user preference.
 *
 * @param {SwitchAudioOptions} options - The options for switching the audio input.
 * @param {string} options.audioPreference - The ID of the preferred audio input device.
 * @param {SwitchAudioParameters} options.parameters - The parameters required for switching the audio.
 * @param {string} options.parameters.defAudioID - The default audio input device ID.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The current default audio input device ID.
 * @param {string} options.parameters.prevAudioInputDevice - The previously used audio input device ID.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user's default audio input device.
 * @param {Function} options.parameters.updatePrevAudioInputDevice - Function to update the previous audio input device.
 * @param {Function} options.parameters.switchUserAudio - Function to switch the user's audio.
 *
 * @returns {Promise<void>} A promise that resolves when the audio input has been switched.
 *
 * @remarks
 * This function checks if the user's preferred audio device differs from the current default.
 * If so, it updates the previous audio device and the current default audio device.
 * It then calls the function to switch the user's audio.
 *
 * @example
 * ```typescript
 * const options: SwitchAudioOptions = {
 *   audioPreference: 'newAudioDeviceID',
 *   parameters: {
 *     defAudioID: 'defaultAudioDeviceID',
 *     userDefaultAudioInputDevice: 'currentAudioDeviceID',
 *     prevAudioInputDevice: '',
 *     updateUserDefaultAudioInputDevice: (deviceId) => console.log(`Updated to: ${deviceId}`),
 *     updatePrevAudioInputDevice: (deviceId) => console.log(`Previous device was: ${deviceId}`),
 *     switchUserAudio: async ({ audioPreference, parameters }) => {
 *       console.log(`Switching audio to: ${audioPreference}`);
 *     },
 *     getUpdatedAllParams: () => {
 *       return {
 *         defAudioID: 'defaultAudioDeviceID',
 *         userDefaultAudioInputDevice: 'currentAudioDeviceID',
 *         prevAudioInputDevice: '',
 *       };
 *     },
 *   },
 * };
 *
 * const switchAudioService = new SwitchAudio();
 * await switchAudioService.switchAudio(options);
 * ```
 */
export declare class SwitchAudio {
    /**
     * Switches the audio input device based on user preference.
     *
     * @param {SwitchAudioParams} options - The function parameters.
     * @returns {Promise<void>}
     */
    switchAudio({ audioPreference, parameters }: SwitchAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SwitchAudio>;
}
