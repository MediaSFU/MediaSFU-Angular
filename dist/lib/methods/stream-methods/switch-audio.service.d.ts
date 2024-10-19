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
