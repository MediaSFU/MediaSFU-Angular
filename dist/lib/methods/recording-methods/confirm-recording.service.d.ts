import { ShowAlert, EventType, UserRecordingParams } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ConfirmRecordingParameters {
    showAlert?: ShowAlert;
    recordingMediaOptions: string;
    recordingAudioOptions: string;
    recordingVideoOptions: string;
    recordingVideoType: string;
    recordingDisplayType: 'video' | 'media' | 'all';
    recordingNameTags: boolean;
    recordingBackgroundColor: string;
    recordingNameTagsColor: string;
    recordingOrientationVideo: string;
    recordingAddHLS: boolean;
    recordingAddText: boolean;
    recordingCustomText: string;
    recordingCustomTextPosition: string;
    recordingCustomTextColor: string;
    meetingDisplayType: string;
    recordingVideoParticipantsFullRoomSupport: boolean;
    recordingAllParticipantsSupport: boolean;
    recordingVideoParticipantsSupport: boolean;
    recordingSupportForOtherOrientation: boolean;
    recordingPreferredOrientation: string;
    recordingMultiFormatsSupport: boolean;
    recordingVideoOptimized: boolean;
    recordingAllParticipantsFullRoomSupport: boolean;
    meetingVideoOptimized: boolean;
    eventType: EventType;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    updateRecordingDisplayType: (value: 'video' | 'media' | 'all') => void;
    updateRecordingVideoOptimized: (value: boolean) => void;
    updateUserRecordingParams: (params: UserRecordingParams) => void;
    updateConfirmedToRecord: (value: boolean) => void;
    getUpdatedAllParams: () => ConfirmRecordingParameters;
    [key: string]: any;
}
export interface ConfirmRecordingOptions {
    parameters: ConfirmRecordingParameters;
}
export type ConfirmRecordingType = (options: ConfirmRecordingOptions) => Promise<void>;
export declare class ConfirmRecording {
    confirmRecording: ({ parameters }: ConfirmRecordingOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmRecording>;
}
