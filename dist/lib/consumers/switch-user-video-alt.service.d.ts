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
