import { ShowAlert, SwitchUserVideoParameters, SwitchUserVideoType } from '../../@types/types';
import * as i0 from "@angular/core";
export interface SwitchVideoParameters extends SwitchUserVideoParameters {
    recordStarted: boolean;
    recordResumed: boolean;
    recordStopped: boolean;
    recordPaused: boolean;
    recordingMediaOptions: string;
    videoAlreadyOn: boolean;
    userDefaultVideoInputDevice: string;
    defVideoID: string;
    allowed: boolean;
    updateDefVideoID: (deviceId: string) => void;
    updatePrevVideoInputDevice: (deviceId: string) => void;
    updateUserDefaultVideoInputDevice: (deviceId: string) => void;
    updateIsMediaSettingsModalVisible: (isVisible: boolean) => void;
    showAlert?: ShowAlert;
    switchUserVideo: SwitchUserVideoType;
    [key: string]: any;
}
export interface SwitchVideoOptions {
    videoPreference: string;
    parameters: SwitchVideoParameters;
}
export type SwitchVideoType = (options: SwitchVideoOptions) => Promise<void>;
export declare class SwitchVideo {
    /**
     * Switches the user's video device based on the provided video preference.
     *
     * @param {SwitchVideoParams} options - The function parameters.
     */
    switchVideo({ videoPreference, parameters }: SwitchVideoOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchVideo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SwitchVideo>;
}
