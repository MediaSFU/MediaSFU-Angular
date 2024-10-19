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
export declare class SwitchVideoAlt {
    switchVideoAlt({ parameters }: SwitchVideoAltOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchVideoAlt, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SwitchVideoAlt>;
}
