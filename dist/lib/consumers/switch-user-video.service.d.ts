import { ClickVideo, ClickVideoParameters } from '../methods/stream-methods/click-video.service';
import { ShowAlert, VidCons, RequestPermissionCameraType, StreamSuccessVideoType, SleepType, StreamSuccessVideoParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface SwitchUserVideoParameters extends StreamSuccessVideoParameters, ClickVideoParameters {
    audioOnlyRoom: boolean;
    frameRate: number;
    vidCons: VidCons;
    prevVideoInputDevice: string;
    userDefaultVideoInputDevice: string;
    showAlert?: ShowAlert;
    hasCameraPermission: boolean;
    updateVideoSwitching: (state: boolean) => void;
    updateUserDefaultVideoInputDevice: (deviceId: string) => void;
    requestPermissionCamera: RequestPermissionCameraType;
    streamSuccessVideo: StreamSuccessVideoType;
    sleep: SleepType;
    checkMediaPermission: boolean;
    getUpdatedAllParams: () => SwitchUserVideoParameters;
    [key: string]: any;
}
export interface SwitchUserVideoOptions {
    videoPreference: string;
    checkoff: boolean;
    parameters: SwitchUserVideoParameters;
}
export type SwitchUserVideoType = (options: SwitchUserVideoOptions) => Promise<void>;
export declare class SwitchUserVideo {
    private ClickVideoService;
    constructor(ClickVideoService: ClickVideo);
    /**
     * Switches the user's video input device based on the provided options.
     *
     * @param {SwitchUserVideoOptions} options - The options for switching the user's video.
     * @param {string} options.videoPreference - The preferred video input device ID.
     * @param {boolean} options.checkoff - Flag indicating whether to turn off the video.
     * @param {Object} options.parameters - Additional parameters required for switching the video.
     * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the room is audio-only.
     * @param {number} options.parameters.frameRate - The desired frame rate for the video.
     * @param {Object} options.parameters.vidCons - Video constraints such as width and height.
     * @param {string} options.parameters.prevVideoInputDevice - The previous video input device ID.
     * @param {Function} options.parameters.showAlert - Function to show alerts to the user.
     * @param {boolean} options.parameters.hasCameraPermission - Indicates if the user has camera permission.
     * @param {Function} options.parameters.updateVideoSwitching - Function to update video switching state.
     * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the default video input device.
     * @param {Function} options.parameters.requestPermissionCamera - Function to request camera permission.
     * @param {Function} options.parameters.streamSuccessVideo - Function to handle successful video stream.
     * @param {Function} options.parameters.sleep - Function to pause execution for a specified duration.
     * @param {Function} options.parameters.checkMediaPermission - Function to check media permissions.
     *
     * @returns {Promise<void>} A promise that resolves when the video input device has been switched.
     *
     * @throws Will throw an error if switching the video input device fails.
     */
    switchUserVideo: ({ videoPreference, checkoff, parameters, }: {
        videoPreference: string;
        checkoff: boolean;
        parameters: any;
    }) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchUserVideo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SwitchUserVideo>;
}
