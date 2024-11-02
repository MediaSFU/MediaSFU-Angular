import { ClickVideo, ClickVideoParameters } from '../methods/stream-methods/click-video.service';
import { ShowAlert, VidCons, RequestPermissionCameraType, StreamSuccessVideoType, SleepType, StreamSuccessVideoParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface SwitchUserVideoAltParameters extends StreamSuccessVideoParameters, ClickVideoParameters {
    audioOnlyRoom: boolean;
    frameRate: number;
    vidCons: VidCons;
    showAlert?: ShowAlert;
    hasCameraPermission: boolean;
    updateVideoSwitching: (state: boolean) => void;
    updateCurrentFacingMode: (mode: string) => void;
    requestPermissionCamera: RequestPermissionCameraType;
    streamSuccessVideo: StreamSuccessVideoType;
    sleep: SleepType;
    checkMediaPermission: boolean;
    getUpdatedAllParams: () => SwitchUserVideoAltParameters;
    [key: string]: any;
}
export interface SwitchUserVideoAltOptions {
    videoPreference: string;
    checkoff: boolean;
    parameters: SwitchUserVideoAltParameters;
}
export type SwitchUserVideoAltType = (options: SwitchUserVideoAltOptions) => Promise<void>;
/**
 * Switches the user's video stream based on the provided video preference and other parameters.
 *
 * This method manages the process of switching the user's video input device,
 * checking permissions, and updating the relevant application state.
 * If the specified device is not accessible, it attempts to find an alternative.
 *
 * @param {SwitchUserVideoAltOptions} options - The options for switching the user's video.
 * @param {string} options.videoPreference - The preferred video input device ID.
 * @param {boolean} options.checkoff - A flag indicating whether to turn off the video before switching.
 * @param {SwitchUserVideoAltParameters} options.parameters - The parameters required for switching the video.
 * @param {Function} options.parameters.showAlert - Function to show alert messages to the user.
 * @param {boolean} options.parameters.hasCameraPermission - Flag indicating if the user has granted camera permission.
 * @param {Function} options.parameters.updateVideoSwitching - Function to update the video switching state.
 * @param {Function} options.parameters.requestPermissionCamera - Function to request camera permission from the user.
 * @param {Function} options.parameters.checkMediaPermission - Function to check if media permissions are granted.
 *
 * @returns {Promise<void>} A promise that resolves when the video switching is complete.
 *
 * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
 *
 * @example
 * await switchUserVideoAlt({
 *   videoPreference: 'user',
 *   checkoff: false,
 *   parameters: {
 *     hasCameraPermission: true,
 *     updateVideoSwitching: (state) => { /* update state *\/ },
 *     // other parameters...
 *   },
 * });
 */
export declare class SwitchUserVideoAlt {
    private ClickVideoService;
    constructor(ClickVideoService: ClickVideo);
    /**
     * Switches the user's video stream based on the provided video preference and other parameters.
     *
     * @param {Object} options - The options for switching the user's video.
     * @param {string} options.videoPreference - The preferred video facing mode (e.g., "user" or "environment").
     * @param {boolean} options.checkoff - A flag indicating whether to turn off the video before switching.
     * @param {SwitchUserVideoAltOptions} options.parameters - The parameters required for switching the video.
     *
     * @returns {Promise<void>} A promise that resolves when the video switching is complete.
     *
     * @throws Will throw an error if there is an issue with switching the video.
     */
    switchUserVideoAlt({ videoPreference, checkoff, parameters, }: SwitchUserVideoAltOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchUserVideoAlt, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SwitchUserVideoAlt>;
}
