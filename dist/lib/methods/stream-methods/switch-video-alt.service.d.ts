import { ShowAlert, SwitchUserVideoAltType, SwitchUserVideoParameters } from '../../@types/types';
import * as i0 from "@angular/core";
export interface SwitchVideoAltParameters extends SwitchUserVideoParameters {
    recordStarted: boolean;
    recordResumed: boolean;
    recordStopped: boolean;
    recordPaused: boolean;
    recordingMediaOptions: string;
    videoAlreadyOn: boolean;
    currentFacingMode: string;
    prevFacingMode: string;
    allowed: boolean;
    audioOnlyRoom: boolean;
    updateCurrentFacingMode: (mode: string) => void;
    updatePrevFacingMode: (mode: string) => void;
    updateIsMediaSettingsModalVisible: (isVisible: boolean) => void;
    showAlert?: ShowAlert;
    switchUserVideoAlt: SwitchUserVideoAltType;
    getUpdatedAllParams: () => SwitchVideoAltParameters;
}
export interface SwitchVideoAltOptions {
    parameters: SwitchVideoAltParameters;
}
export type SwitchVideoAltType = (options: SwitchVideoAltOptions) => Promise<void>;
/**
 * Switches the video input based on user preference and current state.
 *
 * @param {SwitchVideoAltOptions} options - The options for switching the video input.
 * @param {SwitchVideoAltParameters} options.parameters - The parameters required for switching the video input.
 * @param {boolean} options.parameters.recordStarted - Indicates if recording has started.
 * @param {boolean} options.parameters.recordResumed - Indicates if recording has resumed.
 * @param {boolean} options.parameters.recordStopped - Indicates if recording has stopped.
 * @param {boolean} options.parameters.recordPaused - Indicates if recording is paused.
 * @param {string} options.parameters.recordingMediaOptions - The current media options (e.g., "video").
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is currently on.
 * @param {string} options.parameters.currentFacingMode - The current facing mode of the camera (e.g., "environment").
 * @param {boolean} options.parameters.allowed - Indicates if the user is allowed to switch video.
 * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the current room is audio-only.
 * @param {Function} options.parameters.updateCurrentFacingMode - Function to update the current facing mode.
 * @param {Function} options.parameters.updateIsMediaSettingsModalVisible - Function to update the visibility of the media settings modal.
 * @param {Function} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {Function} options.parameters.switchUserVideoAlt - Function to switch the user's video input.
 *
 * @returns {Promise<void>} A promise that resolves when the video input has been switched.
 *
 * @remarks
 * This function checks if the user is allowed to switch the video input based on the current state,
 * and it shows alerts if there are any issues. If the video is already on, it cannot be switched until
 * it is turned off, and vice versa. The facing mode of the camera is toggled between "user" and "environment".
 *
 * @example
 * ```typescript
 * const options: SwitchVideoAltOptions = {
 *   parameters: {
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordStopped: false,
 *     recordPaused: false,
 *     recordingMediaOptions: 'video',
 *     videoAlreadyOn: true,
 *     currentFacingMode: 'user',
 *     allowed: true,
 *     audioOnlyRoom: false,
 *     updateCurrentFacingMode: (mode) => console.log(`Facing mode updated to: ${mode}`),
 *     updateIsMediaSettingsModalVisible: (isVisible) => console.log(`Media settings modal is now ${isVisible ? 'visible' : 'hidden'}`),
 *     switchUserVideoAlt: async ({ videoPreference }) => console.log(`Switched video to: ${videoPreference}`),
 *     getUpdatedAllParams: () => ({ }),
 *   },
 * };
 *
 * const switchVideoService = new SwitchVideoAlt();
 * await switchVideoService.switchVideoAlt(options);
 * ```
 */
export declare class SwitchVideoAlt {
    switchVideoAlt({ parameters }: SwitchVideoAltOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchVideoAlt, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SwitchVideoAlt>;
}
